import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { TodoService } from '../shared/data-access/todo.service';
@Component({
    standalone: true,
    imports: [RouterLink],
    selector: 'app-detail',
    template: `
    @if(todo(); as todo) {
        <a routerLink="/">Back to home</a>
        <h2>{{todo.title}}</h2>
        <p>{{todo.description}}</p>
    } @else {
        <p>Could not find todo...</p>
    }
    `,
    styles: [``]
})
export default class DetailComponent {
    private route = inject(ActivatedRoute);
    private todoService = inject(TodoService);

    paramMap = toSignal(
        this.route.paramMap
    )

    todo = computed(() => 
        this.todoService
        .todos()
        .find((todo) => todo.id === this.paramMap()?.get('id'))
    )
}