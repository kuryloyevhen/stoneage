import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
	constructor(private http: HttpClient) {}

	private baseUrl: string = "http://127.0.0.1:3000";
	public isAuthorized: boolean = false;
	public isPlaying: boolean = false;
	public user: object;

	login(data): Observable<any> {
		console.log("login");
		console.log(data);
		return this.http.post<any>(this.baseUrl + "/login", data);
	}

	register(data): Observable<any> {
		console.log("register");
		console.log(data);
		return this.http.post<any>(this.baseUrl + "/register", data);
	}

	logout(): Observable<any> {
		return this.http.get<any>(this.baseUrl + "/logout");
	}
}
