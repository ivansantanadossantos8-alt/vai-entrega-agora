import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { FileText, ExternalLink, ShieldAlert, Scale, UserCheck, Star, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile/terms")({
  component: ProfileTerms,
});

function ProfileTerms() {
  return (
    <MobileFrame>
      <ScreenHeader title="Termos e Privacidade" back="/profile" />
      <div className="flex-1 overflow-y-auto bg-muted/20 pb-24 relative">
        
        <div className="px-5 py-6 space-y-4">
          <Section 
            icon={Scale} 
            title="Termos de Uso" 
            preview="Regras gerais sobre a utilização da plataforma Vai Até Você como entregador independente."
          />
          <Section 
            icon={ShieldAlert} 
            title="Política de Privacidade" 
            preview="Como coletamos, armazenamos e protegemos suas informações pessoais e bancárias."
          />
          <Section 
            icon={UserCheck} 
            title="Uso de Dados Pessoais" 
            preview="Detalhes sobre o compartilhamento de dados estritamente necessários com clientes (ex: nome e localização)."
          />
          <Section 
            icon={FileText} 
            title="Regras para Entregadores" 
            preview="Padrões de conduta esperados durante as coletas e entregas, incluindo uso de equipamentos adequados."
          />
          <Section 
            icon={Star} 
            title="Política de Avaliações" 
            preview="Como o sistema de notas funciona e como as avaliações dos clientes impactam sua conta."
          />
          <Section 
            icon={Ban} 
            title="Bloqueio ou Suspensão" 
            preview="Motivos que podem levar ao bloqueio temporário ou banimento definitivo da plataforma."
          />
        </div>

        {/* Fixed bottom button */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 z-10 shadow-[0_-8px_20px_rgba(0,0,0,0.05)] mx-auto w-full max-w-md">
          <Button className="w-full h-12 rounded-xl text-base font-semibold shadow-sm flex items-center justify-center gap-2">
            Visualizar Documento Completo
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

      </div>
    </MobileFrame>
  );
}

function Section({ icon: Icon, title, preview }: any) {
  return (
    <div className="bg-background rounded-2xl border border-border p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-primary/10 p-1.5 rounded-lg">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-bold text-sm text-foreground">{title}</h3>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed pl-9">
        {preview}
      </p>
    </div>
  );
}
