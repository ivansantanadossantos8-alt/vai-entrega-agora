import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Bike, CheckCircle2, Car, Camera, FileText } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile/vehicle")({
  component: ProfileVehicle,
});

function ProfileVehicle() {
  const [isEditing, setIsEditing] = useState(false);
  const [type, setType] = useState("bicicleta");

  return (
    <MobileFrame>
      <ScreenHeader title="Meu Veículo" back="/profile" />
      <div className="px-5 py-6 flex-1 overflow-y-auto space-y-6">
        
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-500/10 text-green-600 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider">
            <CheckCircle2 className="h-3.5 w-3.5" /> Veículo Cadastrado
          </div>
          
          <div className="mx-auto h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm">
            {type === "moto" || type === "carro" ? <Car className="h-10 w-10 text-primary" /> : <Bike className="h-10 w-10 text-primary" />}
          </div>
          <h2 className="text-xl font-bold capitalize">{type}</h2>
          <p className="text-sm text-muted-foreground mt-1">Sua modalidade atual</p>
        </div>

        <div className="space-y-4">
          <SelectField 
            label="Tipo de veículo" 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            isEditing={isEditing} 
            options={[
              { value: "bicicleta", label: "Bicicleta" },
              { value: "moto", label: "Moto" },
              { value: "carro", label: "Carro" },
              { value: "outro", label: "Outro" }
            ]}
          />
          <Field label="Marca" value="Caloi" isEditing={isEditing} />
          <Field label="Modelo" value="City Tour" isEditing={isEditing} />
          <Field label="Cor" value="Preta" isEditing={isEditing} />
          <Field label="Ano" value="2022" isEditing={isEditing} />
          
          {(type === "moto" || type === "carro") && (
            <Field label="Placa" value="ABC-1234" isEditing={isEditing} />
          )}

          {/* Anexos */}
          <div className="pt-2">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Anexos</div>
            <div className="grid grid-cols-2 gap-3">
              <AttachmentCard icon={Camera} label="Foto do veículo" status="Enviado" isEditing={isEditing} />
              {(type === "moto" || type === "carro") && (
                <AttachmentCard icon={FileText} label="Documento (CRLV)" status="Enviado" isEditing={isEditing} />
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 pb-10">
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              className="w-full h-12 rounded-xl text-base font-semibold shadow-sm"
            >
              Editar veículo
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="flex-1 h-12 rounded-xl border-border font-semibold"
              >
                Cancelar
              </Button>
              <Button 
                onClick={() => setIsEditing(false)}
                className="flex-1 h-12 rounded-xl font-semibold shadow-sm"
              >
                Salvar alterações
              </Button>
            </div>
          )}
        </div>

      </div>
    </MobileFrame>
  );
}

function Field({ label, value, isEditing }: { label: string, value: string, isEditing: boolean }) {
  return (
    <div className={`bg-muted/30 border border-border rounded-xl px-4 py-3 transition-colors ${isEditing ? 'border-primary/50 bg-background shadow-[0_0_0_2px_rgba(59,130,246,0.1)]' : ''}`}>
      <div className="text-[11px] text-muted-foreground font-semibold mb-1 uppercase tracking-wide">{label}</div>
      {isEditing ? (
        <input 
          type="text" 
          defaultValue={value}
          className="w-full bg-transparent text-sm font-bold outline-none placeholder:text-muted-foreground/50 border-b border-primary/20 focus:border-primary pb-1"
        />
      ) : (
        <div className="text-sm font-bold truncate">{value}</div>
      )}
    </div>
  );
}

function SelectField({ label, value, onChange, isEditing, options }: { label: string, value: string, onChange?: any, isEditing: boolean, options: {value: string, label: string}[] }) {
  return (
    <div className={`bg-muted/30 border border-border rounded-xl px-4 py-3 transition-colors ${isEditing ? 'border-primary/50 bg-background shadow-[0_0_0_2px_rgba(59,130,246,0.1)]' : ''}`}>
      <div className="text-[11px] text-muted-foreground font-semibold mb-1 uppercase tracking-wide">{label}</div>
      {isEditing ? (
        <select 
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-sm font-bold outline-none border-b border-primary/20 focus:border-primary pb-1 appearance-none"
        >
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : (
        <div className="text-sm font-bold truncate capitalize">{value}</div>
      )}
    </div>
  );
}

function AttachmentCard({ icon: Icon, label, status, isEditing }: { icon: any, label: string, status: string, isEditing: boolean }) {
  return (
    <div className="bg-background border border-border rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 relative overflow-hidden">
      <Icon className="h-6 w-6 text-primary/70" />
      <div>
        <div className="text-xs font-semibold leading-tight">{label}</div>
        <div className="text-[10px] text-green-600 font-medium mt-0.5">{status}</div>
      </div>
      {isEditing && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-white text-xs font-bold">Alterar</span>
        </div>
      )}
    </div>
  );
}
