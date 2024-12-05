import { Component } from '@angular/core';
import { Track } from '../../interfaces/track';
import { Car } from '../../interfaces/car';
import { CarsService } from '../../services/cars.service';
import { TracksService } from '../../services/tracks.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';
import { OrderDialog } from '../../dialogs/order-dialog';
import { OrderData } from '../../interfaces/order-data';
import { TestDrive } from '../../interfaces/test-drive';

@Component({
  selector: 'app-test-drives',
  standalone: true,
  imports: [
    MatDividerModule,
    CommonModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './test-drives.component.html',
  styleUrl: './test-drives.component.css',
})
export class TestDrivesComponent {
  protected selectedCarId?: string;
  protected selectedTrackId?: string;
  protected cars: Array<Car> = [];
  protected tracks: Array<Track> = [];
  protected carImageUrl: string | undefined;
  protected trackImageUrl: string | undefined;
  constructor(
    carService: CarsService,
    trackService: TracksService,
    private dialog: MatDialog,
    private orderService: OrderService
  ) {
    carService.getAllSuperCars().subscribe((cars) => {
      this.cars = cars;
    });
    trackService.getAllTracks().subscribe((tracks) => {
      this.tracks = tracks;
    })
  }

  protected openOrderDialog(): void {
    const track: Track | undefined = this.tracks.find(
      (track) => track.id === this.selectedTrackId
    );
    const car: Car | undefined = this.cars.find(
      (car) => car.id === this.selectedCarId
    );
    if (track && car) {
      let totalPrice: number = car?.base_price * 0.005 + track?.price;

      const dialogRef = this.dialog.open(OrderDialog, {
        data: { price: totalPrice },
      });

      dialogRef.afterClosed().subscribe((personalInformation) => {
        if (!personalInformation) {
          return;
        }

        if (
          personalInformation.name &&
          personalInformation.address &&
          personalInformation.email
        ) {
          const testDrive: TestDrive = {
            track: track,
            car: car,
          };
          const orderData: OrderData = {
            customerName: personalInformation.name,
            address: personalInformation.address,
            items: [testDrive],
            totalPrice: totalPrice,
            mail: personalInformation.email,
          };
          this.orderService.executeOrder(orderData).subscribe();
          this.selectedCarId = undefined;
          this.selectedTrackId = undefined;
        }
      });
    }
  }

  protected onCarChange(): void {
    const car: Car | undefined = this.cars.find(
      (car) => car.id === this.selectedCarId
    );
    this.carImageUrl = car?.image_url;
  }
  
  protected onTrackChange(): void {
    const track: Track | undefined = this.tracks.find(
      (track) => track.id === this.selectedTrackId
    );
    this.trackImageUrl = track?.image_url
  }
}
