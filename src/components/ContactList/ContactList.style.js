import styled from 'styled-components';

export const List = styled.ul`
  width: 600px;
  margin: 0 auto; /* Центрировать список по горизонтали */
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;
