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
import { mediumBlue, lightBlue, mobileBreakPoint } from "../../constants/style";
import {mlbReg, nhlReg, nbaReg, nflReg, mlbPlayoffs, nflPlayoffs, nhlPlayoffs, nbaPlayoffs} from './tableSchemes'

const Td = styled.td`
    height: 20px;
    min-width: ${(props) => (props.isName ? '200px' : '40px')};
    text-align: ${(props) => (props.isBonus ? 'center' : null)};
    width: ${(props) => (props.isBonus ? '20px' : null)};
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

const Th = styled.th`
    font-weight: 800;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
`

const TableContainer = styled.div`
    width: 700px;
    overflow: scroll;
    @media (max-width: ${mobileBreakPoint}){
        width: 100vw;
      }
`

function RecordsTableNew({roflMonth, scores, roflYear, sportTeams, playoffs, league}) {

    const [data, setData] = useState(null)
    const [sorting, setSorting] = useState([])
    const [columns, setColumns] = useState(null)
    const [renderPlayoffBonus, setRenderPlayoffBonus] = useState(null)

    useEffect(() => {
        // change data
        let result = []
        let renderPlayoffBonus = false
        const selectedRecords = scores.records[league][`${roflMonth}-${roflYear}`]
        if(selectedRecords){
        if(Object.values(selectedRecords).filter(item => !!item.playoff_bonus).length){
          renderPlayoffBonus = true
        } 
            Object.values(selectedRecords).forEach(item => {
                let team = {}
                team.name = `${sportTeams[league][item.team_id].city} ${sportTeams[league][item.team_id].name}`
                team.wins = item.rs_wins
                team.losses = item.rs_losses
                if(league == 2) team.ties = item.rs_tie_otl
                if(league == 3) team.otl = item.rs_tie_otl
                if(renderPlayoffBonus) team.playoffBonus = item.playoff_bonus ? '✅' : null
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
        setRenderPlayoffBonus(renderPlayoffBonus)
    }, [roflMonth, roflYear, league]);

    useEffect(() => {
        // change format
        if(league === 1){
            playoffs ? setColumns(mlbPlayoffs) : setColumns(mlbReg(renderPlayoffBonus))
        } else if(league === 2){
            playoffs ? setColumns(nflPlayoffs) : setColumns(nflReg(renderPlayoffBonus))
        } else if(league === 3){
            playoffs ? setColumns(nhlPlayoffs) : setColumns(nhlReg(renderPlayoffBonus))
        } else if(league ===4){
            playoffs ? setColumns(nbaPlayoffs) : setColumns(nbaReg(renderPlayoffBonus))
        }
        setSorting([])
    }, [league, playoffs, renderPlayoffBonus]);

    


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
    let result = false
    if(cell.id.includes('name')) result = true
    return result
  }

  const calculateIsBonus = (cell) => {

    let result = false
    if(cell.id.includes('playoff')) result = true
    return result
  }

  return (
    data && columns
    ?
    (<TableContainer>
      <Table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <Th key={header.id} colSpan={header.colSpan}>
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
                  </Th>
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
                      <Td key={cell.id} isBonus={calculateIsBonus(cell)} isName={calculateIsName(cell)}>
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