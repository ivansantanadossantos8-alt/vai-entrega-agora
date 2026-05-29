import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { TabBar } from "@/components/TabBar";
import { useState, useEffect } from "react";
import { 
  List, History, MapPin, Store, 
  CheckCircle2, XCircle, Clock, ChevronRight, 
  PackageOpen, Banknote
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/deliveries")({
  component: Deliveries,
});

const tabs = [
  { id: "Disponíveis" as const, icon: List },
  { id: "Histórico" as const, icon: History }
];

type TabType = typeof tabs[number]["id"];

function Deliveries() {
  const [tab, setTab] = useState<TabType>("Disponíveis");
  const { user } = useAuth();
  const [available, setAvailable] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loadingAvailable, setLoadingAvailable] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Fetch and subscribe to available deliveries in real time
  useEffect(() => {
    const fetch = async () => {
      setLoadingAvailable(true);
      const { data } = await supabase
        .from("deliveries")
        .select("*")
        .eq("status", "available")
        .order("created_at", { ascending: false })
        .limit(20);

      setAvailable(data || []);
      setLoadingAvailable(false);
    };
    
    fetch();

    // Subscribe to real-time changes on deliveries table
    const subscription = supabase
      .channel("realtime-available-deliveries")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "deliveries" },
        (payload) => {
          const { eventType, new: newRow, old: oldRow } = payload;
          
          if (eventType === "INSERT") {
            if (newRow.status === "available") {
              setAvailable((prev) => [newRow, ...prev]);
            }
          } else if (eventType === "DELETE") {
            setAvailable((prev) => prev.filter((d) => d.id !== oldRow.id));
          } else if (eventType === "UPDATE") {
            if (newRow.status === "available") {
              setAvailable((prev) => {
                const exists = prev.some((d) => d.id === newRow.id);
                if (exists) {
                  return prev.map((d) => (d.id === newRow.id ? newRow : d));
                } else {
                  return [newRow, ...prev].sort(
                    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                  );
                }
              });
            } else {
              // Status changed (e.g. accepted), remove from available list
              setAvailable((prev) => prev.filter((d) => d.id !== newRow.id));
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // Fetch history
  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      setLoadingHistory(true);
      const { data } = await supabase
        .from("deliveries")
        .select("*")
        .eq("courier_id", user.id)
        .in("status", ["completed", "cancelled"])
        .order("completed_at", { ascending: false })
        .limit(20);

      setHistory(data || []);
      setLoadingHistory(false);
    };
    fetch();
  }, [user]);

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
        {tab === "Disponíveis" && (
          loadingAvailable ? (
            <div className="text-center py-10 text-sm text-muted-foreground">Carregando entregas...</div>
          ) : available.length === 0 ? (
            <div className="text-center py-10">
              <Store className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
              <div className="text-sm font-semibold text-muted-foreground">Nenhuma entrega disponível</div>
              <div className="text-xs text-muted-foreground/70 mt-1">Novas entregas aparecerão aqui.</div>
            </div>
          ) : available.map((d, idx) => (
            <Link key={d.id || idx} to="/delivery/new" className="block animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${idx * 50}ms`, fillMode: 'both' as any }}>
              <div className="rounded-2xl bg-background border border-border shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden transition-all hover:border-primary/30 active:scale-[0.98]">
                <div className="p-4 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/10">
                    <Store className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="text-sm font-bold truncate">{d.store_name}</div>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{d.pickup_address}</span>
                      <span className="text-muted-foreground/30">•</span>
                      <span className="font-semibold text-foreground/70">
                        {d.distance_to_store ? `${Number(d.distance_to_store).toFixed(1)} km` : "--"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-black text-primary tracking-tight">
                      R$ {Number(d.price).toFixed(2).replace(".", ",")}
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 bg-muted/20 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-500/10 px-2.5 py-1 rounded-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> Disponível
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-primary">
                    Detalhes <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}

        {/* TAB: HISTÓRICO */}
        {tab === "Histórico" && (
          loadingHistory ? (
            <div className="text-center py-10 text-sm text-muted-foreground">Carregando histórico...</div>
          ) : history.length === 0 ? (
            <div className="text-center py-10">
              <History className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
              <div className="text-sm font-semibold text-muted-foreground">Nenhuma entrega concluída ainda</div>
              <div className="text-xs text-muted-foreground/70 mt-1">Suas entregas finalizadas aparecerão aqui.</div>
            </div>
          ) : history.map((d, i) => {
            const isCompleted = d.status === "completed";
            const date = d.completed_at ? new Date(d.completed_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "--";
            
            return (
              <div key={d.id || i} className="rounded-2xl bg-background border border-border p-4 flex items-center gap-4 shadow-sm">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${isCompleted ? 'bg-green-500/10 text-green-600' : 'bg-destructive/10 text-destructive'}`}>
                  {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">{d.store_name}</div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                    <Clock className="h-3 w-3" /> {date}
                  </div>
                </div>
                
                <div className="text-right shrink-0">
                  <div className={`text-sm font-black ${!isCompleted ? 'line-through text-muted-foreground opacity-50' : 'text-foreground'}`}>
                    R$ {Number(d.price).toFixed(2).replace(".", ",")}
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${isCompleted ? 'text-green-600' : 'text-destructive'}`}>
                    {isCompleted ? "Concluída" : "Cancelada"}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <TabBar />
    </MobileFrame>
  );
}
