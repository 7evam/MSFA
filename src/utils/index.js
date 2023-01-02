export const checkIfRostersAreEqual = (roster1, roster2) => {
    let value = true
    const keys = Object.keys(roster1)
    keys.forEach(key => {
        if(roster1[key] && roster1[key].hasOwnProperty('id') && roster1[key].id !== roster2[key].id){
            value = false
            return
        }
    })
    return value
}

export const convertDateObjToReadable = (date) => {
    return `${new Date(date).toDateString()}`;
}

export const convertMonthToReadable = (month, year) => {
    year = Number(year)
    const months = {
        1: `April ${year}`,
        2: `May ${year}`,
        3: `June ${year}`,
        4: `July ${year}`,
        5: `August ${year}`,
        6: `September ${year}`,
        7: `October ${year}`,
        8: `November ${year}`,
        9: `December ${year}`,
        10: `January ${year+1}`,
        11: `February ${year+1}`,
        12: `March ${year+1}`,
        13: `April ${year+1}`,
        14: `May ${year+1}`
    }
    return months[month]
}

export const convertRoflMonthToReal = (roflMonth) => {
    // only use this function for inactive leagues before they start!
    return Number(roflMonth) + 3
}

export const convertRealToRofl = (realMonth, leagueId) => {
    console.log('converting real to rofl')
    console.log(realMonth)
    console.log(leagueId)
        realMonth = Number(realMonth)
        leagueId = Number(leagueId)
        let res
        if(leagueId === 1){
            return realMonth -= 3
        } else if(leagueId === 2 || leagueId === 3 || leagueId === 4){
            if(realMonth < 7){
                res = realMonth += 9
                console.log('here isi res')
                console.log(res)
                return res
            } else {
                res = realMonth -=3
                console.log(res)
                return res
            }
        }
}

export const shortenName = (name) => {
    if(name.length >=26){
        return name.substring(0,25) + '...'
    } else {
        return name
    }
}

export const checkIfEmptySlot = (currentTeams, roflMonth) => {
    const emptySlotsForFullRoster = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 2,
        9: 2,
        10: 2,
        11: 4,
        12: 4,
        13: 4,
        14: 4,
    }

    let emptySlotCount = 0
    Object.keys(currentTeams).filter(key => key!=='cash').forEach(key => {
        const team = currentTeams[key]
        if(!team.teamId){
            emptySlotCount ++
        } 
    })
    let emptySlot = emptySlotCount > emptySlotsForFullRoster[roflMonth]
    console.log('empty slot value')
    console.log(emptySlot)
    return emptySlot
}