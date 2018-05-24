import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Branch} from './entities/branch';
import { Commit } from './entities/commit';
import { CommittedFile } from './entities/committedfile';

@Injectable()
export class GitService {

  private BASE_URL = 'http://roger357.pythonanywhere.com/commitviewer/';

  constructor(public http: HttpClient) { }

  getTopBranchs(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.BASE_URL + 'toplist/');
  }

  getBranchByNameTerm(searchTerm: string): Observable<Branch[]> {
    const url = `${this.BASE_URL}branchs?searchTerm=${searchTerm}`
    return this.http.get<Branch[]>(url);
  }

  getAllBranchs(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.BASE_URL + 'allbranchs/');
  }

  getBranchCount(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + 'branchcount/');
  }

  getBranchPage(itemsPerPage: number, pageNumber: number): Observable<Branch[]> {
    const url = `${this.BASE_URL}branchpage?itemsPerPage=${itemsPerPage}&pageNumber=${pageNumber}`
    return this.http.get<Branch[]>(url);
  }

  getCommit(sha: string, shortMessage: number): Observable<Commit> {
    const url = `${this.BASE_URL}commitdetail?sha=${sha}&shortMessage=${shortMessage}`
    return this.http.get<Commit>(url);
  }

  getCommitsCount(branchName: string): Observable<any> {
    const url = `${this.BASE_URL}commitscount?branch=${branchName}`
    return this.http.get<any>(url);
  }

  getBranchCommits(name: string, commits: number = 30, searchType: number = 0, searchParam: string): Observable<Commit[]> {
    const url = `${this.BASE_URL}branch/commits?branchName=${name}&commits=${commits}&searchBy=${searchType}&searchParam=${searchParam}`
    return this.http.get<Commit[]>(url);
  }

  getCommitsPage(branchName: string, page: number, itemPerPage: number, maxPagesView: number, searchType: number = 0, searchParam: string): Observable<Commit[]> {
    const url = `${this.BASE_URL}branch/commitsperpage?branchName=${branchName}&page=${page}&
    itemPerPage=${itemPerPage}&maxPagesView=${maxPagesView}&searchBy=${searchType}&searchParam=${searchParam}`
    return this.http.get<Commit[]>(url);
  }

  getCommitedFileDiffs(commitSHA: string): Observable<CommittedFile[]> {
    const url = `${this.BASE_URL}commitdetail/files/diffs?sha=${commitSHA}`
    return this.http.get<CommittedFile[]>(url);
  }

}
