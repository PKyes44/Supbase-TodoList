import supabase from "@/supabase/client";
import { Database } from "../../database.types";
import { CustomError } from "../../models/Error";
import { TodoResponse } from "@/types/response.type";
import { UpdateTodoContent, UpdateTodoIsCompleted } from "@/types/todos.type";

const TABLE_TODOS = "todos";

async function insertTodo(
	insertTodo: Database["public"]["Tables"]["todos"]["Insert"]
) {
	const res = await supabase.from(TABLE_TODOS).insert(insertTodo);

	if (!!res.error) {
		let message = "";
		switch (res.error.code) {
			case "42501":
				message = "Todo 테이블에 대한 생성 권한이 부족합니다";
				break;
		}

		const error = new CustomError(res.status, message);
		throw error;
	}
	return res.data;
}

async function readTodo(): Promise<TodoResponse> {
	try {
		const res = await supabase.from(TABLE_TODOS).select("*");
		const todos = res.data;
		const success: TodoResponse = {
			status: res.status,
			message: res.statusText,
			data: todos,
		};
		return success;
	} catch (e) {
		console.log(e);
		const error = {
			status: 500,
			message: "Todos 읽기에 실패하였습니다",
		};
		return error;
	}
}

async function updateTodoContent(updateTodo: UpdateTodoContent) {
	const res = await supabase
		.from(TABLE_TODOS)
		.update(updateTodo)
		.eq("todoId", updateTodo.todoId);
	console.log(res);
}

async function updateTodoIsCompleted(updateTodo: UpdateTodoIsCompleted) {
	const res = await supabase
		.from(TABLE_TODOS)
		.update(updateTodo)
		.eq("todoId", updateTodo.todoId);
	console.log(res);
}

async function deleteTodo(deleteTodoId: number) {
	const res = await supabase
		.from(TABLE_TODOS)
		.delete()
		.eq("todoId", deleteTodoId);
	console.log(res);
}

const TodoAPI = {
	insertTodo,
	readTodo,
	updateTodoContent,
	updateTodoIsCompleted,
	deleteTodo,
};

export default TodoAPI;
