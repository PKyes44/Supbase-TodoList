/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import supabase from "@/supabase/client";
import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../../../../contexts/auth.context";

function AuthProvider({ children }: PropsWithChildren) {
	const { setIsLoggedIn, initializeAuth } = useAuth();

	useEffect(() => {
		supabase.auth.onAuthStateChange((_, session) => {
			console.log("session: ", session);
			if (!!session?.user) {
				console.log("now is logged in");
				setIsLoggedIn(true);
			} else {
				console.log("now isn't logged in");
				setIsLoggedIn(false);
			}

			initializeAuth();
		});
	}, []);
	return children;
}
export default AuthProvider;
