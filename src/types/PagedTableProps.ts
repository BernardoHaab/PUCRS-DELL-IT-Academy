type PagedTableProps = {
  rows: any[];
  columns: Column[];
};

export type Column = {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  formatDate?: (date: Date) => string;
}

export default PagedTableProps;
