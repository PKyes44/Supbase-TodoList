"use client";
import TodoAPI from "@/api/todos.api";
import Button from "@/components/Button/Button";
import InputGroup from "@/components/Input/InputGroup";
import { TodoErrorMsgs, TodoType } from "@/types/todos.type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { ComponentProps, useRef, useState } from "react";

const todoKeys = {
	content: "content",
	startDate: "startDate",
	endDate: "endDate",
};
const initialErrorMsgs: TodoErrorMsgs = {
	content: null,
	startDate: null,
	endDate: null,
	global: null,
};

function CreateTodoForm() {
	const formRef = useRef(null);
	const router = useRouter();
	const [errorMsgs, setErrorMsgs] = useState(initialErrorMsgs);
	const { mutate: insertTodo } = useMutation({
		mutationFn: (insertTodo: TodoType) => TodoAPI.insertTodo(insertTodo),
		onSuccess: () => {
			router.replace("/");
		},
		onError: (data) => {
			handleErrorMsgs("global", data.message);
		},
	});

	const handleSubmitCreateTodo: ComponentProps<"form">["onSubmit"] = async (
		e
	) => {
		e.preventDefault();

		setErrorMsgs(initialErrorMsgs);

		if (!formRef)
			return handleErrorMsgs("global", "생성할 정보를 작성하여 주십시오");
		if (!formRef.current)
			return handleErrorMsgs("global", "생성할 정보를 작성하여 주십시오");

		if (!formRef.current[todoKeys.content])
			return handleErrorMsgs("content", "할 일을 작성하여 주십시오");
		if (!formRef.current[todoKeys.startDate])
			return handleErrorMsgs("startDate", "시작일을 작성하여 주십시오");
		if (!formRef.current[todoKeys.startDate])
			return handleErrorMsgs("endDate", "종료일을 작성하여 주십시오");

		const content = formRef.current[todoKeys.content]["value"];
		const startDate = formRef.current[todoKeys.startDate]["value"];
		const endDate = formRef.current[todoKeys.endDate]["value"];

		if (content === "")
			return handleErrorMsgs("content", "할 일을 작성하여 주십시오");
		if (startDate === "")
			return handleErrorMsgs("startDate", "시작일을 작성하여 주십시오");
		if (endDate === "")
			return handleErrorMsgs("endDate", "종료일을 작성하여 주십시오");

		if (startDate > endDate)
			return handleErrorMsgs("endDate", "종료일이 시작일보다 빠릅니다");

		const todoData: TodoType = {
			content,
			startDate,
			endDate,
			isCompleted: false,
		};
		console.log("todoData: ", todoData);
		const response = insertTodo(todoData);
		console.log("create todo response: ", response);
	};

	const handleErrorMsgs = (target: string, message: string) => {
		setErrorMsgs((prevErrorMsgs) => {
			return {
				...prevErrorMsgs,
				[target]: message,
			};
		});
	};

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmitCreateTodo}
			className="flex flex-col items-center mt-10 gap-y-3"
		>
			<InputGroup
				errorText={errorMsgs.content}
				name={todoKeys.content}
				wrapperClassName="w-96"
			>
				할 일
			</InputGroup>
			<InputGroup
				errorText={errorMsgs.startDate}
				name={todoKeys.startDate}
				wrapperClassName="w-96"
				type="date"
			>
				시작일
			</InputGroup>
			<InputGroup
				errorText={errorMsgs.endDate}
				name={todoKeys.endDate}
				wrapperClassName="w-96"
				type="date"
			>
				종료일
			</InputGroup>
			<Button errorText={errorMsgs.global} className="w-96 mt-4">
				Todo 생성하기
			</Button>
		</form>
	);
}

export default CreateTodoForm;
