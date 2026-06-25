import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  className?: string;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkProps = BaseProps & {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const variants = {
  primary:
    "border-aurora/50 bg-aurora text-slate-950 shadow-[0_18px_60px_rgba(103,232,208,0.24)] hover:bg-white",
  secondary:
    "border-orbit/40 bg-orbit/12 text-starlight hover:border-orbit hover:bg-orbit/18",
  ghost:
    "border-white/12 bg-white/5 text-starlight hover:border-white/26 hover:bg-white/10",
  danger:
    "border-mars/40 bg-mars/12 text-mars hover:border-mars hover:bg-mars/18",
};

export function CosmicButton(props: ButtonProps | LinkProps) {
  if ("href" in props && typeof props.href === "string") {
    const { children, variant = "secondary", className, href, onClick } = props;
    const classes = cn(
      "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-200 active:scale-[0.98]",
      variants[variant],
      className,
    );
    return (
      <Link className={classes} href={href} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const { children, variant = "secondary", className, ...buttonProps } = props;
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-200 active:scale-[0.98]",
    variants[variant],
    className,
  );
  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
