import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Loader2 } from "lucide-react";
import courier from "@/assets/courier-hero.png";
import { useAuth } from "@/lib/auth";
import { useState, useEffect } from "react";

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
  const { signIn, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (!authLoading && user) {
      navigate({ to: "/home" });
    }
  }, [user, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      if (signInError.message.includes("Invalid login")) {
        setError("E-mail ou senha incorretos.");
      } else {
        setError(signInError.message);
      }
      setLoading(false);
    } else {
      navigate({ to: "/home" });
    }
  };

  return (
    <MobileFrame>
      <div className="px-6 pt-10 pb-8 flex flex-col items-center text-center gap-4">
        <Logo size="md" />
        <img src={courier} alt="Entregador" width={220} height={220} className="mt-2" />
      </div>

      <form onSubmit={handleLogin} className="px-6 flex-1 flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input 
            id="email" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@email.com" 
            className="h-12 rounded-xl" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="senha">Senha</Label>
          <Input 
            id="senha" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            className="h-12 rounded-xl" 
          />
          <button type="button" className="text-xs text-primary font-medium ml-auto block">
            Esqueci minha senha
          </button>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-base font-semibold">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Entrar"}
        </Button>

        <Link to="/signup" className="block">
          <Button type="button" variant="outline" className="w-full h-12 rounded-xl text-base font-semibold border-primary/30 text-primary hover:bg-primary-soft">
            Criar conta
          </Button>
        </Link>

        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-4 pb-6">
          <Shield className="h-3.5 w-3.5" />
          Ambiente seguro e criptografado
        </div>
      </form>
    </MobileFrame>
  );
}
