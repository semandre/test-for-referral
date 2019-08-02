import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable ({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private static getHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders ({ 'Accept-Language': 'en-US' })
    };
  }

  private static handleError(err: HttpErrorResponse, caught: any): Observable<any> {
    return throwError (err);
  }

  get(url: string): Observable<any> {
    return this.request ({ url, method: 'GET' });
  }

  post(url: string, body: any): Observable<any> {
    return this.request ({ url, body, method: 'POST' });
  }

  delete(url: string): Observable<any> {
    return this.request ({ url, method: 'DELETE' });
  }

  put(url: string, body: any): Observable<any> {
    return this.request ({ url, body, method: 'PUT' });
  }

  request(options: ApiServiceOption): Observable<any> {
    const httpOptions = { ...options, ...ApiService.getHeaders () };
    const apiUrl = environment.apiUrl;

    return this.http.request (
      options.method,
      apiUrl + options.url,
      httpOptions
    ).pipe (
      catchError (ApiService.handleError)
    );
  }
}

class ApiServiceOption {
  method?: string;
  url: string;
  body?: any;
}
