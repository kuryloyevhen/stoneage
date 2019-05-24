import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()

export class CardsService {
   constructor(private http: HttpClient) {}

   url: string = "http://127.0.0.1:3000/cards";

   getAllCards(): Observable<any> {
      return this.http.get<any>(this.url);
   }
}
