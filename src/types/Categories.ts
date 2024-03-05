export type Icon = {
  height: number;
  url: string;
  width: number;
};

export type Categories = {
  href: string;
  items: [{ href: string; icons: Icon[]; id: string; name: string }];
  limit?: number;
  next: string;
  offset: number;
  previous?: null;
  total: number;
};
