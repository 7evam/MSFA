import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import lock from '../../icons/lock';
import { mobileBreakPoint } from '../../constants/style';
import { shortenName } from '../../utils';

const FirstItem = styled.div`
    padding: 16px 0px 8px 16px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
`;

const Item = styled.div`
    padding: 16px 0px 8px 16px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
    &:hover{
        text-decoration: ${(props) => (props.teamName ? 'underline' : null)}; 
        cursor: ${(props) => (props.teamName ? 'pointer' : null)}; 
    }
    @media (min-width: ${mobileBreakPoint}){
        &:before{
            content: "";
            right: 0;
            z-index: 100;
            top: 0;
            height: 50%; 
            border-right: 2px solid #E5EAF4;
            margin-right: 8px;
        }
       }
    
    @media (max-width: ${mobileBreakPoint}){
        font-size: 16px;
       }
`;

function Slot({
  item,
  rank,
  selectedMonth,
}) {
  const { selectedYear } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const navigate = useNavigate();

  const goToSquad = (userId) => {
    navigate(`/league/${userId}/${selectedYear}/${selectedMonth}`);
  };

  return (
    <>
      <FirstItem>{rank}</FirstItem>
      <Item>{item.personName}</Item>
      <Item teamName onClick={() => goToSquad(item.userId)}>{shortenName(item.teamName)}</Item>
      <Item>{item.monthlyPoints}</Item>
      <Item><b>{item.cumulativePoints}</b></Item>
    </>
  );
}

export default Slot;
