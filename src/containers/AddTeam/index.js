import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "@fontsource/open-sans";
import useApi from "../../hooks/useApi";
import RosterComponent from '../../components/Roster'
import Loading from "../../components/Loading";
import useHydration from "../../hooks/useHydration";
import {Tab, TabSelector, Section, Select, Label, Headline, ActionButton, Container, League, LeagueSelector, slotData, SlotRow, Th, TitleRow, Td, Table, CashContainer} from './components'
import useAddTeam from "./useAddTeam";
import { convertRealToRofl, convertDateObjToReadable } from "../../utils";
import UnownedTeams from "./UnownedTeams";
import CurrentRosters from "./CurrentRosters";
import CurrentBids from "./CurrentBids";

function AddTeam(props) {
    
    const {tab, setTab, currentBids, handleClaim, currentDate, activeYears, deadlines, dropTeam, handleAction, readyToRender, orgMembers, selectedMember, handleChange, currentRoster, sportTeams, league, setLeague, unownedTeams, currentOrganization} = useAddTeam()

    // const getRoflDeadline = (league) => {
    //     activeYears[2022][league] 
    //     ?
    //     // use current rofl month as lookup index in deadlines
    //     console.log(convertDateObjToReadable(deadlines[2022][league][activeYears[2022][league].roflMonth].deadline))
    //     :
    //     // get current actual month and convert to rofl month as lookup index in deadlines
    //     console.log(convertDateObjToReadable(deadlines[2022][league][convertRealToRofl(5,league)].deadline))
    //     return <p>'hi</p>
    // }

    
    if(currentDate && deadlines){
        console.log('test')
        console.log(deadlines[2022][2][currentDate.realMonth].deadline)
    }

    const getContent = (tab) => {
        switch(tab){
            case 'rosters':
                return <CurrentRosters selectedMember={selectedMember} handleChange={handleChange} currentRoster={currentRoster}/>
            case 'unownedTeams':
                return <UnownedTeams handleAction={handleAction} handleClaim={handleClaim} league ={league} setLeague={setLeague} activeYears={activeYears} unownedTeams={unownedTeams} sportTeams={sportTeams}/>
            case 'bids':
                return <CurrentBids currentBids={currentBids} sportTeams={sportTeams} />
        }
    }
    

  return (
    readyToRender ?
    <Container>
     <TabSelector>
                <Tab selected={tab == "rosters"} onClick={() => setTab("rosters")}>
                Rosters
                </Tab>
                <Tab selected={tab == "unownedTeams"} onClick={() => setTab("unownedTeams")}>
                Unowned Teams
                </Tab>
                <Tab selected={tab == "bids"} onClick={() => setTab("bids")}>
                Current Bids
                </Tab>
    </TabSelector>
    {
        getContent(tab)
    }
    </Container>  : <Loading/>
  );
}

export default AddTeam;
