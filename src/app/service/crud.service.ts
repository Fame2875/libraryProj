import { Injectable } from '@angular/core';
import {catchError,map} from 'rxjs/operators';
import {Observable,pipe,throwError} from 'rxjs';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';

export class Book{
  _id! :string
  name! :string
  price! :string
  description!: string
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // Api
  REST_API: string = 'http://localhost:8000/api'

  //http header
  httpHeader = new HttpHeaders().set('Content-Type','application/json')

  constructor(private httpClient : HttpClient) { }

  //Add
  AddBook(data: Book): Observable<any> {
    let API_URL = `${this.REST_API}/add-book`
    return this.httpClient.post(API_URL,data)
    .pipe(
      catchError(this.handleError)
    )
  }
  //Get all book

  GetBooks(){
    return this.httpClient.get(`${this.REST_API}`);
  }

  //Get  book
  GetBook(id :string):Observable<any>{
    let API_URL = `${this.REST_API}/read-book/${id}`
    return this.httpClient.get(API_URL,{headers:this.httpHeader})
    .pipe(map((res:any) =>{
      return res || {}
    }),catchError(this.handleError)
    )
    
  }

  //Updatte
  updateBook(id:any , data:any): Observable<any>{
    let API_URL = `${this.REST_API}/update-book/${id}`;
    return this.httpClient.put(API_URL, data,{headers: this.httpHeader})
    .pipe(
      catchError(this.handleError)
    )
  }

  //Delete
  deleteBook(id: any): Observable<any>{
    let API_URL = `${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete(API_URL,{headers: this.httpHeader})
    .pipe(
      catchError(this.handleError)
    )
  }

  //Error
  handleError(error: HttpErrorResponse){
    let errorMessage ='';
    if(error.error instanceof ErrorEvent){
      //Handle client error
      errorMessage = error.error.message;
    }else{
      //handle server error
      errorMessage = `Error Code ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
