import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

const pending = [
  { name: "Victor da Silva", cpf: "000.000.000-00", city: "São Paulo - SP", vehicle: "Moto · ABC1D23" },
  { name: "Carlos Oliveira", cpf: "111.111.111-11", city: "São Paulo - SP", vehicle: "Carro · XYZ1H87" },
  { name: "Bruno Santos", cpf: "222.222.222-22", city: "São Paulo - SP", vehicle: "Bicicleta" },
  { name: "João Ferreira", cpf: "333.333.333-33", city: "Osasco - SP", vehicle: "Moto · DEF4G56" },
];

function Admin() {
  return (
    <MobileFrame>
      <ScreenHeader title="Entregadores pendentes" back="/profile" />
      <div className="px-5 py-4 flex-1 overflow-y-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Buscar entregador..."
            className="w-full h-11 pl-9 pr-3 rounded-xl border border-border bg-background text-sm"
          />
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <Stat label="Pendentes" val="12" />
          <Stat label="Aprovados" val="184" />
          <Stat label="Recusados" val="7" />
        </div>

        <div className="mt-4 space-y-3">
          {pending.map((p) => (
            <div key={p.cpf} className="rounded-2xl border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary-soft text-primary font-bold flex items-center justify-center">
                  {p.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">CPF: {p.cpf}</div>
                  <div className="text-xs text-muted-foreground">{p.city} · {p.vehicle}</div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-warning/20 text-warning-foreground">
                  Pendente
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <Button size="sm" className="rounded-xl h-9 text-xs gap-1 bg-success hover:bg-success/90 text-success-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Aprovar
                </Button>
                <Button size="sm" variant="outline" className="rounded-xl h-9 text-xs gap-1 border-warning/40">
                  <AlertCircle className="h-3.5 w-3.5" /> Corrigir
                </Button>
                <Button size="sm" variant="outline" className="rounded-xl h-9 text-xs gap-1 border-destructive/40 text-destructive">
                  <XCircle className="h-3.5 w-3.5" /> Recusar
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Link to="/profile" className="block mt-5 text-center text-xs text-primary font-medium">
          Voltar
        </Link>
      </div>
    </MobileFrame>
  );
}

function Stat({ label, val }: { label: string; val: string }) {
  return (
    <div className="rounded-xl bg-muted py-2.5">
      <div className="text-base font-bold">{val}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}
