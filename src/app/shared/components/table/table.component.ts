import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn, TextConfig, ChipConfig, ButtonConfig } from '@/models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T = unknown>
  implements OnInit, OnChanges, AfterViewInit
{
  @Input({ required: true }) dataSource!: T[];
  @Input({ required: true }) columns!: TableColumn<T>[];
  @Input() templates: Record<string, TemplateRef<unknown>> = {};
  @Input() enablePagination = true;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  tableDataSource = new MatTableDataSource<T>();

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

  getTextConfig(column: TableColumn<T>): TextConfig | undefined {
    return column.type === 'text' ? column.textConfig : undefined;
  }

  getChipConfig(column: TableColumn<T>): ChipConfig | undefined {
    return column.type === 'chip' ? column.chipConfig : undefined;
  }

  getButtonConfig(column: TableColumn<T>): ButtonConfig<T>[] | undefined {
    return column.type === 'button' ? column.buttonConfig : undefined;
  }
}
