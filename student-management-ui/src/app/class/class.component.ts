import { Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ClassListComponent } from './class-list/class-list.component';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
})
export class ClassComponent {
  @ViewChild('tab') matTab: MatTabGroup;
  @ViewChild('list') classList: ClassListComponent;
  constructor() {}
  onSuccess() {
    this.classList.isLoading = true;
    this.classList
      .fetchClasses()
      .then(() => {
        this.classList.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
