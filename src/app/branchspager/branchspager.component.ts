import { Component, Input, OnInit } from '@angular/core';
import { Branch } from '../entities/branch';
import { Commit } from '../entities/commit';
import { GitService } from '../git.service';

@Component({
  selector: 'app-branchspager',
  templateUrl: './branchspager.component.html',
  styleUrls: ['./branchspager.component.css']
})
export class BranchspagerComponent implements OnInit {

	itemPerPage: number;
	branchCount: number;
	maxPagesView: number;
	pageNumber: number;
	totalPages: number;
  branchs: Branch[] = [];
	pages: number[] = [];
  branchsToShow: Branch[] = [];
  commit: Commit;


  constructor(private gitService: GitService) { 
  	this.branchCount = 0;
  	this.pageNumber = 1;
  	this.itemPerPage = 5;
  	this.maxPagesView = 19;
   // this.maxPagesView = 10;
   }

  ngOnInit() {
  	this.getAllBranchs();
  }

  getAllBranchs(): void {
    console.log('All Branchs');
    this.gitService.getAllBranchs()
      .subscribe(branchs => this.branchs = branchs,
        (err) => console.log('Error in BranchspagerComponent#getAllBranchs()'),
        () => this.getBranchCount());
  }

  getBranchCount(): void {  	
    this.gitService.getBranchCount()
      .subscribe(branchCount => this.branchCount = branchCount,
      	(err) => console.log('Error in BranchspagerComponent#getBranchCount()'),
      	() => this.calculatePages());
  }

  calculatePages(): void {
  	console.log('Calculando paginas...')
  	this.totalPages = Math.ceil(this.branchCount / this.itemPerPage);
  	for(let i = 1; i <= this.totalPages; i++ ){
  		this.pages.push(i);
  	}
  	if(this.totalPages > this.maxPagesView){
  		this.pages.push(0);
  	}else{
  		this.maxPagesView = this.totalPages;
  	}
    this.branchsToShow = this.branchs.slice(0, this.itemPerPage);
  }

  refreshBranchsToShow(): void {
    console.log('Refrescando lista de branchs...')
    let branchLength: number = this.branchs.length;
    let infLim: number = 0;
    let supLim: number = this.pageNumber * this.itemPerPage;
    if(this.pageNumber > 1){
      infLim = supLim - this.itemPerPage;
    }
    if(supLim < branchLength){
       this.branchsToShow = this.branchs.slice(infLim, supLim);
    }else {
      this.branchsToShow = this.branchs.slice(infLim, branchLength);
    }    
  }

  adjustPages(): void {
  	this.pages = [];
  	for(let i = this.pageNumber; i <= this.totalPages; i++ ){
  		this.pages.push(i);
  	}
  	if(this.totalPages > this.maxPagesView){
  		this.pages.push(0);
  	}else{
  		this.maxPagesView = this.totalPages;
  	}
    this.refreshBranchsToShow();
  }


  setPageNumber(pageNumber: number): void{
    this.pageNumber = pageNumber;
    this.refreshBranchsToShow();
  }

  paginationBackward(): void {
    if(this.pageNumber > 1){
      this.pageNumber = this.pageNumber - 1;
      this.refreshBranchsToShow();
    } 
  }

  paginationForward(): void {
    if(this.pageNumber < this.maxPagesView){
      this.pageNumber = this.pageNumber + 1;
      this.refreshBranchsToShow();
    } 
  }


  getCommit(sha: string): void {
    console.log('Get Commit');
    this.gitService.getCommit(sha)
      .subscribe(commit => this.commit = commit,
        (err) => console.error(err),
        () => console.log("observable complete"));
      console.log('this.commit.sha');
  }

    loadCommit(sha: string): void {
    this.getCommit(sha);
  }
}
