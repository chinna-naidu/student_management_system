import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { Student } from 'src/app/modals/student.modal';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css'],
})
export class StudentLoginComponent implements OnInit {
  isLoading = false;
  myform: FormGroup;
  student: Student;
  hasRegistered = '';
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.myform = new FormGroup({
      regid: new FormControl(null, [Validators.required]),
    });
  }
  onSubmit() {
    this.isLoading = true;
    const values = this.myform.value;
    this.studentService.getResult(values.regid).subscribe(
      (responseData: Student) => {
        this.student = responseData;
        if (!responseData) {
          this.hasRegistered = 'true';
        } else {
          this.hasRegistered = 'false';
        }
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
}
