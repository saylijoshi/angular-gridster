import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  getData() {
    return this.http.get(
      `https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole`
    );
  }
}
