import React from "react";
import {
  SlotRow,
  Td
} from "./components";

import { Draggable } from "react-beautiful-dnd";



function BidRow({
    bid,
    index,
    sportTeams,
    currentMonthIncludesCurrentBid,
    deleteBid,
    leagueFromTeamId
}) {
  return (
        <SlotRow
        >
          {currentMonthIncludesCurrentBid ? (
            <Td
            width={'col1width'}
              style={{
                
                textAlign: "center",
                fontSize: "32px"
              }}
            >
              {"≡"}
            </Td>
          ) : null}
          <Td width={'col2width'}>
            {sportTeams[leagueFromTeamId(bid.team_id)][bid.team_id].city}{" "}
            {sportTeams[leagueFromTeamId(bid.team_id)][bid.team_id].name}
          </Td>
          <Td width={'col3width'}>{bid.priority}</Td>
          <Td width={'col4width'}>${bid.bid_value}</Td>
          <Td width={'col5width'}>
            {bid.dropped_team_1
              ? `${
                  sportTeams[leagueFromTeamId(bid.dropped_team_1)][
                    bid.dropped_team_1
                  ].city
                } ${
                  sportTeams[leagueFromTeamId(bid.dropped_team_1)][
                    bid.dropped_team_1
                  ].name
                }`
              : "None"}
            {bid.dropped_team_2
              ? `, ${
                  sportTeams[leagueFromTeamId(bid.dropped_team_2)][
                    bid.dropped_team_2
                  ].city
                } ${
                  sportTeams[leagueFromTeamId(bid.dropped_team_2)][
                    bid.dropped_team_2
                  ].name
                }`
              : null}
            {bid.dropped_team_3
              ? `, ${
                  sportTeams[leagueFromTeamId(bid.dropped_team_3)][
                    bid.dropped_team_3
                  ].city
                } ${
                  sportTeams[leagueFromTeamId(bid.dropped_team_3)][
                    bid.dropped_team_3
                  ].name
                }`
              : null}
          </Td>

          {currentMonthIncludesCurrentBid ? (
            <Td width={'col6width'}>
              {bid.current ? (
                <button onClick={() => deleteBid(bid.id)}>Delete</button>
              ) : null}
            </Td>
          ) : null}
        </SlotRow>
  );
}

export default BidRow;