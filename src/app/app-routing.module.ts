import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { BranchsComponent } from './branchs/branchs.component';
import { BranchdetailComponent } from './branchdetail/branchdetail.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'branchs', component: BranchsComponent },
  {path: 'detail/:name', component: BranchdetailComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
