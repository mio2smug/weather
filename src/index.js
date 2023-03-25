import getUserLocation from './getUserLocation'


//api template `https://api.weatherapi.com/v1/current.json?key=42e9caab8bdd43ab819201719232403&q=39.1,-76.94`
//api template works without having to round lat and long to 10^-2

// let myKey =  "42e9caab8bdd43ab819201719232403";

// let userLocationLat, userLocationLong;

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("error")
    }

    function showPosition(position){
        //initiate as local variables

        const myKey =  "42e9caab8bdd43ab819201719232403";
        let userLocationLat, userLocationLong;


        userLocationLat = position.coords.latitude
        userLocationLong = position.coords.longitude
        getWeather(myKey, userLocationLat, userLocationLong)
        // console.log("latitude: " + userLocationLat + " longitude: " + userLocationLong)  //working
    }


    function getWeather(a,b,c){
        fetch(`https://api.weatherapi.com/v1/current.json?key=${a}&q=${b},${c}`, {mode: 'cors'})
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            console.log(response);
        });
    }




// fetch(`https://api.weatherapi.com/v1/current.json?key=${a}q=${b},${c}`, {mode: 'cors'})
//         .then(function(response){
//             return response.json();
//         })
//         .then(function(response){
//             console.log(response);
//         });


        