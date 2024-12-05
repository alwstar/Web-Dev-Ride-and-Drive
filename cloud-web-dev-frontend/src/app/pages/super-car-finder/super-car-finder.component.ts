import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { SuperCarLocation } from '../../interfaces/super-car-location';
import { CarFinderService } from '../../services/car-finder.service';

@Component({
  selector: 'app-super-car-finder',
  standalone: true,
  imports: [],
  templateUrl: './super-car-finder.component.html',
  styleUrl: './super-car-finder.component.css',
})
export class SuperCarFinderComponent implements OnInit, AfterViewInit {
  private map!: L.Map;

  constructor(private carFinderService: CarFinderService) {}

  ngOnInit(): void {
    // Do nothing here regarding Leaflet, as ngOnInit may run on the server
  }

  ngAfterViewInit(): void {
    this.carFinderService.getSuperCarLocation().subscribe(
      (data: SuperCarLocation) => {
        this.dynamicallyImportLeaflet(data);
      },
      (error) => {
        console.error('Error fetching coordinates:', error);
      }
    );
  }

  private dynamicallyImportLeaflet(coordinates: SuperCarLocation): void {
    if (typeof window !== 'undefined') {
      // Dynamically import Leaflet to ensure this runs only in the browser
      import('leaflet').then((L) => {
        
        this.initMap(L.default, coordinates);
      });
    }
  }

  private initMap(L: any, coordinates: SuperCarLocation): void {
    this.map = L.map('map').setView(coordinates, 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    const markerIcon = L.icon({
      iconUrl: 'marker-icon.png',
      shadowUrl: 'marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    const marker = L.marker(coordinates, {
      icon: markerIcon,
    }).addTo(this.map);

    // Optionally, add a popup to the marker
    marker.bindPopup('Some Suuuuuuper Car').openPopup();
  }
}
