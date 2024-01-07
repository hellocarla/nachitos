import { Component, Input } from '@angular/core';
import { Package } from '../package';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent {
  @Input() selectedPackage?: Package;
}
