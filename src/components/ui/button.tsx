"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md",
    "text-sm font-medium transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--accent)] text-[var(--bg-primary)]",
          "hover:opacity-90 active:scale-[0.98]",
          "shadow-sm",
        ].join(" "),
        secondary: [
          "bg-[var(--bg-tertiary)] text-[var(--text-primary)]",
          "border border-[var(--glass-border)]",
          "hover:border-[var(--accent)] hover:text-[var(--accent)]",
        ].join(" "),
        ghost: [
          "text-[var(--text-secondary)]",
          "hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]",
        ].join(" "),
        outline: [
          "border border-[var(--glass-border)] bg-transparent text-[var(--text-primary)]",
          "hover:border-[var(--accent)] hover:text-[var(--accent)]",
        ].join(" "),
        link: "text-[var(--accent)] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-7 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
