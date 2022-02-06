export interface BoardProps {
  lists?: ListProps[];
  title?: string;
}

export interface ListProps {
  title: string;
  cards?: CardProps[];
  index: number | string;
  id?: string;
}

export interface CardProps {
  title: string;
  listIndex: number | string;
}
