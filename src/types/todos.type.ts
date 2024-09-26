export type TodoType = {
	todoId?: number;
	createAt?: string;
	content: string;
	startDate: string;
	endDate: string;
	isCompleted: boolean;
};
export type Todos = TodoType[];
export type TodoErrorMsgs = {
	content?: string | null;
	startDate?: string | null;
	endDate?: string | null;
	global?: string | null;
};
export type UpdateTodoContent = {
	todoId: number;
	content: string;
};
export type UpdateTodoIsCompleted = {
	todoId: number;
	isCompleted: boolean;
};
