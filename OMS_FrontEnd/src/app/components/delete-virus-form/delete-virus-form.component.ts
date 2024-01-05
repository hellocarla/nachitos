import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Virus } from 'src/app/virus';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VirusService } from 'src/app/services/virus.service';

@Component({
  selector: 'app-delete-virus-form',
  templateUrl: './delete-virus-form.component.html',
  styleUrls: ['./delete-virus-form.component.css']
})
export class DeleteVirusFormComponent {
  @Input() virus?: Virus;
  @Output() virusDeleted = new EventEmitter<Virus>();
  virusDeleteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private virusService: VirusService) {
      this.virusDeleteForm = this.formBuilder.group({
        _id: [''],
        nome_virus: ['', Validators.required],
        cod_virus: ['', Validators.required]
      });
    }

  ngOnChanges(): void {
    if(this.virus) {
      this.virusDeleteForm.patchValue({
        _id: this.virus._id
      });
    }
  }

  onSave(): void {
    if(this.virus) {
      this.virusService.deleteVirus(this.virus).subscribe(
        () => {
          this.virusDeleted.emit(this.virus);
        },
        (error) => {
          console.error('Error deleting virus:', error);
        }
      );
    }
  }

}
