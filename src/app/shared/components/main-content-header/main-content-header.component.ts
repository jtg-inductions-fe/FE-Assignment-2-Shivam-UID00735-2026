import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-content-header',
  templateUrl: './main-content-header.component.html',
  styleUrls: ['./main-content-header.component.scss'],
})
export class MainContentHeaderComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() headingType: string;
}
