import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Star, Package, MessageSquare, ThumbsUp, Clock, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/profile/reviews")({
  component: ProfileReviews,
});

function ProfileReviews() {
  return (
    <MobileFrame>
      <ScreenHeader title="Avaliações" back="/profile" />
      <div className="flex-1 overflow-y-auto bg-muted/20">
        
        {/* Header Summary */}
        <div className="bg-primary text-white px-5 py-8 rounded-b-3xl shadow-lg">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-5xl font-black mb-1 flex items-center justify-center gap-1">
                4,8 <Star className="h-6 w-6 fill-warning text-warning" />
              </div>
              <div className="text-xs font-medium text-white/80">Nota Geral</div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-center min-w-[80px] backdrop-blur-sm">
                <Package className="h-5 w-5 mx-auto mb-1 opacity-80" />
                <div className="text-xl font-bold">32</div>
                <div className="text-[10px] uppercase tracking-wider opacity-80">Entregas</div>
              </div>
              <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-center min-w-[80px] backdrop-blur-sm">
                <MessageSquare className="h-5 w-5 mx-auto mb-1 opacity-80" />
                <div className="text-xl font-bold">28</div>
                <div className="text-[10px] uppercase tracking-wider opacity-80">Avaliações</div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-6">
          <h3 className="text-sm font-bold mb-4">Indicadores de Qualidade</h3>
          <div className="bg-background rounded-2xl p-4 border border-border shadow-sm space-y-4">
            <Indicator icon={Clock} label="Pontualidade" percentage={95} color="bg-blue-500" />
            <Indicator icon={HeartHandshake} label="Atendimento" percentage={98} color="bg-green-500" />
            <Indicator icon={ThumbsUp} label="Cuidado com pedido" percentage={100} color="bg-purple-500" />
          </div>

          <h3 className="text-sm font-bold mt-8 mb-4">Avaliações Recentes</h3>
          <div className="space-y-3 pb-10">
            <ReviewCard 
              name="Carlos M." 
              date="Hoje" 
              rating={5} 
              comment="Entrega super rápida e o entregador foi muito educado! Chegou tudo quentinho." 
            />
            <ReviewCard 
              name="Ana P." 
              date="Ontem" 
              rating={5} 
              comment="Excelente serviço, encontrou meu endereço com facilidade." 
            />
            <ReviewCard 
              name="João S." 
              date="12/05/2026" 
              rating={4} 
              comment="Chegou no prazo, porém a embalagem amassou um pouquinho no transporte." 
            />
            <ReviewCard 
              name="Marina L." 
              date="10/05/2026" 
              rating={5} 
              comment="Muito simpático e cuidadoso. Recomendo demais!" 
            />
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}

function Indicator({ icon: Icon, label, percentage, color }: { icon: any, label: string, percentage: number, color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 text-xs font-semibold">
        <div className="flex items-center gap-1.5">
          <Icon className="h-4 w-4 text-muted-foreground" />
          {label}
        </div>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function ReviewCard({ name, date, rating, comment }: { name: string, date: string, rating: number, comment: string }) {
  return (
    <div className="bg-background rounded-2xl p-4 border border-border shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-sm">{name}</div>
        <div className="text-[10px] text-muted-foreground">{date}</div>
      </div>
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-3 w-3 ${i < rating ? 'fill-warning text-warning' : 'fill-muted text-muted'}`} />
        ))}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{comment}</p>
    </div>
  );
}
