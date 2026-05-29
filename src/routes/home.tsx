import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { TabBar } from "@/components/TabBar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Bell, MapPin, Star, Clock, Package, Wallet, AlertCircle, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: Home,
});

function Home() {
  const [online, setOnline] = useState(true);
  return (
    <MobileFrame>
      <header className="px-5 pt-6 pb-4 flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-primary-soft flex items-center justify-center font-bold text-primary">
          V
        </div>
        <div className="flex-1">
          <div className="text-xs text-muted-foreground">Olá,</div>
          <div className="text-base font-semibold leading-tight">Victor</div>
        </div>
        <button className="relative h-10 w-10 rounded-full bg-muted flex items-center justify-center">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-destructive" />
        </button>
      </header>

      <div className="px-5 flex-1 overflow-y-auto pb-6">
        {/* Status card */}
        <div
          className={`rounded-3xl p-5 text-center shadow-elevated ${
            online
              ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
              : "bg-muted"
          }`}
        >
          <div className="mx-auto h-16 w-16 rounded-full bg-white/15 flex items-center justify-center">
            <Package className={`h-8 w-8 ${online ? "text-white" : "text-primary"}`} />
          </div>
          <h2 className="mt-3 text-xl font-bold">
            {online ? "Você está disponível" : "Você está offline"}
          </h2>
          <p className={`mt-1 text-sm ${online ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
            {online
              ? "Aguardando novas entregas próximas de você."
              : "Fique disponível para começar a receber entregas."}
          </p>
          <Button
            onClick={() => setOnline(!online)}
            className={`mt-4 w-full h-12 rounded-xl font-semibold ${
              online
                ? "bg-white text-primary hover:bg-white/90"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {online ? "Ficar indisponível" : "Ficar disponível"}
          </Button>
        </div>

        {/* Today summary */}
        <div className="mt-5">
          <div className="text-sm font-semibold mb-2">Resumo de hoje</div>
          <div className="grid grid-cols-2 gap-3">
            <Stat icon={Package} label="Entregas" value="5" />
            <Stat icon={Wallet} label="Ganhos" value="R$ 48,50" />
            <Stat icon={Clock} label="Online" value="3h 20m" />
            <Stat icon={Star} label="Avaliação" value="4,8" />
          </div>
        </div>

        {/* Mock new delivery */}
        {online && (
          <Link to="/delivery/new" className="block mt-5">
            <div className="rounded-2xl border border-primary/20 bg-primary-soft p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">Nova entrega disponível</div>
                <div className="text-xs text-muted-foreground">La Brasa Burger · 4,2 km · R$ 8,50</div>
              </div>
              <span className="text-xs font-bold text-primary">45s</span>
            </div>
          </Link>
        )}

        {/* Notices */}
        <div className="mt-5 space-y-2">
          <Notice icon={MapPin} text="Mantenha a localização ativa para receber entregas." />
          <Notice icon={ShieldCheck} text="Dirija com segurança e respeite o trânsito." />
          <Notice icon={AlertCircle} text="Confirme os códigos corretamente." />
        </div>
      </div>

      <TabBar />
    </MobileFrame>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border p-4">
      <Icon className="h-4 w-4 text-primary" />
      <div className="mt-2 text-lg font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Notice({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
      <Icon className="h-4 w-4 text-primary shrink-0" />
      <span className="text-xs text-muted-foreground">{text}</span>
    </div>
  );
}
