import { createActionGroup } from "@ngrx/store";

export const TodosActions = createActionGroup({
    'source': 'todos',
    events: {
        createTodo: (title: string) => ({payload: title}),
        deleteTodo: (id: number) => ({payload: id}),
        toggleMarkAsCompleteTodo: (id: number, isCompleted: boolean) => ({payload: {id, isCompleted}}),
    },
});