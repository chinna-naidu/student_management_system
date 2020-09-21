import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from 'src/app/modals/student.modal';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  myform: FormGroup;
  id: string;
  isLoading = false;
  editMode = false;
  constructor(
    private studentService: StudentService,
    private matSnackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.myform = new FormGroup({
      regid: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
    let regid = null;
    this.route.params.subscribe((params) => {
      this.id = params.id;
      if (this.id) {
        this.isLoading = true;
        this.editMode = true;
        this.studentService
          .getStudent(this.id)
          .subscribe((responseData: Student) => {
            this.isLoading = false;
            this.myform.setValue({
              regid: responseData.regid,
              name: responseData.name,
              email: responseData.email,
            });
          });
      } else {
        this.editMode = false;
      }
    });
  }
  onSubmit() {
    if (this.editMode) {
      this.updateStudentToClass();
    } else {
      this.addStudentToClass();
    }
  }
  addStudentToClass() {
    this.isLoading = true;
    const values = this.myform.value;
    this.studentService
      .addStudent(values.regid, values.name, values.email)
      .subscribe(
        (responseData) => {
          console.log(responseData);
          this.isLoading = false;
          this.myform.reset();
          this.matSnackBar.open('Student Added Sucessfully', 'close', {
            duration: 10000,
          });
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
  }
  updateStudentToClass() {
    this.isLoading = true;
    const values = this.myform.value;
    this.studentService
      .updateStudent(this.id, values.name, values.email, values.regid)
      .subscribe(
        (responseData) => {
          this.isLoading = false;
          this.myform.reset();
          this.matSnackBar.open('Student Updated Sucessfully', 'close', {
            duration: 10000,
          });
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
  }
}
