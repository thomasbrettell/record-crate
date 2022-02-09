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
}
