import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';

@Injectable()
export class SignupService {
  private getEmailExistsUrl: string = environment.API_FLEX_ENDPOINT + 'emailtaken';
  private getCountyUrl:string  = environment.API_FLEX_ENDPOINT + 'county';
  
  constructor(private http: Http) { }

  checkEmailNotTaken(email: string): Observable<boolean> {
    let url = `${this.getEmailExistsUrl}/${email}`;
    return this.http.get(url)
      .map((response: Response) => <boolean>response.json())
      //.do(data => console.log('Email exists: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getCounty(zip: string): Observable<string> {
    let url = `${this.getCountyUrl}/${zip}`;
    return this.http.get(url)
        .map((response: Response) => <string> response.json())
        //.do(data => console.log('All: ' +  JSON.stringify(data)))
        .catch(this.handleError);
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let body = error.json();
    console.log('dealer service API error: ' + body.Message);

    // throw an application level error
    return Observable.throw(body.Message || "dealer.service: Server error - cannot connect to API");
  }
}