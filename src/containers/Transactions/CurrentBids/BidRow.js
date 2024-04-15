import React, { Fragment } from "react";
import {
  SlotRow,
  Td,
  Details,
  MoveSign,
} from "../components";
import styled from "styled-components";
import { mobileBreakPoint } from "../../../constants/style";
import { Draggable } from "react-beautiful-dnd";

const SwitchButton = styled.button`
    padding:0.35em 1.2em;
    border:0.1em solid #FFFFFF;
    margin:0 0.3em 0.3em 0;
    border-radius:0.12em;
    box-sizing: border-box;
    text-decoration:none;
    font-weight:300;
    color:${'blue'};
    text-align:center;
    background-color: ${'lightBlue'};
    background-color: ${(props) => (props.selected ? 'green' : `${'lightBlue'}`)};

    &:hover {
        cursor: pointer;
      }
      
`;

const ActionButton = styled.button`
    z-index: 100;
    padding: 8px;
    outline: none;
    cursor: pointer;
    font-weight: 500;
    margin-left: 8px;
    border-radius: 4px;
    color: white;
    background: ${(props) => (props.selectedSlot && props.selectedSlot === props.leagueKey
    ? '#4E871F'
    : '#17288F')};
    line-height: 1.15;
    font-size: 14px;
    letter-spacing: .08em;
    text-decoration: none;
    text-transform: uppercase;
    border: none;
    text-align: center;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    :hover {
        background: #4E871F;
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }
    @media (max-width: ${mobileBreakPoint}){
        width: 80px;
        height: 20px;
        display: flex;
    align-items: center;
    justify-content: center;
       }
`;

const CellContent = styled.p`
display: inline-block;
`

const Cell = styled.div`
padding-left: 8px;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
    background-color: ${(props) => (props.colored ? '#F7FBFF' : 'white')};
    &:hover{
        text-decoration: ${(props) => (props.teamName ? 'underline' : null)}; 
        cursor: ${(props) => (props.teamName ? 'pointer' : null)}; 
    }
    ${(props) => props.hasButton && `
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 32px;
  `}
  display: ${(props) => (props.onlyMobile && 'none')};

    @media (min-width: ${mobileBreakPoint}){
        ${(props) => !props.firstItem && `
            &:before {
                content: "";
                right: 0;
                z-index: 100;
                top: 0;
                height: 50%; 
                border-right: 2px solid #E5EAF4;
                margin-right: 8px;
            }
        `}
    }
    
    @media (max-width: ${mobileBreakPoint}){
        font-size: 14px;
        display: ${(props) => (props.mobile ? 'inline-block' : 'none')};
        ${(props) => props.hasButton && `
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 32px;
  `}
    }
`;

function BidRow({
  bid,
  index,
  sportTeams,
  currentMonthIncludesCurrentBid,
  deleteBid,
  leagueFromTeamId,
  mobileSwitch,
  selectedBid,
  showBidDetails,
  colored
}) {

  return (
    <Fragment
    >
      {currentMonthIncludesCurrentBid ? (
        <Cell mobile
          firstItem
          hasButton
          colored={colored}
        >
          <ActionButton selected={index == selectedBid} onClick={() => mobileSwitch(index)}>Switch</ActionButton>
        </Cell>
      ) : null}
      <Cell colored={colored} firstItem={!currentMonthIncludesCurrentBid} mobile>
        <CellContent style={{ display: "inline-block" }}>
          {sportTeams[leagueFromTeamId(bid.team_id)][bid.team_id].city}{" "}
          {sportTeams[leagueFromTeamId(bid.team_id)][bid.team_id].name}
        </CellContent>
      </Cell>
      <Cell colored={colored}><CellContent>{bid.priority}</CellContent></Cell>
      <Cell colored={colored}><CellContent>${bid.bid_value}</CellContent></Cell>
      <Cell colored={colored}>
        <CellContent style={{ display: "inline-block" }}>
          {bid.dropped_team_1
            ? `${sportTeams[leagueFromTeamId(bid.dropped_team_1)][
              bid.dropped_team_1
            ].city
            } ${sportTeams[leagueFromTeamId(bid.dropped_team_1)][
              bid.dropped_team_1
            ].name
            }`
            : "None"}
          {bid.dropped_team_2
            ? `, ${sportTeams[leagueFromTeamId(bid.dropped_team_2)][
              bid.dropped_team_2
            ].city
            } ${sportTeams[leagueFromTeamId(bid.dropped_team_2)][
              bid.dropped_team_2
            ].name
            }`
            : null}
          {bid.dropped_team_3
            ? `, ${sportTeams[leagueFromTeamId(bid.dropped_team_3)][
              bid.dropped_team_3
            ].city
            } ${sportTeams[leagueFromTeamId(bid.dropped_team_3)][
              bid.dropped_team_3
            ].name
            }`
            : null}
        </CellContent>
      </Cell>
      <Cell colored={colored} mobile onlyMobile hasButton><ActionButton onClick={() => showBidDetails(bid)}>Details</ActionButton></Cell>
      {currentMonthIncludesCurrentBid ? (
        <Cell colored={colored} hasButton mobile style={{ paddingRight: "8px" }}>
          {/* {bid.current ? ( */}
          <ActionButton onClick={() => deleteBid(bid.id)}>Delete</ActionButton>
          {/* ) : null} */}
        </Cell>

      ) : null}
    </Fragment>
  );
}

export default BidRow;