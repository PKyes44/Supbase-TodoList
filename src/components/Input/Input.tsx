/* eslint-disable @typescript-eslint/no-explicit-any */
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const inputVariant = cva("focus-within:border-black transition text-black", {
	variants: {
		size: {
			md: "px-3 py-2",
		},
		intent: {
			primary: "border border-gray-500",
		},
		rounded: {
			sm: "rounded-sm",
			md: "rounded-md",
			lg: "rounded-lg",
		},
	},
	compoundVariants: [],
	defaultVariants: {
		size: "md",
		intent: "primary",
		rounded: "sm",
	},
});

type InputVariant = VariantProps<typeof inputVariant>;
export type InputProps = InputVariant &
	Omit<ComponentProps<"input">, "ref"> & {
		inputId: string;
		inputClassName?: string;
	};

export default forwardRef(function Input(
	{ size, intent, rounded, inputId, inputClassName, ...props }: InputProps,
	ref: any
) {
	return (
		<div
			className={`w-full ${inputVariant({
				size,
				intent,
				rounded,
			})} ${inputClassName}`}
		>
			<input
				id={inputId}
				className="outline-none w-full"
				ref={ref}
				{...props}
			/>
		</div>
	);
});
