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
        // for (let i = 0; i<myArray.length;i++){
            // if (i=0){
                const myDivOuter = document.createElement('div')
                myDivOuter.classList.add('icon--div')

                const myDivInner = document.createElement('div')
                myDivInner.classList.add('icon--div--wrapper')

                const myIcon = document.createElement('img')
                myIcon.src.add('sunny.svg')

                myDivInner.appendChild(myIcon)
                myDivOuter.appendChild(myDivInner)
                todaysWeather.appendChild(myDivOuter)
            // }
        // }
    }
