import { Component } from '@angular/core';
import { Package } from '../package';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent {
  package: Package [] = [];
  selectedPackage ?: Package;

  constructor ( private packageService: PackageService ) {}

  ngOnInit(): void {
    this.getPackages();
  }

  onSelect(packages: Package): void {
    this.selectedPackage = packages;
  }

  getPackages(): void {
    this.packageService.getPackage()
    .subscribe((data: Package[]) => {
      this.package = data;
    });
  }

  onPackageCreated(newPackage: Package): void {
    this.getPackages();
  }

  onPackageEdited(newPackage: Package): void {
    this.getPackages();
  }

  onPackageDeleted(newPackage: Package): void {
    this.getPackages();
  }
}
