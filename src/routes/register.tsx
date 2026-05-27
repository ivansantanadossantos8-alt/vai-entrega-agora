import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Camera, Bike, Car, Footprints, FileText, IdCard, Home as HomeIcon } from "lucide-react";

export const Route = createFileRoute("/register")({
  component: Register,
});

const TOTAL = 9;

function Register() {
  const [step, setStep] = useState(1);
  const [vehicle, setVehicle] = useState<string>("moto");
  const navigate = useNavigate();

  const next = () => (step < TOTAL ? setStep(step + 1) : navigate({ to: "/pending" }));
  const back = () => step > 1 && setStep(step - 1);

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
        {step === 1 && <StepPersonal />}
        {step === 2 && <StepPhoto />}
        {step === 3 && <StepDocuments />}
        {step === 4 && <StepVehicleType value={vehicle} onChange={setVehicle} />}
        {step === 5 && <StepVehicleData type={vehicle} />}
        {step === 6 && <StepBag />}
        {step === 7 && <StepFinance />}
        {step === 8 && <StepAvailability />}
        {step === 9 && <StepReview vehicle={vehicle} />}
      </div>

      <div className="px-5 py-4 border-t border-border bg-background">
        {step < TOTAL ? (
          <Button onClick={next} className="w-full h-12 rounded-xl text-base font-semibold">
            Continuar
          </Button>
        ) : (
          <Link to="/pending" className="block">
            <Button className="w-full h-12 rounded-xl text-base font-semibold">
              Enviar cadastro para análise
            </Button>
          </Link>
        )}
      </div>
    </MobileFrame>
  );
}

function titleFor(s: number) {
  return [
    "",
    "Dados pessoais",
    "Foto de perfil",
    "Documentos",
    "Tipo de entrega",
    "Dados do veículo",
    "Bag de entrega",
    "Dados financeiros",
    "Disponibilidade",
    "Revisão e envio",
  ][s];
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      <Input {...props} className="h-11 rounded-xl" />
    </div>
  );
}

function StepPersonal() {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold mb-1">Dados pessoais</h2>
      <Field label="Nome completo" placeholder="Digite seu nome" />
      <Field label="CPF" placeholder="000.000.000-00" />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Nascimento" placeholder="DD/MM/AAAA" />
        <Field label="Telefone" placeholder="(11) 99999-9999" />
      </div>
      <Field label="E-mail" type="email" placeholder="seuemail@email.com" />
      <Field label="Cidade" placeholder="São Paulo - SP" />
    </div>
  );
}

function StepPhoto() {
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold">Envie uma foto clara do seu rosto</h2>
      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
        Essa foto será usada para identificação no app.
      </p>
      <div className="mx-auto mt-6 relative h-44 w-44 rounded-full bg-muted flex items-center justify-center border-4 border-primary-soft">
        <Camera className="h-10 w-10 text-muted-foreground" />
        <div className="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-elevated">
          <Camera className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-6 text-left rounded-2xl bg-muted p-4">
        <div className="text-xs font-semibold mb-2">Regras da foto:</div>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li>Rosto bem visível</li>
          <li>Boa iluminação</li>
          <li>Sem capacete ou óculos escuros</li>
          <li>Fundo simples</li>
        </ul>
      </div>
    </div>
  );
}

function DocCard({ icon: Icon, title, sub }: { icon: any; title: string; sub: string }) {
  return (
    <button className="w-full flex items-center gap-3 rounded-2xl border border-border p-4 text-left hover:border-primary transition-colors">
      <div className="h-10 w-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <Camera className="h-5 w-5 text-muted-foreground" />
    </button>
  );
}

function StepDocuments() {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Documentos</h2>
      <DocCard icon={FileText} title="Documento com CPF" sub="Foto do RG ou CNH" />
      <DocCard icon={IdCard} title="CNH" sub="Obrigatória para moto e carro" />
      <DocCard icon={Camera} title="Foto segurando documento" sub="Para validação" />
      <DocCard icon={HomeIcon} title="Comprovante de residência" sub="Opcional" />
    </div>
  );
}

function VehicleOpt({ icon: Icon, label, sub, value, current, onChange }: any) {
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
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
    </button>
  );
}

function StepVehicleType({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Como você pretende fazer entregas?</h2>
      <VehicleOpt icon={Bike} label="Moto" sub="Entregas com motocicleta" value="moto" current={value} onChange={onChange} />
      <VehicleOpt icon={Car} label="Carro" sub="Entregas com carro" value="carro" current={value} onChange={onChange} />
      <VehicleOpt icon={Bike} label="Bicicleta" sub="Entregas com bicicleta" value="bike" current={value} onChange={onChange} />
      <VehicleOpt icon={Footprints} label="A pé" sub="Entregas a pé" value="pe" current={value} onChange={onChange} />
    </div>
  );
}

