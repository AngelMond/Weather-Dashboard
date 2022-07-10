

    // GLOBAL VARIABLES
//Date container for the header 
var actualTime = document.querySelector('#actualTime');

//Select h3 on the big card to append the current city name
let actualCity = document.querySelector('#actualCity');

//Img tag's to append the icons
let iconCurrentDay = document.querySelector('#iconCurrentDay');
let iconDay1 = document.querySelector('#iconDay1');
let iconDay2 = document.querySelector('#iconDay2');
let iconDay3 = document.querySelector('#iconDay3');
let iconDay4 = document.querySelector('#iconDay4');
let iconDay5 = document.querySelector('#iconDay5');


let bigCard = document.querySelector('#bigCard');

//Select input to enter a city
let inputSearchCity = document.querySelector('#inputSearchCity');

//Select my button to search
let buttonSearch = document.querySelector('#buttonSearch');

//Select container to append the search history
let historyContainer = document.querySelector('#historyContainer');

//Span to appen the current temp
let todayTemp = document.querySelector('#todayTemp');

//Span to appen the current wind
let todayWind = document.querySelector('#todayWind');

//Span to appen the current humidity
let todayHumidity = document.querySelector('#todayHumidity');

//Span to appen the current UVI
let todayUvIndex = document.querySelector('#todayUvIndex');


//Forecast Tags
let tempDay1 = document.querySelector('#tempDay1');
let windDay1 = document.querySelector('#windDay1');
let humidityDay1 = document.querySelector('#humidityDay1');

let tempDay2 = document.querySelector('#tempDay2');
let windDay2 = document.querySelector('#windDay2');
let humidityDay2 = document.querySelector('#humidityDay2');

let tempDay3 = document.querySelector('#tempDay3');
let windDay3 = document.querySelector('#windDay3');
let humidityDay3 = document.querySelector('#humidityDay3');

let tempDay4 = document.querySelector('#tempDay4');
let windDay4 = document.querySelector('#windDay4');
let humidityDay4 = document.querySelector('#humidityDay4');

let tempDay5 = document.querySelector('#tempDay5');
let windDay5 = document.querySelector('#windDay5');
let humidityDay5 = document.querySelector('#humidityDay5');


//Changing the background color for the big card
bigCard.style.background = "#B4C9DE";

//Function to display actual date
function displayTime (){
    let date = moment().format('LLL');
    actualTime.append(date);

    setInterval(function(){
        var dateSeconds = moment().format('LLL');
        actualTime.textContent = "";
        actualTime.append(dateSeconds);
    },1000)
}

displayTime();




//Clear input 
function clearInput(){
    inputSearchCity.value = "";
}


