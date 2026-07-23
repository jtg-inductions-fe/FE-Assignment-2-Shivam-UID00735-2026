import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-generator',
  templateUrl: './report-generator.component.html',
  styleUrls: ['./report-generator.component.scss'],
})
export class ReportGeneratorComponent implements OnInit {
  title = '';
  description = '';

  ngOnInit(): void {
    this.title = 'Report Generator';
    this.description =
      'Generate performance reports for the selected restaurant context.';
  }
}
