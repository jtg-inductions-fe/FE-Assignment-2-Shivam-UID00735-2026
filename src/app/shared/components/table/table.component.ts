import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TableColumn } from '@/models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input({ required: true }) dataSource!: unknown[];
  @Input({ required: true }) columns!: TableColumn[];
  @Input() templates: Record<string, TemplateRef<unknown>> = {};
  @Input() enablePagination = true;

  @Output() tableAction = new EventEmitter<{
    action: string;
    row: unknown;
  }>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  tableDataSource = new MatTableDataSource<unknown>();

  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.displayedColumns = this.columns.map((column) => column.key);
    this.tableDataSource.data = this.dataSource;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']) {
      this.tableDataSource.data = this.dataSource;
    }

    if (changes['columns']) {
      this.displayedColumns = this.columns.map((column) => column.key);
    }
  }

  ngAfterViewInit(): void {
    if (this.enablePagination) {
      this.tableDataSource.paginator = this.paginator;
    }
  }

  onButtonClick(event: { action: string; row: unknown }): void {
    this.tableAction.emit(event);
  }
}
