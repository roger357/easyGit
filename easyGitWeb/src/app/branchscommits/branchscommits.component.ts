import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { GitService } from '../git.service'
import { Commit } from '../entities/commit'
import { and } from '@angular/router/src/utils/collection';
import { empty } from 'rxjs/Observer';

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
  commitsPivotArray: Commit[] = [];
  commit: Commit;
  commitsSearch: Commit[] = [];

  selectedFilter: number;
  searchParam: string;

  switchedTables: boolean;

  years: number[] = [];
  months: number[] = [];
  days: number[] = [];
  leap: boolean;

  disableFilter: boolean;
  emptyFlag: boolean;
  
  constructor(
    private route: ActivatedRoute,
    private gitService: GitService,
    private location: Location
  ) { 
    // refrescar ruta
    route.params.subscribe(val => {
      const branch = this.route.snapshot.paramMap.get('name');
      if (branch != this.branchName && this.branchName != null){
        this.branchName = this.route.snapshot.paramMap.get('name');
        this.commitsToShow = [];
        this.commits = [];
        this.switchedTables = false;
        this.searchParam = "";
        this.getBranchCommits(0); 
      } 
    });
    this.maxPagesView = 18;
    this.itemPerPage = 10;
    this.pageNumber = 1;
    this.selectedFilter = 0;
    this.switchedTables = false;
    this.disableFilter = true;
  }

  ngOnInit() {
    this.branchName = this.route.snapshot.paramMap.get('name'); 
    this.getBranchCommits(0);    
  }

  getBranchCommits(searchType: number): void {
    this.gitService.getBranchCommits(this.branchName, (this.maxPagesView * this.itemPerPage), searchType, this.searchParam)
    .subscribe(commits => {
      if(commits.length == 0) {
        this.emptyFlag = true;
      }else{
        if( !this.switchedTables ){
          this.commits = commits;
        }else{
          this.commitsSearch = commits;
        } 
      }           
    },
      (err) => console.log('Error in BranchsCommitsComponent#getBranchCommits()'),
      () => {
        if( this.emptyFlag) {
          this.emptyFlag = false;
          if( !this.switchedTables ){
            this.commitsToShow = this.commits;
          }else{
            this.commitsToShow = this.commitsSearch;
          } 
        }else {
          this.calculatePageInitial();
        }        
      });
  }

  calculatePageInitial(): void {
    if(this.switchedTables) {
      this.commitsToShow = [];
      this.commitsPivotArray = this.commitsSearch;
    }else{
      this.commitsToShow = [];
      this.commitsPivotArray = this.commits;
    }
    this.totalPages = Math.ceil(this.commitsPivotArray.length / this.itemPerPage);
    console.log('switch='+this.switchedTables+ ' Total pages= '+this.totalPages);
    this.calculatePages(1);
    this.disableFilter = false;
  }

  calculatePages(initialPage: number): void {
    console.log('Calculando paginas...');
    this.pages = [];
    for( let i = initialPage; this.pages.length < this.maxPagesView && i<= this.totalPages; i++ ){
      this.pages.push(i);
    }
    if(this.totalPages > this.maxPagesView){
      this.pages.push(0);
    }else{
      this.maxPagesView = this.totalPages;
    }
    this.commitsToShow = this.commitsPivotArray.slice(0, this.itemPerPage);
    this.pageNumber = this.pages[0];
    console.log(this.commitsToShow.length);
  }

  refreshCommitsToShow(): void {
    console.log('Refrescando lista de Commits...')
    let commitLength: number = this.commitsPivotArray.length;
    let infLim: number = 0;
    let supLim: number = this.pageArrayPsotion * this.itemPerPage;
    console.log('commitLength ' + commitLength);
    console.log('supLim ' + supLim);
    console.log('commits ' + this.commitsPivotArray.length);
    if(this.pageArrayPsotion > 1){
      infLim = supLim - this.itemPerPage;
    }
    console.log('infLim ' + infLim);
    if(supLim < commitLength){
       this.commitsToShow = this.commitsPivotArray.slice(infLim, supLim);
    }else {
      this.commitsToShow = this.commitsPivotArray.slice(infLim, commitLength);
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
    this.gitService.getCommitsPage(this.branchName, pageNumber, this.itemPerPage, this.maxPagesView, this.selectedFilter, this.searchParam)
    .subscribe(commits => {
      if( !this.switchedTables ){
        this.commits = commits
      }else{
        this.commitsSearch = commits
      }      
    },
      (err) => console.log('Error in BranchsCommitsComponent#getNextOrPreviousCommitGroup()'),
      () => this.calculatePages(pageNumber));
  }  

  goBack(): void {
    this.location.back();
  }

  loadCommit(commit: Commit): void {
    this.commit = commit;
  }

  setSelectedFilter(filter: number): void{
    this.selectedFilter = filter;
  }

  pivotTables(): void {
    if(this.switchedTables) {
      this.commitsPivotArray = this.commits;
      this.switchedTables = false;
      this.maxPagesView = 18;
      if(this.commitsSearch.length > 0){
        this.calculatePageInitial();
      }
      console.log("false");
    }else{
      this.commitsPivotArray = this.commitsSearch;
      this.switchedTables = true;
      console.log("true");
      if(this.commitsSearch.length > 0){
        this.calculatePageInitial();
      }
    }
  }

  searchCriteria(param: string): void {
    if(this.selectedFilter == 1) {
      let dates = param.split('*');
      if(dates[0] && dates[1]) {
        this.commitsToShow = [];
        this.searchParam = param;
        this.getBranchCommits(this.selectedFilter); 
      }
    }else {
      this.commitsToShow = [];
      this.searchParam = param;
      this.getBranchCommits(this.selectedFilter); 
    }
  }
  
}
