import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Camera, Bike, Car, MapPin, Upload, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/register")({
  component: Register,
});

const TOTAL = 4;

function Register() {
  const [step, setStep] = useState(1);
  const [vehicle, setVehicle] = useState<string>("moto");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    age: "",
    phone: "",
    cep: "",
    city: "",
    address: "",
    // Vehicle
    brand: "",
    model: "",
    color: "",
    plate: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const next = () => step < TOTAL && setStep(step + 1);
  const back = () => step > 1 && setStep(step - 1);

  const handleSubmit = async () => {
    if (!user) {
      setError("Você precisa estar logado para finalizar o cadastro.");
      return;
    }

    setLoading(true);
    setError("");

    // 1. Insert courier profile
    const cityState = formData.city.split(" - ");
    const { error: profileError } = await supabase.from("couriers").insert({
      id: user.id,
      name: formData.name,
      cpf: formData.cpf,
      phone: formData.phone,
      email: user.email!,
      city: cityState[0]?.trim() || formData.city,
      state: cityState[1]?.trim() || "",
      address: formData.address,
      status: "pending",
    });

    if (profileError) {
      // If profile exists, update it
      if (profileError.code === "23505") {
        await supabase.from("couriers").update({
          name: formData.name,
          cpf: formData.cpf,
          phone: formData.phone,
          city: cityState[0]?.trim() || formData.city,
          state: cityState[1]?.trim() || "",
          address: formData.address,
        }).eq("id", user.id);
      } else {
        setError("Erro ao salvar perfil. Verifique sua internet.");
        setLoading(false);
        return;
      }
    }

    // 2. Insert vehicle
    const vehicleType = vehicle === "moto" ? "motorcycle" : vehicle === "carro" ? "car" : "bicycle";
    const { error: vehicleError } = await supabase.from("vehicles").insert({
      courier_id: user.id,
      type: vehicleType,
      brand: formData.brand || null,
      model: formData.model || null,
      color: formData.color || null,
      plate: formData.plate || null,
      status: "pending",
    });

    if (vehicleError && vehicleError.code !== "23505") {
      setError("Erro ao salvar veículo. Tente novamente.");
      setLoading(false);
      return;
    }

    // 3. Refresh the profile in context
    await refreshProfile();
    setLoading(false);
    navigate({ to: "/pending" });
  };

  return (
    <MobileFrame>
      <ScreenHeader
        title={`Cadastro ${step}/${TOTAL}`}
        subtitle={titleFor(step)}
        back={step === 1 ? "/onboarding" : undefined}
        right={
          step > 1 ? (
            <button onClick={back} className="text-xs text-primary font-medium">
              Voltar
            </button>
          ) : undefined
        }
      />
      <div className="px-4 pt-3">
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${(step / TOTAL) * 100}%` }}
          />
        </div>
        <div className="mt-1 text-[11px] text-muted-foreground">Etapa {step} de {TOTAL}</div>
      </div>

      <div className="px-5 py-5 flex-1 overflow-y-auto">
        {step === 1 && <StepPersonal formData={formData} updateField={updateField} />}
        {step === 2 && <StepPhoto />}
        {step === 3 && <StepVehicle value={vehicle} onChange={setVehicle} formData={formData} updateField={updateField} />}
        {step === 4 && <StepReview vehicle={vehicle} formData={formData} />}
      </div>

      {error && (
        <div className="mx-5 mb-2 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium p-3 rounded-xl text-center">
          {error}
        </div>
      )}

      <div className="px-5 py-4 border-t border-border bg-background">
        {step < TOTAL ? (
          <Button onClick={next} className="w-full h-12 rounded-xl text-base font-semibold">
            Continuar
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={loading} className="w-full h-12 rounded-xl text-base font-semibold">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Criar Conta"}
          </Button>
        )}
      </div>
    </MobileFrame>
  );
}

function titleFor(s: number) {
  return ["", "Dados pessoais", "Foto de segurança", "Entrega", "Revisão"][s];
}

function Field({ label, value, onValueChange, ...props }: { label: string; value?: string; onValueChange?: (v: string) => void } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      <Input 
        {...props} 
        value={value} 
        onChange={(e) => onValueChange?.(e.target.value)} 
        className="h-11 rounded-xl" 
      />
    </div>
  );
}

function StepPersonal({ formData, updateField }: { formData: any; updateField: (f: string, v: string) => void }) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold mb-1">Dados pessoais</h2>
      <Field label="Nome completo" placeholder="Digite seu nome" value={formData.name} onValueChange={(v) => updateField("name", v)} />
      <Field label="CPF" placeholder="000.000.000-00" value={formData.cpf} onValueChange={(v) => updateField("cpf", v)} />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Idade" placeholder="Ex: 25" type="number" value={formData.age} onValueChange={(v) => updateField("age", v)} />
        <Field label="Telefone" placeholder="(11) 99999-9999" value={formData.phone} onValueChange={(v) => updateField("phone", v)} />
      </div>
      
      <div className="pt-2">
        <h3 className="text-sm font-semibold mb-2">Endereço completo</h3>
        <div className="space-y-3">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Field label="CEP" placeholder="00000-000" value={formData.cep} onValueChange={(v) => updateField("cep", v)} />
            </div>
            <Button variant="outline" className="h-11 px-3 border-border text-primary hover:bg-primary-soft">
              <MapPin className="h-4 w-4 mr-2" />
              Usar localização
            </Button>
          </div>
          <Field label="Cidade" placeholder="São Paulo - SP" value={formData.city} onValueChange={(v) => updateField("city", v)} />
          <Field label="Endereço completo" placeholder="Rua Exemplo, 123, Bairro" value={formData.address} onValueChange={(v) => updateField("address", v)} />
        </div>
      </div>
    </div>
  );
}

function StepPhoto() {
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold">Envie uma foto clara do seu rosto</h2>
      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
        Essa foto será usada somente para questão de segurança.
      </p>
      <div className="mx-auto mt-6 relative h-44 w-44 rounded-full bg-muted flex items-center justify-center border-4 border-primary-soft">
        <Camera className="h-10 w-10 text-muted-foreground" />
      </div>
      
      <div className="mt-6 flex flex-col gap-3">
        <Button className="w-full h-12 rounded-xl" variant="default">
          <Camera className="mr-2 h-4 w-4" />
          Tirar foto
        </Button>
        <Button className="w-full h-12 rounded-xl" variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Importar do celular
        </Button>
      </div>

      <div className="mt-6 text-left rounded-2xl bg-muted p-4">
        <div className="text-xs font-semibold mb-2">Regras da foto:</div>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li>Rosto bem visível e legível</li>
          <li>Boa iluminação</li>
          <li>Sem capacete ou óculos escuros</li>
        </ul>
      </div>
    </div>
  );
}

function VehicleOpt({ icon: Icon, label, value, current, onChange }: any) {
  const active = value === current;
  return (
    <button
      onClick={() => onChange(value)}
      className={`w-full flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-colors ${
        active ? "border-primary bg-primary-soft" : "border-border"
      }`}
    >
      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${active ? "bg-primary text-primary-foreground" : "bg-muted text-primary"}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold">{label}</div>
      </div>
    </button>
  );
}

function StepVehicle({ value, onChange, formData, updateField }: { value: string; onChange: (v: string) => void; formData: any; updateField: (f: string, v: string) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Como você pretende fazer entregas?</h2>
      <div className="space-y-2">
        <VehicleOpt icon={Bike} label="Moto" value="moto" current={value} onChange={onChange} />
        <VehicleOpt icon={Car} label="Carro" value="carro" current={value} onChange={onChange} />
        <VehicleOpt icon={Bike} label="Bicicleta" value="bike" current={value} onChange={onChange} />
      </div>

      {value !== "bike" ? (
        <div className="mt-6 space-y-3 p-4 rounded-2xl border border-border bg-muted/30">
          <h3 className="font-semibold text-sm">Dados do veículo</h3>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Marca" placeholder="Ex: Honda" value={formData.brand} onValueChange={(v) => updateField("brand", v)} />
            <Field label="Modelo" placeholder="Ex: CG 160" value={formData.model} onValueChange={(v) => updateField("model", v)} />
            <Field label="Cor" placeholder="Ex: Preta" value={formData.color} onValueChange={(v) => updateField("color", v)} />
            <Field label="Placa" placeholder="ABC1D23" value={formData.plate} onValueChange={(v) => updateField("plate", v)} />
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-3 p-4 rounded-2xl border border-border bg-muted/30">
          <h3 className="font-semibold text-sm">Dados da bicicleta</h3>
          <Field label="Cor da bicicleta" placeholder="Ex: Preta e vermelha" value={formData.color} onValueChange={(v) => updateField("color", v)} />
        </div>
      )}
    </div>
  );
}

function StepReview({ vehicle, formData }: { vehicle: string; formData: any }) {
  const items = [
    { label: "Nome", value: formData.name || "Não preenchido" },
    { label: "CPF", value: formData.cpf || "Não preenchido" },
    { label: "Cidade", value: formData.city || "Não preenchido" },
    { label: "Veículo", value: vehicle === "moto" ? "Moto" : vehicle === "carro" ? "Carro" : "Bicicleta" },
  ];
  
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Revisão</h2>
      <div className="rounded-2xl border border-border divide-y divide-border">
        {items.map((i) => (
          <div key={i.label} className="flex items-center justify-between px-4 py-3">
            <div>
              <div className="text-xs text-muted-foreground">{i.label}</div>
              <div className="text-sm font-semibold capitalize">{i.value}</div>
            </div>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-muted p-4 text-xs text-muted-foreground leading-relaxed">
        Ao enviar, declaro que as informações estão corretas e serão validadas para a criação da sua conta.
      </div>
    </div>
  );
}
