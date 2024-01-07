import { Component, Input } from '@angular/core';
import { Destination } from '../destination';

@Component({
  selector: 'app-destinations-details',
  templateUrl: './destinations-details.component.html',
  styleUrls: ['./destinations-details.component.css']
})
export class DestinationsDetailsComponent {
  @Input () selectedDestination?: Destination;
}
