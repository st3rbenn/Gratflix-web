export type RecentlyAdded = {
  MediaContainer: {
    Metadata: Metadata[];
    allowSync: boolean;
    identifier: string;
    mediaTagPrefix: string;
    mediaTagVersion: number;
    mixedParents: boolean;
    size: number;
  };
};

export type Metadata = {
  Country: Country[];
  Director: Director[];
  Genre: Genre[];
  Media: Media[];
  Role: Role[];
  Writer: Writer[];
  addedAt: number;
  allowSync: boolean;
  art: string;
  audienceRating: number;
  audienceRatingImage: string;
  chapterSource: string;
  contentRating: string;
  duration: number;
  guid: string;
  key: string;
  librarySectionID: number;
  librarySectionTitle: string;
  librarySectionUUID: string;
  originalTitle: string;
  originallyAvailableAt: string;
  ratingKey: string;
  slug: string;
  studio: string;
  summary: string;
  tagline: string;
  thumb: string;
  title: string;
  titleSort: string;
  type: string;
  updatedAt: number;
  year: number;
};

export type Writer = {
  tag: string;
};

export type Role = {tag: string};

export type Media = {
  aspectRatio: number;
  audioChannels: number;
  audioCodec: string;
  audioProfile: string;
  bitrate: number;
  container: string;
  duration: number;
  height: number;
  id: number;
  videoCodec: string;
  videoFrameRate: string;
  videoProfile: string;
  videoResolution: string;
  width: number;
};

export type Genre = {
  tag: string;
};

export type Director = {tag: string};

export type Country = {
  tag: string;
};

export enum Tag {
  All = 'all',
  Unwatched = 'unwatched',
  Newest = 'newest',
  RecentlyAdded = 'recentlyAdded',
  RecentlyViewed = 'recentlyViewed',
  OnDeck = 'onDeck',
  Collection = 'collection',
  Edition = 'edition',
  Genre = 'genre',
  Year = 'year',
  Decade = 'decade',
  Director = 'director',
  Actor = 'actor',
  Country = 'country',
  ContentRating = 'contentRating',
  Rating = 'rating',
  Resolution = 'resolution',
  FirstCharacter = 'firstCharacter',
  Folder = 'folder',
}
