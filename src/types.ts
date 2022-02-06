export interface BoardProps {
  lists: ListProps[];
  title?: string;
}

export interface ListProps {
  title: string;
  cards: CardProps[];
  index: number | string;
}

export interface CardProps {
  title: string;
}
