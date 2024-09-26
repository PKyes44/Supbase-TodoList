import React, { PropsWithChildren } from "react";
import { AuthContextProvider } from "../../../contexts/auth.context";
import AuthProvider from "./_providers/auth.provider";
import { QueryProvider } from "./_providers/tanstack-query.provider";

function ProvidersLayout({ children }: PropsWithChildren) {
	return (
		<QueryProvider>
			<AuthContextProvider>
				<AuthProvider>{children}</AuthProvider>
			</AuthContextProvider>
		</QueryProvider>
	);
}

export default ProvidersLayout;
