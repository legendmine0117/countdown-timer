let endDate;
let flag = false; //flag to determine if day is selected by user, if day is not selected, submit button won't work
window.onload = function(){
    endDate = new Date("Jan 1, 2022").getTime()
}


// populate year seletion from current year to 2050
let currentYear = new Date().getFullYear()
for(let i=currentYear; i<2051; i++){
    let el = document.createElement("option")
    el.textContent = i
    el.value= i
    yearSel.add(el)
}

// populate month seletion
const MONTHLIST = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]
const MONTH_WITH_THIRD_DAYS = ["April", "June", "September", "November"]
yearSel.onchange = function(){
    monthSel.length = 1  //reset months
    daySel.length = 1  //reset days
    flag = false //reset flag to false
    for(let i=0;i<MONTHLIST.length;i++){
        let month = MONTHLIST[i]
        let el = document.createElement("option")
        el.textContent = month
        el.value= month
        monthSel.add(el)
    }

}



// populate day selection, account for leap year
monthSel.onchange = function(){
    daySel.length = 1 //reset days
    flag = false //reset flag to false
    let dayLength = 31
    if(MONTH_WITH_THIRD_DAYS.includes(monthSel.value)){
        dayLength = 30
    }
    if(monthSel.value === "February"){
        if(leapYear(yearSel.value)){
            dayLength =29
        } else{
            dayLength = 28
        }
    }
    for(let i=1; i<dayLength+1; i++){
        let el = document.createElement("option")
        el.textContent = i
        el.value= i
        daySel.add(el)
    }
}
// calcuate if selected year is a leap year
function leapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

daySel.onchange = function(){
    flag = true //set flag to true after day is selected
}
//reset count down date to user input
function setNewDate(){
    endDate = new Date(`${monthSel.value} ${daySel.value}, ${yearSel.value}`).getTime()
    let currentTime = new Date().getTime()
    if(((endDate - currentTime) <= 0) || flag === false){
        endDate = new Date("Jan 1, 2022").getTime()
        dateOutput.innerHTML = "Please enter a future date"
    } else{
        dateOutput.innerHTML = `${monthSel.value} ${daySel.value}, ${yearSel.value}`
    }
}

//display count down
setInterval(() => {
    let currentTime = new Date().getTime()
    let diff = endDate - currentTime
    let diffSeconds = diff / 1000
    days.innerHTML = Math.floor(diffSeconds/(3600 * 24))
    hours.innerHTML = Math.floor(diffSeconds/(3600) % 24)
    minutes.innerHTML =Math.floor((diffSeconds / 60) %60)
    seconds.innerHTML = Math.floor((diffSeconds % 60))
}, 1000);



