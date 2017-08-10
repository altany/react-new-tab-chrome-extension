import styled from 'styled-components';

export const StyledInput = styled.input.attrs({
  type: 'text'
})`
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid black;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
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
  border: 1px solid #b092ea;
  border-radius: 2px;
  &:not(:last-of-type)
    margin-right: 5px;
  &:hover {
    color: #4a12b7;
    background-color: white;
  }
`;

export const StyledSelect = styled.select`
  -webkit-appearance: button;
  -webkit-padding-end: 20px;
  -webkit-padding-start: 2px;
  background-position: 97% center;
  background-repeat: no-repeat;
  border: 1px solid #AAA;
  font-size: 16px;
  margin: 20px;
  overflow: hidden;
  padding: 5px 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 300px;
  color: #fff;
  background-image: url(http://i62.tinypic.com/15xvbd5.png), -webkit-linear-gradient(#b092ea, #b092ea 40%, #b092ea);
  background-color: #b092ea;
  border-radius: 8px;
  padding-left: 15px;
  outline: none;
`;
