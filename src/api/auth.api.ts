import supabase from "@/supabase/client";
import { AuthData } from "@/types/auth.type";
import { CustomError } from "../../models/Error";

async function getUser() {
	const res = await supabase.auth.getUser();
	const user = res.data.user;
	return user;
}

async function signUp(signUpData: AuthData) {
	const res = await supabase.auth.signUp(signUpData);

	if (!!res.error) {
		let message = "";
		switch (res.error.status) {
			case 422:
				message = "이미 있는 로그인 정보입니다";
				break;
			case 400:
				message = "로그인 정보가 올바르지 않습니다";
				break;
		}

		const error = new CustomError(res.error.status as number, message);
		throw error;
	}
	return res.data;
}

async function logIn(logInData: AuthData) {
	const res = await supabase.auth.signInWithPassword(logInData);

	if (!!res.error) {
		let message = "";
		switch (res.error.status) {
			case 400:
				message = "로그인 정보가 올바르지 않습니다";
				break;
		}

		const error = new CustomError(res.error.status as number, message);
		throw error;
	}
	return res.data;
}

const AuthAPI = {
	getUser,
	signUp,
	logIn,
};

export default AuthAPI;
