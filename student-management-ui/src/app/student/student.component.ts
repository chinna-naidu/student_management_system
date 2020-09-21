import { Component, OnInit, AfterContentInit } from '@angular/core';
import { RouterLinkActive, ActivatedRoute } from '@angular/router';
import { StudentService } from './student.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  activeStudent: string;
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}
  ngOnInit() {
    let classId = this.route.snapshot.params.classid;
    this.studentService.setClassId(classId);
  }
}
