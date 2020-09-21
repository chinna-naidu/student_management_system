import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-class-add',
  templateUrl: './class-add.component.html',
  styleUrls: ['./class-add.component.css'],
})
export class ClassAddComponent implements OnInit {
  myform: FormGroup;
  @Output() success = new EventEmitter<boolean>();
  isLoading = false;
  constructor(
    private httpService: HttpService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.myform = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      subjects: new FormArray([]),
    });
  }
  onSubmit() {
    console.log(this.myform.value);
    this.isLoading = true;
    const formData = this.myform.value;
    this.httpService.createClass(formData.name, formData.subjects).subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.success.emit(true);
        this.myform.reset();
        this.deleteAllFormControls();
        this.matSnackBar.open('Successfully created a Classroom', 'close', {
          duration: 10000,
        });
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  addFormControl() {
    (this.myform.get('subjects') as FormArray).push(
      new FormControl(null, [Validators.required], [])
    );
  }
  get formControls() {
    return (this.myform.get('subjects') as FormArray).controls;
  }
  deleteFormControl(index: number) {
    (this.myform.get('subjects') as FormArray).removeAt(index);
  }
  deleteAllFormControls() {
    (this.myform.get('subjects') as FormArray).clear();
  }
}
