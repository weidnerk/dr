import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

import { CMSCompany } from '../_models/company';
import { environment } from '../../environments/environment';

@Injectable()
export class DealerService {

    private postDealerUrl:string  = environment.API_ENDPOINT + 'company';
    private putDealerUrl:string  = environment.API_ENDPOINT + 'company';
    private getAccountUrl:string  = environment.API_FLEX_ENDPOINT + 'makeflexaccount';
    private getCompanyFromContactUrl:string  = environment.API_FLEX_ENDPOINT + 'company/companyfromcontact';
    private postFlexDealerMatchUrl:string  = environment.API_FLEX_ENDPOINT + 'company/flexdealermatch';
    private postCompanyUrl:string  = environment.API_FLEX_ENDPOINT + 'company/storecompany';
    
    constructor(private http: Http) { }

    postDealer(company: CMSCompany): Observable<CMSCompany> {
        
        let url: string = this.postDealerUrl;
        let body = JSON.stringify(company);
        //let body = "{\"CompanyName\":\"xyz motor\"}";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: "post" });
            
        return this.http.post(url, body, options)
            .map((response: Response) => <CMSCompany>response.json())
            //.do(data => console.log('show company: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    putDealer(dealer: CMSCompany): Observable<CMSCompany> {
        
        let url = `${this.putDealerUrl}/${dealer.CompanyID}`;
        let body = JSON.stringify(dealer);
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.put(url, body, options)
            .map((response: Response) => <CMSCompany> response.json())
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }
        
    // Create dealer credentials
    getAccount(cmsid: number): Observable<string> {
        let url = `${this.getAccountUrl}/${cmsid}`;
        return this.http.get(url)
            .map((response: Response) => <string> response.json())
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    // We were supplied a contactid, so fill form with existing dealer
    getCompanyFromContact(contactid: number): Observable<CMSCompany> {
        let url = `${this.getCompanyFromContactUrl}/${contactid}`;
        return this.http.get(url)
            .map((response: Response) => <CMSCompany>response.json())
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    postFlexDealerMatch(company: CMSCompany): Observable<CMSCompany> {
        
        let url: string = this.postFlexDealerMatchUrl;
        let body = JSON.stringify(company);
        //let body = "{\"CompanyName\":\"xyz motor\"}";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: "post" });
            
        return this.http.post(url, body, options)
            .map((response: Response) => <CMSCompany>response.json())
            //.do(data => console.log('dealer match: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    postCompany(company: CMSCompany): Observable<CMSCompany> {
        
        let url: string = this.postCompanyUrl;
        let body = JSON.stringify(company);
        //let body = "{\"CompanyName\":\"xyz motor\"}";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: "post" });
            
        return this.http.post(url, body, options)
            .map((response: Response) => <CMSCompany>response.json())
            //.do(data => console.log('show company: ' +  JSON.stringify(data)))
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
