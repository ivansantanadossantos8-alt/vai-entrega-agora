import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CheckCircle2, MapPin, Store, User, Navigation, Phone } from "lucide-react";

export const Route = createFileRoute("/delivery/active")({
  component: ActiveDelivery,
});

type Stage = "to_store" | "at_store" | "picked" | "to_client" | "at_client" | "done";

function ActiveDelivery() {
  const [stage, setStage] = useState<Stage>("to_store");
  const [code, setCode] = useState("");

  return (
    <MobileFrame>
      <ScreenHeader title={titleFor(stage)} back="/home" />

      <div className="flex-1 overflow-y-auto">
        <div className="h-48 bg-muted relative">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <path d="M30,170 Q150,30 370,130" fill="none" stroke="oklch(0.58 0.22 260)" strokeWidth="5" strokeLinecap="round" strokeDasharray="3 10" />
          </svg>
          <div className="absolute top-4 left-4 h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-elevated">
            <Store className="h-4 w-4" />
          </div>
          <div className="absolute bottom-4 right-4 h-9 w-9 rounded-full bg-foreground text-background flex items-center justify-center shadow-elevated">
            <User className="h-4 w-4" />
          </div>
        </div>

        <div className="px-5 py-5 space-y-4">
          <StageBadge stage={stage} />

          {(stage === "to_store" || stage === "at_store" || stage === "picked") && (
            <Card>
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                  <Store className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold">La Brasa Burger</div>
                  <div className="text-xs text-muted-foreground">Rua A, 123 — Centro</div>
                  <div className="text-xs text-muted-foreground mt-1">Pedido #4821 · João Silva</div>
                </div>
              </div>
            </Card>
          )}

          {(stage === "to_client" || stage === "at_client") && (
            <Card>
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold">João Silva</div>
                  <div className="text-xs text-muted-foreground">Rua das Flores, 456 — São Jorge</div>
                  <div className="text-xs text-muted-foreground mt-1">Ref.: Casa azul</div>
                </div>
                <button className="h-9 w-9 rounded-full bg-primary-soft text-primary flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </button>
              </div>
            </Card>
          )}

          {stage === "at_store" && (
            <Card>
              <div className="text-xs text-muted-foreground text-center">Código de retirada</div>
              <div className="mt-1 text-center text-4xl font-bold tracking-[0.4em] text-primary">4821</div>
              <div className="mt-2 text-xs text-center text-muted-foreground">
                Informe o código para a loja liberar o pedido.
              </div>
            </Card>
          )}

          {stage === "at_client" && (
            <Card>
              <div className="text-xs font-semibold mb-2">Código de entrega</div>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Digite o código do cliente"
                className="h-12 rounded-xl text-center text-lg tracking-widest font-bold"
              />
            </Card>
          )}

          {stage === "done" && (
            <div className="text-center py-6">
              <div className="mx-auto h-20 w-20 rounded-full bg-success/15 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <h2 className="mt-4 text-xl font-bold">Entrega concluída!</h2>
              <p className="text-sm text-muted-foreground">Boa corrida, Victor.</p>
              <div className="mt-5 rounded-2xl border border-border p-4 text-left">
                <RowKV k="Valor recebido" v="R$ 8,50" highlight />
                <RowKV k="Tempo total" v="32 min" />
                <RowKV k="Distância" v="4,2 km" />
                <RowKV k="Saldo atualizado" v="R$ 195,00" />
              </div>
            </div>
          )}

          {stage !== "done" && (
            <div className="space-y-2">
              <Button className="w-full h-12 rounded-xl gap-2">
                <Navigation className="h-4 w-4" />
                Abrir no mapa
              </Button>
              <button className="w-full h-11 rounded-xl text-sm text-muted-foreground border border-border">
                Problema na rota
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 py-4 border-t border-border bg-background space-y-2">
        {stage === "to_store" && (
          <Button onClick={() => setStage("at_store")} className="w-full h-12 rounded-xl font-semibold">
            Cheguei na loja
          </Button>
        )}
        {stage === "at_store" && (
          <Button onClick={() => setStage("picked")} className="w-full h-12 rounded-xl font-semibold">
            Pedido retirado
          </Button>
        )}
        {stage === "picked" && (
          <Button onClick={() => setStage("to_client")} className="w-full h-12 rounded-xl font-semibold">
            Saiu para entrega
          </Button>
        )}
        {stage === "to_client" && (
          <Button onClick={() => setStage("at_client")} className="w-full h-12 rounded-xl font-semibold">
            Cheguei no destino
          </Button>
        )}
        {stage === "at_client" && (
          <Button onClick={() => setStage("done")} className="w-full h-12 rounded-xl font-semibold">
            Finalizar entrega
          </Button>
        )}
        {stage === "done" && (
          <Link to="/home" className="block">
            <Button className="w-full h-12 rounded-xl font-semibold">Voltar ao início</Button>
          </Link>
        )}
      </div>
    </MobileFrame>
  );
}

function titleFor(s: Stage) {
  return {
    to_store: "Indo para a loja",
    at_store: "Aguardando retirada",
    picked: "Pedido retirado",
    to_client: "A caminho do cliente",
    at_client: "Confirme a entrega",
    done: "Entrega finalizada",
  }[s];
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-border p-4">{children}</div>;
}

function StageBadge({ stage }: { stage: Stage }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
      <MapPin className="h-3 w-3" />
      {titleFor(stage)}
    </div>
  );
}

function RowKV({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs text-muted-foreground">{k}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-primary text-base" : ""}`}>{v}</span>
    </div>
  );
}
