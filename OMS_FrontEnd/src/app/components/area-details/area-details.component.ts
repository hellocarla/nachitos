import { Component, Input } from '@angular/core';
import { Areas } from 'src/app/areas';

@Component({
  selector: 'app-area-details',
  templateUrl: './area-details.component.html',
  styleUrls: ['./area-details.component.css']
})
export class AreaDetailsComponent {
  @Input() selectedArea?: Areas;
}
