import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "@fontsource/open-sans";

function Table({teams}) {
  return (
      <table>
          <caption>hi</caption>
          <thead>
              <tr>
                  <th>Team</th>
                  <th>Points</th>
              </tr>
          </thead>
          <tbody>
            {Object.keys(scores.points[league][`${roflMonth}-${roflYear}`]).map(teamId => {
                <tr key={teams[league][teamId].id}>
                    <td>{teams[league][teamId].city} {teams[league][teamId].name}</td>
                    <td>{scores.points[league][`${roflMonth}-${roflYear}`][teamId]}</td>
                </tr>
            })}
          </tbody>
      </table>
  );
}

export default Table;


{/* <Container>
          {Object.keys(scores.points[league][`${roflMonth}-${roflYear}`]).map(teamId => (
              <div>
                  <p><b>{teams[league][teamId].city} {teams[league][teamId].name}:</b> {scores.points[league][`${roflMonth}-${roflYear}`][teamId]}</p>
              </div>
          ))}
      </Container> */}