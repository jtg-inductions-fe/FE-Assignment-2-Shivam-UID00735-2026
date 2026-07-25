import { Component } from '@angular/core';

@Component({
  selector: 'app-report-generator',
  templateUrl: './report-generator.component.html',
  styleUrls: ['./report-generator.component.scss'],
})
export class ReportGeneratorComponent {
  title = 'Report Generator';
  description =
    'Generate performance reports for the selected restaurant context.';
}
