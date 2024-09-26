import TodoAPI from "@/api/todos.api";
import Button from "@/components/Button/Button";
import InputGroup from "@/components/Input/InputGroup";
import { UpdateTodoContent } from "@/types/todos.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";

interface UpdateTodoFormProps {
	todoId: number;
	handleToggleIsEditing: () => void;
}

function UpdateTodoForm({
	todoId,
	handleToggleIsEditing,
}: UpdateTodoFormProps) {
	const queryClient = useQueryClient();
	const updateInputRef = useRef();
	const { mutate: updateTodo } = useMutation({
		mutationFn: (updateTodo: UpdateTodoContent) =>
			TodoAPI.updateTodoContent(updateTodo),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["todos"], exact: true }),
	});

	const handleClickUpdateTodo = () => {
		if (!updateInputRef) return;
		if (!updateInputRef.current) return;

		const updateValue = updateInputRef.current["value"] as string;

		if (updateValue.length === 0) return;

		const updateData = {
			todoId,
			content: updateValue,
		};
		updateTodo(updateData);
		handleToggleIsEditing();
	};

	return (
		<>
			<InputGroup
				ref={updateInputRef}
				helpText="수정할 내용을 작성하여 주십시오"
				wrapperClassName="w-96"
			/>
			<div className="flex flex-row gap-x-2">
				<Button
					onClick={handleToggleIsEditing}
					size="sm"
					className="w-1/2"
				>
					취소
				</Button>
				<Button
					onClick={handleClickUpdateTodo}
					size="sm"
					className="w-1/2"
				>
					적용
				</Button>
			</div>
		</>
	);
}

export default UpdateTodoForm;
