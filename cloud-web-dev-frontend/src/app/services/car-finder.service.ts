import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SuperCarLocation } from '../interfaces/super-car-location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarFinderService {
  constructor(private http: HttpClient) {}

  public getSuperCarLocation(): Observable<SuperCarLocation> {
    return this.http.get<SuperCarLocation>('http://localhost:3020/');
  }
}
