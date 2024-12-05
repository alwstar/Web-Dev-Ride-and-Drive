import { Injectable } from '@angular/core';
import { Car } from '../interfaces/car';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  constructor(private http: HttpClient) {}

  public getAllCars(): Observable<Array<Car>> {
    return this.http.get<Array<Car>>('http://localhost:3030/');
  }

  public getAllSuperCars(): Observable<Array<Car>> {
    return this.http.get<Array<Car>>('http://localhost:3030/supercars');
  }

  public getCarById(carId: string): Observable<Car | undefined> {
    return this.http.get<Car | undefined>(`http://localhost:3030/car/${carId}`);
  }
}
