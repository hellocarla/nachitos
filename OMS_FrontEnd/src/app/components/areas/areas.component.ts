import { Component, OnInit } from '@angular/core';
// import { AREAS } from 'src/app/areasEx';
import { Areas } from 'src/app/areas';
import { AreasService } from 'src/app/services/areas.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit{
  areas: Areas[] = [];

  selectedArea?: Areas;

  constructor(
    private areasService: AreasService) {}

  onSelect(areas: Areas): void {
    this.selectedArea = areas;
  }
  
  getAreas(): void {
    this.areasService.getAreas()
      .subscribe((data: Areas[]) => {
        this.areas = data;
      });
  }

  ngOnInit(): void {
    this.getAreas();
  }

  onAreaCreated(newArea: Areas): void {
    this.getAreas();
  }

  onAreaEdited(newArea: Areas): void {
    this.getAreas();
  }

  onAreaDeleted(newArea: Areas): void {
    this.getAreas();
  }
}
