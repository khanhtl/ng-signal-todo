import { Component, computed, inject } from '@angular/core';
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
    @if(todoService.todos().length) {
    <div>
      <p>Active: {{ activeTodos() }}</p>
      <p>Completed: {{ completedTodos() }}</p>
      @if(completedTodos() > 0) {
      <button (click)="todoService.clearCompletedTodo()">Clear Complete</button>
      }
    </div>
    }

    <app-todo-list [todos]="todoService.todos()" />
  `,
  styles: [``],
})
export default class HomeComponent {
  todoService = inject(TodoService);

  activeTodos = computed(
    () => this.todoService.todos().filter((t) => !t.completed).length
  );

  completedTodos = computed(
    () => this.todoService.todos().filter((t) => t.completed).length
  );

  createTodo(todo: CreateTodo) {
    this.todoService.addTodo(todo);
  }
}
