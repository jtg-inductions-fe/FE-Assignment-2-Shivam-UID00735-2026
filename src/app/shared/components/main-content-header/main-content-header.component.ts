import { Component, Input } from '@angular/core';
import { HeadingType } from '@/models';

@Component({
  selector: 'app-main-content-header',
  templateUrl: './main-content-header.component.html',
  styleUrls: ['./main-content-header.component.scss'],
})
export class MainContentHeaderComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() headingType: HeadingType = 'medium';
}
