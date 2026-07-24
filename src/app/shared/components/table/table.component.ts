import { TableColumn } from '@/models';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() dataSource!: unknown[];
  @Input() columns: TableColumn[];
  @Input() templates: Record<string, TemplateRef<unknown>> = {};
  @Input() enablePagination = true;

  tableDataSource = new MatTableDataSource<unknown>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayColumn: string[] = [];

  ngOnInit(): void {
    this.displayColumn = this.columns.map((c) => c.key);
    this.tableDataSource.data = this.dataSource;
  }

  ngAfterViewInit(): void {
    if (this.enablePagination) {
      this.tableDataSource.paginator = this.paginator;
    }
  }

  ngOnChanges() {
    this.tableDataSource.data = this.dataSource;
  }
}
