import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Marks } from 'src/app/modals/student.modal';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-marks',
  templateUrl: './edit-marks.component.html',
  styleUrls: ['./edit-marks.component.css'],
})
export class EditMarksComponent implements OnInit {
  subjects: string[] = [];
  myform: FormGroup;
  id: string;
  isLoading = false;
  editMode = false;
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.id = this.route.snapshot.params.id;
    this.studentService.getMarks(this.id).subscribe((responseData: Marks[]) => {
      if (responseData.length == 0) {
        this.editMode = false;
        this.CreateFormForAdding();
      } else {
        this.CreateFormForUpdating(responseData);
        this.editMode = true;
      }
    });
  }
  onSubmit() {
    const marks: Marks[] = [];
    let dict = this.myform.value;
    for (let sub of Object.keys(dict)) {
      marks.push({ subject: sub, score: dict[sub] });
    }
    this.isLoading = true;
    this.studentService.addMarks(this.id, marks).subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.myform.reset();
        this.matSnackBar.open(
          `Successfully ${this.editMode ? 'Edited' : 'Added'} Marks`,
          'close',
          {
            duration: 10000,
          }
        );
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
  CreateFormForAdding() {
    const formControls = {};
    this.studentService.getSubjects().subscribe(
      (responseData: string[]) => {
        this.subjects = responseData;
        for (let sub of this.subjects) {
          formControls[sub] = new FormControl(null, [Validators.required]);
        }
        this.myform = new FormGroup(formControls);
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  CreateFormForUpdating(marks: Marks[]) {
    const formControls = {};
    for (let mark of marks) {
      this.subjects.push(mark.subject);
      formControls[mark.subject] = new FormControl(mark.score, [
        Validators.required,
      ]);
    }
    this.myform = new FormGroup(formControls);
    this.isLoading = false;
  }
}
