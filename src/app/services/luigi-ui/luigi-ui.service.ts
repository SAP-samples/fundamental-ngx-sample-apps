import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LuigiUiService {

  private _luigiOption = new BehaviorSubject<any>(false);

  constructor(private route: ActivatedRoute, private _router: Router) {
    this.route.queryParams.subscribe(params => {
      if(params['luigi']){
        this.updateLuigiUi(true);
      }
    })
  }

  updateLuigiUi(show:boolean) {
    if(show) {
      this.addLuigQuery();
    }
    this._luigiOption.next(show);
  }

  get luigiOption() {
    return this._luigiOption;
  }

  addLuigQuery(){
    this._router.navigate([], {
     relativeTo: this.route,
     queryParams: {
       luigi: true
     },
     queryParamsHandling: 'merge',
   });
  }
}
