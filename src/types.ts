export interface BoardType {
  crateOrder: string[] | null;
  crates: {
    [id: string]: CrateType;
  };
  records: {
    [id: string]: RecordType;
  };
  id: string;
}

export interface CrateType {
  title: string;
  id: string;
  recordIds: string[] | null;
}

export interface RecordType {
  title: string;
  id: string;
  cover_image: string;
  artist: string;
  discogsId: string | number;
  isNew: boolean;
}

export interface DiscogsRelease {
  title: string;
  artists: { name: string }[];
  uri: string;
}

export interface DiscogsDBRelease {
  country: string;
  title: string;
  id: string;
  uri: string;
  cover_image: string;
  resource_url: string;
  year: string | number;
}

export interface DiscogsDBQuery {
  results: DiscogsDBRelease[];
}
