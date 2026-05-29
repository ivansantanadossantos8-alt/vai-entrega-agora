import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { TabBar } from "@/components/TabBar";
import { 
  Star, ChevronRight, LogOut, User, Bike, 
  Shield, Settings as SettingsIcon, ShieldAlert, 
  Camera, Headphones 
} from "lucide-react";
import { useState, useRef } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

const groups = [
  {
    items: [
      { icon: User, label: "Dados pessoais", to: "/profile/personal" },
      { icon: Bike, label: "Veículo", to: "/profile/vehicle" },
      { icon: Star, label: "Avaliações", to: "/profile/reviews" },
    ],
  },
  {
    items: [
      { icon: Shield, label: "Segurança", to: "/profile/security" },
      { icon: Headphones, label: "Ajuda e suporte", to: "/profile/support" },
      { icon: SettingsIcon, label: "Configurações", to: "/profile/settings" },
      { icon: ShieldAlert, label: "Termos e privacidade", to: "/profile/terms" },
    ],
  },
];

function Profile() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogout = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const firstName = profile?.name?.split(" ")[0] || "Usuário";
  const initials = profile?.name ? profile.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "U";
  const statusLabel = profile?.status === "approved" ? "Aprovado" : profile?.status === "blocked" ? "Bloqueado" : "Pendente";

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto bg-muted/20 relative">
        {/* Premium Header Profile Section */}
        <div className="bg-primary px-5 pt-12 pb-16 relative">
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative">
              <div 
                className="h-16 w-16 rounded-full bg-white text-primary font-bold text-2xl flex items-center justify-center shadow-lg border-2 border-white/20 cursor-pointer overflow-hidden"
                onClick={handlePhotoClick}
              >
                {initials}
              </div>
              <button 
                onClick={handlePhotoClick}
                className="absolute -bottom-1 -right-1 h-7 w-7 bg-white rounded-full flex items-center justify-center shadow text-primary border border-border"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
              />
            </div>

            <div className="flex-1 text-white">
              <div className="text-xl font-bold">{profile?.name || "Carregando..."}</div>
              <div className="text-sm text-primary-foreground/80 font-medium">
                {profile?.city || "Cidade"}{profile?.state ? `, ${profile.state}` : ""} · {statusLabel}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs bg-white/10 w-fit px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
                <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                <span className="font-semibold">{profile?.rating ? String(profile.rating).replace(".", ",") : "--"}</span>
                <span className="opacity-80">· {profile?.total_deliveries || 0} entregas</span>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-black opacity-10 rounded-full blur-2xl pointer-events-none" />
        </div>

        <div className="px-5 -mt-6 relative z-20 pb-8">
          {groups.map((g, gi) => (
            <div key={gi} className="mb-5 rounded-2xl bg-background border border-border shadow-[0_2px_12px_rgba(0,0,0,0.04)] divide-y divide-border overflow-hidden">
              {g.items.map((it) => {
                const Icon = it.icon;
                return (
                  <Link 
                    key={it.label} 
                    to={it.to}
                    className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-muted/30 transition-colors active:bg-muted"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="flex-1 text-sm font-semibold">{it.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                );
              })}
            </div>
          ))}

          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-2xl bg-white border border-destructive/20 shadow-sm p-4 text-sm font-bold text-destructive hover:bg-destructive/5 active:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sair da conta
          </button>

          <div className="mt-6 text-center text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
            Vai Até Você · v1.0.0
          </div>
        </div>

        {/* Logout Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-5 animate-in fade-in duration-200">
            <div className="bg-background w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-center">
              <div className="h-12 w-12 rounded-full bg-destructive/10 text-destructive mx-auto flex items-center justify-center mb-4">
                <LogOut className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Deseja realmente sair da conta?</h3>
              <p className="text-sm text-muted-foreground mb-8">
                Você precisará fazer login novamente para acessar o aplicativo.
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 h-12 rounded-xl border border-border font-semibold text-muted-foreground hover:bg-muted"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 h-12 rounded-xl bg-destructive font-semibold text-destructive-foreground shadow-sm hover:bg-destructive/90"
                >
                  Sair da conta
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
      <TabBar />
    </MobileFrame>
  );
}
