import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { Observable, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent implements OnInit {
  title = 'todo-list-16';

  students: Array<SchoolData> = [];
  tachers: Array<SchoolData> = [];

  private zipSchoolResponse$ = zip(
    this.getStudentsData(),
    this.getTeachersData()
  );

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    this.getSchoolData();
  }

  getSchoolData(): void {
    this.zipSchoolResponse$.subscribe({
      next: (response) => {
        console.log('STUDENTS', response[0]);
        console.log('TEACHERS', response[1]);
      },
    });
  }

  private getStudentsData(): Observable<Array<SchoolData>> {
    return this.schoolService.getStudents();
  }

  private getTeachersData(): Observable<Array<SchoolData>> {
    return this.schoolService.getTeachers();
  }
}
