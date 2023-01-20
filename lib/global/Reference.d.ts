interface ResolvedReference {
  [key: string]: Spreadsheet & Document;
}

interface Reference {
  url: string;
  type: string;
}
