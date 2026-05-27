import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { TabBar } from "@/components/TabBar";
import { Star, ChevronRight, LogOut, User, FileText, Bike, Package, CreditCard, Calendar, Shield, Settings as SettingsIcon, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

const groups = [
  {
    items: [
      { icon: User, label: "Dados pessoais" },
      { icon: FileText, label: "Documentos" },
      { icon: Bike, label: "Veículo" },
      { icon: Package, label: "Bag de entrega" },
      { icon: CreditCard, label: "Dados bancários/Pix" },
      { icon: Calendar, label: "Disponibilidade" },
    ],
  },
  {
    items: [
      { icon: Shield, label: "Segurança" },
      { icon: SettingsIcon, label: "Configurações" },
      { icon: ShieldAlert, label: "Termos e privacidade" },
    ],
  },
];

function Profile() {
  return (
    <MobileFrame>
      <ScreenHeader title="Perfil" right={<Link to="/admin" className="text-xs text-primary font-medium">Admin</Link>} />
      <div className="px-5 py-5 flex-1 overflow-y-auto">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary-soft text-primary font-bold text-2xl flex items-center justify-center">
            V
          </div>
          <div className="flex-1">
            <div className="text-base font-bold">Victor da Silva</div>
            <div className="text-xs text-muted-foreground">São Paulo · Aprovado</div>
            <div className="mt-1 flex items-center gap-1 text-xs">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              <span className="font-semibold">4,8</span>
              <span className="text-muted-foreground">· 32 entregas</span>
            </div>
          </div>
        </div>

        {groups.map((g, gi) => (
          <div key={gi} className="mt-5 rounded-2xl border border-border divide-y divide-border overflow-hidden">
            {g.items.map((it) => {
              const Icon = it.icon;
              return (
                <button key={it.label} className="w-full flex items-center gap-3 px-4 py-3.5 text-left">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="flex-1 text-sm font-medium">{it.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              );
            })}
          </div>
        ))}

        <Link to="/" className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-border p-3.5 text-sm font-semibold text-destructive">
          <LogOut className="h-4 w-4" />
          Sair da conta
        </Link>

        <div className="mt-3 text-center text-[10px] text-muted-foreground">Vai Até Você · v1.0.0</div>
      </div>
      <TabBar />
    </MobileFrame>
  );
}
