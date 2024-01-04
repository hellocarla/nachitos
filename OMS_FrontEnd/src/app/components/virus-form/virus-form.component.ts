import { Component, EventEmitter, Output } from '@angular/core';
import { Virus } from 'src/app/virus';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VirusService } from 'src/app/services/virus.service';

@Component({
  selector: 'app-virus-form',
  templateUrl: './virus-form.component.html',
  styleUrls: ['./virus-form.component.css']
})
export class VirusFormComponent {
  @Output() virusCreated = new EventEmitter<Virus>();
  virusForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private virusService: VirusService) {
      this.createForm();
    }

  createForm(): void {
    this.virusForm = this.formBuilder.group({
      nome_virus: ['', Validators.required],
      cod_virus: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.virusForm.valid) {
      const newVirus: Virus = this.virusForm.value as Virus;
      this.virusService.createVirus(newVirus).subscribe(
        (createdVirus: Virus) => {
          this.virusCreated.emit(createdVirus);
          this.resetForm();
        },
        (error) => {
          console.error('Error creating the virus:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.virusForm.reset();
  }

}
