import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Virus } from 'src/app/virus';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VirusService } from 'src/app/services/virus.service';

@Component({
  selector: 'app-virus-edit-form',
  templateUrl: './virus-edit-form.component.html',
  styleUrls: ['./virus-edit-form.component.css']
})
export class VirusEditFormComponent {

  @Input() virus?: Virus;
  @Output() virusEdited = new EventEmitter<Virus>();
  virusEditForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private virusService: VirusService ) {
      this.virusEditForm = this.formBuilder.group({
        _id: [''],
        nome_virus: ['', Validators.required],
        cod_virus: ['', Validators.required]
      });
    }

    ngOnChanges(): void {
      if(this.virus) {
        this.virusEditForm.patchValue({
          _id: this.virus._id,
          nome_virus: this.virus.nome_virus,
          cod_virus: this.virus.cod_virus
        });
      }
    }

  onSave(): void {
    if(this.virusEditForm.valid) {
      const editedVirus = this.virusEditForm.value as Virus;
      this.virusService.updateVirus(editedVirus).subscribe(
        (updatedVirus: Virus) => {
          this.virusEdited.emit(editedVirus);
          this.resetForm();
        },
        (error) => {
          console.error('Error updating virus:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.virusEditForm.reset();
  }

}
