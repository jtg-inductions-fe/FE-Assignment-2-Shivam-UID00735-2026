export interface TableActionEvent<T = unknown> {
  action: string;
  row: T;
}
