import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from 'src/app/modals/student.modal';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  id: string;
  student: Student;
  isLoading = false;
  classid: string;
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.classid = this.studentService.getClassId();
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.isLoading = true;
      this.studentService.getStudent(this.id).subscribe(
        (responseData: Student) => {
          this.isLoading = false;
          this.student = responseData;
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
    });
  }
  onDeleteStudent() {
    this.studentService.deleteStudent(this.id).subscribe(
      (responseData) => {
        console.log(responseData);
        this.studentService.studentsChanged.next(true);
        this.router.navigate(['students', this.studentService.classId, 'list']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
