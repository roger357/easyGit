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

	pageNumber: number;
  pageArrayPsotion: number;

  branchName: string;
  commitsCount: number;

  itemPerPage: number;
  maxPagesView: number;

  totalPages: number;

  pages: number[] = [];
  commits: Commit[] = [];
  commitsToShow: Commit[] = [];
  commit: Commit;

  constructor(
    private route: ActivatedRoute,
    private gitService: GitService,
    private location: Location
  ) { 
    this.maxPagesView = 18;
    this.itemPerPage = 10;
    this.pageNumber = 1;
  }

  ngOnInit() {
    this.branchName = this.route.snapshot.paramMap.get('name'); 
    this.getCommitsCount();    
  }

  getCommitsCount(): void {
    this.gitService.getCommitsCount(this.branchName)
    .subscribe(commitsCount => this.commitsCount = commitsCount,
      (err) => console.log('Error in BranchsCommitsComponent#getCommitsCount()'),
      () => this.getBranchCommits());
  }

  getBranchCommits(): void {
    this.gitService.getBranchCommits(this.branchName, (this.maxPagesView * this.itemPerPage))
    .subscribe(commits => this.commits = commits,
      (err) => console.log('Error in BranchsCommitsComponent#getBranchCommits()'),
      () => this.calculatePageInitial());
  }

  calculatePageInitial(): void {
    console.log(this.commitsCount);
    this.totalPages = Math.ceil(this.commitsCount / this.itemPerPage);
    this.calculatePages(1);

  }

  calculatePages(initialPage: number): void {
    console.log('Calculando paginas...')
    this.pages = [];
    for( let i = initialPage; this.pages.length < this.maxPagesView && i<= this.totalPages; i++ ){
      this.pages.push(i);
    }
    if(this.totalPages > this.maxPagesView){
      this.pages.push(0);
    }else{
      this.maxPagesView = this.totalPages;
    }
    this.commitsToShow = this.commits.slice(0, this.itemPerPage);
    this.pageNumber = this.pages[0];
    console.log(this.commitsToShow.length);
  }

  refreshCommitsToShow(): void {
    console.log('Refrescando lista de Commits...')
    let commitLength: number = this.commits.length;
    let infLim: number = 0;
    let supLim: number = this.pageArrayPsotion * this.itemPerPage;
    console.log('commitLength ' + commitLength);
    console.log('supLim ' + supLim);
    console.log('commits ' + this.commits.length);
    if(this.pageArrayPsotion > 1){
      infLim = supLim - this.itemPerPage;
    }
    console.log('infLim ' + infLim);
    if(supLim < commitLength){
       this.commitsToShow = this.commits.slice(infLim, supLim);
    }else {
      this.commitsToShow = this.commits.slice(infLim, commitLength);
    }   
  }

  setPageNumber(pageNumber: number, pageArrayPsotion: number): void{
    this.pageNumber = pageNumber;
    this.pageArrayPsotion = pageArrayPsotion;
    this.refreshCommitsToShow();
  }

  paginationBackward(): void {
    if(this.pageNumber > 1){
      this.pageNumber = this.pageNumber - 1;
      this.refreshCommitsToShow();
    } 
  }

  paginationForward(): void {
    if(this.pageNumber < this.maxPagesView){
      this.pageNumber = this.pageNumber + 1;
      this.refreshCommitsToShow();
    } 
  }

  adjustPagesBackward(): void {
    this.pageNumber = this.pages[0] - 1
    //previous 95 items
    this.getNextOrPreviousCommitGroup(this.pages[0] - this.maxPagesView);
    this.commits = [];
    this.commitsToShow = [];
  }

  adjustPagesForward(): void {
    this.pageNumber = this.pages[this.pages.length - 2] + 1;
    //next 95 items
    this.getNextOrPreviousCommitGroup(this.pageNumber);
    this.commits = [];
    this.commitsToShow = [];
  }

  getNextOrPreviousCommitGroup(pageNumber: number): void {
    this.gitService.getCommitsPage(this.branchName, pageNumber, this.itemPerPage, this.maxPagesView)
    .subscribe(commits => this.commits = commits,
      (err) => console.log('Error in BranchsCommitsComponent#getNextOrPreviousCommitGroup()'),
      () => this.calculatePages(pageNumber));
  }  

  goBack(): void {
    this.location.back();
  }

  loadCommit(commit: Commit): void {
    this.commit = commit;
  }

}
