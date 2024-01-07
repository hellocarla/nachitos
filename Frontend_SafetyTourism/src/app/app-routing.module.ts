import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationsComponent } from './destinations/destinations.component';
import { PackageComponent } from './package/package.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: 'destinations', component: DestinationsComponent },
  { path: 'packages', component: PackageComponent },
  { path: 'reservations', component: ReservationsComponent},
  { path: 'home', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
