import React, { useState } from "react";
import useApi from "../../hooks/useApi";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function useCreateNewLeague() {
  const { makeRequest, isLoading } = useApi();
//   const history = useHistory();
//   const dispatch = useDispatch();
const emptyMember = {memberName: '', memberEmail: ''}
let emptySlot = {
    league1: {name: "", id: null, value: null},
    league2: {name: "", id: null, value: null},
    league3: {name: "", id: null, value: null},
    league4: {name: "", id: null, value: null},
    flex1: {name: "", id: null, value: null},
    bench1: {name: "", id: null, value: null},
    bench2: {name: "", id: null, value: null},
    bench3: {name: "", id: null, value: null}
}

const [stage,setStage] = useState('initial')
  const [values, setValues] = useState({
    leagueName: "",
    members: Array.from(Array(10)).fill(emptyMember)
  });
  const [leaguesUsed, setLeaguesUsed] = useState([1,2,3,4])

  const [sportTeams, setSportTeams] = useState(null)

  const [memberRosters, setMemberRosters] = useState(null)

  const [memberRosterIndex, setMemberRosterIndex] = useState(0)

  const handleChange = (e) => {
    if(e.target.name.includes('member')){
        let newMembers = JSON.parse(JSON.stringify(values.members))
        newMembers[e.target.id][e.target.name] = e.target.value
        setValues({
            ...values,
            members: newMembers
        })
        
    } else {
        setValues({
            ...values,
            [e.target.name]: e.target.value
          });
    }
  };

  const addMember = () => {
      const newMembers = [...values.members]
      newMembers.push(emptyMember)
      setValues({
          ...values,
          members: newMembers
      })
  }

  const removeMember = (index) => {
    let newMembers = [...values.members]
    newMembers.splice(index, 1)
    setValues({
        ...values,
        members:newMembers
    })
  }

  const submitForm = (e) => {
      e.preventDefault()
      console.log(values)
  }

  const getTeamsByLeagueId = async leagueId => {
      try{
        var res = await makeRequest({
            method: 'get',
            route: `/sports/teams/${leagueId}`
        })
        return JSON.parse(res.body)
      } catch (e) {
          console.log('problem')
          console.error(e)
      }

  }

//   const fetchRoster = async (selectedRoflYear) => {
//     try {
//       var res = await makeRequest({
//         method: "get",
//         route: `/users/roster/2/${currentOrganization.id}/${selectedRoflYear}`
//       });

//       setRoster(JSON.parse(res.body));
//     } catch (e) {
//       console.log("problem");
//       console.error(e);
//     }
//   };

  const fillSportTeams = async () => {
    let res = []
    for(let i=0;i<leaguesUsed.length;i++){
        const leagueId = leaguesUsed[i]
        const teams = await getTeamsByLeagueId(leagueId)
        // teams.forEach(team => {
        //     team = {...team, crossedOut: false}
        // })
        const teamsFromLeague = teams.map(team => ({ ...team, rostered: false, value: 0 }))
        res = [...res, ...teamsFromLeague]
    }
    setSportTeams([...res])
  }

  const fillMemberRosters = () => {
    let values = {
        leagueName: 'test',
        members: [
            {memberName: "evan", memberEmail: 's'},
            {memberName: "gaurav", memberEmail: 's'},
            {memberName: "andy", memberEmail: 's'},
            {memberName: "james", memberEmail: 's'},
            {memberName: "hayden", memberEmail: 's'}
        ]
    }
    let res = []
    values.members.forEach(member => {
        res.push({
            name: member.memberName,
            league1: {name: "", id: null, value: null},
            league2: {name: "", id: null, value: null},
            league3: {name: "", id: null, value: null},
            league4: {name: "", id: null, value: null},
            flex1: {name: "", id: null, value: null},
            bench1: {name: "", id: null, value: null},
            bench2: {name: "", id: null, value: null},
            bench3: {name: "", id: null, value: null}
        })
    })
    setMemberRosters(res)
  }

  const submitInitial = async () => {
    setValues({
        leagueName: 'test',
        members: [
            {memberName: "evan", memberEmail: 's'},
            {memberName: "gaurav", memberEmail: 's'},
            {memberName: "andy", memberEmail: 's'},
            {memberName: "james", memberEmail: 's'},
            {memberName: "hayden", memberEmail: 's'}
        ]
    })
    //   //check for name
    //   if(!values.leagueName){
    //       console.log('no league name')
    //     return
    //   }

    //   // check for member info
    //   for(let i=0;i<values.members.length;i++){
    //       if(!values.members[0].memberName){
    //           console.log('no name')
    //           return
    //       }
    //       if(!values.members[0].memberEmail){
    //         console.log('no email')
    //         return
    //     }
    //   }

      await fillSportTeams()
      fillMemberRosters()
      setStage('fillTeams')
  }

  const getAutocompleteSuggestions = (slot, name) => {
    let leaguesForSlot = []
    // get all leagues that fit slot
    if(slot.includes('league')){
        const leagueId = slot.split('league')[1]
        leaguesForSlot = [Number(leagueId)]
    } else {
        leaguesForSlot = [...leaguesUsed]
    }

    // remove leagues if member has 3 teams from that league already
    let teamsToReturn = []
   
    let teams = [...sportTeams]
    teams.forEach(team => {
        if(team.rostered === false && leaguesForSlot.includes(team.sport_league)) teamsToReturn.push({text:`${team.city} ${team.name}`, id: team.id})
    })
    //return array of team names
    teamsToReturn.sort()
    console.log("slot and array")
    console.log(slot)
    console.log(teamsToReturn)
    return teamsToReturn
  }

  const changeTeamInput = (e, slot, memberName) => {
    // update text value in member roster
      const newMemberRosters = [...memberRosters]
      newMemberRosters[memberRosterIndex][slot].name = e.target.value

      // if complete team (as found in sport team array), update whether this value is available for datalist
      let newSportTeams = [...sportTeams]
      const found = newSportTeams.find(item => `${item.city} ${item.name}` === e.target.value)
      if(found){
        newMemberRosters[memberRosterIndex][slot].id = found.id
        found.rostered = true
      }

      setSportTeams(newSportTeams)
      setMemberRosters(newMemberRosters)
  }

  const submitRoster = (e) => {
      e.preventDefault()
      console.log(memberRosters)
  }

  return {
    values,
    handleChange,
    addMember,
    removeMember,
    submitForm,
    stage,
    setStage,
    submitInitial,
    sportTeams,
    leaguesUsed,
    memberRosters,
    memberRosterIndex,
    setMemberRosterIndex,
    getAutocompleteSuggestions,
    changeTeamInput,
    submitRoster
  };
}

export default useCreateNewLeague;
