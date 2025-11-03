export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  required?: boolean;
}

export interface FieldOption {
  value: string;
  label: string;
}

export interface CrudField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'boolean' | 'date' | 'datetime' | 'image' | 'file' | 'array';
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  defaultValue?: any;
  validation?: FieldValidation;
  options?: FieldOption[];
  rows?: number;
  uploadPath?: string;
  acceptedFormats?: string[];
  maxSize?: number;
  arrayType?: 'text' | 'number' | 'select';
  arrayOptions?: FieldOption[];
}

export interface TableColumn {
  key: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'boolean' | 'date' | 'datetime' | 'image';
  sortable?: boolean;
  width?: string;
  truncate?: boolean;
}

export interface CrudOptions {
  allowCreate?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
  allowExport?: boolean;
  showImagePreview?: boolean;
  bulkActions?: string[];
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

export interface CrudConfig {
  title: string;
  description?: string;
  apiEndpoint: string;
  fields: CrudField[];
  tableColumns: TableColumn[];
  searchFields?: string[];
  defaultSort?: SortConfig;
  itemsPerPage?: number;
  options?: CrudOptions;
}
