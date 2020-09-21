import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Class } from 'src/app/modals/class.modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css'],
})
export class ClassListComponent implements OnInit {
  createdClasses: Class[];
  subscription: Subscription;
  isLoading = false;
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.fetchClasses().then().catch();
  }
  fetchClasses() {
    this.isLoading = true;
    const promise = new Promise((resolve, reject) => {
      this.subscription = this.httpService.getClasses().subscribe(
        (responseData: Class[]) => {
          this.createdClasses = responseData;
          this.isLoading = false;
          resolve();
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
          reject();
        }
      );
    });
    return promise;
  }
  ondeleteClass(classid: string) {
    this.isLoading = true;
    this.httpService.deleteClass(classid).subscribe(
      (responseData) => {
        console.log(responseData);
        this.fetchClasses().then().catch();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
