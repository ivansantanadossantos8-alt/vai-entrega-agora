export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { box: "h-8 w-8", text: "text-base", sub: "text-[10px]" },
    md: { box: "h-12 w-12", text: "text-xl", sub: "text-xs" },
    lg: { box: "h-16 w-16", text: "text-2xl", sub: "text-xs" },
  }[size];
  return (
    <div className="flex items-center gap-2">
      <div className={`${sizes.box} rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-elevated`}>
        VV
      </div>
      <div className="leading-tight">
        <div className={`${sizes.text} font-bold tracking-tight`}>Vai Até Você</div>
        <div className={`${sizes.sub} text-muted-foreground`}>Tudo da sua cidade em um só lugar</div>
      </div>
    </div>
  );
}
