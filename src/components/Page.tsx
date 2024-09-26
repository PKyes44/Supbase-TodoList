import React, { PropsWithChildren } from "react";

interface PageProps {
	title?: string;
	className?: string;
}

function Page({ title, className, children }: PropsWithChildren<PageProps>) {
	return (
		<div className={`w-[1000px] m-auto ${className}`}>
			<h1 className="text-center font-bold text-3xl mt-16">{title}</h1>
			{children}
		</div>
	);
}

export default Page;
