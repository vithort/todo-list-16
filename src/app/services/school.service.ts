import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SchoolData {
  name: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private students: Array<SchoolData> = [
    { name: 'Joao', id: '1' },
    { name: 'Jose', id: '2' },
    { name: 'Maria', id: '3' },
  ];

  private teachers: Array<SchoolData> = [
    { name: 'David', id: '1' },
    { name: 'Davi', id: '2' },
    { name: 'Felipe', id: '3' },
  ];

  constructor() {}

  getStudents(): Observable<Array<SchoolData>> {
    return of(this.students);
  }

  getTeachers(): Observable<Array<SchoolData>> {
    return of(this.teachers);
  }
}
