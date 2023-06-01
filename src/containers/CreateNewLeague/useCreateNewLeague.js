import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useApi from '../../hooks/useApi';
import { TEST_ROSTER } from './testRoster';

function useCreateNewLeague(existingOrganization) {
  const history = useHistory();
  const { makeRequest, isLoading } = useApi();

  const dispatch = useDispatch();

  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));
  const { email } = useSelector((state) => ({
    ...state.authReducer,
  }));

  //   const history = useHistory();
  //   const dispatch = useDispatch();
  const emptyMember = { memberName: '', memberEmail: '' };
  const firstMember = { memberName: '', memberEmail: email };

  const [stage, setStage] = useState('initial');
  const [values, setValues] = useState({
    leagueName: '',
    members: Array.from(Array(10)).fill(firstMember).fill(emptyMember, 1),
  });
  const [leaguesUsed, setLeaguesUsed] = useState([1, 2, 3, 4]);

  const [sportTeams, setSportTeams] = useState(null);

  const [memberRosters, setMemberRosters] = useState(null);

  const [memberRosterIndex, setMemberRosterIndex] = useState(0);

  // ** Set this value to true for test data to be automatically added **
  const test = false;

  useEffect(() => {
    if (existingOrganization) {
      fetchUsersInOrg(existingOrganization.id);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name.includes('member')) {
      const newMembers = JSON.parse(JSON.stringify(values.members));
      newMembers[e.target.id][e.target.name] = e.target.value;
      setValues({
        ...values,
        members: newMembers,
      });
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    }
  };

  const addMember = () => {
    const newMembers = [...values.members];
    newMembers.push(emptyMember);
    setValues({
      ...values,
      members: newMembers,
    });
  };

  const removeMember = (index) => {
    const newMembers = [...values.members];
    newMembers.splice(index, 1);
    setValues({
      ...values,
      members: newMembers,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const getTeamsByLeagueId = async (leagueId) => {
    try {
      const res = await makeRequest({
        method: 'get',
        route: `/sports/teams/${leagueId}`,
      });
      return res.body;
    } catch (e) {
      console.log('problem');
      console.error(e);
    }
  };

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
    let res = [];
    for (let i = 0; i < leaguesUsed.length; i++) {
      const leagueId = leaguesUsed[i];
      const teams = await getTeamsByLeagueId(leagueId);
      // teams.forEach(team => {
      //     team = {...team, crossedOut: false}
      // })
      const teamsFromLeague = teams.map((team) => ({ ...team, rostered: false, value: 0 }));
      res = [...res, ...teamsFromLeague];
    }
    setSportTeams([...res]);
  };

  const fillMemberRosters = () => {
    if (test) {
      setMemberRosters(TEST_ROSTER);
      return;
    }
    const res = [];
    values.members.forEach((member, i) => {
      res.push({
        cash: 200,
        name: member.memberName,
        email: member.memberEmail,
        tempId: i,
        league1: { name: '', id: null, value: '' },
        league2: { name: '', id: null, value: '' },
        league3: { name: '', id: null, value: '' },
        league4: { name: '', id: null, value: '' },
        flex1: { name: '', id: null, value: '' },
        bench1: { name: '', id: null, value: '' },
        bench2: { name: '', id: null, value: '' },
        bench3: { name: '', id: null, value: '' },
      });
    });
    setMemberRosters(res);
  };

  const submitInitial = async (e) => {
    // check for name
    if (!values.leagueName) {
      console.log('no league name');
      return;
    }

    // check for member info
    for (let i = 0; i < values.members.length; i++) {
      if (!values.members[0].memberName) {
        console.log('no name');
        return;
      }
      if (!values.members[0].memberEmail) {
        console.log('no email');
        return;
      }
    }

    await fillSportTeams();
    fillMemberRosters();
    setStage('fillTeams');
  };

  const getMemberLeagueTeamCount = () => {
    const table = {};
    memberRosters.forEach((member) => {
      Object.keys(member).filter((key) => key !== 'cash' && key !== 'email' && key !== 'name' && key !== 'tempId').forEach((slot) => {
        if (member[slot] && member[slot].id) {
          const leagueId = String(member[slot].id)[0];
          if (!table[member.tempId]) table[member.tempId] = {};
          if (!table[member.tempId][leagueId]) {
            table[member.tempId][leagueId] = 1;
          } else {
            table[member.tempId][leagueId] += 1;
          }
        }
      });
    });
    return table;
  };

  const getAutocompleteSuggestions = (slot, tempId) => {
    const memberLeagueTeamCount = getMemberLeagueTeamCount();
    let leaguesForSlot = [];
    // get all leagues that fit slot
    if (!memberLeagueTeamCount[tempId]) {
      memberLeagueTeamCount[tempId] = {
        1: 0, 2: 0, 3: 0, 4: 0,
      };
    }

    const badLeagues = [];

    Object.keys(memberLeagueTeamCount[tempId]).forEach((leagueId) => {
      if (memberLeagueTeamCount[tempId][leagueId] >= 3) {
        badLeagues.push(leagueId);
      }
    });

    if (slot.includes('league')) {
      const slotLeagueId = slot.split('league')[1];
      leaguesForSlot = [Number(slotLeagueId)];
    } else {
      leaguesForSlot = [...leaguesUsed];
    }

    badLeagues.forEach((badLeague) => {
      const badIndex = leaguesForSlot.indexOf(Number(badLeague));
      if (badIndex >= 0) leaguesForSlot.splice(badIndex, 1);
    });

    const teamsToReturn = [];

    const teams = [...sportTeams];
    teams.forEach((team) => {
      if (team.rostered === false && leaguesForSlot.includes(team.sport_league)) teamsToReturn.push({ text: `${team.city} ${team.name}`, id: team.id });
    });
    // return array of team names
    teamsToReturn.sort();
    return teamsToReturn;
  };

  const fetchUsersInOrg = async (organizationId) => {
    // this function fetches userrs in an existing organization
    // and sets them as default values in values
    try {
      // console.log(`fetching for ${selectedRoflYear}`)
      const res = await makeRequest({
        method: 'get',
        route: `organizations/summary/${organizationId}`,
      });
      if (res.body && res.body.members && res.body.members.length) {
        const existingMembers = res.body.members;
        const members = [];
        existingMembers.forEach((member) => {
          members.push({
            memberEmail: member.email,
            memberName: member.name,
            memberId: member.user_id,
          });
        });
        setValues({
          leagueName: res.body.name,
          members,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const changeTeamInput = (e, slot, tempId) => {
    // update text value in member roster
    const newMemberRosters = [...memberRosters];
    newMemberRosters[memberRosterIndex][slot].name = e.target.value;

    // if complete team (as found in sport team array),
    // update whether this value is available for datalist
    const newSportTeams = [...sportTeams];
    const found = newSportTeams.find((item) => `${item.city} ${item.name}` === e.target.value);
    if (found) {
      found.rostered = tempId;
      newMemberRosters[memberRosterIndex][slot].id = found.id;
    } else if (newMemberRosters[memberRosterIndex][slot].id) {
      const unrosteredTeam = newSportTeams.find(
        (item) => item.id === newMemberRosters[memberRosterIndex][slot].id,
      );
      unrosteredTeam.rostered = false;
      newMemberRosters[memberRosterIndex][slot].id = null;
    }

    setSportTeams(newSportTeams);
    setMemberRosters(newMemberRosters);
  };

  const submitRoster = (e) => {
    e.preventDefault();
    setMemberRosters(memberRosters);
    setStage('reviewRoster');
  };

  const getUpdatedCashValue = (member) => {
    let cash = 200;
    Object.keys(member).forEach((key) => {
      if (member[key].value && typeof member[key].value === 'number') cash -= member[key].value;
    });
    return cash;
  };

  const changeTeamValue = (value, slot) => {
    let numberVal = Number(value);
    if (!numberVal) numberVal = 0;
    const newMemberRosters = [...memberRosters];
    newMemberRosters[memberRosterIndex][slot].value = numberVal;
    newMemberRosters[memberRosterIndex].cash = getUpdatedCashValue(newMemberRosters[memberRosterIndex]);
    setMemberRosters(newMemberRosters);
  };

  const setNewCurrentOrg = async (organizationId) => {
    // setIsLoading(true);
    const res = await makeRequest({
      method: 'patch',
      route: `/users/changeOrg/${currentOrganization.user_id}`,
      data: { organizationId },
    });
    // console.log('here is res');
    // console.log(res);
    if (res.statusCode === 200) {
      // console.log('past if');
      const organizations = res.body;
      // console.log('here is rogs');
      // console.log(organizations);
      dispatch({
        type: 'SET_NEW_ORGS',
        payload: {
          organizations,
        },
      });
    }
    // setIsLoading(false);
  };

  const submitFinalRoster = async (e) => {
    // remove tempId

    memberRosters.forEach((roster) => {
      delete roster.tempId;
    });
    console.log('here is memberRosters');
    console.log(memberRosters);
    e.preventDefault();
    const dataObject = {
      members: values.members,
      leagueName: values.leagueName,
      rosterFormat: {
        league1: true,
        league2: true,
        league3: true,
        league4: true,
        flexSpots: 1,
        benchSpots: 3,
      },
      rosters: memberRosters,
    };
    try {
      console.log(existingOrganization);
      const res = existingOrganization
        ? await makeRequest({
          method: 'post',
          route: `/organizations/newSeason/${existingOrganization.id}`,
          data: dataObject,
        })
        : await makeRequest({
          method: 'post',
          route: '/organizations',
          data: dataObject,
        });

      if (res.statusCode === 201) {
        if (existingOrganization) await setNewCurrentOrg(existingOrganization.id);
        history.push('/squad');
      }
      return JSON.parse(res.body);
    } catch (e) {
      console.log('in error');
      console.log(e);
      console.log('problem');
      console.error(e);
      return e;
    }
  };

  const slotHashMap = {
    league1: 'MLB',
    league2: 'NFL',
    league3: 'NHL',
    league4: 'NBA',
    flex1: 'FLEX',
    bench1: 'Bench',
    bench2: 'Bench',
    bench3: 'Bench',
  };

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
    slotHashMap,
  };
}

export default useCreateNewLeague;
