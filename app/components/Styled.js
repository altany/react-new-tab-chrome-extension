import styled from 'styled-components';
import style from '../constants/style';

export const StyledInput = styled.input.attrs({
  type: 'text'
})`
  border: 0;
  outline-color: ${style.outlineColor};
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  padding: 5px 0;
  font-weight: bold;
  font-size: 14px;
  color: ${style.mainColor};
  background-color: white;
  border-radius: 4px;
  display: ${props => props.display || 'block'};
  &::before {
    content: ${props => props.label || ''};
  }
`;

export const StyledButton = styled.button`
  display: inline-block;
  padding: 3px 8px;
  font-size: 13px;
  letter-spacing: 1px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: ${style.mainColor};
  border: 1px solid ${style.mainColor};
  border-radius: 4px;
  &:not(:last-of-type) {
    margin-right: 5px;
  }
  &:hover {
    background-color: ${style.lightMainColor};
  }
`;

export const StyledSelect = styled.select`
  -webkit-appearance: button;
  -webkit-padding-end: 20px;
  -webkit-padding-start: 2px;
  background-position: 97% center;
  background-repeat: no-repeat;
  border: 1px solid #AAA;
  font-size: 13px;
  overflow: hidden;
  padding: 5px 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 150px;
  color: #fff;
  background-image: url(http://i62.tinypic.com/15xvbd5.png), -webkit-linear-gradient(${style.mainColor}, ${style.mainColor} 40%, ${style.mainColor});
  background-color: ${style.mainColor};
  border-radius: 4px;
  padding-left: 15px;
  outline: none;
  &:not(:last-of-child) {
    margin-right: 5px;
  }
`;
