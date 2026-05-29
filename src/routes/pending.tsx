import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock } from "lucide-react";

export const Route = createFileRoute("/pending")({
  component: Pending,
});

const checks = [
  "Dados pessoais enviados",
  "Foto de segurança enviada",
  "Veículo cadastrado",
];

function Pending() {
  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col px-6 pt-12 pb-6">
        <div className="mx-auto h-20 w-20 rounded-full bg-primary-soft flex items-center justify-center">
          <Clock className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mt-5 text-center text-2xl font-bold">Cadastro em análise</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground leading-relaxed">
          Estamos verificando seus dados para garantir mais segurança para clientes, lojas e
          entregadores.
        </p>

        <div className="mt-6 rounded-2xl border border-border divide-y divide-border">
          {checks.map((c) => (
            <div key={c} className="flex items-center gap-3 px-4 py-3">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <span className="text-sm">{c}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 inline-flex self-center items-center gap-2 rounded-full bg-warning/15 px-4 py-1.5 text-xs font-semibold text-warning-foreground">
          <span className="h-2 w-2 rounded-full bg-warning animate-pulse" />
          Aguardando aprovação
        </div>

        <div className="mt-auto pt-6 space-y-2">
          <Link to="/home" className="block">
            <Button className="w-full h-12 rounded-xl">Acompanhar status</Button>
          </Link>
          <Link to="/support" className="block">
            <Button variant="outline" className="w-full h-12 rounded-xl">
              Falar com suporte
            </Button>
          </Link>
        </div>
      </div>
    </MobileFrame>
  );
}
