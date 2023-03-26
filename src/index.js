import { min } from 'lodash';
import getUserLocation from './getUserLocation'


    //html constants
    const todaysWeather = document.querySelector('#todays--weather')
    todaysWeather.classList.add("today--wrapper")
    const forecastWrapper = document.querySelector('#forecast--wrapper')
    forecastWrapper.classList.add("forecast")


    class myObject{
        constructor(a,b,c,d){
            this.day = a;
            this.overcast = b;
            this.max = c;
            this.min = d;
        }
    }

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("error")
    }

    function showPosition(position){

        const myKey =  "42e9caab8bdd43ab819201719232403";
        let userLocationLat, userLocationLong;


        userLocationLat = position.coords.latitude
        userLocationLong = position.coords.longitude
        getWeather(myKey, userLocationLat, userLocationLong)
    }


    function getWeather(a,b,c){
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${a}&q=${b},${c}&days=7`, {mode: 'cors'})
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            myData(response);
        }).catch(function(error){
            console.log("could not be resolved :(")
        });
    }

    function myData(response){
        let myArray = [];
       for(let i= 0; i<7; i++){
                let datetest = response.forecast.forecastday[i].date
                let conditiontest = response.forecast.forecastday[i].day.condition.text
                let maxtest = response.forecast.forecastday[i].day.maxtemp_f
                let mintest = response.forecast.forecastday[i].day.mintemp_f
                const date = new myObject(datetest, conditiontest, maxtest,mintest); 
                myArray.push(date)
       }
       display(myArray);
    }

    function display(myArray){
        for (let i= 0; i< myArray.length;i++){
            if(i === 0){

                //Display icon
                const myDivOuter = document.createElement('div')
                myDivOuter.classList.add('icon--div')
                
                const myDivInner = document.createElement('div')
                myDivInner.classList.add('icon--div--wrapper')

                const myTodayIcon = document.createElement('img')
                myTodayIcon.src = "rain.svg"

                myDivInner.appendChild(myTodayIcon)
                myDivOuter.appendChild(myDivInner)
                // todaysWeather.appendChild(myDivOuter) 

                //End icon construction

                //start high temp construction
                const myTempHighDiv = document.createElement('div')
                myTempHighDiv.classList.add('temp-high');

                const myTempHighDivWrapper = document.createElement('div')
                myTempHighDivWrapper.classList.add('temp--high--wrapper');

                const myTodaysDate = document.createElement('h1')
                myTodaysDate.textContent =  "Today's High: ";

                const myTodaysHighTemp = document.createElement('h5')
                myTodaysHighTemp.textContent =  myArray[i].max + " °F";

                 myTempHighDivWrapper.appendChild(myTodaysDate)
                 myTempHighDivWrapper.appendChild(myTodaysHighTemp)
                 myTempHighDiv.appendChild(myTempHighDivWrapper);
                //end high temp construction

                //start low  temp construction
                const myTempLowDiv = document.createElement('div')
                myTempLowDiv.classList.add('temp-low')

                const myTempLowDivWrapper = document.createElement('div')
                myTempLowDivWrapper.classList.add('temp--low--wrapper')

                const myTodaysDate2 = document.createElement('h1')
                myTodaysDate2.textContent = "Today's low: "

                const myTodaysLowTemp = document.createElement('h5')
                myTodaysLowTemp.textContent = myArray[i].min + " °F"

                myTempLowDivWrapper.appendChild(myTodaysDate2)
                myTempLowDivWrapper.appendChild(myTodaysLowTemp)
                myTempLowDiv.appendChild(myTempLowDivWrapper)
                //end low temp construction

                todaysWeather.appendChild(myDivOuter)
                todaysWeather.appendChild(myTempHighDiv)
                todaysWeather.appendChild(myTempLowDiv)

            } 
            if (i===1){

                const myTomorrowReal = document.createElement('div')
                myTomorrowReal.classList.add('forecast--item--wrapper')

                const myTomorrow = document.createElement('div')
                myTomorrow.classList.add('day--value--wrapper')

                const myTomorrowHeading = document.createElement('h1')
                myTomorrowHeading.textContent = myArray[i].day
                myTomorrow.appendChild(myTomorrowHeading); //end

                const myTomorrowIconWrapper = document.createElement('div')
                myTomorrowIconWrapper.classList.add('icon--div--wrapper--forecast')

                const myTomorrowIcon = document.createElement('img')
                myTomorrowIcon.classList.add('forecast--icons')
                myTomorrowIcon.src = "sunny.svg"

                myTomorrowIconWrapper.appendChild(myTomorrowIcon); //end

                const myTomorrowForecastDivHigh = document.createElement('div')
                myTomorrowForecastDivHigh.classList.add('forecast--weather--high')
                const myTomorrowForecastDivHighLabel = document.createElement('h1')
                myTomorrowForecastDivHighLabel.textContent = "Tomorrow's High:"
                const myTomorrowForecastDivHighValue = document.createElement('h1')
                myTomorrowForecastDivHighValue.textContent = myArray[i].max + " °F"

                myTomorrowForecastDivHigh.appendChild(myTomorrowForecastDivHighLabel)
                myTomorrowForecastDivHigh.appendChild(myTomorrowForecastDivHighValue); //End

                const myTomorrowForecastDivLow = document.createElement('div')
                myTomorrowForecastDivLow.classList.add('forecast--weather--low')
                const myTomorrowForecastDivLowLabel = document.createElement('h1')
                myTomorrowForecastDivLowLabel.textContent = "Tomorrow's low"
                const myTomorrowForecastDivLowValue = document.createElement('h1')
                myTomorrowForecastDivLowValue.textContent = myArray[i].min + " °F"

                myTomorrowForecastDivLow.appendChild(myTomorrowForecastDivLowLabel)
                myTomorrowForecastDivLow.appendChild(myTomorrowForecastDivLowValue); //end

                myTomorrowReal.appendChild(myTomorrow)
                myTomorrowReal.appendChild(myTomorrowIconWrapper)
                myTomorrowReal.appendChild(myTomorrowForecastDivHigh)
                myTomorrowReal.appendChild(myTomorrowForecastDivLow)

                forecastWrapper.appendChild(myTomorrowReal)
            }
            if (i > 1){

                const myNthDayReal = document.createElement('div')
                myNthDayReal.classList.add('forecast--item--wrapper')

                const nthDay = document.createElement('div')
                nthDay.classList.add("day--value--wrapper")
                nthDay.classList.add('forecast')

                const nthDayDate=document.createElement('h1')
                nthDayDate.textContent = myArray[i].day

                nthDay.appendChild(nthDayDate) //end nday 1

                const nthDayIconWrapper = document.createElement('div')
                nthDayIconWrapper.classList.add("icon--div--wrapper--forecast")

                const nthDayImg = document.createElement('img')
                nthDayImg.classList.add('forecast--icons')
                nthDayImg.src = 'rain.svg'

                nthDayIconWrapper.appendChild(nthDayImg) //end nday 2

                const nthDayTempHigh = document.createElement('div')
                nthDayTempHigh.classList.add("forecast--weather--high")

                const nthDayTempHighLabel = document.createElement('h1')
                nthDayTempHighLabel.textContent = myArray[i].day + ' High: '
                const nthDayTempHighVal = document.createElement('h1')
                nthDayTempHighVal.textContent = myArray[i].max + ' *F'

                nthDayTempHigh.appendChild(nthDayTempHighLabel)
                nthDayTempHigh.appendChild(nthDayTempHighVal) // end nday 3

                const nthDayTempLow = document.createElement('div')
                nthDayTempLow.classList.add("forecast--weather--low")

                const nthDayTempLowLabel = document.createElement('h1')
                nthDayTempLowLabel.textContent = myArray[i].day + ' High: '
                const nthDayTempLowValue = document.createElement('h1')
                nthDayTempLowValue.textContent = myArray[i].min + ' *F'

                nthDayTempLow.appendChild(nthDayTempLowLabel)
                nthDayTempLow.appendChild(nthDayTempLowValue) //end nday 4

                myNthDayReal.appendChild(nthDay)
                myNthDayReal.appendChild(nthDayIconWrapper)
                myNthDayReal.appendChild(nthDayTempHigh)
                myNthDayReal.appendChild(nthDayTempLow)

                forecastWrapper.appendChild(myNthDayReal)

            }

        }
    }
