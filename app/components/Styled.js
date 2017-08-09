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
