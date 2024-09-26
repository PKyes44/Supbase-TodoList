"use client";

import Button from "@/components/Button/Button";
import InputGroup from "@/components/Input/InputGroup";
import Page from "@/components/Page";
import React, { ComponentProps, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AuthData, AuthErrorMsgs } from "@/types/auth.type";
import AuthAPI from "@/api/auth.api";

const logInKeys = {
	email: "email",
	password: "password",
};
const initialErrorMsgs = {
	email: null,
	password: null,
	global: null,
};

function LogInPage() {
	const formRef = useRef(null);
	const router = useRouter();
	const [errorMsgs, setErrorMsgs] = useState<AuthErrorMsgs>(initialErrorMsgs);

	const { mutate: logIn } = useMutation({
		mutationFn: (logInData: AuthData) => AuthAPI.logIn(logInData),
		onSuccess: () => {
			router.replace("/");
		},
		onError: () => {
			return throwErrorMsg("global", "로그인 정보가 잘못되었습니다");
		},
	});

	const handleSubmitLogIn: ComponentProps<"form">["onSubmit"] = async (e) => {
		e.preventDefault();

		setErrorMsgs(initialErrorMsgs);

		if (!formRef)
			return throwErrorMsg(
				"global",
				"아이디 및 비밀번호를 입력하여 주십시오"
			);
		if (!formRef.current)
			return throwErrorMsg(
				"global",
				"아이디 및 비밀번호를 입력하여 주십시오"
			);

		if (!formRef.current[logInKeys.email])
			return throwErrorMsg("email", "이메일 주소를 입력하여 주십시오");
		if (!formRef.current[logInKeys.password])
			return throwErrorMsg("password", "비밀번호를 입력하여 주십시오");

		const email = formRef.current[logInKeys.email]["value"] as string;
		const password = formRef.current[logInKeys.password]["value"] as string;

		if (email.length === 0)
			return throwErrorMsg("email", "이메일 주소를 입력하여 주십시오");
		if (password.length === 0)
			return throwErrorMsg("password", "비밀번호를 입력하여 주십시오");
		const logInData = {
			email,
			password,
		};
		console.log("logInData : ", logInData);
		const result = logIn(logInData);
		console.log("result: ", result);
	};

	const throwErrorMsg = (target: string, message: string) => {
		setErrorMsgs((prevErrorMsgs) => {
			return {
				...prevErrorMsgs,
				[target]: message,
			};
		});
	};

	return (
		<Page title="Log In to TODO-LIST !">
			<form
				ref={formRef}
				onSubmit={handleSubmitLogIn}
				className="flex flex-col items-center gap-y-5 mt-10"
			>
				<InputGroup
					errorText={errorMsgs.email}
					wrapperClassName="w-96"
					name="email"
				>
					이메일
				</InputGroup>
				<InputGroup
					errorText={errorMsgs.password}
					wrapperClassName="w-96"
					name="password"
					type="password"
				>
					비밀번호
				</InputGroup>
				<Button errorText={errorMsgs.global} className="w-96">
					로그인
				</Button>
			</form>
		</Page>
	);
}

export default LogInPage;
