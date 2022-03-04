import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSettingsService } from 'src/app/game-settings.service';
import { IRitual, RitualElement } from 'src/models/Ritual';

@Component({
  selector: 'app-edit-ritual-dialog',
  templateUrl: './edit-ritual-dialog.component.html',
  styleUrls: ['./edit-ritual-dialog.component.scss']
})
export class EditRitualDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditRitualDialogComponent>,
    private gameSettingsService: GameSettingsService,
    @Inject(MAT_DIALOG_DATA) public ritual: IRitual,
  ) { }

  ngOnInit(): void {
  }

  onElementSelected(selectedElement:string): void {
    if (this.ritual.elements.find(element => element === selectedElement) != null) {
      this.ritual.elements = this.ritual.elements.filter(element => element != selectedElement);
    }
    else {
      var newElement:RitualElement = this.getRitualElement(selectedElement);
      this.ritual.elements.push(newElement);
    }
  }

  getRitualElement(element:string):RitualElement {
    switch (element) {
      case 'energia':
        return RitualElement.energy;
      case 'morte':
        return RitualElement.death;
      case 'medo':
        return RitualElement.fear;
      case 'sangue':
        return RitualElement.blood;
      case 'conhecimento':
        return RitualElement.knowledge;
      default:
        return RitualElement.unknown;
    }
  }

  isActive(elementToCheck:string): boolean {
    if (this.ritual.elements.find(element => element === elementToCheck) != null) {
      return true;
    }
    else {
      return false;
    }
  }

  editRitual(): void {
    this.gameSettingsService.editRitual(this.ritual);
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
