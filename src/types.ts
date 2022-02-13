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
  cover_image: string;
  artist: string;
  discogsId: string | number;
  isNew: boolean;
  uri: string;
  year: string | number;
  country: string;
  format: string[];
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
  year: string | number;
  label: string[];
  genre: string[];
  catno: string;
  style: string[];
  format: string[];
  master_id: string;
}

export interface DiscogsDBQuery {
  results: DiscogsDBRelease[];
}
