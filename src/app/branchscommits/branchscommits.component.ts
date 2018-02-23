import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { GitService } from '../git.service'
import { Commit } from '../entities/commit'

@Component({
  selector: 'app-branchscommits',
  templateUrl: './branchscommits.component.html',
  styleUrls: ['./branchscommits.component.css']
})
export class BranchsCommitsComponent implements OnInit {

	commits: Commit[] = [];

  constructor(
    private route: ActivatedRoute,
    private gitService: GitService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getBranchCommits();
  }

  getBranchCommits(): void {
    let name: string = this.route.snapshot.paramMap.get('name');
    this.gitService.getBranchCommits(name).subscribe(commits => this.commits = commits);
  }

  goBack(): void {
    this.location.back();
  }

}
