import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signup")({
  component: Signup,
  head: () => ({
    meta: [
      { title: "Criar Conta — Vai Até Você Entregador" },
      { name: "description", content: "Crie sua conta de entregador parceiro." },
    ],
  }),
});

function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/onboarding" });
  };

  return (
    <MobileFrame>
      <div className="px-6 pt-10 pb-6 flex flex-col items-center text-center gap-4">
        <Logo size="md" />
        <h1 className="text-2xl font-bold text-primary mt-2">Criar nova conta</h1>
        <p className="text-sm text-muted-foreground">
          Preencha os dados abaixo para iniciar seu cadastro de entregador.
        </p>
      </div>

      <form onSubmit={handleSignup} className="px-6 flex-1 flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail ou telefone</Label>
          <Input id="email" required placeholder="seuemail@email.com ou (11) 99999-9999" className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="senha">Senha</Label>
          <Input id="senha" type="password" required placeholder="••••••••" className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="repete_senha">Repita a Senha</Label>
          <Input id="repete_senha" type="password" required placeholder="••••••••" className="h-12 rounded-xl" />
        </div>

        <div className="mt-4">
          <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold">
            Criar sua conta
          </Button>
        </div>
        
        <Link to="/" className="block mt-2">
          <Button type="button" variant="ghost" className="w-full h-12 rounded-xl text-sm font-medium text-muted-foreground">
            Já tenho conta. Fazer login.
          </Button>
        </Link>
      </form>
    </MobileFrame>
  );
}
