import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  sendConfirmation(refID: string): Observable<unknown> {
    return this.http.get(`https://sff.referralrock.com/webcallback`, {responseType: 'blob', params: {refID}});
  }
}
