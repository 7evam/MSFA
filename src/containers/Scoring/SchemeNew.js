import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useSelector, useDispatch } from 'react-redux';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
  } from '@tanstack/react-table'
import { mediumBlue, lightBlue } from "../../constants/style";

const Container = styled.div`
    margin-top: 40px;
`;

const Td = styled.td`
    width: 33%;
    height: 20px;
`

const Tr = styled.tr`
background-color: ${mediumBlue};
    &:nth-child(odd) {
    background-color: ${lightBlue};
    }
`

const Table = styled.table`
    width: 300px;
`

function Scheme({scheme, league}) {
    
    const displayTable ={
        1: {
            playoff_bonus: "Clinch Playoffs",
            playoff_bonus_bye: "Clinch Playoff Bye",
            r1_lose_game: "Lose Game in Wild Card Round",
            r1_win_game: "Win Game in Wild Card Round",
            r1_win_series: "Win Series for Wild Card Round",
            r2_lose_game: "Lose Game in Divisional Series",
            r2_win_game: "Win Game in Divisional Series",
            r2_win_series: "Win Divisional Series",
            r3_lose_game: "Lose Game in League Championship Series",
            r3_win_game: "Win Game in League Championship Series",
            r3_win_series: "Win League Championship Series",
            r4_lose_game: "Lose Game in World Series",
            r4_win_game: "Win Game in World Series",
            r4_win_series: "Win World Series",
            rs_losses: "Lose Regular Season Game",
            rs_wins: "Win Regular Season Game"
        },
        2: {
            playoff_bonus: "Clinch Playoffs",
            playoff_bonus_bye: "Clinch Playoff Bye",
            r1_win_series: "Win Wild Card Playoff Game",
            r2_win_series: "Win Divisional Playoff Game",
            r3_win_series: "Win Conference Championship",
            r4_win_series: "Win Super Bowl",
            rs_losses: "Lose Regular Season Game",
            rs_tie_otl: "Tie Regular Season Game",
            rs_wins: "Win Regular Season Game"
        }, 
        3: {
            playoff_bonus: "Playoff Bonus",
            r1_lose_game: "Lose Game in Round 1",
            r1_win_game: "Win Game in Round 1",
            r1_win_series: "Win Series for Round 1",
            r2_lose_game: "Lose Game in Round 2",
            r2_win_game: "Win Game in Round 2",
            r2_win_series: "Win Series for Round 2",
            r3_lose_game: "Lose Game in Round 3",
            r3_win_game: "Win Game in Round 3",
            r3_win_series: "Win Series for Round 3",
            r4_lose_game: "Lose Game in Stanley Cup Finalls",
            r4_win_game: "Win Game in Stanley Cup Finals",
            r4_win_series: "Win Stanlley Cup Finalls",
            rs_losses: "Lose Regular Season Game",
            rs_tie_otl: "OT Loss",
            rs_wins: "Win Regular Season Game"
        },
        4: {
            nba_7_8_playin_win: "7/8 Play-in win",
            nba_9_10_playin_win: "9/10 Play-in win",
            nba_final_playin_win: "Final Play-in win",
            playoff_bonus: "Playoff Bonus",
            r1_lose_game: "Lose Game in Round 1",
            r1_win_game: "Win Game in Round 1",
            r1_win_series: "Win Series for Round 1",
            r2_lose_game: "Lose Game in Round 2",
            r2_win_game: "Win Game in Round 2",
            r2_win_series: "Win Series for Round 2",
            r3_lose_game: "Lose Game in Conference Championship",
            r3_win_game: "Win Game in Conference Championship",
            r3_win_series: "Win Conference Championship",
            r4_lose_game: "Lose Game in NBA Finals",
            r4_win_game: "Win Game in NBA Finals",
            r4_win_series: "Win NBA Finals",
            rs_losses: "Lose Regular Season Game",
            rs_wins: "Win Regular Season Game"
        }
    }

    const [data, setData] = useState(null)

    const setDataAndColumns = (league) => {
        // change data
        let result = []
        const columns = []
        console.log('here is scheme')
        console.log(scheme)
        Object.keys(scheme).forEach(item => {
            console.log('here is item')
            console.log(item)
            result.push({
                [item]: scheme[item]
            })
            columns.push({
                header: displayTable[league][item],
                accessorKey: item
            })
            // <p><b>{displayTable[league][item]}</b>: {scheme[item]}</p>
    })
        console.log('here is result the columns')
        console.log(result)
        console.log(columns)
        setData(result)
        setColumns(columns)
    }

    useEffect(() => {
        setDataAndColumns(league)
    }, [league]);

    useEffect(() => {
        setDataAndColumns(league)
    }, []);

    // useEffect(() => {
    //     // change format
    //     if(league === 1){
    //         playoffs ? setColumns(mlbPlayoffs) : setColumns(mlbReg)
    //     } else if(league === 2){
    //         playoffs ? setColumns(nflPlayoffs) : setColumns(nflReg)
    //     } else if(league === 3){
    //         playoffs ? setColumns(nhlPlayoffs) : setColumns(nhlReg)
    //     } else if(league ===4){
    //         playoffs ? setColumns(nbaPlayoffs) : setColumns(nbaReg)
    //     }
    // }, [league, playoffs]);

    
  const [sorting, setSorting] = useState([])
  const [columns, setColumns] = useState(null)

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

    

  return (
    columns ? (
      <Container>
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
                      <Td key={cell.id}>
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
      </Container> ) : <p>loading..</p>
  );
}

export default Scheme;
