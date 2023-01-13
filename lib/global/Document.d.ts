interface Document {
  id?: string;
  name?: string;
  description?: string;
  tags?: string[];
  path?: string;
  hast?: import('@types/hast').Root;
  meta?: { [key: string]: string };
  components?: string[];
  references?: string[];
  publishedBy?: string;
  publishedAt?: string;
  publishedFrom?: string;
}
