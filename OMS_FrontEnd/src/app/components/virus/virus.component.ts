import { Component, OnInit } from '@angular/core';
import { Virus } from 'src/app/virus';
// import { VIRUSES } from 'src/app/virusEx';
import { VirusService } from 'src/app/services/virus.service';

@Component({
  selector: 'app-virus',
  templateUrl: './virus.component.html',
  styleUrls: ['./virus.component.css']
})
export class VirusComponent implements OnInit{
  viruses: Virus[] = [];

  selectedVirus?: Virus;

  constructor(
    private virusService: VirusService) {}

  onSelect(virus: Virus): void {
    this.selectedVirus = virus;
  }

  getViruses(): void {
    this.virusService.getViruses()
      .subscribe((data: Virus[]) => {
        this.viruses = data;
      });
  }

  ngOnInit(): void {
    this.getViruses();
  }

  onVirusCreated(newVirus: Virus): void {
    this.getViruses();
  }

  onVirusEdited(newVirus: Virus): void {
    this.getViruses();
  }

  onVirusDeleted(newVirus: Virus): void {
    this.getViruses();
  }
}
