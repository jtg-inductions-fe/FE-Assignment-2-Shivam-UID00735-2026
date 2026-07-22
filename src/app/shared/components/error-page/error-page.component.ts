import { errorPageData } from '@/core/configs/error-page.config';
import { ErrorPageContent } from '@/models/error-page.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent {
  state: ErrorPageContent = errorPageData['notFound'];
}
