interface Sheet {
  id: string;
  title: string;
}

interface Spreadsheet {
  id?: string;
  name?: string;
  description?: string;
  tags?: string[];
  sheet?: Sheet;
  sheets?: Array<Sheet>;
  rows?: Array<{ [key: string]: string }>;
  keys?: string[];
  references?: Array<Reference>;
  publishedBy?: string;
  publishedAt?: string;
  publishedFrom?: string;
}
