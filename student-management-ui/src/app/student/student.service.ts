import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Marks } from '../modals/student.modal';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  classId: string;
  studentsChanged = new Subject<boolean>();
  constructor(private httpService: HttpService) {}
  setClassId(id: string) {
    this.classId = id;
  }
  getClassId() {
    return this.classId;
  }
  addStudent(regid: string, name: string, email: string) {
    return this.httpService.addStudentOfClass(this.classId, regid, name, email);
  }
  getStudents(page: number, size: number) {
    return this.httpService.getStudentsOfClass(this.classId, page, size);
  }
  getStudent(id: string) {
    return this.httpService.getOneStudent(id);
  }
  updateStudent(id: string, name: string, email: string, regid: string) {
    return this.httpService.updateStudentOfClass(id, regid, name, email);
  }
  getSubjects() {
    return this.httpService.getSubjectsOfClass(this.classId);
  }

  getMarks(id: string) {
    return this.httpService.getMarksOfStudent(id);
  }
  addMarks(id: string, marks: Marks[]) {
    return this.httpService.addMarksOfStudent(id, marks);
  }
  countStudents() {
    return this.httpService.getStudentsCount(this.classId);
  }
  deleteStudent(studentid: string) {
    return this.httpService.deleteOneStudent(this.classId, studentid);
  }
  getResult(regid: string) {
    return this.httpService.getResultOfStudent(regid);
  }
}
