import { Component, inject } from '@angular/core';
import { TodoFormComponent } from './ui/todo-form.component';
import { CreateTodo, Todo } from '../shared/interfaces/todo';
import { TodoService } from '../shared/data-access/todo.service';
import { TodoListComponent } from './ui/todo-list.component';
@Component({
    standalone: true,
    imports: [TodoFormComponent, TodoListComponent],
    selector: 'app-home',
    template: `
    <h2>Todo</h2>
    <app-todo-form (todoSubmitted)="createTodo($event)" />
    <app-todo-list [todos]="todoService.todos()" />
    `,
    styles: [``]
})  
export default class HomeComponent {
    todoService = inject(TodoService);

    createTodo(todo: CreateTodo) {
        this.todoService.addTodo(todo);
    }
}