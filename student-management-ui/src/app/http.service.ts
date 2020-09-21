import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { ReturnStatement } from '@angular/compiler';
import { Marks } from './modals/student.modal';

const url = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.put(url + 'login', {
      email,
      password,
    });
  }

  signup(name: string, email: string, password: string) {
    return this.http.post(url + 'signup', {
      name,
      email,
      password,
    });
  }

  createClass(name: string, subjects: string[]) {
    return this.http.post(url + 'createclass', {
      name: name,
      subjects: subjects,
    });
  }
  deleteClass(classid: string) {
    return this.http.delete(url + `class/${classid}`);
  }
  getClasses() {
    return this.http.get(url + 'getclasses');
  }

  addStudentOfClass(
    classid: string,
    regid: string,
    name: string,
    email: string
  ) {
    return this.http.post(url + 'students', {
      regid: regid,
      name: name,
      email: email,
      classid: classid,
    });
  }

  getStudentsOfClass(classid: string, page: number, size: number) {
    return this.http.get(url + `students/${classid}?page=${page}&size=${size}`);
  }

  getOneStudent(id: string) {
    return this.http.get(url + 'student/' + id);
  }
  updateStudentOfClass(id: string, regid: string, name: string, email: string) {
    return this.http.patch(url + 'students', {
      id: id,
      name: name,
      email: email,
      regid: regid,
    });
  }
  getSubjectsOfClass(classid: string) {
    return this.http.get(url + 'subjects/' + classid);
  }
  addMarksOfStudent(studentid: string, marks: Marks[]) {
    return this.http.post(url + 'marks/' + studentid, marks);
  }
  getMarksOfStudent(studentid: string) {
    return this.http.get(url + 'marks/' + studentid);
  }
  getStudentsCount(classid: string) {
    return this.http.get(url + 'class/' + classid);
  }
  deleteOneStudent(classid: string, studentid: string) {
    return this.http.delete(
      url + `delete/student?classid=${classid}&studentid=${studentid}`
    );
  }
  getResultOfStudent(regid: string) {
    return this.http.get(url + `result/${regid}`);
  }
}
