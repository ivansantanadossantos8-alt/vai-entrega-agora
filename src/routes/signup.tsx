import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

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
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    const { error: signUpError } = await signUp(email, password);

    if (signUpError) {
      if (signUpError.message.includes("already registered")) {
        setError("Esse e-mail já está registrado. Faça login.");
      } else {
        setError(signUpError.message);
      }
      setLoading(false);
    } else {
      // User created successfully, navigate to onboarding to complete profile
      navigate({ to: "/onboarding" });
    }
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
          <Label htmlFor="email">E-mail</Label>
          <Input 
            id="email" 
            type="email"
            required 
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
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            className="h-12 rounded-xl" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="repete_senha">Repita a Senha</Label>
          <Input 
            id="repete_senha" 
            type="password" 
            required 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••" 
            className="h-12 rounded-xl" 
          />
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <div className="mt-4">
          <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-base font-semibold">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Criar sua conta"}
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
