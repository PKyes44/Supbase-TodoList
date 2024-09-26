/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, PropsWithChildren, useId } from "react";
import Input, { InputProps } from "./Input";

type InputGroup = {
	helpText?: string;
	errorText?: string | null;
	wrapperClassName?: string;
	inputClassName?: string;
	name?: string;
};
type InputGroupProps = PropsWithChildren<InputGroup> &
	Omit<InputProps, "inputId" | "inputClassName">;

export default forwardRef(function InputGroup(
	{
		helpText,
		errorText,
		wrapperClassName,
		inputClassName,
		children,
		...props
	}: InputGroupProps,
	ref: any
) {
	const inputId = useId();
	return (
		<div className={`flex flex-col ${wrapperClassName}`}>
			<label htmlFor={inputId}>{children}</label>
			<Input
				inputId={inputId}
				ref={ref}
				inputClassName={inputClassName}
				{...props}
			/>
			{errorText ? (
				<small className="text-sm text-red-500">{errorText}</small>
			) : (
				helpText && (
					<small className="text-sm text-gray-500">{helpText}</small>
				)
			)}
		</div>
	);
});
