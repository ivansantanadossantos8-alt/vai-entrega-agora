import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { User, Mail, MapPin, Hash, Phone, Calendar, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile/personal")({
  component: ProfilePersonal,
});

function ProfilePersonal() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <MobileFrame>
      <ScreenHeader title="Dados Pessoais" back="/profile" />
      <div className="px-5 py-6 flex-1 overflow-y-auto space-y-6">
        
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="h-24 w-24 rounded-full bg-primary/10 text-primary font-bold text-4xl flex items-center justify-center border-4 border-background shadow-sm relative">
            V
          </div>
          <h2 className="mt-4 text-lg font-bold">Victor da Silva</h2>
          <p className="text-sm text-muted-foreground">Entregador Parceiro</p>
        </div>

        <div className="space-y-4">
          <Field icon={User} label="Nome completo" value="Victor da Silva" isEditing={isEditing} />
          
          {/* CPF Protected */}
          <div className="bg-muted/30 border border-border rounded-xl p-4 flex gap-4 items-center opacity-80">
            <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shadow-sm">
              <Hash className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground font-medium mb-0.5 flex items-center gap-1">
                CPF <Lock className="h-3 w-3" />
              </div>
              <div className="text-sm font-semibold tracking-wider">***.456.789-**</div>
            </div>
            <div className="text-[10px] text-muted-foreground text-right leading-tight max-w-[80px]">
              Protegido.<br/>Contate o suporte.
            </div>
          </div>

          <Field icon={Calendar} label="Data de nascimento" value="15/08/1995" isEditing={isEditing} />
          <Field icon={Phone} label="Telefone" value="(11) 98765-4321" isEditing={isEditing} />
          <Field icon={Mail} label="E-mail" value="victor.silva@email.com" isEditing={isEditing} type="email" />
          
          <div className="grid grid-cols-2 gap-4">
            <Field icon={MapPin} label="Cidade" value="São Paulo" isEditing={isEditing} />
            <Field icon={MapPin} label="Estado" value="SP" isEditing={isEditing} />
          </div>
          
          <Field icon={MapPin} label="Endereço completo" value="Rua das Flores, 123 - Centro" isEditing={isEditing} />
        </div>

        <div className="pt-4 pb-10">
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              className="w-full h-12 rounded-xl text-base font-semibold shadow-sm"
            >
              Editar dados
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

function Field({ 
  icon: Icon, 
  label, 
  value, 
  isEditing,
  type = "text"
}: { 
  icon: any, 
  label: string, 
  value: string,
  isEditing: boolean,
  type?: string
}) {
  return (
    <div className={`bg-muted/30 border border-border rounded-xl p-4 flex gap-4 items-center transition-colors ${isEditing ? 'border-primary/50 bg-background shadow-[0_0_0_2px_rgba(59,130,246,0.1)]' : ''}`}>
      <div className="h-10 w-10 shrink-0 rounded-full bg-background flex items-center justify-center shadow-sm">
        <Icon className={`h-5 w-5 ${isEditing ? 'text-primary' : 'text-primary'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted-foreground font-medium mb-1">{label}</div>
        {isEditing ? (
          <input 
            type={type} 
            defaultValue={value}
            className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-muted-foreground/50 border-b border-primary/20 focus:border-primary pb-1"
          />
        ) : (
          <div className="text-sm font-semibold truncate">{value}</div>
        )}
      </div>
    </div>
  );
}
