import { ReactNode } from "react";

export function MobileFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className="min-h-screen bg-muted/40 flex justify-center">
      <div className={`w-full max-w-md min-h-screen bg-background flex flex-col relative ${className}`}>
        {children}
      </div>
    </div>
  );
}
