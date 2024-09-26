"use client";

import TodoAPI from "@/api/todos.api";
import Page from "@/components/Page";
import { Todos, TodoType } from "@/types/todos.type";
import Todo from "./todos/_components/Todo";
import { useQuery } from "@tanstack/react-query";

function TodoListPage() {
	const { data: todosResponse, isLoading } = useQuery({
		queryKey: ["todos"],
		queryFn: () => TodoAPI.readTodo(),
	});
	const getLoadingElement = (msg: string) => {
		return <span>{msg}</span>;
	};
	const sortTodos = (todoList: Todos) => {
		const sortedTodoList = todoList.slice(0);

		// 셀릭션 소팅
		let indexMin;
		for (let x = 0; x < sortedTodoList.length - 1; x++) {
			indexMin = x;
			for (let y = x + 1; y < sortedTodoList.length; y++) {
				if (
					sortedTodoList[y].todoId! < sortedTodoList[indexMin].todoId!
				) {
					indexMin = y;
				}
			}
			[sortedTodoList[x], sortedTodoList[indexMin]] = [
				sortedTodoList[indexMin],
				sortedTodoList[x],
			];
		}
		return sortedTodoList;
	};

	if (!todosResponse || !todosResponse.data)
		return getLoadingElement("데이터가 존재하지 않습니다");
	if (isLoading) return getLoadingElement("데이터를 불러오는 중입니다 ...");

	const todos = sortTodos(todosResponse.data);

	return (
		<Page title="Today's Todo">
			<ul className="flex flex-col gap-y-10 items-center mt-5">
				{todos.length !== 0 ? (
					todos.map((todo: TodoType, index: number) => (
						<li key={todo.todoId}>
							<Todo todo={todo} index={index + 1} />
						</li>
					))
				) : (
					<li>{getLoadingElement("데이터가 존재하지 않습니다")}</li>
				)}
			</ul>
		</Page>
	);
}

export default TodoListPage;
