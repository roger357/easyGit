import { Component, OnInit } from '@angular/core';
import { Branch } from '../entities/branch';
import { Commit } from '../entities/commit';
import { GitService } from '../git.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  branchs: Branch[] = [];
  pageNumber: number;
  pageNumbersForShow: number = 4;
  sha: string;
  commit: Commit;

  constructor(private gitService: GitService) { }

  ngOnInit() {
    this.getTopBranchs();
    this.pageNumber = 1;
  }

  getTopBranchs(): void {
    console.log('top Branchs');
    this.gitService.getTopBranchs()
      .subscribe(branchs => this.branchs = branchs,
        (err) => console.error(err),
        () => console.log("observable complete"));
      console.log(this.branchs.length);
  }

  getCommit(sha: string): void {
    console.log('Get Commit');
    this.gitService.getCommit(sha)
      .subscribe(commit => this.commit = commit,
        (err) => console.error(err),
        () => console.log("observable complete"));
      console.log('this.commit.sha');
  }

  reload(): void {
    this.getTopBranchs();
  }

  loadCommit(sha: string): void {
    this.getCommit(sha);
  }
}
