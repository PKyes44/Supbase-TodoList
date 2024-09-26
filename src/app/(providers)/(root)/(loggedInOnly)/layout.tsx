"use client";

import React, { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../../contexts/auth.context";
import Page from "@/components/Page";

function LoggedInOnlyLayout({ children }: PropsWithChildren) {
	const router = useRouter();
	const { isAuthInitialized, isLoggedIn } = useAuth();

	if (!isAuthInitialized) return <Page>로그인 여부를 확인 중입니다...</Page>;

	if (!isLoggedIn) return router.replace("/log-in");

	return children;
}

export default LoggedInOnlyLayout;
