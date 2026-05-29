import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { User, Mail, MapPin, Hash, Phone, Calendar, Lock, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/profile/personal")({
  component: ProfilePersonal,
});

function ProfilePersonal() {
  const { profile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    phone: profile?.phone || "",
    email: profile?.email || "",
    city: profile?.city || "",
    state: profile?.state || "",
    address: profile?.address || "",
  });

  const handleSave = async () => {
    setSaving(true);
    await updateProfile(formData);
    setSaving(false);
    setIsEditing(false);
  };

  const initials = profile?.name ? profile.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "U";

  return (
    <MobileFrame>
      <ScreenHeader title="Dados Pessoais" back="/profile" />
      <div className="px-5 py-6 flex-1 overflow-y-auto space-y-6">
        
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="h-24 w-24 rounded-full bg-primary/10 text-primary font-bold text-4xl flex items-center justify-center border-4 border-background shadow-sm relative">
            {initials}
          </div>
          <h2 className="mt-4 text-lg font-bold">{profile?.name || "Carregando..."}</h2>
          <p className="text-sm text-muted-foreground">Entregador Parceiro</p>
        </div>

        <div className="space-y-4">
          <Field icon={User} label="Nome completo" value={formData.name} isEditing={isEditing} onChange={(v) => setFormData({...formData, name: v})} />
          
          <div className="bg-muted/30 border border-border rounded-xl p-4 flex gap-4 items-center opacity-80">
            <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shadow-sm">
              <Hash className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground font-medium mb-0.5 flex items-center gap-1">
                CPF <Lock className="h-3 w-3" />
              </div>
              <div className="text-sm font-semibold tracking-wider">{profile?.cpf ? `***.${profile.cpf.substring(4, 7)}.***-**` : "---"}</div>
            </div>
            <div className="text-[10px] text-muted-foreground text-right leading-tight max-w-[80px]">
              Protegido.<br/>Contate o suporte.
            </div>
          </div>

          <Field icon={Phone} label="Telefone" value={formData.phone} isEditing={isEditing} onChange={(v) => setFormData({...formData, phone: v})} />
          <Field icon={Mail} label="E-mail" value={formData.email} isEditing={isEditing} onChange={(v) => setFormData({...formData, email: v})} type="email" />
          
          <div className="grid grid-cols-2 gap-4">
            <Field icon={MapPin} label="Cidade" value={formData.city} isEditing={isEditing} onChange={(v) => setFormData({...formData, city: v})} />
            <Field icon={MapPin} label="Estado" value={formData.state} isEditing={isEditing} onChange={(v) => setFormData({...formData, state: v})} />
          </div>
          
          <Field icon={MapPin} label="Endereço completo" value={formData.address} isEditing={isEditing} onChange={(v) => setFormData({...formData, address: v})} />
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
                onClick={handleSave}
                disabled={saving}
                className="flex-1 h-12 rounded-xl font-semibold shadow-sm"
              >
                {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : "Salvar alterações"}
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
  onChange,
  type = "text"
}: { 
  icon: any, 
  label: string, 
  value: string,
  isEditing: boolean,
  onChange?: (v: string) => void,
  type?: string
}) {
  return (
    <div className={`bg-muted/30 border border-border rounded-xl p-4 flex gap-4 items-center transition-colors ${isEditing ? 'border-primary/50 bg-background shadow-[0_0_0_2px_rgba(59,130,246,0.1)]' : ''}`}>
      <div className="h-10 w-10 shrink-0 rounded-full bg-background flex items-center justify-center shadow-sm">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted-foreground font-medium mb-1">{label}</div>
        {isEditing ? (
          <input 
            type={type} 
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-muted-foreground/50 border-b border-primary/20 focus:border-primary pb-1"
          />
        ) : (
          <div className="text-sm font-semibold truncate">{value || "—"}</div>
        )}
      </div>
    </div>
  );
}
