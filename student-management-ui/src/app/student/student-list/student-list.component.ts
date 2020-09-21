import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from 'src/app/modals/student.modal';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  isLoading = false;
  @ViewChild('paginator') paginator: MatPaginator;
  studentsCount: number;
  constructor(private studentService: StudentService) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.studentService.countStudents().subscribe(
      (responseData: any) => {
        this.studentsCount = responseData.totalstudents;
      },
      (error) => {
        console.log(error);
      }
    );
    this.fetchStudents(1, 5);
    this.studentService.studentsChanged.subscribe(
      (data) => {
        this.fetchStudents(1, 5);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  fetchStudents(page: number, size: number) {
    this.isLoading = true;
    this.studentService.getStudents(page, size).subscribe(
      (responseData: Student[]) => {
        this.students = responseData;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
  onpageChange(event: PageEvent) {
    console.log(event);
    const page = event.pageIndex + 1;
    const size = event.pageSize;
    this.fetchStudents(page, size);
  }
}
