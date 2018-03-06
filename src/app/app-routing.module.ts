import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { BranchsComponent } from './branchs/branchs.component';
import { BranchsCommitsComponent } from './branchscommits/branchscommits.component';
import { CommitComponent } from './commit/commit.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'branchs', component: BranchsComponent },
  {path: 'detail/:name', component: BranchsCommitsComponent },
  {path: 'commit/:sha', component: CommitComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
