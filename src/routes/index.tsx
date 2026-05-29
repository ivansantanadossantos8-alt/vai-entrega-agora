import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Loader2, Eye, EyeOff, Mail, Lock, KeyRound, ChevronLeft, ArrowRight } from "lucide-react";
import courier from "@/assets/courier-hero.png";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
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
  
  // View states: 'login' | 'forgot' | 'verify'
  const [view, setView] = useState<"login" | "forgot" | "verify">("login");
  
  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Forgot password state
  const [resetEmail, setResetEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  
  // Error/loading states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (!authLoading && user && view === "login") {
      navigate({ to: "/home" });
    }
  }, [user, authLoading, navigate, view]);

  const translateError = (msg: string) => {
    if (msg.includes("Load failed") || msg.includes("Failed to fetch")) return "Erro de conexão. Verifique sua internet.";
    if (msg.includes("Invalid login") || msg.includes("credentials")) return "E-mail ou senha incorretos.";
    if (msg.includes("not confirmed")) return "Por favor, confirme seu e-mail antes de entrar.";
    if (msg.includes("already registered") || msg.includes("already exists")) return "Esse e-mail já está cadastrado. Faça login.";
    if (msg.includes("weak_password") || msg.includes("least 6 characters")) return "A senha deve ter pelo menos 6 caracteres.";
    return "Ocorreu um erro inesperado. Tente novamente.";
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      const { error: signInError } = await signIn(email, password);

      if (signInError) {
        setError(translateError(signInError.message));
        setLoading(false);
      } else {
        navigate({ to: "/home" });
      }
    } catch (err: any) {
      setError(translateError(err.message || "Erro de conexão"));
      setLoading(false);
    }
  };

  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!resetEmail) {
      setError("Por favor, digite seu e-mail.");
      setLoading(false);
      return;
    }

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: window.location.origin,
      });

      if (resetError) {
        setError(translateError(resetError.message));
        setLoading(false);
      } else {
        setSuccess("Código de recuperação enviado. Verifique seu e-mail!");
        setLoading(false);
        setView("verify");
      }
    } catch (err: any) {
      setError("Erro ao enviar e-mail. Verifique sua internet.");
      setLoading(false);
    }
  };

  const handleVerifyAndReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!resetToken || !newPassword || !confirmNewPassword) {
      setError("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("As senhas não coincidem. Digite senhas iguais.");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      // 1. Verify OTP token
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: resetEmail,
        token: resetToken,
        type: "recovery",
      });

      if (verifyError) {
        setError("Código de verificação incorreto ou expirado.");
        setLoading(false);
        return;
      }

      // 2. Update to new password (user session is established after OTP verify)
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(translateError(updateError.message));
        setLoading(false);
      } else {
        setSuccess("Senha atualizada com sucesso! Redirecionando...");
        setTimeout(() => {
          setLoading(false);
          navigate({ to: "/home" });
        }, 1500);
      }
    } catch (err: any) {
      setError("Erro ao atualizar a senha. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col bg-gradient-to-b from-primary/5 via-background to-background relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* LOGOUT / BACK BUTTON IN PASSWORD RESET */}
        {view !== "login" && (
          <button 
            type="button" 
            onClick={() => {
              setError("");
              setSuccess("");
              setView(view === "verify" ? "forgot" : "login");
            }}
            className="absolute top-6 left-5 h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-muted-foreground/30 active:scale-95 transition-all z-20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Top Logo and Cover Area */}
        <div className="px-6 pt-14 pb-4 flex flex-col items-center text-center gap-4 relative z-10">
          <Logo size="md" className="drop-shadow-sm" />
          {view === "login" && (
            <>
              <img 
                src={courier} 
                alt="Entregador" 
                className="w-[200px] h-[200px] object-contain mt-2 drop-shadow-md animate-in fade-in zoom-in-95 duration-500" 
              />
              <div className="space-y-1 mt-1">
                <h1 className="text-xl font-bold tracking-tight text-foreground">Área do Entregador</h1>
                <p className="text-xs text-muted-foreground">Faça login para gerenciar suas entregas</p>
              </div>
            </>
          )}

          {view === "forgot" && (
            <div className="mt-8 space-y-2 max-w-[280px]">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary mb-3">
                <KeyRound className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">Esqueceu a senha?</h1>
              <p className="text-xs text-muted-foreground">
                Digite seu e-mail cadastrado e enviaremos um código de verificação para redefinir sua senha.
              </p>
            </div>
          )}

          {view === "verify" && (
            <div className="mt-8 space-y-2 max-w-[280px]">
              <div className="h-14 w-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto text-green-600 mb-3 animate-bounce">
                <Mail className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">Código enviado!</h1>
              <p className="text-xs text-muted-foreground">
                Insira o código de 6 dígitos enviado para o e-mail cadastrado e digite sua nova senha.
              </p>
            </div>
          )}
        </div>

        {/* Form Containers */}
        <div className="px-6 flex-1 flex flex-col relative z-10 pt-2 pb-6">
          
          {/* VIEW: LOGIN */}
          {view === "login" && (
            <form onSubmit={handleLogin} className="flex-1 flex flex-col gap-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="senha" className="text-xs font-semibold text-foreground/80">Senha</Label>
                  <button 
                    type="button" 
                    onClick={() => {
                      setError("");
                      setSuccess("");
                      setView("forgot");
                    }}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Esqueci minha senha
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                  <Input 
                    id="senha" 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
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

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold p-3.5 rounded-xl text-center animate-shake">
                  {error}
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-base font-bold shadow-elevated bg-primary text-white hover:bg-primary/95 mt-4 transition-all">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Entrar"}
              </Button>

              <Link to="/signup" className="block mt-1">
                <Button type="button" variant="outline" className="w-full h-12 rounded-xl text-base font-bold border-primary/20 text-primary hover:bg-primary-soft/50 transition-all">
                  Criar conta de entregador
                </Button>
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-6 pb-4 mt-auto">
                <Shield className="h-3.5 w-3.5 text-green-500" />
                Ambiente seguro e criptografado
              </div>
            </form>
          )}

          {/* VIEW: FORGOT PASSWORD */}
          {view === "forgot" && (
            <form onSubmit={handleSendResetEmail} className="flex-1 flex flex-col gap-4 animate-in fade-in slide-in-from-right-3 duration-300">
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-xs font-semibold text-foreground/80">Seu E-mail Cadastrado</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                  <Input 
                    id="reset-email" 
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="exemplo@email.com" 
                    className="h-12 pl-11 rounded-xl border-border bg-background focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold p-3.5 rounded-xl text-center">
                  {error}
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-base font-bold shadow-elevated bg-primary text-white hover:bg-primary/95 mt-4 transition-all">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Enviar Código de Recuperação"}
              </Button>

              <button 
                type="button" 
                onClick={() => setView("login")}
                className="w-full h-12 text-sm font-semibold text-muted-foreground hover:text-foreground transition-all mt-1"
              >
                Voltar para o Login
              </button>
            </form>
          )}

          {/* VIEW: VERIFY OTP AND SET NEW PASSWORD */}
          {view === "verify" && (
            <form onSubmit={handleVerifyAndReset} className="flex-1 flex flex-col gap-4 animate-in fade-in slide-in-from-right-3 duration-300">
              
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-xs font-semibold text-foreground/80">Código de 6 dígitos</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                  <Input 
                    id="otp" 
                    type="text"
                    required
                    maxLength={6}
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    placeholder="123456" 
                    className="h-12 pl-11 tracking-[0.3em] font-bold text-center rounded-xl border-border bg-background focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-xs font-semibold text-foreground/80">Nova Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                  <Input 
                    id="new-password" 
                    type={showNewPassword ? "text" : "password"} 
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres" 
                    className="h-12 pl-11 pr-11 rounded-xl border-border bg-background focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-sm"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all"
                  >
                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-new-password" className="text-xs font-semibold text-foreground/80">Repetir Nova Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                  <Input 
                    id="confirm-new-password" 
                    type={showConfirmNewPassword ? "text" : "password"} 
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Repita a nova senha" 
                    className="h-12 pl-11 pr-11 rounded-xl border-border bg-background focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-sm"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all"
                  >
                    {showConfirmNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold p-3.5 rounded-xl text-center">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-600 text-xs font-semibold p-3.5 rounded-xl text-center">
                  {success}
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-base font-bold shadow-elevated bg-primary text-white hover:bg-primary/95 mt-4 transition-all">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Redefinir Senha e Entrar"}
              </Button>
            </form>
          )}

        </div>
      </div>
    </MobileFrame>
  );
}
