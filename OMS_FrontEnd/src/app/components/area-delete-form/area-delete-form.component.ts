import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Areas } from 'src/app/areas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreasService } from 'src/app/services/areas.service';

@Component({
  selector: 'app-area-delete-form',
  templateUrl: './area-delete-form.component.html',
  styleUrls: ['./area-delete-form.component.css']
})
export class AreaDeleteFormComponent {
  @Input() area?: Areas;
  @Output() areaDeleted = new EventEmitter<Areas>();
  areaDeleteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private areaService: AreasService) {
      this.areaDeleteForm = this.formBuilder.group({
        _id: [''],
        nome_zonageo: ['', Validators.required],
        cod_zonageo: ['', Validators.required]
      });
    }

  ngOnChanges(): void {
    if(this.area) {
      this.areaDeleteForm.patchValue({
        _id: this.area._id
      });
    }
  }

  onSave(): void {
    if(this.area) {
      this.areaService.deleteArea(this.area).subscribe(
        () => {
          this.areaDeleted.emit(this.area);
        },
        (error) => {
          console.error('Error deleting the area:', error);
        }
      );
    }
  }

}
