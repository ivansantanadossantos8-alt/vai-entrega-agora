import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import courier from "@/assets/courier-hero.png";

export const Route = createFileRoute("/")({
  component: Login,
  head: () => ({
    meta: [
      { title: "Entrar — Vai Até Você Entregador" },
      { name: "description", content: "Acesse sua conta de entregador parceiro Vai Até Você." },
    ],
  }),
});

function Login() {
  return (
    <MobileFrame>
      <div className="px-6 pt-10 pb-8 flex flex-col items-center text-center gap-4">
        <Logo size="md" />
        <img src={courier} alt="Entregador" width={220} height={220} className="mt-2" />
      </div>

      <form className="px-6 flex-1 flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail ou telefone</Label>
          <Input id="email" placeholder="seuemail@email.com" className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="senha">Senha</Label>
          <Input id="senha" type="password" placeholder="••••••••" className="h-12 rounded-xl" />
          <button type="button" className="text-xs text-primary font-medium ml-auto block">
            Esqueci minha senha
          </button>
        </div>

        <Link to="/home" className="block">
          <Button className="w-full h-12 rounded-xl text-base font-semibold">Entrar</Button>
        </Link>
        <Link to="/signup" className="block">
          <Button variant="outline" className="w-full h-12 rounded-xl text-base font-semibold border-primary/30 text-primary hover:bg-primary-soft">
            Criar conta
          </Button>
        </Link>
        <button type="button" className="h-12 rounded-xl border border-border text-sm font-medium flex items-center justify-center gap-2">
          <span className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500" />
          Continuar com Google
        </button>

        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-4 pb-6">
          <Shield className="h-3.5 w-3.5" />
          Ambiente seguro e criptografado
        </div>
      </form>
    </MobileFrame>
  );
}