function searchCity(valueInputUser) { 

    var APIKey = 'c5e630ab2260d0340faeed9b3e2d802d';
    var arrayData = [];

    let latitude = [];
    let longitude = [];

    let cityName = [];
    let todaysTemp = [];
    let todaysWind = [];
    let todaysHumidity = [];
    let todaysUvi = [];

    //Weather stats for 5 days forecast
    let firstDaytemp = [];
    let firstDayWind = [];
    let firstDayHumidity = [];

    let secondDayTemp = [];
    let secondDayWind = [];
    let secondDayHuminity = [];

    let thirdDayTemp = [];
    let thirdDayWind = [];
    let thirdDayHuminity = [];

    let fourthDayTemp = [];
    let fourthDayWind = [];
    let fourthDayHuminity = [];

    let fifthDayTemp = [];
    let fifthDayWind = [];
    let fifthDayHuminity = [];

    //Icons
    let todaysIcon = [];
    let firstDayIcon = [];
    let secondDayIcon = [];
    let thirdDayIcon = [];
    let fourthDayIcon = [];
    let fifthDayIcon = [];
    

       

   //Fisrt reques with the city name and get the coordenates to make a second request
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ valueInputUser +'&include=hourly,daily&units=metric&appid='+ APIKey)
    .then(data => data.json())
    .then(data => {
        arrayData = data;
        
        // console.log(arrayData)
        latitude = data.coord.lat;
        longitude = data.coord.lon;

        let dateCity = moment().subtract(10, 'days').calendar();

        //Appending the city name for Current day
        cityName = data.name;
        actualCity.textContent = "";
        //Appending the name of the city and the actual date 
        actualCity.append(cityName + " " + "   ("+ dateCity + ") ");

        //Second request to get all weather info
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude=minutely,hourly&units=metric&appid='+ APIKey)
        .then(data => data.json())
        .then(data => {
            
            // console.log(data)

            //My 4 weather stats for the current day
            todaysTemp = data.current.temp + " °C";
            todaysWind = data.current.wind_speed + " KM/H";
            todaysHumidity = data.current.humidity + " %";
            todaysUvi = data.current.uvi;

            
        
            //Appending the current weather 
            todayTemp.textContent = " ";
            todayTemp.append(todaysTemp);
            
            todayWind.textContent = " ";
            todayWind.append(todaysWind);
            
            todayHumidity.textContent = " ";
            todayHumidity.append(todaysHumidity);
            
            todayUvIndex.textContent = " ";
            todayUvIndex.append(todaysUvi);


            //Conditions to change the backgorund color for the UVI in the Big Card
            if(todaysUvi >= 0 && todaysUvi < 3 ){
                todayUvIndex.style.background = "green";
            }

            if(todaysUvi >= 3 && todaysUvi < 6 ){
                todayUvIndex.style.background = "yellow";
            }

            if(todaysUvi >= 6 && todaysUvi < 8 ){
                todayUvIndex.style.background = "orange";
            }

            if(todaysUvi >= 8 && todaysUvi < 11 ){
                todayUvIndex.style.background = "red";
            }

            if(todaysUvi >= 11 ){
                todayUvIndex.style.background = "purple";
            }


            // weather icon for the current weather
            todaysIcon = data.current.weather[0].icon;
            let iconUrl = "http://openweathermap.org/img/wn/"+todaysIcon+".png";
            iconCurrentDay.src = iconUrl;
            iconCurrentDay.style.width = "50px";
            iconCurrentDay.style.height = "50px";


            //Icons for forecast weather
            firstDayIcon = data.daily[0].weather[0].icon;
            let iconUrlDay1 = "http://openweathermap.org/img/wn/"+firstDayIcon+".png";
            iconDay1.src = iconUrlDay1;
            iconDay1.style.width = "50px";
            iconDay1.style.height = "50px";

            secondDayIcon = data.daily[1].weather[0].icon;
            let iconUrlDay2 = "http://openweathermap.org/img/wn/"+firstDayIcon+".png";
            iconDay2.src = iconUrlDay2;
            iconDay2.style.width = "50px";
            iconDay2.style.height = "50px";

            thirdDayIcon = data.daily[2].weather[0].icon;
            let iconUrlDay3 = "http://openweathermap.org/img/wn/"+firstDayIcon+".png";
            iconDay3.src = iconUrlDay3;
            iconDay3.style.width = "50px";
            iconDay3.style.height = "50px";

            fourthDayIcon = data.daily[3].weather[0].icon;
            let iconUrlDay4 = "http://openweathermap.org/img/wn/"+firstDayIcon+".png";
            iconDay4.src = iconUrlDay4;
            iconDay4.style.width = "50px";
            iconDay4.style.height = "50px";

            fifthDayIcon = data.daily[4].weather[0].icon;
            let iconUrlDay5 = "http://openweathermap.org/img/wn/"+firstDayIcon+".png";
            iconDay5.src = iconUrlDay5;
            iconDay5.style.width = "50px";
            iconDay5.style.height = "50px";


             //Weather forecast
             //First Day
             firstDaytemp = data.daily[0].temp.day;
             tempDay1.textContent = "";
             tempDay1.append(firstDaytemp + " °C");
            
             firstDayWind = data.daily[0].wind_speed;
             windDay1.textContent = "";
             windDay1.append(firstDayWind + " KM/H");
            
             firstDayHumidity = data.daily[0].humidity;
             humidityDay1.textContent = "";
             humidityDay1.append(firstDayHumidity + " %")

            //Second Day
             secondDayTemp = data.daily[1].temp.day;
             tempDay2.textContent = "";
             tempDay2.append(secondDayTemp + " °C");
            
             secondDayWind = data.daily[1].wind_speed;
             windDay2.textContent = "";
             windDay2.append(secondDayWind + " KM/H");
            
             secondDayHuminity = data.daily[1].humidity;
             humidityDay2.textContent = "";
             humidityDay2.append(secondDayHuminity + " %")
            
             //third Day
             thirdDayTemp = data.daily[2].temp.day;
             tempDay3.textContent = "";
             tempDay3.append(thirdDayTemp + " °C");
            
             thirdDayWind = data.daily[2].wind_speed;
             windDay3.textContent = "";
             windDay3.append(thirdDayWind + " KM/H");
            
             thirdDayHuminity = data.daily[2].humidity;
             humidityDay3.textContent = "";
             humidityDay3.append(thirdDayHuminity + " %")

            //fourth Day
             fourthDayTemp = data.daily[3].temp.day;
             tempDay4.textContent = "";
             tempDay4.append(fourthDayTemp + " °C");
             
             fourthDayWind = data.daily[3].wind_speed;
             windDay4.textContent = "";
             windDay4.append(fourthDayWind + " KM/H");
            
             fourthDayHuminity = data.daily[3].humidity;
             humidityDay4.textContent = "";
             humidityDay4.append(fourthDayHuminity + " %")
             
             //fifth Day
             fifthDayTemp = data.daily[4].temp.day;
             tempDay5.textContent = "";
             tempDay5.append(fifthDayTemp + " °C");
             
             fifthDayWind = data.daily[4].wind_speed;
             windDay5.textContent = "";
             windDay5.append(fifthDayWind + " KM/H");
             
             fifthDayHuminity = data.daily[4].humidity;
             humidityDay5.textContent = "";
             humidityDay5.append(fifthDayHuminity + " %")

        })
        //finish second fetch
    })
    //finish first fetch
    forecasteDate();
}
//finish search City function


