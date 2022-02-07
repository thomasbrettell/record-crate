export interface BoardType {
  crateOrder: string[];
  crates: {
    [id: string]: CrateType;
  };
  records: {
    [id: string]: RecordType;
  };
}

export interface CrateType {
  title: string;
  id: string;
  recordIds: string[];
}

export interface RecordType {
  title: string;
  id: string;
}
