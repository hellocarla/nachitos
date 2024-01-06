import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { DestinationsDetailsComponent } from './destinations-details/destinations-details.component';

import { HttpClientModule } from '@angular/common/http';
import { DestinationsFormComponent } from './destinations-form/destinations-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DestinationsEditFormComponent } from './destinations-edit-form/destinations-edit-form.component';
import { DestinationsDeleteFormComponent } from './destinations-delete-form/destinations-delete-form.component';
import { PackageComponent } from './package/package.component';
import { PackageDetailsComponent } from './package-details/package-details.component';
import { PackageFormComponent } from './package-form/package-form.component';
import { PackageEditFormComponent } from './package-edit-form/package-edit-form.component';
import { PackageDeleteFormComponent } from './package-delete-form/package-delete-form.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationsFormComponent } from './reservations-form/reservations-form.component';
import { ReservationsEditFormComponent } from './reservations-edit-form/reservations-edit-form.component';
import { ReservationsDeleteFormComponent } from './reservations-delete-form/reservations-delete-form.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ReservationsDetailsComponent } from './reservations-details/reservations-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DestinationsComponent,
    DestinationsDetailsComponent,
    DestinationsFormComponent,
    DestinationsEditFormComponent,
    DestinationsDeleteFormComponent,
    PackageComponent,
    PackageDetailsComponent,
    PackageFormComponent,
    PackageEditFormComponent,
    PackageDeleteFormComponent,
    ReservationsComponent,
    ReservationsFormComponent,
    ReservationsDetailsComponent,
    ReservationsEditFormComponent,
    ReservationsDeleteFormComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
