import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const buttonVariant = cva("", {
	variants: {
		size: {
			sm: "px-2 py-2 text-sm font-medium",
			md: "px-2.5 py-3 text-base font-semibold",
		},
		intent: {
			primary: "bg-black",
		},
		outline: {
			true: "bg-white border",
			false: "text-white",
		},
		rounded: { sm: "rounded-sm", md: "rounded-md", lg: "rounded-lg" },
	},
	compoundVariants: [
		{
			outline: true,
			intent: "primary",
			className: "border-black text-black",
		},
	],
	defaultVariants: {
		size: "md",
		intent: "primary",
		outline: false,
		rounded: "sm",
	},
});

type ButtonVariant = VariantProps<typeof buttonVariant>;
type ButtonProps = ButtonVariant &
	Omit<ComponentProps<"button">, "className"> & {
		className?: string;
		errorText?: string | null;
	};

function Button({
	size,
	intent,
	outline,
	className,
	errorText,
	children,
	...props
}: ButtonProps) {
	return (
		<>
			<button
				className={`${buttonVariant({
					size,
					intent,
					outline,
				})} ${className}`}
				{...props}
			>
				{children}
			</button>
			{errorText && (
				<small className="text-sm text-red-500 -mt-3">
					{errorText}
				</small>
			)}
		</>
	);
}

export default Button;
