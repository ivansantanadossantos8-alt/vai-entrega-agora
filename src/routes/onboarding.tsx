import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ClipboardList, Clock, CheckCircle2, Truck, Wallet } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

const steps = [
  { icon: ClipboardList, title: "Faça seu cadastro", text: "Informe seus dados, documentos e veículo." },
  { icon: Clock, title: "Aguarde a análise", text: "Verificamos suas informações com segurança." },
  { icon: CheckCircle2, title: "Fique disponível", text: "Receba entregas na sua região." },
  { icon: Truck, title: "Aceite corridas", text: "Veja valor, distância e bairro antes de aceitar." },
  { icon: Wallet, title: "Receba seus ganhos", text: "Repasses organizados pela plataforma." },
];

function Onboarding() {
  const [agree, setAgree] = useState(false);
  return (
    <MobileFrame>
      <ScreenHeader title="Apresentação" back="/" />
      <div className="px-6 py-6 flex-1 overflow-y-auto">
        <h2 className="text-2xl font-bold leading-tight">
          Entregue com o <span className="text-primary">Vai Até Você</span>
        </h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Faça entregas na sua cidade, acompanhe seus ganhos pelo aplicativo e receba seus
          repasses de forma organizada pela plataforma.
        </p>

        <ol className="mt-6 space-y-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={i} className="flex gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {i + 1}. {s.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.text}</div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 rounded-2xl bg-muted p-4">
          <div className="text-xs font-semibold mb-2">Você vai precisar de:</div>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
            <li>Documento pessoal e CPF</li>
            <li>Foto do rosto e CNH (moto/carro)</li>
            <li>Foto do veículo e da bag</li>
            <li>Chave Pix e região de atuação</li>
          </ul>
        </div>

        <label className="mt-6 flex items-start gap-3 cursor-pointer">
          <Checkbox checked={agree} onCheckedChange={(v) => setAgree(!!v)} className="mt-0.5" />
          <span className="text-xs text-muted-foreground leading-relaxed">
            Li e concordo com os <span className="text-primary font-medium">Termos de Uso</span>,
            <span className="text-primary font-medium"> Política de Privacidade</span> e
            <span className="text-primary font-medium"> Regras para Entregadores</span>.
          </span>
        </label>
      </div>
      <div className="px-6 py-4 border-t border-border bg-background">
        <Link to="/register" className="block">
          <Button disabled={!agree} className="w-full h-12 rounded-xl text-base font-semibold">
            Começar cadastro
          </Button>
        </Link>
      </div>
    </MobileFrame>
  );
}
