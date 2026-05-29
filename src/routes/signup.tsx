import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff, Mail, Lock, ChevronLeft, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Criar Conta — Vai Até Você Entregador" },
      { name: "description", content: "Crie sua conta de entregador parceiro." },
    ],
  }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const translateError = (msg: string) => {
    if (msg.includes("Load failed") || msg.includes("Failed to fetch")) return "Erro de conexão. Verifique sua internet.";
    if (msg.includes("already registered") || msg.includes("already exists")) return "Esse e-mail já está cadastrado. Faça login.";
    if (msg.includes("weak_password") || msg.includes("least 6 characters")) return "A senha deve ter pelo menos 6 caracteres.";
    if (msg.includes("Invalid login")) return "E-mail ou senha incorretos.";
    if (msg.includes("not confirmed")) return "Por favor, confirme seu e-mail antes de entrar.";
    return "Ocorreu um erro inesperado. Tente novamente.";
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem. Digite senhas iguais.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await signUp(email, password);

      if (signUpError) {
        setError(translateError(signUpError.message));
        setLoading(false);
      } else {
        navigate({ to: "/onboarding" });
      }
    } catch (err: any) {
      setError(translateError(err.message || "Erro de conexão"));
      setLoading(false);
    }
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col bg-gradient-to-b from-primary/5 via-background to-background relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Back Button */}
        <Link 
          to="/"
          className="absolute top-6 left-5 h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-muted-foreground/30 active:scale-95 transition-all z-20"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>

        <div className="px-6 pt-16 pb-4 flex flex-col items-center text-center gap-4 relative z-10">
          <Logo size="md" className="drop-shadow-sm" />
          <div className="space-y-1 mt-2">
            <h1 className="text-xl font-bold tracking-tight text-foreground font-sans">Cadastre-se</h1>
            <p className="text-xs text-muted-foreground">
              Crie sua conta em segundos para começar a entregar
            </p>
          </div>
        </div>

        <form onSubmit={handleSignup} className="px-6 flex-1 flex flex-col gap-4 relative z-10 pt-2 pb-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-semibold text-foreground/80">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
              <Input 
                id="email" 
                type="email"
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@email.com" 
                className="h-12 pl-11 rounded-xl border-border bg-background focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-sm"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="senha" className="text-xs font-semibold text-foreground/80">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
              <Input 
                id="senha" 
                type={showPassword ? "text" : "password"} 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres" 
                className="h-12 pl-11 pr-11 rounded-xl border-border bg-background focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-sm" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground active:scale-90 transition-all"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="repete_senha" className="text-xs font-semibold text-foreground/80">Confirmar Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
              <Input 
                id="repete_senha" 
                type={showConfirmPassword ? "text" : "password"} 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Digite a mesma senha" 
                className="h-12 pl-11 pr-11 rounded-xl border-border bg-background focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-sm" 
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground active:scale-90 transition-all"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold p-3.5 rounded-xl text-center animate-shake">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-base font-bold shadow-elevated bg-primary text-white hover:bg-primary/95 mt-4 transition-all">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Criar sua conta"}
          </Button>
          
          <Link to="/" className="block mt-1">
            <Button type="button" variant="ghost" className="w-full h-12 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all">
              Já tenho conta. Fazer login.
            </Button>
          </Link>

          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-6 pb-4 mt-auto">
            <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
            Seus dados estão protegidos
          </div>
        </form>
      </div>
    </MobileFrame>
  );
}
