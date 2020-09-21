import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ClassListComponent } from './class/class-list/class-list.component';
import { IsauthGuard } from './auth/isauth.guard';
import { ClassAddComponent } from './class/class-add/class-add.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { ClassComponent } from './class/class.component';
import { StudentComponent } from './student/student.component';
import { EditStudentComponent } from './student/edit-student/edit-student.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';
import { MessageComponent } from './student/message.compnent';
import { EditMarksComponent } from './student/edit-marks/edit-marks.component';
import { StudentEditDetailsComponent } from './student/student-details/student-edit-details.component';
import { StudentLoginComponent } from './student/student-login/student-login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [IsauthGuard],
    component: ClassComponent,
  },
  {
    path: 'students/:classid',
    canActivate: [IsauthGuard],
    component: StudentComponent,
    children: [
      {
        path: 'list',
        component: StudentListComponent,
        children: [
          { path: '', component: MessageComponent, pathMatch: 'full' },
          {
            path: 'details/:id',
            component: StudentEditDetailsComponent,
            children: [
              {
                path: '',
                component: StudentDetailsComponent,
                pathMatch: 'full',
              },
              { path: 'marks/:id', component: EditMarksComponent },
            ],
          },
        ],
      },
      { path: 'edit/:id', component: EditStudentComponent },
      { path: 'edit', component: EditStudentComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'result', component: StudentLoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
