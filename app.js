const months = ['January','February','March','April','May','June'
            ,'July','August','September','October','November','December'];

//DOM Events
const form = document.querySelector('.form');
const containerWorkouts=document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


///Data Storing Architecture//

//main class
class Workout{
    //modern js still not yet official in js//
    date = new Date();
    id = (Date.now() + '').slice(-10);

    //common properties///
    constructor(coords,distance,duration){
        this.coords = coords;
        this.distance = distance; //in km
        this.duration = duration; // in min
    }
}

//child class
class Running extends Workout{
    constructor(coords,distance,duration,cadence){
        super(coords,distance,duration);
        this.cadence = cadence;
        this.calPace;
    }

    calPace(){
        this.pace = this.duration / this.distance;
    }
}

//child class//
class Cycling extends Workout{
    constructor(coords,distance,duration,elevationGain){
        super(coords,distance,duration);
        this.elevationGain = elevationGain;
        this.calSpeed;
    } 
    
    calSpeed(){
        this.speed = this.distance / (this.duration/60);
    }
}

//Instantiating///
// const workout = new Workout;
const run = new Running([39,-12],5.2,24,178);
const cyc = new Cycling([39,-12],5.2,24,178);

console.log(run,cyc);

///UI Architecture
class App{
    #map;  ///Prviate Instance Properties of Current Object used instead of defining the variable in global scope
    #mapEvent;  ///Prviate Instance Properties of Current Object used instead of defining the variable in global scope
    constructor(){
        this._getPosition();
        form.addEventListener('submit',this._newWorkout.bind(this) ); //this points to the form in the Event listener.//

        //Toggle b/w running and cycling
        inputType.addEventListener('change',this._toggleElevationField);
    }


    ///get positon from geolocation method
    _getPosition(){
       ///Geolocation
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),function(){
            alert('Colud not get the Position')
        })
    }
 
    }

    ///loading map using leaflet open source lib
    _loadMap(position){
        
        console.log(position)
        const {latitude} = position.coords;
        const {longitude} = position.coords;

        this.#map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.#map.on('click',this._showForm.bind(this));

    }


    //removing the hidden class to show form//
    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDuration.focus();
    }

    //toggle b/w cycling and running
    _toggleElevationField(e){
        e.preventDefault();

        inputElevation.parentElement.classList.toggle('form__row--hidden');
        inputCadence.parentElement.classList.toggle('form__row--hidden');
       
    }

    _newWorkout(e){
        e.preventDefault();

        ///validating//
        const validInputs = (...inputs)=> inputs.every(inp=> Number.isFinite(inp));
        console.log(validInputs);
        const allPositive = (...inputs)=> inputs.every(inp => inp > 0);
        

        ///Get Data from UI form//
        const input = inputType.value;
        console.log(input);
        const distance = inputDistance.value;
        console.log(distance);
        const duration = inputDuration.value;
        console.log(duration);
       
        //If activity Running , create running object///

        if(input.value === 'running'){
            const cadence = inputCadence.value;

            if(
                !validInputs(distance,duration,cadence) ||  !allPositive(distance,duration,cadence) 
            )
            return alert('Values need to be Positive numbers');
        }

        ////If activity cycling , create cycling object//
        if(input.value === 'cycling'){
            const elevation = inputElevation.value;
            if(
                !validInputs(distance,duration,elevation) ||  !allPositive(distance,duration) 
            )
            return alert('Values need to be Positive numbers');
        }

        ///Add new Object to Workout array///


        /// Render Workout on map as a marker///


        ////Render Workout on the List//



        ///Hide Form + Clear inputs///





        
         //clearfields//
         inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';
        
         
         console.log(this);
         const {lat,lng}=this.#mapEvent.latlng;
         L.marker([lat,lng])
         .addTo(this.#map).bindPopup(L.popup(
             {
                 maxWidth:300,
                 minWidth:50,
                 autoClose:false,
                 closeOnClick:false,
                 className:'running-popup'
     
             }
         ))
         .setPopupContent('Workout')
         .openPopup();
    }
}


///Creating a new Object
const app = new App;






// ///Rest and Spread///


// ///spread


// let beer = ['KingFisher','Budweieser','Corona'];
// let beer2 = ['Aravind',25,'Murugan' ,beer];

// myFunc(...beer2)

// function myFunc(firstname,age,lastname,beerlist){
//     console.log(`${firstname} ${lastname} is just ${age} and he fucking likes these ${beerlist} beers`)
// }

// ///Rest//
//  myFunc2('Ram' ,'Kumar',22, beer2);

//  function myFunc2(firstname,lastname,age,...beers){
//     beers.forEach((beer,index)=>console.log(beer,index))
//  }

