import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  @Input() color: string;
  @Input() value: number;
  @Input() total: number;
  @Input() hasOverlapedText: boolean = false;
  currentValue: number;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.value = changes.value.currentValue;

    //if we don't have value, set it to 0.
    if (!this.currentValue) {
      this.currentValue = 0;
    }
    //if we don't have a total aka no requirement, it's 100%.
    if (this.total === 0) {
      this.total = this.value;
    } else if (!this.total) {
      this.total = 100;
    }
    //if the value is greater than the total, it's also 100%.
    if (this.value > this.total) {
      this.currentValue = 100;
    }

    this.currentValue = (this.value / this.total) * 100;
  }
}
