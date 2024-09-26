import { AuthData } from "./auth.type";
import { Todos } from "./todos.type";

export type TodoResponse = {
	status: number;
	message: string;
	data?: Todos | null;
};

export type AuthResponse = {
	status: number;
	message: string;
	data?: AuthData | null;
};
