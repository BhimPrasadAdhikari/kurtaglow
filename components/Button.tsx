import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        className={cn(
          `w-auto 
            bg-black
            rounded-full
            px-5
            py-2
            disabled:cursor-not-allowed
            disabled:opacity-50
            text-white
            font-semibold
            hover:opacity-75
            transition`,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
