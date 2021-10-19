export const checkIfRostersAreEqual = (roster1, roster2) => {
    console.log('checking if equal')
    console.log(roster1)
    console.log(roster2)
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
