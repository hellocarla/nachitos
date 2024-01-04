import { Component, Input } from '@angular/core';
import { Surto } from 'src/app/surto';

@Component({
  selector: 'app-surto-details',
  templateUrl: './surto-details.component.html',
  styleUrls: ['./surto-details.component.css']
})
export class SurtoDetailsComponent {
  @Input() selectedSurto?: Surto;

}
