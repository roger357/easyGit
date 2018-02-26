import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Branch} from './entities/branch';
import { Commit } from './entities/commit'

@Injectable()
export class GitService {

  private BASE_URL = 'http://127.0.0.1:5002/commitviewer/';

  constructor(public http: HttpClient) { }

  getTopBranchs(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.BASE_URL + 'toplist/');
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

  getCommit(sha: string): Observable<Commit> {
    const url = `${this.BASE_URL}commitdetail?sha=${sha}`
    return this.http.get<Commit>(url);
  }

  getCommitsCount(branchName: string): Observable<any> {
    const url = `${this.BASE_URL}commitscount?branch=${branchName}`
    return this.http.get<any>(url);
  }

  getBranchCommits(name: string, commits: number = 30): Observable<Commit[]> {
    const url = `${this.BASE_URL}branch/commits?branchName=${name}&commits=${commits}`
    return this.http.get<Commit[]>(url);
  }

  getCommitsPage(branchName: string, page: number, itemPerPage: number, maxPagesView: number): Observable<Commit[]> {
    const url = `${this.BASE_URL}branch/commitsperpage?branchName=${branchName}&page=${page}&itemPerPage=${itemPerPage}&maxPagesView=${maxPagesView}`
    return this.http.get<Commit[]>(url);
  }

}
