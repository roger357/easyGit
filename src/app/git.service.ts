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

  getBranchCommits(name: string): Observable<Commit[]> {
  	const url = `${this.BASE_URL}${name}/30/`
    return this.http.get<Commit[]>(url);
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

}
