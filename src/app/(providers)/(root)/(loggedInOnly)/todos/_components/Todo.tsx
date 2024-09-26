"use client";

import Button from "@/components/Button/Button";
import { TodoType, UpdateTodoIsCompleted } from "@/types/todos.type";
import React, { useState } from "react";
import UpdateTodoForm from "./UpdateTodoForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TodoAPI from "@/api/todos.api";
import { CustomError } from "../../../../../../../models/Error";

interface TodoProps {
	todo: TodoType;
	index: number;
}

function Todo({ todo, index }: TodoProps) {
	const queryClient = useQueryClient();
	const [isEditing, setIsEditing] = useState(false);

	const { mutate: updateTodoIsCompleted } = useMutation({
		mutationFn: (updateTodo: UpdateTodoIsCompleted) =>
			TodoAPI.updateTodoIsCompleted(updateTodo),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ["todos"],
				exact: true,
			}),
	});
	const { mutate: deleteTodo } = useMutation({
		mutationFn: (deleteTodoId: number) => TodoAPI.deleteTodo(deleteTodoId),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["todos"], exact: true }),
	});

	const handleToggleIsEditing = () => {
		setIsEditing((prevIsEditing) => !prevIsEditing);
	};
	const handleToggleIsCompleted = () => {
		if (!todo.todoId) throw new CustomError(400, "todoId is not defined");

		const updateData: UpdateTodoIsCompleted = {
			todoId: todo.todoId!,
			isCompleted: !todo.isCompleted,
		};
		updateTodoIsCompleted(updateData);
	};
	const handleClickDeleteTodo = () => {
		if (!todo.todoId) throw new CustomError(400, "todoId is not defined");
		deleteTodo(todo.todoId);
	};

	if (!todo) throw new CustomError(400, "todo is not defined");

	return (
		<article className="flex flex-col gap-y-3">
			{!isEditing ? (
				<>
					<span
						className={`text-lg ${
							todo.isCompleted && "line-through"
						}`}
					>
						{index}. {todo.content}
					</span>
					<div className="flex flex-row justify-center gap-x-2">
						<Button onClick={handleToggleIsEditing} size="sm">
							수정하기
						</Button>
						<Button onClick={handleClickDeleteTodo} size="sm">
							삭제하기
						</Button>
						<Button onClick={handleToggleIsCompleted} size="sm">
							완료하기
						</Button>
					</div>
				</>
			) : (
				<UpdateTodoForm
					todoId={todo.todoId!}
					handleToggleIsEditing={handleToggleIsEditing}
				/>
			)}
		</article>
	);
}

export default Todo;
