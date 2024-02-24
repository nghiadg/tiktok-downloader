import { clsx } from "clsx";
import React, { ReactNode } from "react";

export interface NavItemProps {
  children?: ReactNode;
  className?: string;
  active?: boolean;
}

export const NavItem = ({
  children,
  active = false,
  className,
}: NavItemProps) => {
  return (
    <div
      className={clsx(
        "text-xs p-2 rounded-md",
        { "bg-primary-light": active },
        className
      )}
    >
      {children}
    </div>
  );
};
