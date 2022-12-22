import React, { useState, useEffect, useReducer, useMemo } from "react";
import styled from "styled-components";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { mediumBlue, lightBlue } from "../../constants/style";
import {mlbReg, nhlReg, nbaReg, nflReg, mlbPlayoffs, nflPlayoffs, nhlPlayoffs, nbaPlayoffs} from './tableSchemes'

const Td = styled.td`
    height: 20px;
    min-width: ${(props) => (props.isName ? '200px' : '40px')};
`

const Tr = styled.tr`
background-color: ${mediumBlue};
    &:nth-child(odd) {
    background-color: ${lightBlue};
    }
`

const Table = styled.table`
    width: 100%;
`

const TableContainer = styled.div`
    width: 700px;
    overflow: scroll;
`

function RecordsTableNew({roflMonth, scores, roflYear, sportTeams, playoffs, league}) {

    const [data, setData] = useState(null)

    useEffect(() => {
        // change data
        let result = []
        console.log('here is scores wht you working with')
        console.log(scores)
        if(scores.records[league][`${roflMonth}-${roflYear}`]){
            Object.values(scores.records[league][`${roflMonth}-${roflYear}`]).forEach(item => {
                let team = {}
                console.log(sportTeams)
                team.name = `${sportTeams[league][item.team_id].city} ${sportTeams[league][item.team_id].name}`
                team.wins = item.rs_wins
                team.losses = item.rs_losses
                if(league == 2) team.ties = item.rs_tie_otl
                if(league == 3) team.otl = item.rs_tie_otl
                team.playoffBonus = item.playoff_bonus
                if(playoffs){
                    team.r1LoseGame = item.r1_lose_game
                    team.r1WinGame = item.r1_win_game
                    team.r1WinSeries = item.r1_win_series
                    team.r2LoseGame = item.r2_lose_game
                    team.r2WinGame = item.r2_win_game
                    team.r2WinSeries = item.r2_win_series
                    team.r3LoseGame = item.r3_lose_game
                    team.r3WinGame = item.r3_win_game
                    team.r3WinSeries = item.r3_win_series
                    team.r4LoseGame = item.r4_lose_game
                    team.r4WinGame = item.r4_win_game
                    team.r4WinSeries = item.r4_win_series
                }
                result.push(team)
            })
        }
        setData(result)
    }, [roflMonth, roflYear, league]);

    useEffect(() => {
        // change format
        if(league === 1){
            playoffs ? setColumns(mlbPlayoffs) : setColumns(mlbReg)
        } else if(league === 2){
            playoffs ? setColumns(nflPlayoffs) : setColumns(nflReg)
        } else if(league === 3){
            playoffs ? setColumns(nhlPlayoffs) : setColumns(nhlReg)
        } else if(league ===4){
            playoffs ? setColumns(nbaPlayoffs) : setColumns(nbaReg)
        }
    }, [league, playoffs]);

    
  const [sorting, setSorting] = useState([])
  const [columns, setColumns] = useState(nflReg)

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  const calculateIsName = (cell) => {
    console.log("here is cell")
    console.log(cell)
    let result = false
    if(cell.id.includes('name')) result = true
    return result
  }

  return (
    data 
    ?
    (<TableContainer>
      <Table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows
            .map(row => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <Td key={cell.id} isName={calculateIsName(cell)}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
        </tbody>
      </Table>
    </TableContainer> 
    )
    : 
    <p>loading...</p>
  )
}

export default RecordsTableNew;