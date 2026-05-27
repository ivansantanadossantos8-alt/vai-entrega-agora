import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { TabBar } from "@/components/TabBar";
import { Store, Clock, PackageX, UserX, MapPinned, AlertTriangle, CreditCard, HeadphonesIcon, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/support")({
  component: Support,
});

const items = [
  { icon: Store, title: "Problema na loja", sub: "Loja fechada, recusou pedido" },
  { icon: Clock, title: "Loja demorando", sub: "Tempo de espera longo" },
  { icon: PackageX, title: "Pedido não encontrado", sub: "Loja não localizou pedido" },
  { icon: UserX, title: "Cliente não encontrado", sub: "Não consigo localizar o cliente" },
  { icon: MapPinned, title: "Endereço incorreto", sub: "Endereço de entrega errado" },
  { icon: CreditCard, title: "Problema com pagamento", sub: "Dúvidas sobre repasse" },
  { icon: HeadphonesIcon, title: "Falar com suporte", sub: "Atendimento humano" },
];

function Support() {
  return (
    <MobileFrame>
      <ScreenHeader title="Suporte" subtitle="Como podemos ajudar?" />
      <div className="px-5 py-4 flex-1 overflow-y-auto">
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center gap-2 text-destructive font-semibold text-sm">
            <AlertTriangle className="h-5 w-5" />
            Emergência
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            Use apenas em caso de acidente, risco ou situação grave durante a entrega.
          </p>
          <button className="mt-3 w-full h-11 rounded-xl bg-destructive text-destructive-foreground font-semibold text-sm">
            Acionar suporte emergencial
          </button>
        </div>

        <div className="mt-5 space-y-2">
          {items.map((i) => {
            const Icon = i.icon;
            return (
              <button
                key={i.title}
                className="w-full flex items-center gap-3 rounded-2xl border border-border p-4 text-left"
              >
                <div className="h-10 w-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{i.title}</div>
                  <div className="text-xs text-muted-foreground">{i.sub}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>
      <TabBar />
    </MobileFrame>
  );
}
