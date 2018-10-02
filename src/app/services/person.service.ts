import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpService) { }

  getPerson(pid){
    return this.http.requestPost(`selectone.php/`,{'pid':pid})
             .toPromise() as Promise<any>;

  }
}
