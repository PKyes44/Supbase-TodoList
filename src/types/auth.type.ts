export type AuthData = {
	email: string;
	password: string;
};
export type AuthErrorMsgs = {
	email: string | null;
	password: string | null;
	global: string | null;
};
