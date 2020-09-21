import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClassListComponent } from './class/class-list/class-list.component';
import { ClassAddComponent } from './class/class-add/class-add.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { StudentListComponent } from './student/student-list/student-list.component';
import { EditStudentComponent } from './student/edit-student/edit-student.component';
import { EditMarksComponent } from './student/edit-marks/edit-marks.component';
import { ClassComponent } from './class/class.component';
import { StudentComponent } from './student/student.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';
import { StudentEditDetailsComponent } from './student/student-details/student-edit-details.component';
import { StudentLoginComponent } from './student/student-login/student-login.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ClassListComponent,
    ClassAddComponent,
    StudentListComponent,
    EditStudentComponent,
    EditMarksComponent,
    ClassComponent,
    StudentComponent,
    StudentDetailsComponent,
    StudentEditDetailsComponent,
    StudentLoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
