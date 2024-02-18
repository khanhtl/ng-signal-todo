import { Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTodo } from '../../shared/interfaces/todo';
@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-todo-form',
  template: `
    <form [formGroup]="todoForm" (ngSubmit)="handleSubmit()">
      <input #title type="text" formControlName="title" placeholder="title..." />
      <input
        type="text"
        formControlName="description"
        placeholder="description..."
      />
      <button [disabled]="!todoForm.valid" type="submit">Add todo</button>
    </form>
  `,
  styles: [``],
})
export class TodoFormComponent {
  @Output() todoSubmitted = new EventEmitter<CreateTodo>();
  @ViewChild('title', {static: true}) title!: ElementRef;

  private fb = inject(FormBuilder);

  todoForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
  });

  handleSubmit() {
    this.todoSubmitted.emit(this.todoForm.getRawValue());
    this.todoForm.setValue({title: '', description: ''});
    this.title.nativeElement.focus();
  }
  ngOnInit() {
    this.title.nativeElement.focus();
  }
}
