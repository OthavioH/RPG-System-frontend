import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Threat } from '../../../models/Threat';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ChangeCharacterImageDialogComponent } from '../common/change-character-image-dialog/change-character-image-dialog.component';
import { ThreatService } from '../common/create-threat-dialog/threat.service';
import { EditProgressBarValuesDialogComponent } from '../common/edit-hp-dialog/edit-progress-bar-values-dialog.component';

@Component({
  selector: 'app-threat-page',
  templateUrl: './threat-page.component.html',
  styleUrls: ['./threat-page.component.scss', './../../app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ThreatPageComponent implements OnInit {
  threat: Threat;
  routeSubscription: Subscription;

  imgUrl: string;
  defaultImgUrl: string = '/../../assets/unknown_character_transparent.png';

  isNameInputActive = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private modalService: MatDialog,
    private threatService: ThreatService
  ) {
    this.routeSubscription = this.activatedRoute.data.subscribe(
      (info: { threat: Threat }) => {
        this.threat = new Threat(this.threatService, info.threat);

        this.imgUrl = this.threat.imageUrl ?? this.defaultImgUrl;
        this.title.setTitle(`Threat | ${this.threat.name}`);
      }
    );
  }

  ngOnInit(): void {}

  changeThreatImage() {
    const dialogResponse = this.modalService.open(
      ChangeCharacterImageDialogComponent,
      { data: this.threat.imageUrl }
    );
    dialogResponse.afterClosed().subscribe((newImgUrl) => {
      if (newImgUrl) {
        this.threat.imageUrl = newImgUrl;
        this.threat.save();
      }
    });
  }

  changeThreatHp() {
    const dialogResponse = this.modalService.open(
      EditProgressBarValuesDialogComponent,
      {
        data: {
          currentValue: this.threat.healthPoints.current,
          maxValue: this.threat.healthPoints.max,
        },
      }
    );
    dialogResponse.afterClosed().subscribe((values) => {
      this.threat.healthPoints.current = values.currentValue;
      this.threat.healthPoints.max = values.maxValue;
      console.log(this.threat.healthPoints);

      this.threat.save();
    });
  }

  changeTextToTextField(input: HTMLInputElement) {
    console.log(input.readOnly);

    input.readOnly = !input.readOnly;
  }

  onNameLostFocus(input: HTMLInputElement) {
    input.readOnly = true;
    console.log(input.readOnly);
  }

  saveThreat() {
    this.threat.save();
  }

  onImageError(event) {
    event.target.src = this.defaultImgUrl;
  }
}
