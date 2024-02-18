import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Todo } from '../../shared/interfaces/todo';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../shared/data-access/todo.service';
@Component({
  imports: [RouterLink],
  standalone: true,
  selector: 'app-todo-list',
  template: ` <ul>
    @for(todo of todos; track todo.id) {
    <li class="flex items-center">
      <input (change)="updateCompleted(todo)" type="checkbox" [value]="todo.completed" />
      <a routerLink="/detail/{{ todo.id }}">{{ todo.title }}</a>
      <button (click)="todoService.removeTodo(todo.id)" class="btn btn-danger">X</button>
    </li>
    } @empty {
    <li>Nothing to do!</li>
    }
  </ul>`,
  styles: [
    `
      ul {
        margin: 0;
        padding: 1rem;
        li {
          list-style: none;
        }
      }
    `,
  ],
})
export class TodoListComponent {
  @Input({ required: true }) todos!: Todo[];
  todoService = inject(TodoService);

  updateCompleted(todo: Todo) {
    const updateTodo: Todo = {
        ...todo,
        completed: !todo.completed
    }
    this.todoService.updateTodo(updateTodo);
  }
}
