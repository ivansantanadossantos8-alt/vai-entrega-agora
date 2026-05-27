import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Route as RouteIcon, Wallet, X } from "lucide-react";

export const Route = createFileRoute("/delivery/new")({
  component: NewDelivery,
});

function NewDelivery() {
  return (
    <MobileFrame>
      <div className="flex-1 bg-gradient-to-b from-primary-soft to-background relative">
        <Link
          to="/home"
          className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white shadow flex items-center justify-center"
        >
          <X className="h-4 w-4" />
        </Link>

        {/* Fake map */}
        <div className="h-64 mx-5 mt-12 rounded-3xl bg-muted relative overflow-hidden border border-border">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
            <path d="M20,180 Q80,120 140,140 T280,40" fill="none" stroke="oklch(0.58 0.22 260)" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 8" />
          </svg>
          <div className="absolute top-6 left-6 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-elevated">A</div>
          <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold shadow-elevated">B</div>
        </div>
      </div>

      <div className="bg-background rounded-t-3xl -mt-6 p-5 shadow-elevated relative z-10">
        <div className="mx-auto h-1 w-12 rounded-full bg-border" />
        <div className="mt-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Nova entrega disponível</h2>
          <span className="text-xs font-bold text-primary bg-primary-soft px-2.5 py-1 rounded-full">45s</span>
        </div>

        <div className="mt-4 rounded-2xl border border-border p-4">
          <div className="text-base font-bold">La Brasa Burger</div>
          <Row icon={MapPin} label="Retirada" value="Rua A, 123 — Centro" />
          <Row icon={MapPin} label="Entrega" value="Bairro São Jorge" />
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border">
            <Mini icon={RouteIcon} v="4,2 km" l="Total" />
            <Mini icon={Clock} v="25 min" l="Tempo" />
            <Mini icon={Wallet} v="R$ 8,50" l="Valor" />
          </div>
          <div className="mt-3 text-xs text-muted-foreground">Pagamento: <span className="font-medium text-foreground">Pago pelo app</span></div>
        </div>

        <Link to="/delivery/active" className="block mt-4">
          <Button className="w-full h-12 rounded-xl text-base font-semibold">
            Aceitar entrega
          </Button>
        </Link>
        <Link to="/home" className="block mt-2">
          <Button variant="ghost" className="w-full h-11 rounded-xl text-muted-foreground">
            Recusar
          </Button>
        </Link>
      </div>
    </MobileFrame>
  );
}

function Row({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-2 mt-2">
      <Icon className="h-4 w-4 text-primary mt-0.5" />
      <div>
        <div className="text-[11px] text-muted-foreground uppercase tracking-wide">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function Mini({ icon: Icon, v, l }: any) {
  return (
    <div className="text-center">
      <Icon className="h-4 w-4 text-primary mx-auto" />
      <div className="text-sm font-bold mt-1">{v}</div>
      <div className="text-[10px] text-muted-foreground">{l}</div>
    </div>
  );
}
