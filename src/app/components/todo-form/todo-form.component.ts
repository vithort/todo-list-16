import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TodoSignalsService } from './../../services/todo-signals.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: [],
})
export class TodoFormComponent {
  private todosSignalsService = inject(TodoSignalsService);

  allTodos = this.todosSignalsService.todosState();

  todosForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  handleCreateNewTodo(): void {
    if (this.todosForm.value && this.todosForm.valid) {
      const description = String(this.todosForm.controls['description'].value);
      const id = this.allTodos.length > 0 ? this.allTodos.length + 1 : 1;
      const title = String(this.todosForm.controls['title'].value);
      const done = false;

      this.todosSignalsService.updateTodos({ id, title, description, done });
    }
  }
}
