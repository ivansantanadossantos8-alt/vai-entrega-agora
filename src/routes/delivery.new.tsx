import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Route as RouteIcon, Wallet, X } from "lucide-react";
import { DeliveryMapOSM } from "@/components/DeliveryMapOSM";

export const Route = createFileRoute("/delivery/new")({
  component: NewDelivery,
});

function NewDelivery() {
  const [routeData, setRouteData] = useState<{ distance: number; duration: number } | null>(null);

  const handleRouteCalculated = (data: any) => {
    setRouteData({
      distance: data.distance,
      duration: data.duration,
    });
  };

  return (
    <MobileFrame>
      <div className="absolute inset-0 w-full h-full bg-muted z-0">
        <DeliveryMapOSM 
          origin={{ lat: -23.5505, lng: -46.6333 }} 
          destination={{ lat: -23.5615, lng: -46.6550 }} 
          onRouteCalculated={handleRouteCalculated}
        />
      </div>

      <Link
        to="/home"
        className="absolute top-4 right-4 h-9 w-9 z-20 rounded-full bg-white shadow-elevated flex items-center justify-center text-foreground"
      >
        <X className="h-4 w-4" />
      </Link>

      <div className="absolute inset-x-0 top-[40vh] bottom-0 bg-background rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] z-10 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-36">
          <div className="mx-auto h-1 w-12 rounded-full bg-border mb-4" />
          
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Nova entrega disponível
            </h2>
            <span className="text-xs font-bold text-white bg-primary px-2.5 py-1 rounded-full">45s</span>
          </div>

          <div className="mt-4 rounded-2xl border border-border p-4 bg-primary-soft/30">
            <div className="text-base font-bold">La Brasa Burger</div>
            <div className="text-xs text-muted-foreground mb-3">Hamburgueria</div>
            
            <Row icon={MapPin} label="Retirada" value="Rua A, 123 — Centro" />
            <Row icon={MapPin} label="Entrega (Cliente)" value="Bairro São Jorge" />
            
            <div className="mt-4 pt-4 border-t border-border space-y-3">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Trechos da Rota</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5"><RouteIcon className="h-3.5 w-3.5 text-muted-foreground" /> Até a loja</span>
                <div className="text-right">
                  <span className="font-bold">1,2 km</span>
                  <span className="text-xs text-muted-foreground block">~5 min</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5"><RouteIcon className="h-3.5 w-3.5 text-muted-foreground" /> Loja até cliente</span>
                <div className="text-right">
                  <span className="font-bold">3,0 km</span>
                  <span className="text-xs text-muted-foreground block">~20 min</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
              <Mini icon={RouteIcon} v={routeData ? `${(routeData.distance / 1000).toFixed(1)} km` : "4,2 km"} l="Total" />
              <Mini icon={Clock} v={routeData ? `${Math.ceil(routeData.duration / 60)} min` : "25 min"} l="Tempo" />
              <Mini icon={Wallet} v="R$ 8,50" l="Valor" />
            </div>
          </div>
        </div>

        {/* Fixed action buttons at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 z-50 shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">
          <Link to="/delivery/active" className="block">
            <Button className="w-full h-12 rounded-xl text-base font-semibold shadow-elevated">
              Aceitar entrega
            </Button>
          </Link>
          <Link to="/home" className="block mt-2">
            <Button variant="ghost" className="w-full h-11 rounded-xl text-muted-foreground hover:bg-muted/50">
              Recusar
            </Button>
          </Link>
        </div>
      </div>
    </MobileFrame>
  );
}

function Row({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-2 mt-2.5">
      <Icon className="h-4 w-4 text-primary mt-0.5" />
      <div>
        <div className="text-[11px] text-muted-foreground uppercase tracking-wide">{label}</div>
        <div className="text-sm font-medium leading-tight">{value}</div>
      </div>
    </div>
  );
}

function Mini({ icon: Icon, v, l }: any) {
  return (
    <div className="text-center bg-background rounded-xl p-2 border border-border">
      <Icon className="h-4 w-4 text-primary mx-auto" />
      <div className="text-sm font-bold mt-1">{v}</div>
      <div className="text-[10px] text-muted-foreground">{l}</div>
    </div>
  );
}
