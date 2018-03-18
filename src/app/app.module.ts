import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GitService } from './git.service';
import { BranchsComponent } from './branchs/branchs.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomenavbarComponent } from './homenavbar/homenavbar.component';
import { CommitComponent } from './commit/commit.component';
import { BranchsCommitsComponent } from './branchscommits/branchscommits.component';
import { ShowloadingService } from './showloading.service';
import { NumberRounderUpPipe } from './numberRounderUp.pipe';
import { BranchspagerComponent } from './branchspager/branchspager.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BranchsComponent,
    HomenavbarComponent,
    CommitComponent,
    BranchsCommitsComponent,
    NumberRounderUpPipe,
    BranchspagerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [GitService, ShowloadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
