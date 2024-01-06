import { Component, Input } from '@angular/core';
import { Virus } from 'src/app/virus';

@Component({
  selector: 'app-virus-details',
  templateUrl: './virus-details.component.html',
  styleUrls: ['./virus-details.component.css']
})
export class VirusDetailsComponent {
  @Input() selectedVirus?: Virus;
}
