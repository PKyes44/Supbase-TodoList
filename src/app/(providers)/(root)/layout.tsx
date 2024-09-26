import React, { PropsWithChildren } from "react";
import Header from "./_components/Header";

function RootLayout({ children }: PropsWithChildren) {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
}

export default RootLayout;
