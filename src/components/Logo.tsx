import logoImg from "@/assets/logo.png";

export function Logo({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const heights = {
    sm: "h-8",
    md: "h-14",
    lg: "h-20",
  }[size];
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src={logoImg} 
        alt="Vai Até Você" 
        className={`${heights} w-auto object-contain mix-blend-multiply`} 
      />
    </div>
  );
}
