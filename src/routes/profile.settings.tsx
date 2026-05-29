import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Bell, Moon, Volume2, MapPin, Globe, PackageOpen, Trash2, Smartphone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile/settings")({
  component: ProfileSettings,
});

function ProfileSettings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sound, setSound] = useState(true);
  const [location, setLocation] = useState(true);
  const [deliveryPrefs, setDeliveryPrefs] = useState(false);

  return (
    <MobileFrame>
      <ScreenHeader title="Configurações" back="/profile" />
      <div className="flex-1 overflow-y-auto bg-muted/20 pb-10">
        
        <div className="px-5 mt-6">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 ml-1">Geral</h3>
          <div className="bg-background border border-border rounded-2xl divide-y divide-border overflow-hidden shadow-sm">
            <ToggleItem icon={Bell} title="Notificações Push" subtitle="Alertas de novas corridas" active={notifications} onClick={() => setNotifications(!notifications)} />
            <ToggleItem icon={Volume2} title="Sons do Aplicativo" subtitle="Tocar som ao receber pedido" active={sound} onClick={() => setSound(!sound)} />
            <ToggleItem icon={MapPin} title="Permitir Localização" subtitle="Necessário para receber corridas" active={location} onClick={() => setLocation(!location)} />
          </div>
        </div>

        <div className="px-5 mt-6">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 ml-1">Aparência e Idioma</h3>
          <div className="bg-background border border-border rounded-2xl divide-y divide-border overflow-hidden shadow-sm">
            <ToggleItem icon={Moon} title="Tema Escuro" subtitle="Melhor para uso noturno" active={darkMode} onClick={() => setDarkMode(!darkMode)} />
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Idioma</div>
                  <div className="text-xs text-muted-foreground">Idioma do aplicativo</div>
                </div>
              </div>
              <select className="bg-muted/50 border border-border rounded-lg text-sm font-semibold px-3 py-1.5 outline-none focus:border-primary cursor-pointer">
                <option value="pt-br">Português (BR)</option>
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        <div className="px-5 mt-6">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 ml-1">Entregas</h3>
          <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
            <ToggleItem icon={PackageOpen} title="Aceitação Automática" subtitle="Aceitar corridas na fila automaticamente" active={deliveryPrefs} onClick={() => setDeliveryPrefs(!deliveryPrefs)} />
          </div>
        </div>

        <div className="px-5 mt-8">
          <Button variant="outline" className="w-full h-12 rounded-xl border-border text-foreground flex items-center justify-center gap-2 shadow-sm bg-background hover:bg-muted/50">
            <Trash2 className="h-4 w-4 text-muted-foreground" />
            Limpar cache do aplicativo
          </Button>
        </div>

        <div className="mt-8 text-center flex flex-col items-center justify-center text-muted-foreground opacity-60">
          <Smartphone className="h-6 w-6 mb-1" />
          <div className="text-xs font-bold uppercase tracking-widest">Vai Até Você</div>
          <div className="text-[10px] font-medium mt-0.5">Versão 1.0.0 (Build 42)</div>
        </div>

      </div>
    </MobileFrame>
  );
}

function ToggleItem({ icon: Icon, title, subtitle, active, onClick }: any) {
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-sm">{title}</div>
          <div className="text-xs text-muted-foreground truncate pr-2">{subtitle}</div>
        </div>
      </div>
      <button 
        onClick={onClick}
        className={`w-11 h-6 rounded-full p-1 transition-colors relative flex items-center shrink-0 ${active ? 'bg-primary' : 'bg-muted border border-border/50'}`}
      >
        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform absolute ${active ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}
