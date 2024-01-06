import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirusComponent } from './components/virus/virus.component';
import { AreasComponent } from './components/areas/areas.component';
import { PaisComponent } from './components/pais/pais.component';
import { SurtoComponent } from './components/surto/surto.component';
import { RecomendacoesComponent } from './components/recomendacoes/recomendacoes.component';

const routes: Routes = [
  { path: 'viruses', component: VirusComponent },    // this indicates what component the paths should call/show
  // we can add different route expectations like calling a 404 or defaulting to /home etc
  { path: 'areas', component: AreasComponent },
  { path: 'paises', component: PaisComponent },
  { path: 'surtos', component: SurtoComponent },
  { path: 'recomendacoes', component: RecomendacoesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
