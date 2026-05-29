import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { TabBar } from "@/components/TabBar";
import { useState } from "react";
import { 
  List, Activity, History, MapPin, Store, 
  CheckCircle2, XCircle, Clock, ChevronRight, 
  Navigation2, PackageOpen, CreditCard, Banknote
} from "lucide-react";

export const Route = createFileRoute("/deliveries")({
  component: Deliveries,
});

const tabs = [
  { id: "Disponíveis", icon: List },
  { id: "Histórico", icon: History }
] as const;

type TabType = typeof tabs[number]["id"];

const available = [
  { name: "Pizza Prime", bairro: "Centro", km: "3,2 km", val: "R$ 7,50", tag: "Pronto para retirar", type: "pizza", payment: "online" },
  { name: "Sushi House", bairro: "Vila Nova", km: "4,5 km", val: "R$ 9,00", tag: "Pagamento na entrega", type: "food", payment: "cash" },
  { name: "Mercado Bom Preço", bairro: "São Jorge", km: "2,1 km", val: "R$ 6,80", tag: "Volumoso", type: "market", payment: "online" },
  { name: "Lanchonete do Zé", bairro: "Jardim", km: "3,9 km", val: "R$ 8,20", tag: "Pronto para retirar", type: "food", payment: "online" },
];



const history = [
  { dateHeader: "Hoje" },
  { name: "La Brasa Burger", date: "12:40", val: "R$ 8,50", status: "Concluída" },
  { name: "Sushi House", date: "11:20", val: "R$ 9,50", status: "Concluída" },
  { dateHeader: "Ontem" },
  { name: "Mercado Bom Preço", date: "18:30", val: "R$ 6,80", status: "Cancelada" },
];

function Deliveries() {
  const [tab, setTab] = useState<TabType>("Disponíveis");

  return (
    <MobileFrame>
      <ScreenHeader title="Entregas" />
      
      {/* Modern Tabs */}
      <div className="px-5 pt-4 pb-2 bg-background sticky top-[60px] z-10">
        <div className="flex gap-1 rounded-xl bg-muted/50 p-1 border border-border/50 shadow-inner">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 h-10 rounded-lg text-[11px] font-bold transition-all duration-200 ${
                  isActive 
                    ? "bg-white shadow-sm text-primary ring-1 ring-primary/10" 
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground/70'}`} />
                <span className="truncate">{t.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 py-4 flex-1 overflow-y-auto space-y-4 pb-24">
        
        {/* TAB: DISPONÍVEIS */}
        {tab === "Disponíveis" &&
          available.map((d, idx) => (
            <Link key={idx} to="/delivery/new" className="block animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${idx * 50}ms`, fillMode: 'both' }}>
              <div className="rounded-2xl bg-background border border-border shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden transition-all hover:border-primary/30 active:scale-[0.98]">
                {/* Header of Card */}
                <div className="p-4 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/10">
                    <Store className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="text-sm font-bold truncate">{d.name}</div>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{d.bairro}</span>
                      <span className="text-muted-foreground/30">•</span>
                      <span className="font-semibold text-foreground/70">{d.km}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-black text-primary tracking-tight">{d.val}</div>
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="px-4 py-3 bg-muted/20 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {d.tag === "Pronto para retirar" ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-500/10 px-2 py-1 rounded-md">
                        <PackageOpen className="h-3 w-3" /> Pronto
                      </span>
                    ) : d.tag === "Pagamento na entrega" ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-500/10 px-2 py-1 rounded-md">
                        <Banknote className="h-3 w-3" /> Dinheiro
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-md">
                        {d.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-primary">
                    Detalhes <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}


        {/* TAB: HISTÓRICO */}
        {tab === "Histórico" &&
          history.map((d, i) => {
            if (d.dateHeader) {
              return (
                <div key={i} className="text-xs font-bold text-muted-foreground uppercase tracking-widest pt-4 pb-1 pl-1">
                  {d.dateHeader}
                </div>
              );
            }
            
            const isCompleted = d.status === "Concluída";
            
            return (
              <div key={i} className="rounded-2xl bg-background border border-border p-4 flex items-center gap-4 shadow-sm">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${isCompleted ? 'bg-green-500/10 text-green-600' : 'bg-destructive/10 text-destructive'}`}>
                  {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">{d.name}</div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                    <Clock className="h-3 w-3" /> {d.date}
                  </div>
                </div>
                
                <div className="text-right shrink-0">
                  <div className={`text-sm font-black ${!isCompleted ? 'line-through text-muted-foreground opacity-50' : 'text-foreground'}`}>
                    {d.val}
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${isCompleted ? 'text-green-600' : 'text-destructive'}`}>
                    {d.status}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <TabBar />
    </MobileFrame>
  );
}
