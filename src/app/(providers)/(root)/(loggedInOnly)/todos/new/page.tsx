import React from "react";
import CreateTodoForm from "./_components/CreateTodoForm";
import Page from "@/components/Page";

function CreateTodoPage() {
	return (
		<Page title="Create new Todo !">
			<CreateTodoForm />
		</Page>
	);
}

export default CreateTodoPage;
