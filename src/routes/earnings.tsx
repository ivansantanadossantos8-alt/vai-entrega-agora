import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { TabBar } from "@/components/TabBar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/earnings")({
  component: Earnings,
});

const history = [
  { store: "La Brasa Burger", date: "17/05 12:40", val: "R$ 8,50", status: "Disponível" },
  { store: "Sushi House", date: "17/05 11:20", val: "R$ 9,50", status: "Pendente" },
  { store: "Mercado Bom Preço", date: "16/05 19:10", val: "R$ 6,80", status: "Pago" },
  { store: "Padaria Pão Bom", date: "16/05 17:30", val: "R$ 7,20", status: "Pago" },
];

const statusColor: Record<string, string> = {
  Disponível: "bg-success/15 text-success",
  Pendente: "bg-warning/20 text-warning-foreground",
  Pago: "bg-muted text-muted-foreground",
};

function Earnings() {
  return (
    <MobileFrame>
      <ScreenHeader title="Ganhos" />
      <div className="px-5 py-4 flex-1 overflow-y-auto">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-5 shadow-elevated">
          <div className="text-xs opacity-85">Saldo disponível</div>
          <div className="text-3xl font-bold mt-1">R$ 186,50</div>
          <div className="mt-3 text-xs opacity-85">
            Próximo repasse: <span className="font-semibold">segunda-feira, 20/05</span>
          </div>
          <Button className="mt-4 w-full h-11 rounded-xl bg-white text-primary hover:bg-white/90">
            Ver histórico de repasses
          </Button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Mini label="Entregas" val="32" />
          <Mini label="Média/entrega" val="R$ 7,20" />
          <Mini label="Semana" val="R$ 230,50" />
          <Mini label="Pendente" val="R$ 48,00" />
        </div>

        <div className="mt-6">
          <div className="text-sm font-semibold mb-3">Histórico financeiro</div>
          <div className="rounded-2xl border border-border divide-y divide-border">
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-sm font-medium">{h.store}</div>
                  <div className="text-xs text-muted-foreground">{h.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{h.val}</div>
                  <span
                    className={`inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColor[h.status]}`}
                  >
                    {h.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TabBar />
    </MobileFrame>
  );
}

function Mini({ label, val }: { label: string; val: string }) {
  return (
    <div className="rounded-2xl border border-border p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-bold mt-1">{val}</div>
    </div>
  );
}
