import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { TabBar } from "@/components/TabBar";
import { useState } from "react";

export const Route = createFileRoute("/deliveries")({
  component: Deliveries,
});

const tabs = ["Disponíveis", "Em andamento", "Histórico"] as const;

const available = [
  { name: "Pizza Prime", bairro: "Centro", km: "3,2 km", val: "R$ 7,50" },
  { name: "Sushi House", bairro: "Vila Nova", km: "4,5 km", val: "R$ 9,00" },
  { name: "Mercado Bom Preço", bairro: "São Jorge", km: "2,1 km", val: "R$ 6,80" },
  { name: "Lanchonete do Zé", bairro: "Jardim", km: "3,9 km", val: "R$ 8,20" },
];

const ongoing = [
  { stage: "Indo para a loja", store: "La Brasa Burger" },
  { stage: "Aguardando pedido", store: "Sushi House" },
];

const history = [
  { name: "La Brasa Burger", date: "Hoje 12:40", val: "R$ 8,50", status: "Concluída" },
  { name: "Sushi House", date: "Hoje 11:20", val: "R$ 9,50", status: "Concluída" },
  { name: "Mercado Bom Preço", date: "Ontem 18:30", val: "R$ 6,80", status: "Cancelada" },
];

function Deliveries() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Disponíveis");
  return (
    <MobileFrame>
      <ScreenHeader title="Entregas" />
      <div className="px-5 pt-3">
        <div className="flex gap-1 rounded-xl bg-muted p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 h-9 rounded-lg text-xs font-semibold transition-colors ${
                tab === t ? "bg-background shadow-card text-foreground" : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-4 flex-1 overflow-y-auto space-y-3">
        {tab === "Disponíveis" &&
          available.map((d) => (
            <Link key={d.name} to="/delivery/new" className="block">
              <div className="rounded-2xl border border-border p-4 flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary font-bold flex items-center justify-center">
                  {d.name[0]}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.bairro} · {d.km}</div>
                </div>
                <div className="text-sm font-bold text-primary">{d.val}</div>
              </div>
            </Link>
          ))}

        {tab === "Em andamento" &&
          ongoing.map((d) => (
            <Link key={d.store} to="/delivery/active" className="block">
              <div className="rounded-2xl border border-border p-4">
                <div className="text-xs text-primary font-semibold">{d.stage}</div>
                <div className="text-sm font-semibold mt-1">{d.store}</div>
              </div>
            </Link>
          ))}

        {tab === "Histórico" &&
          history.map((d, i) => (
            <div key={i} className="rounded-2xl border border-border p-4 flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-muted font-bold flex items-center justify-center">
                {d.name[0]}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.date}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{d.val}</div>
                <div
                  className={`text-[10px] font-semibold ${
                    d.status === "Concluída" ? "text-success" : "text-destructive"
                  }`}
                >
                  {d.status}
                </div>
              </div>
            </div>
          ))}
      </div>

      <TabBar />
    </MobileFrame>
  );
}
