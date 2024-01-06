import { Component } from '@angular/core';
import { Surto } from 'src/app/surto';
import { SurtoService } from 'src/app/services/surto.service';
import { SurtoDTO } from 'src/app/surtoDTO';

@Component({
  selector: 'app-surto',
  templateUrl: './surto.component.html',
  styleUrls: ['./surto.component.css']
})
export class SurtoComponent {
  surtos: Surto[] = [];
  selectedSurto?: Surto;

  constructor(private surtoService: SurtoService) {}

  ngOnInit(): void {
    this.getSurtos();
  }

  onSelect(surto: Surto): void {
    this.selectedSurto = surto;
  }

  getSurtos(): void {
    this.surtoService.getSurtos()
      .subscribe((data: Surto[]) => {
        this.surtos = data;
      });
  }

  onSurtoCreated(newSurto: SurtoDTO): void {
    this.getSurtos();
  }
}
