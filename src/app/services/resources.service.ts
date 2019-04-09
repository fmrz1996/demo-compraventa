import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/user.class';
import { Sale } from '../models/sale.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  usersURL = 'https://compraventa-bb562.firebaseio.com/users.json';
  salesURL = 'https://compraventa-bb562.firebaseio.com/sales.json';

  constructor( private http: HttpClient ) { }

  getUsers(){
    return this.http.get(this.usersURL)
    .pipe(
       map( data => data )
     );
  }

  getCountries(){
    const url = 'https://restcountries.eu/rest/v2/region/americas';
    return this.http.get(url);
  }

  getProducts(){
    const url = 'http://www.somaku.com/posts';
    return this.http.get(url);
  }

  getSales(){
    return this.http.get(this.salesURL)
    .pipe(
       map( data => data )
     );
  }

  createUser(user: User){
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<User>(this.usersURL, body, {headers})
    .pipe(
      map((data:any) => {
           return data;
         }));
  }

  saveSale(sale: Sale){
    let body = JSON.stringify(sale);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Sale>(this.salesURL, body, {headers})
    .pipe(
      map((data:any) => {
           return data;
         }));
  }
}
