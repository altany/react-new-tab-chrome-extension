import styled from 'styled-components';

export const StyledInput = styled.input.attrs({
  type: 'text'
})`
  border: 1px solid purple;
  border-radius: 4px;
  width: 100%;
  padding: 5px;
  display: ${props => props.display || 'block'};
`;

export const StyledButton = styled.button`
  display: inline-block;
  padding: 3px 8px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #b092ea;
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px #ddd;
`;
