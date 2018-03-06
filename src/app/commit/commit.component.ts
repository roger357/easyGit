import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commit } from '../entities/commit';
import { GitService } from '../git.service';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.css']
})
export class CommitComponent implements OnInit {

	@Input() commitHash: string;
	commit: Commit;

  constructor(
  	private route: ActivatedRoute, 
  	private gitService: GitService
  	) { }

  ngOnInit() {
  	this.commitHash = this.route.snapshot.paramMap.get('sha'); 
  	this.getCommitInfo();
  }

  getCommitInfo(): void {
	this.gitService.getCommit(this.commitHash, 0)
	.subscribe(commit => this.commit = commit,
		(err) => console.log('Error in CommitComponent#getCommitInfo()'));
  }

}