function StepVehicleData({ type }: { type: string }) {
  if (type === "pe") {
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Entregas a pé</h2>
        <Field label="Cidade" placeholder="São Paulo" />
        <Field label="Bairros de atuação" placeholder="Centro, Jardins" />
        <Field label="Distância máxima (km)" placeholder="3" />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Dados do {type}</h2>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Marca" placeholder="Honda" />
        <Field label="Modelo" placeholder="CG 160" />
        <Field label="Ano" placeholder="2022" />
        <Field label="Cor" placeholder="Preta" />
      </div>
      {type !== "bike" && <Field label="Placa" placeholder="ABC1D23" />}
      <DocCard icon={Camera} title={`Foto do ${type}`} sub="Veículo completo, lateral" />
      {type !== "bike" && <DocCard icon={Camera} title="Foto da placa" sub="Placa legível" />}
    </div>
  );
}

function StepBag() {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Bag de entrega</h2>
      <p className="text-xs text-muted-foreground">
        Obrigatória para entregas de comida e produtos sensíveis.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <button className="rounded-xl border-2 border-primary bg-primary text-primary-foreground py-3 font-semibold">Sim</button>
        <button className="rounded-xl border-2 border-border py-3 font-semibold">Não</button>
      </div>
      <DocCard icon={Camera} title="Foto da bag" sub="Mostre a bag completa" />
      <Field label="Tipo de bag" placeholder="Mochila de entrega" />
      <Field label="Estado da bag" placeholder="Boa" />
    </div>
  );
}

function StepFinance() {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Dados de recebimento</h2>
      <Field label="Tipo de chave Pix" placeholder="Telefone" />
      <Field label="Chave Pix" placeholder="(11) 99999-9999" />
      <Field label="Nome do titular" placeholder="Victor da Silva" />
      <Field label="CPF do titular" placeholder="000.000.000-00" />
      <Field label="Banco (opcional)" placeholder="Nubank" />
      <div className="rounded-2xl border-2 border-dashed border-primary/40 bg-primary-soft p-4 text-center">
        <div className="text-xs text-muted-foreground">Próximo repasse</div>
        <div className="text-sm font-bold text-primary">Toda segunda-feira</div>
      </div>
    </div>
  );
}

function StepAvailability() {
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Disponibilidade</h2>
      <Field label="Cidade de atuação" placeholder="São Paulo - SP" />
      <Field label="Bairros" placeholder="Selecione os bairros" />
      <Field label="Distância máxima" placeholder="10 km" />
      <div>
        <Label className="text-xs">Dias disponíveis</Label>
        <div className="mt-2 grid grid-cols-7 gap-1.5">
          {days.map((d, i) => (
            <button
              key={d}
              className={`h-10 rounded-xl text-xs font-semibold ${
                i < 6 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Início" placeholder="08:00" />
        <Field label="Fim" placeholder="22:00" />
      </div>
      <Toggle label="Aceita entregas à noite" defaultOn />
      <Toggle label="Aceita em dias de chuva" />
      <Toggle label="Aceita entregas longas" defaultOn />
    </div>
  );
}

function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className="w-full flex items-center justify-between rounded-xl border border-border px-4 py-3"
    >
      <span className="text-sm">{label}</span>
      <span className={`h-6 w-11 rounded-full p-0.5 transition-colors ${on ? "bg-primary" : "bg-muted"}`}>
        <span
          className={`block h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}`}
        />
      </span>
    </button>
  );
}

function StepReview({ vehicle }: { vehicle: string }) {
  const items = [
    { label: "Dados pessoais", value: "Victor da Silva" },
    { label: "Foto de perfil", value: "Enviada" },
    { label: "Documentos", value: "Enviados" },
    { label: "Veículo", value: vehicle === "moto" ? "Moto · Honda CG 160" : vehicle },
    { label: "Bag de entrega", value: "Mochila · Boa" },
    { label: "Dados financeiros", value: "Pix · (11) 99999-9999" },
    { label: "Disponibilidade", value: "São Paulo · 10 km" },
  ];
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Revisão e envio</h2>
      <div className="rounded-2xl border border-border divide-y divide-border">
        {items.map((i) => (
          <div key={i.label} className="flex items-center justify-between px-4 py-3">
            <div>
              <div className="text-xs text-muted-foreground">{i.label}</div>
              <div className="text-sm font-semibold">{i.value}</div>
            </div>
            <button className="text-xs text-primary font-medium">Editar</button>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-muted p-4 text-xs text-muted-foreground leading-relaxed">
        Ao enviar, declaro que todas as informações são verdadeiras e concordo com os Termos de Uso
        e Política de Privacidade.
      </div>
    </div>
  );
}
