import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { DeliveryMapOSM } from "@/components/DeliveryMapOSM";
import { Navigation, Play, CheckCircle2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/delivery/active")({
  component: DeliveryRoute,
});

function DeliveryRoute() {
  const [routeData, setRouteData] = useState<{ distance: number; duration: number } | null>(null);
  const [routeError, setRouteError] = useState(false);
  const [status, setStatus] = useState<"pending" | "started" | "finished">("pending");

  // Mock data as requested
  const origin = { lat: -23.5505, lng: -46.6333 }; // Loja
  const destination = { lat: -23.5615, lng: -46.6550 }; // Cliente
  const clientName = "João Silva";
  const deliveryAddress = "Rua das Flores, 456 — São Jorge";

  // When route is calculated by OSRM
  const handleRouteCalculated = (data: any) => {
    setRouteData({
      distance: data.distance,
      duration: data.duration,
    });
    setRouteError(false);
  };

  const handleRouteError = () => {
    setRouteError(true);
  };

  const handleOpenRoute = () => {
    // Opens native maps (Google Maps / Waze) using geo intent
    window.open(`geo:${destination.lat},${destination.lng}?q=${destination.lat},${destination.lng}`, "_blank");
  };

  if (status === "finished") {
    return (
      <MobileFrame>
        <ScreenHeader title="Entrega finalizada" back="/home" />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-success/15 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Entrega concluída!</h2>
          <p className="text-muted-foreground mb-8">Bom trabalho. O valor já foi adicionado aos seus ganhos.</p>
          <Link to="/home" className="w-full block">
            <Button className="w-full h-12 rounded-xl text-lg font-bold">Voltar para o início</Button>
          </Link>
        </div>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <ScreenHeader title="Rota da Entrega" back="/home" />
      
      {/* Map Area */}
      <div className="flex-1 relative bg-muted z-0">
        <DeliveryMapOSM 
          origin={origin}
          destination={destination}
          onRouteCalculated={handleRouteCalculated}
          onRouteError={handleRouteError}
        />
        
        {routeError && (
          <div className="absolute top-4 left-4 right-4 bg-destructive/90 text-destructive-foreground p-3 rounded-lg shadow-lg flex items-start gap-3 z-[1000] animate-in slide-in-from-top-2">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <div className="text-sm font-medium">
              Não foi possível calcular a rota. Verifique o endereço da entrega.
            </div>
          </div>
        )}
      </div>

      {/* Floating Card */}
      <div className="bg-background rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-5 z-10 relative">
        <div className="mx-auto h-1.5 w-12 rounded-full bg-muted mb-4" />
        
        <div className="mb-4">
          <h2 className="text-lg font-bold text-foreground">{clientName}</h2>
          <p className="text-sm text-muted-foreground">{deliveryAddress}</p>
        </div>

        {/* Route Info */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-muted/50 rounded-xl p-3 border border-border">
            <div className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Distância</div>
            <div className="text-lg font-black text-primary">
              {routeData ? `${(routeData.distance / 1000).toFixed(1)} km` : "..."}
            </div>
          </div>
          <div className="bg-muted/50 rounded-xl p-3 border border-border">
            <div className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Tempo Est.</div>
            <div className="text-lg font-black text-primary">
              {routeData ? `${Math.ceil(routeData.duration / 60)} min` : "..."}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            onClick={handleOpenRoute}
            className="w-full h-12 rounded-xl font-bold border-2 gap-2"
          >
            <Navigation className="h-5 w-5" />
            Abrir rota
          </Button>

          {status === "pending" ? (
            <Button 
              onClick={() => setStatus("started")}
              className="w-full h-12 rounded-xl font-bold bg-primary text-primary-foreground shadow-elevated gap-2"
            >
              <Play className="h-5 w-5" />
              Iniciar entrega
            </Button>
          ) : (
            <Button 
              onClick={() => setStatus("finished")}
              className="w-full h-12 rounded-xl font-bold bg-success hover:bg-success/90 text-white shadow-elevated gap-2"
            >
              <CheckCircle2 className="h-5 w-5" />
              Finalizar entrega
            </Button>
          )}
        </div>
      </div>
    </MobileFrame>
  );
}
