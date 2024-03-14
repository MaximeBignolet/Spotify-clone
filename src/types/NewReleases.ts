export type ImagesReleases = {
  height: number;
  url: string;
  width: number;
};

export type Artists = {
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type Items = {
  albumType: string;
  artists: Artists[];
  images: ImagesReleases[];
};

export type NewReleases = {
  albums: {
    href: string;
    items: Items[];
    name: string;
    releaseDate: string;
    totalTrack: number;
    type: string;
    uri: string;
  };
};
