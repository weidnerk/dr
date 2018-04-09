import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CMSCompany } from '../_models/company';
import { DealerParamService } from '../_services/dealerparam.service'

@Component({
    selector: 'dealer-review',
    templateUrl: './dealerreview.component.html',
    styleUrls: ['./dealerreview.component.css']
  })
  export class DealerReviewComponent { 

    paramDealer: CMSCompany;
    firstName: string;
    lastName: string;
  
    constructor(private route: Router, private dealerParams: DealerParamService) { 
    }

    ngOnInit() {
      
      // subscribe to the currentDealer observable
      this.dealerParams.currentDealer.subscribe(
        paramDealer => {
          this.paramDealer = paramDealer;
          this.firstName = this.getFirstName(this.paramDealer.Contacts[0].ContactName);
          this.lastName = this.getLastName(this.paramDealer.Contacts[0].ContactName);
        }
      );
    }

    return(){
        this.route.navigate(['/dealerreactive']);
    }
    welcome(){
      this.route.navigate(['/welcome']);
  }

  getFirstName(contact: string): string {
    var stringArray = contact.split(/(\s+)/);
    return stringArray[0];
  }
  getLastName(contact: string): string {
    var stringArray = contact.split(/(\s+)/);
    return stringArray[2];
  }

}