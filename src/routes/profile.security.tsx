import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Shield, Key, Smartphone, ChevronRight, Mail, MonitorX, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile/security")({
  component: ProfileSecurity,
});

function ProfileSecurity() {
  return (
    <MobileFrame>
      <ScreenHeader title="Segurança" back="/profile" />
      <div className="flex-1 overflow-y-auto bg-muted/20 pb-10">
        
        {/* Banner */}
        <div className="bg-primary/10 px-5 py-6 text-center border-b border-primary/10">
          <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
          <h2 className="text-base font-bold text-primary">Sua segurança é importante</h2>
          <p className="text-xs text-primary/80 mt-1 max-w-[250px] mx-auto">
            Mantenha seus dados atualizados para proteger sua conta e garantir o recebimento dos repasses.
          </p>
        </div>

        <div className="px-5 mt-6 space-y-3">
          <SecurityOption 
            icon={Key} 
            title="Alterar Senha" 
            subtitle="Última alteração há 2 meses" 
          />
          <SecurityOption 
            icon={Smartphone} 
            title="Autenticação em Duas Etapas" 
            subtitle="Mais proteção para sua conta"
            badge="Desativado"
            badgeColor="text-destructive bg-destructive/10"
          />
          <SecurityOption 
            icon={Smartphone} 
            title="Telefone de Recuperação" 
            subtitle="(11) 98765-****" 
          />
          <SecurityOption 
            icon={Mail} 
            title="E-mail de Login" 
            subtitle="vi***@email.com" 
          />
        </div>

        <div className="px-5 mt-6 space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Sessões</h3>
          <button className="w-full bg-background border border-border rounded-xl p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors text-left shadow-sm">
            <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
              <MonitorX className="h-5 w-5 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">Encerrar outras sessões</div>
              <div className="text-xs text-muted-foreground mt-0.5 truncate">Sair de todos os outros aparelhos</div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
          </button>
        </div>

        <div className="px-5 mt-10">
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <h3 className="text-sm font-bold text-destructive">Desativar conta</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Se você excluir sua conta, perderá o acesso ao aplicativo e não poderá mais realizar entregas. Esta ação é irreversível.
            </p>
            <Button variant="outline" className="w-full h-11 text-destructive border-destructive/30 hover:bg-destructive/10">
              Excluir minha conta
            </Button>
          </div>
        </div>

      </div>
    </MobileFrame>
  );
}

function SecurityOption({ icon: Icon, title, subtitle, badge, badgeColor }: any) {
  return (
    <button className="w-full bg-background border border-border rounded-xl p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors text-left shadow-sm">
      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm flex items-center gap-2">
          {title}
          {badge && (
            <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-sm ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5 truncate">{subtitle}</div>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
    </button>
  );
}
