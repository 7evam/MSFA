import React from 'react';
import styled from 'styled-components';
import {
  red, blue, mediumBlue, lightBlue, mobileBreakPoint,
} from '../../constants/style';

export const Container = styled.div`
  margin-top: 50px;
  
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${mobileBreakPoint}){
    width: 100vw;
  }
`;

export const LeagueSelector = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: ${mobileBreakPoint}){
    width: 100vw;
  }
`;

export const League = styled.p`
  margin-right: 10px;
  &:hover {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
  font-weight: ${(props) => (props.selected ? '700' : '400')};
`;

export const TabSelector = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 700px;
  background-color: ${mediumBlue};
  @media (max-width: ${mobileBreakPoint}){
    width: 100vw;
    font-size: 10px;
  }
`;

export const Tab = styled.p`
  margin-right: 10px;
  &:hover {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
  font-weight: ${(props) => (props.selected ? '700' : '400')};
`;

// const red  = '#DA2929'
export const Table = styled.table`
  width: 700px;
  @media (max-width: ${mobileBreakPoint}){
    width: 100vw;
  }
`;

const columnWidthsMobile = {
  col1width: '5%',
  col2width: '30%',
  col3width: '10%',
  col4width: '5%',
  col5width: '30%',
  col6width: '25%',
};

const columnWidthsDesktop = {
  col1width: '40px',
  col2width: '150px',
  col3width: '60px',
  col4width: '60px',
  col5width: '150px',
  col6width: '80px',
};

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid gray;
  font-size: 14px;
  border-left: 1px solid gray;
  min-width: ${(props) => (columnWidthsDesktop[props.width])};
  display: ${(props) => (props.details ? 'none' : null)};

  @media (max-width: ${mobileBreakPoint}){
    min-width: ${(props) => (columnWidthsMobile[props.width])};
    display: ${(props) => (props.width == 'col4width' || props.width == 'col5width' || props.width == 'col6width' ? 'none' : null)};
  }
`;

export const DetailsHeader = styled.th`
display: none;
  @media (max-width: ${mobileBreakPoint}){
    display: table-cell;
  }
`;

export const MoveSign = styled.span`
  display: none;

`;

export const Details = styled.td`
  padding: 12px;
  border-bottom: 1px solid gray;
  font-size: 14px;
  border-left: 1px solid gray;
  display: none;
  @media (max-width: ${mobileBreakPoint}){
    display: table-cell;
  }
`;

export const Th = styled.th`
padding: 12px;
border-bottom: 1px solid gray;
font-size: 14px;
border-left: 1px solid gray;
min-width: ${(props) => (columnWidthsDesktop[props.width])};
display: ${(props) => (props.details ? 'none' : null)};

@media (max-width: ${mobileBreakPoint}){
  min-width: ${(props) => (columnWidthsMobile[props.width])};
  display: ${(props) => (props.width == 'col4width' || props.width == 'col5width' || props.width == 'col6width' ? 'none' : null)};
}

`;

// export const Tbody = styled.tbody`

// `;

// export const slotData = styled.td`
//   padding: 12px;
//   border-bottom: 1px solid gray;
//   font-size: 14px;
//   border-left: 1px solid gray;
//   @media (max-width: ${mobileBreakPoint}){
//     width: ${(props) => (columnWidthsMobile[props.width])}
//   }
// `;

export const SlotRow = styled.tr`
  background-color: ${mediumBlue};
  &:nth-child(odd) {
    background-color: ${lightBlue};
  }
  
`;

export const TitleRow = styled.tr`
    background-color: ${red};
`;

export const SwitchButton = styled.button`
    padding:0.35em 1.2em;
    border:0.1em solid #FFFFFF;
    margin:0 0.3em 0.3em 0;
    border-radius:0.12em;
    box-sizing: border-box;
    text-decoration:none;
    font-weight:300;
    color:${blue};
    text-align:center;
    background-color: ${lightBlue};
    background-color: ${(props) => (props.selected ? 'green' : `${lightBlue}`)};

    &:hover {
        cursor: pointer;
      }
      
`;

export const ActionButton = styled.button`
    padding:0.35em 1.2em;
    border:0.1em solid #FFFFFF;
    margin:0 0.3em 0.3em 0;
    border-radius:0.12em;
    box-sizing: border-box;
    text-decoration:none;
    font-weight:300;
    color:${blue};
    text-align:center;
    background-color: ${lightBlue};
    &:hover {
        cursor: pointer;
      }

`;
export const Headline = styled.h1`
      font-size: 24px;
      color: ${blue}
`;

export const Label = styled.label`
    font-size: 24px;
    color: ${blue}
`;

export const CashContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
`;
// width: 100%;

export const Select = styled.select`
    height: 40px;
    background-color: ${lightBlue};
    font-weight: 800;
    padding-left: 10px;
`;
export const Section = styled.div`
      margin-right: 100px;
`;
