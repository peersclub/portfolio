import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-solid)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--accent-solid)] text-[var(--content-inverse)]",
        secondary:
          "border-[var(--line-subtle)] bg-[var(--surface-elevated)] text-[var(--content-secondary)]",
        outline:
          "border-[var(--line-subtle)] text-[var(--content-primary)]",
        success:
          "border-[var(--severity-success-border)] bg-[var(--severity-success-bg)] text-[var(--severity-success)]",
        warning:
          "border-[var(--severity-warning-border)] bg-[var(--severity-warning-bg)] text-[var(--severity-warning)]",
        destructive:
          "border-[var(--severity-critical-border)] bg-[var(--severity-critical-bg)] text-[var(--severity-critical)]",
        info:
          "border-[var(--severity-info-border)] bg-[var(--severity-info-bg)] text-[var(--severity-info)]",
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
