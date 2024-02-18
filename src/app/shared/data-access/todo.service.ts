import { Injectable, Signal, signal } from '@angular/core';

import { CreateTodo, Todo } from '../interfaces/todo';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    #todos = signal<Todo[]>([]);
    todos = this.#todos.asReadonly();

    addTodo(todo: CreateTodo) {
        this.#todos.update((todos) => [...todos, {
            ...todo,
            completed: false,
            id: Date.now().toString(),
        }]);
    }

    removeTodo(id: string) {
        this.#todos.update((todos) => {
            const deleteIndex = todos.findIndex(t => t.id === id);
            if(deleteIndex >=0) {
                todos.splice(deleteIndex, 1)
            }
            return [...todos];
        })
    }

    clearCompletedTodo() {
        this.#todos.update((todos) => todos.filter(t => !t.completed));
    }

    updateTodo(todo: Todo) {
        this.#todos.update((todos => {
            const updateIndex = todos.findIndex(t => t.id === todo.id);
            
            if(updateIndex >=0) {
                return [...todos.slice(0, updateIndex), todo, ...todos.slice(updateIndex + 1)]
            }
            return todos
        }))
    }
}