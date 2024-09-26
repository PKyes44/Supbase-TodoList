"use client";

import Button from "@/components/Button/Button";
import InputGroup from "@/components/Input/InputGroup";
import Page from "@/components/Page";
import React, { ComponentProps, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthData, AuthErrorMsgs } from "@/types/auth.type";
import { useRouter } from "next/navigation";
import AuthAPI from "@/api/auth.api";
const signUpKeys = {
	email: "email",
	password: "password",
};
const initialErrorMsgs = {
	email: null,
	password: null,
	global: null,
};

function SignUpPage() {
	const formRef = useRef(null);
	const router = useRouter();
	const [errorMsgs, setErrorMsgs] = useState<AuthErrorMsgs>(initialErrorMsgs);
	const { mutate: signUp } = useMutation({
		mutationFn: (signUpData: AuthData) => AuthAPI.signUp(signUpData),
		onSuccess() {
			router.push("/log-in");
		},
		onError: (data) => {
			throwErrorMsg("global", data.message);
		},
	});

	const handleSubmitSignUp: ComponentProps<"form">["onSubmit"] = async (
		e
	) => {
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

		if (!formRef.current[signUpKeys.email])
			return throwErrorMsg("email", "이메일 주소를 입력하여 주십시오");
		if (!formRef.current[signUpKeys.password])
			return throwErrorMsg("password", "비밀번호를 입력하여 주십시오");
		const email = formRef.current[signUpKeys.email]["value"] as string;
		const password = formRef.current[signUpKeys.password][
			"value"
		] as string;

		if (email.length === 0)
			return throwErrorMsg("email", "이메일 주소를 입력하여 주십시오");
		if (password.length === 0)
			return throwErrorMsg("password", "비밀번호를 입력하여 주십시오");

		const signUpData = {
			email,
			password,
		};
		console.log("signUpData : ", signUpData);
		const response = signUp(signUpData);
		console.log("response: ", response);
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
		<Page title="Sign Up to TODO-LIST !">
			<form
				ref={formRef}
				onSubmit={handleSubmitSignUp}
				className="flex flex-col items-center gap-y-5 mt-10"
			>
				<InputGroup
					errorText={errorMsgs.email}
					helpText="로그인 시 아이디로 사용됩니다"
					wrapperClassName="w-96"
					name="email"
				>
					이메일
				</InputGroup>
				<InputGroup
					errorText={errorMsgs.password}
					helpText="로그인 시 비밀번호로 사용됩니다"
					wrapperClassName="w-96"
					name="password"
					type="password"
				>
					비밀번호
				</InputGroup>
				<Button errorText={errorMsgs.global} className="w-96">
					회원가입
				</Button>
			</form>
		</Page>
	);
}

export default SignUpPage;
