import styled from 'styled-components';
import Card from '../Card';
import { ListProps } from '../../types';
import Composer from './Composer';

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: inline-block;
  height: 100%;
  margin: 0 4px;
  vertical-align: top;
  white-space: nowrap;
  width: 272px;

  &:first-child {
    margin-left: 16px;
  }

  &:last-child {
    margin-right: 16px;
  }
`;

export const Content = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
  width: 100%;
`;

const CardList = styled.div`
  flex: 1 1 auto;
  margin: 0 4px;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 4px;
  z-index: 1;
`;

const List = ({ title, cards }: ListProps) => {
  return (
    <Wrapper>
      <Content>
        <span>{title}</span>
        <CardList>
          {cards.map((card, i) => (
            <Card key={`card-${i}`} title={card.title} />
          ))}
        </CardList>
        <Composer />
      </Content>
    </Wrapper>
  );
};

export default List;
