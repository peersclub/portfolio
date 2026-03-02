import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--accent)] text-[var(--bg-primary)]",
        secondary:
          "border-[var(--glass-border)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)]",
        outline:
          "border-[var(--glass-border)] text-[var(--text-primary)]",
        success:
          "border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.12)] text-[#10b981]",
        warning:
          "border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.12)] text-[#f59e0b]",
        destructive:
          "border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.12)] text-[#ef4444]",
        info:
          "border-[rgba(59,130,246,0.3)] bg-[rgba(59,130,246,0.12)] text-[#3b82f6]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
