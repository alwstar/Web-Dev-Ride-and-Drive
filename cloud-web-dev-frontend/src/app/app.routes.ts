import { Routes } from '@angular/router';
import { CarDetailComponent } from './pages/car-detail/car-detail.component';
import { CarsComponent } from './pages/cars/cars.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MerchandiseComponent } from './pages/merchandise/merchandise.component';
import { SuperCarFinderComponent } from './pages/super-car-finder/super-car-finder.component';
import { TestDrivesComponent } from './pages/test-drives/test-drives.component';

export const routes: Routes = [
  { path: '', component: LandingComponent, title: 'Home' },
  { path: 'cars', component: CarsComponent, title: 'Cars' },
  { path: 'cars/:id', component: CarDetailComponent, title: 'Specific Car' },
  { path: 'test-drives', component: TestDrivesComponent, title: 'Test Drives' },
  {
    path: 'merchandise',
    component: MerchandiseComponent,
    title: 'Merchandise',
  },
  {
    path: 'super-car-finder',
    component: SuperCarFinderComponent,
    title: 'Super Car Finder',
  },
  { path: '**', redirectTo: '' },
];
