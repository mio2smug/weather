import { min } from 'lodash';
import getUserLocation from './getUserLocation'


    //html constants
    const todaysWeather = document.querySelector('#todays--weather')
    const forecastWrapper = document.querySelector('#forecast--wrapper')


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
        console.log(myArray)
        // const myTextValue = document.createElement('p') // Works?
        // myTextValue.textContent = "WIndow?"
        // todaysWeather.appendChild(myTextValue)


        //works


        for (let i= 0; i< myArray.length;i++){
            if(i === 1){

                //Display icon
                const myDivOuter = document.createElement('div')
                myDivOuter.classList.add('icon--div')
                
                const myDivInner = document.createElement('div')
                myDivInner.classList.add('icon--div--wrapper')

                const myTodayIcon = document.createElement('img')
                myTodayIcon.src = "sunny.svg"

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




            }  else{
                console.log(i)
            }

        }


        // for (let i = 0; i<myArray.length;i++){
            // if (i=0){
                // const myDivOuter = document.createElement('div')
                // myDivOuter.classList.add('icon--div')

                // const myDivInner = document.createElement('div')
                // myDivInner.classList.add('icon--div--wrapper')

                // const myIcon = document.createElement('img')
                // myIcon.src.add('sunny.svg')

                // myDivInner.appendChild(myIcon)
                // myDivOuter.appendChild(myDivInner)
                // todaysWeather.appendChild(myDivOuter)
            // }
        // }
    }
