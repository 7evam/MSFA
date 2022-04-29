import React, { useState } from "react";
import useApi from "../../hooks/useApi";
import { useHistory } from "react-router-dom";
import {useSelector} from 'react-redux'
import { TEST_ROSTER } from "./testRoster";

function useCreateNewLeague() {
  const { makeRequest, isLoading } = useApi();
  const { email } = useSelector(state => ({
    ...state.authReducer
  }));
//   const history = useHistory();
//   const dispatch = useDispatch();
const emptyMember = {memberName: '', memberEmail: ''}
const firstMember = {memberName: '', memberEmail: email}

const [stage,setStage] = useState('initial')
  const [values, setValues] = useState({
    leagueName: "",
    members: Array.from(Array(10)).fill(firstMember).fill(emptyMember,1)
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
    let res = []
    values.members.forEach(member => {
        res.push({
            cash: 200,
            name: member.memberName,
            email: member.memberEmail,
            league1: {name: "", id: null, value: ""},
            league2: {name: "", id: null, value: ""},
            league3: {name: "", id: null, value: ""},
            league4: {name: "", id: null, value: ""},
            flex1: {name: "", id: null, value: ""},
            bench1: {name: "", id: null, value: ""},
            bench2: {name: "", id: null, value: ""},
            bench3: {name: "", id: null, value: ""}
        })
    })
    setMemberRosters(res)
  }

  const submitInitial = async (e) => {
      //check for name
      if(!values.leagueName){
          console.log('no league name')
        return
      }

      // check for member info
      for(let i=0;i<values.members.length;i++){
          if(!values.members[0].memberName){
              console.log('no name')
              return
          }
          if(!values.members[0].memberEmail){
            console.log('no email')
            return
        }
      }
  
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

    // TODO
    // remove leagues if member has 3 teams from that league already
    let teamsToReturn = []
   
    let teams = [...sportTeams]
    teams.forEach(team => {
        if(team.rostered === false && leaguesForSlot.includes(team.sport_league)) teamsToReturn.push({text:`${team.city} ${team.name}`, id: team.id})
    })
    //return array of team names
    teamsToReturn.sort()
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
      } else {
          console.log('here is id')
          if(newMemberRosters[memberRosterIndex][slot].id){
            const unrosteredTeam = newSportTeams.find(item => item.id == newMemberRosters[memberRosterIndex][slot].id)
            console.log('here is unrosteredTeam')
            console.log(unrosteredTeam)
            unrosteredTeam.rostered = false
            newMemberRosters[memberRosterIndex][slot].id = null
          }
      }

      setSportTeams(newSportTeams)
      setMemberRosters(newMemberRosters)
  }

  const submitRoster = (e) => {
      e.preventDefault()
      setMemberRosters(memberRosters)
      setStage("reviewRoster")
  }

  const getUpdatedCashValue = (member) => {
      let cash = 200
      Object.keys(member).forEach(key => {
          if(member[key].value && typeof member[key].value === 'number') cash -= member[key].value
      })
      return cash
  }

  const changeTeamValue = (value, slot) => {

    let numberVal = Number(value)
    if(!numberVal) numberVal = 0
    const newMemberRosters = [...memberRosters]
    newMemberRosters[memberRosterIndex][slot].value = numberVal
    newMemberRosters[memberRosterIndex].cash = getUpdatedCashValue(newMemberRosters[memberRosterIndex])
    setMemberRosters(newMemberRosters)
  }

  const submitFinalRoster = async (e) => {
      e.preventDefault()
      const object = {
          members: values.members,
          leagueName: values.leagueName,
          rosterFormat: {
            league1: true,
            league2: true,
            league3: true,
            league4: true,
            flexSpots: 1,
            benchSpots: 3
        },
        rosters: memberRosters
      }
      try{
        var res = await makeRequest({
            method: "post",
            route: "/organizations",
            data: object
          });
        return JSON.parse(res.body)
      } catch (e) {
          console.log('problem')
          console.error(e)
      }
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
    submitRoster,
    changeTeamValue,
    submitFinalRoster,
  };
}

export default useCreateNewLeague;