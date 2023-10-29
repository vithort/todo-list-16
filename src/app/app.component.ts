import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { Observable, zip, of, map, from, filter } from 'rxjs';

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

  private ages = of(20, 30, 40, 50, 60, 70);

  private peopleData = from([
    { name: 'Vithor Carvalho', age: 20, profession: 'FE Developer' },
    { name: 'Cesar', age: 25, profession: 'UX' },
    { name: 'Caimi', age: 30, profession: 'BE Developer' },
    { name: 'Eros', age: 35, profession: 'BE Developer' },
    { name: 'Sara', age: 40, profession: 'FE Developer' },
  ]);

  private zipSchoolResponse$ = zip(
    this.getStudentsData(),
    this.getTeachersData()
  );

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    // this.getSchoolData();
    // this.getMultipliedAges();
    // this.getPeopleProfession();
    this.getDeveloperFilter();
  }

  getMultipliedAges(): void {
    this.ages.pipe(map((age) => age * 2)).subscribe({
      next: (response) => console.log('IDADE MULTIPLICADA:', response),
    });
  }

  getPeopleProfession(): void {
    this.peopleData.pipe(map((people) => people.profession)).subscribe({
      next: (response) => console.log('PROFISSAO:', response),
    });
  }

  getDeveloperFilter(): void {
    this.peopleData
      .pipe(
        filter((people) => people.profession === 'FE Developer'),
        map((people) => people.name)
      )
      .subscribe({
        next: (response) => console.log('FE Developer:', response),
      });
  }

  getSchoolData(): void {
    this.zipSchoolResponse$.subscribe({
      next: (response) => {
        console.log('STUDENTS:', response[0]);
        console.log('TEACHERS:', response[1]);
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
