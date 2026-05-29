import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { MessageCircle, HelpCircle, AlertCircle, CreditCard, Lock, Bug, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile/support")({
  component: ProfileSupport,
});

function ProfileSupport() {
  return (
    <MobileFrame>
      <ScreenHeader title="Ajuda e Suporte" back="/profile" />
      <div className="flex-1 overflow-y-auto bg-muted/20 pb-10">
        
        <div className="bg-primary px-5 py-8 text-white rounded-b-3xl shadow-md">
          <h2 className="text-xl font-bold mb-2">Como podemos ajudar?</h2>
          <p className="text-sm text-primary-foreground/80">
            Encontre respostas rápidas ou entre em contato com nossa equipe.
          </p>
        </div>

        <div className="px-5 mt-6 space-y-3">
          <button className="w-full bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl p-4 flex items-center gap-4 hover:bg-[#25D366]/20 transition-colors text-left shadow-sm">
            <div className="h-10 w-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-sm">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-[#128C7E]">Atendimento via WhatsApp</div>
              <div className="text-xs text-[#128C7E]/80 mt-0.5">Resposta em até 5 minutos</div>
            </div>
          </button>
          
          <SupportOption icon={HelpCircle} title="Dúvidas Frequentes" subtitle="Respostas para as perguntas comuns" />
        </div>

        <div className="px-5 mt-8 space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Problemas Específicos</h3>
          <div className="bg-background border border-border rounded-2xl divide-y divide-border shadow-sm overflow-hidden">
            <IssueItem icon={AlertCircle} title="Problemas com uma entrega" />
            <IssueItem icon={CreditCard} title="Problemas com pagamento ou repasse" />
            <IssueItem icon={Lock} title="Problemas com acesso à conta" />
            <IssueItem icon={Bug} title="Reportar erro no aplicativo" />
          </div>
        </div>

        <div className="px-5 mt-8">
          <h3 className="text-sm font-bold mb-3">Enviar uma mensagem</h3>
          <div className="bg-background rounded-2xl border border-border p-4 shadow-sm">
            <textarea 
              className="w-full bg-muted/30 border border-border rounded-xl p-3 text-sm resize-none h-32 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/60"
              placeholder="Descreva detalhadamente o seu problema ou dúvida..."
            ></textarea>
            <Button className="w-full h-11 mt-4 rounded-xl font-semibold shadow-sm">
              Enviar solicitação
            </Button>
          </div>
        </div>

      </div>
    </MobileFrame>
  );
}

function SupportOption({ icon: Icon, title, subtitle }: any) {
  return (
    <button className="w-full bg-background border border-border rounded-xl p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors text-left shadow-sm">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{subtitle}</div>
      </div>
    </button>
  );
}

function IssueItem({ icon: Icon, title }: any) {
  return (
    <button className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-muted/30 transition-colors text-left">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="flex-1 text-sm font-medium">{title}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
    </button>
  );
}
