import { Component } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { Car } from '../../interfaces/car';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [MatDividerModule, CommonModule, MatCardModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css',
})
export class CarsComponent {
  protected cars: Array<Car> = [];
  constructor(carService: CarsService, private router: Router) {
    carService.getAllCars().subscribe((cars) => {
      this.cars = cars;
    });
  }

  navigateTo(carId: string): void {
    this.router.navigate([`/cars/${carId}`]);
  }
}
