import { Component, Input } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { Car } from '../../interfaces/car';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialog } from '../../dialogs/order-dialog';
import { OrderData } from '../../interfaces/order-data';
import { OrderService } from '../../services/order.service';
import { MatSelectModule } from '@angular/material/select';
import { Rim } from '../../interfaces/rim';
import { Exhaust } from '../../interfaces/exhaust';
import { ConfiguredCar } from '../../interfaces/configured-car';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css',
})
export class CarDetailComponent {
  @Input()
  set id(carId: string) {
    this.carService.getCarById(carId).subscribe((car: Car | undefined) => {
      this.car = car;
      
      if (this.car) {        
        this.selectedExhaustId = this.car.exhaustOptions[0].id;
        this.selectedRimId = this.car.rimOptions[0].id;
        this.updatePrice()
      }

    });
  }

  protected car: Car | undefined;
  protected selectedRimId: string | undefined;
  protected selectedExhaustId: string | undefined;
  protected totalPrice: number = 0;

  constructor(
    private carService: CarsService,
    private dialog: MatDialog,
    private orderService: OrderService,
    protected sanitizer: DomSanitizer
  ) {}

  protected openOrderDialog(): void {
    const dialogRef = this.dialog.open(OrderDialog, {
      data: { price: this.totalPrice },
    });

    dialogRef.afterClosed().subscribe((personalInformation) => {
      if (!personalInformation) {
        return;
      }

      const exhaust = this.getSelectedExhaust();
      const rim = this.getSelectedRim();

      if (
        exhaust &&
        rim &&
        this.car &&
        personalInformation.name &&
        personalInformation.address &&
        personalInformation.email
      ) {
        const configuredCar: ConfiguredCar = {
          modelName: this.car.model_name,
          id: this.car.id,
          price: this.totalPrice,
          rim: rim,
          exhaust: exhaust,
        };

        const orderData: OrderData = {
          customerName: personalInformation.name,
          address: personalInformation.address,
          items: [configuredCar],
          totalPrice: this.totalPrice,
          mail: personalInformation.email,
        };
        this.orderService.executeOrder(orderData).subscribe();
        this.selectedExhaustId = undefined;
        this.selectedRimId = undefined;
      }
    });
  }

  protected getSelectedRim(): Rim | undefined {
    return this.car?.rimOptions.find((rim) => rim.id === this.selectedRimId);
  }

  protected getSelectedExhaust(): Exhaust | undefined {
    return this.car?.exhaustOptions.find(
      (exhaust) => exhaust.id === this.selectedExhaustId
    );
  }

  protected updatePrice(): void {
    if (this.car) {
      let currentPrice = this.car.base_price;
      const exhaust = this.car.exhaustOptions.find(
        (exhaust) => exhaust.id === this.selectedExhaustId
      );
      const rim = this.car.rimOptions.find(
        (rim) => rim.id === this.selectedRimId
      );
      
      if (exhaust) {
        currentPrice += exhaust.price;
      }
      if (rim) {
        currentPrice += rim.price;
      }

      this.totalPrice = currentPrice;
    }
  }
}
