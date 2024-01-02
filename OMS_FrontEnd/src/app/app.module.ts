import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { VirusComponent } from './components/virus/virus.component';
import { VirusDetailsComponent } from './components/virus-details/virus-details.component';
import { HttpClientModule } from '@angular/common/http';
import { VirusFormComponent } from './components/virus-form/virus-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VirusEditFormComponent } from './components/virus-edit-form/virus-edit-form.component';
import { DeleteVirusFormComponent } from './components/delete-virus-form/delete-virus-form.component';
import { AreasComponent } from './components/areas/areas.component';
import { AreaDetailsComponent } from './components/area-details/area-details.component';
import { AreaFormComponent } from './components/area-form/area-form.component';
import { AreaEditFormComponent } from './components/area-edit-form/area-edit-form.component';
import { AreaDeleteFormComponent } from './components/area-delete-form/area-delete-form.component';
import { PaisComponent } from './components/pais/pais.component';
import { PaisDetailsComponent } from './components/pais-details/pais-details.component';
import { PaisFormComponent } from './components/pais-form/pais-form.component';
import { SurtoComponent } from './components/surto/surto.component';
import { SurtoDetailsComponent } from './components/surto-details/surto-details.component';
import { SurtoFormComponent } from './components/surto-form/surto-form.component';
import { RecomendacoesComponent } from './components/recomendacoes/recomendacoes.component';
import { RecomendacoesDetailsComponent } from './components/recomendacoes-details/recomendacoes-details.component';


@NgModule({
  declarations: [
    AppComponent,
    VirusComponent,
    VirusDetailsComponent,
    VirusFormComponent,
    VirusEditFormComponent,
    DeleteVirusFormComponent,
    AreasComponent,
    AreaDetailsComponent,
    AreaFormComponent,
    AreaEditFormComponent,
    AreaDeleteFormComponent,
    PaisComponent,
    PaisDetailsComponent,
    PaisFormComponent,
    SurtoComponent,
    SurtoDetailsComponent,
    SurtoFormComponent,
    RecomendacoesComponent,
    RecomendacoesDetailsComponent
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
