import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddBookService {
  constructor(private http: HttpClient) {}

  addBook(book: any): Observable<any> {
    return this.http.post<any>("http://localhost:8080/book/create", book);
  }


}
