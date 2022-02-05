export interface BoardProps {
  lists: ListProps[];
  title?: string;
}

export interface ListProps {
  title: string;
  cards: CardProps[];
}

export interface CardProps {
  title: string;
}