//Tags to append the forecast date's
let dateDay1 = document.querySelector('#dateDay1');
let dateDay2 = document.querySelector('#dateDay2');
let dateDay3 = document.querySelector('#dateDay3');
let dateDay4 = document.querySelector('#dateDay4');
let dateDay5 = document.querySelector('#dateDay5');

//Function appending the date for each card of the forecast weather
function forecasteDate(){
    dateDay1.textContent = "";
   dateDay1.append(moment().add(1, 'days').format('dddd'));

   dateDay2.textContent = "";
   dateDay2.append(moment().add(2, 'days').format('dddd'));

   dateDay3.textContent = "";
   dateDay3.append(moment().add(3, 'days').format('dddd'));

   dateDay4.textContent = "";
   dateDay4.append(moment().add(4, 'days').format('dddd'));

   dateDay5.textContent = "";
   dateDay5.append(moment().add(5, 'days').format('dddd'));
}


//Array recives the input from the user and creates an array
let searchLocalStorageArray = [];

//Recives the user input and pushes to the empty array
function LocalStorageArray(){
    let valueInputUser = inputSearchCity.value;
    searchLocalStorageArray.push(valueInputUser);
}

//Setting local storage
function setStorageUser() {                         //Convert my array into a string
    localStorage.setItem('Cities', JSON.stringify(searchLocalStorageArray));
}


function createSearchHistoryFromLS(){
    //Get the string from local storage 
    let localStorageValue = localStorage.getItem('Cities');

    //convert the string into an array again
    let localStorageObject = JSON.parse(localStorageValue);
    

    //localStorageObject == null, this is when you run for the first time the app the LS is empty so it will show an error, this is to avoid that
    if(!localStorageObject){
        return
    }
    //Create search history when refresh
   localStorageObject.forEach((city)=> {
    let divElement = document.createElement('div');
    divElement.append(city);
    divElement.classList.add('historyButton','col-lg-12', 'btn', 'btn-primary','text-center', 'my-1', 'fs-2');
    historyContainer.append(divElement);
   })
}



//Function to create the search history whe you click on search
function searchHistory(){
    let divElement = document.createElement('div');
    let getUserInput = inputSearchCity.value;
    divElement.classList.add('historyButton','col-lg-12', 'btn', 'btn-primary','text-center', 'my-1', 'fs-2');
    divElement.append(getUserInput);
    historyContainer.append(divElement);
}

//Event to hear the click on the search history buttons
document.addEventListener('click', function(event) {
    var cityButton = event.target;
    var inside = false;
    while (cityButton) {
        if (cityButton.classList.contains('historyButton')) {
            inside = true;
            break;
        }
        cityButton = cityButton.parentElement;
    }
   if (inside) {
       //Call my function and argument passed from the city button text
    searchCity(cityButton.innerHTML);
   } 
});


//Click event for my  search button
buttonSearch.addEventListener('click', (event)=>{
    event.preventDefault();
    if(inputSearchCity.value == 0){
        return
    }  else{
    LocalStorageArray();
    setStorageUser();
    searchHistory();
    searchCity(inputSearchCity.value);
    clearInput();
    }

})

createSearchHistoryFromLS();


 





