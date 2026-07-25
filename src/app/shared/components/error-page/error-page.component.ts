import { errorPageData } from '@/core/configs/error-page.config';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageContent } from '@/models';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent {
  private route = inject(ActivatedRoute);

  state: ErrorPageContent =
    errorPageData[this.route.snapshot.data['errorType'] ?? 'notFound'];
}
