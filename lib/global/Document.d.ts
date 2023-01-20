interface Document {
  id?: string;
  name?: string;
  description?: string;
  tags?: string[];
  path?: string;
  hast?: import('hast').Root;
  meta?: { [key: string]: string };
  components?: string[];
  references?: Array<Reference>;
  publishedBy?: string;
  publishedAt?: string;
  publishedFrom?: string;
}
