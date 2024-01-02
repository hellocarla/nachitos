import { Component, OnInit } from '@angular/core';
import { Destination } from '../destination';
import { DestinationsService } from '../destinations.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent {
  destination: Destination [] = [];

  selectedDestination?: Destination;

  constructor(private destinationsService: DestinationsService) {}

  onSelect(destination: Destination): void {
    this.selectedDestination = destination;
  }

  getDestinations(): void {
    this.destinationsService.getDestinations()
      .subscribe(
        (data: Destination[]) => {
          console.log('Data from API:', data);
          this.destination = data;
        },
        error => {
          console.error('Error fetching destinations:', error);
        }
      );
  }

  ngOnInit(): void {
    this.getDestinations();
  }

  onDestinationCreated(newDestination: Destination): void {
    this.getDestinations();
  }

  onDestinationEdited(newDestination: Destination): void {
    this.getDestinations();
  }

  onDestinationDeleted(newDestination: Destination): void {
    this.getDestinations(); }
}
