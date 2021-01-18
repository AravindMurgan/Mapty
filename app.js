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



///UI Architecture
class App{
    #map;  ///Prviate Instance Properties of Current Object
    #mapEvent;  ///Prviate Instance Properties of Current Object
    constructor(){
        this._getPosition();
        form.addEventListener('submit',this._newWorkout.bind(this) ); //this points to the form in the Event listener.//

        //Toggle b/w running and cycling
        inputType.addEventListener('change',this._toggleElevationField);
        
        
        
    }
    _getPosition(){
       ///Geolocation
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),function(){
            alert('Colud not get the Position')
        })
    }
 
    }

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

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDuration.focus();
    }

    _toggleElevationField(e){
        e.preventDefault();

        inputElevation.parentElement.classList.toggle('form__row--hidden');
        inputCadence.parentElement.classList.toggle('form__row--hidden');
       
    }

    _newWorkout(e){
        
         //clearfields//
         inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';
        
         e.preventDefault();
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

const app = new App;




