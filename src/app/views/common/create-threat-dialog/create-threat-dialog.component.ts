import { Component, Inject, OnInit } from '@angular/core';
import { ThreatElement, ThreatSize, Threat } from '../../../../models/Threat';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSettingsService } from '../../../game-settings.service';
import { generateRandomId } from '../view_utils';
import { ThreatService } from './threat.service';

@Component({
  selector: 'app-create-threat-dialog',
  templateUrl: './create-threat-dialog.component.html',
  styleUrls: ['./create-threat-dialog.component.scss'],
})
export class CreateThreatDialogComponent implements OnInit {
  secondaryElements: ThreatElement[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateThreatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public threatList: Threat[],
    private threatService: ThreatService
  ) {}

  ngOnInit(): void {}

  onElementSelected(selectedElement: string): void {
    if (
      this.secondaryElements.find((element) => element === selectedElement) !=
      null
    ) {
      this.secondaryElements = this.secondaryElements.filter(
        (element) => element != selectedElement
      );
    } else {
      var newElement: ThreatElement = this.getThreatElement(selectedElement);
      this.secondaryElements.push(newElement);
    }
  }

  getThreatElement(element: string): ThreatElement {
    switch (element) {
      case 'energia':
        return ThreatElement.ENERGY;
      case 'morte':
        return ThreatElement.DEATH;
      case 'medo':
        return ThreatElement.FEAR;
      case 'sangue':
        return ThreatElement.BLOOD;
      case 'conhecimento':
        return ThreatElement.KNOWLEDGE;
      default:
        break;
    }
  }

  getThreatSize(threatSize: string): ThreatSize {
    switch (threatSize) {
      case 'pequeno':
        return ThreatSize.SMALL;
      case 'medio':
        return ThreatSize.MEDIUM;
      case 'grande':
        return ThreatSize.BIG;
      case 'enorme':
        return ThreatSize.HUGE;
      case 'colossal':
        return ThreatSize.COLOSSAL;
      default:
        break;
    }
  }

  async createNewThreat(
    name: string,
    vd: number,
    mainElement: string,
    threatType: string,
    size: string
  ): Promise<void> {
    const newThreat = {
      name: name,
      vd: vd,
      element: mainElement,
      type: threatType,
      secondElements: this.secondaryElements,
      size: size,
    };
    const newthreat = await this.threatService.createThreat(newThreat);
    this.threatList.push(newthreat);
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
