import { clsx } from "clsx";
import React from "react";

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const AppButton = ({
  children,
  className,
  disabled = false,
  loading = false,
  ...props
}: AppButtonProps) => {
  return (
    <button
      className={clsx(
        "border-none rounded-md bg-primary px-4 py-3 text-white font-semibold flex items-center",
        className
      )}
      disabled={disabled ?? loading}
      {...props}
    >
      {loading ? (
        <div className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            style={{
              margin: "auto",
              display: "block",
              shapeRendering: "auto",
            }}
            width="24px"
            height="24px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke="#fff"
              stroke-width="10"
              r="35"
              stroke-dasharray="164.93361431346415 56.97787143782138"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
              ></animateTransform>
            </circle>
          </svg>
        </div>
      ) : null}

      {children}
    </button>
  );
};
