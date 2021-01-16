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

//variables//
let mapEvent;
let map;

///Geolocation
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position)
        const {latitude} = position.coords;
        const {longitude} = position.coords;

         map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on('click',function(mapE){
            mapEvent = mapE;
            form.classList.remove('hidden');
            inputDuration.focus();
        })

        
        
    },function(){
        alert('Colud not get the Position')
    })
}

form.addEventListener('submit',function(e){

    //clearfields//
    inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';

    e.preventDefault();
    console.log(mapEvent);
    const {lat,lng}=mapEvent.latlng;
    L.marker([lat,lng])
    .addTo(map).bindPopup(L.popup(
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

   
})

//Toggle b/w running and cycling
inputType.addEventListener('change',function(e){
    e.preventDefault();

    inputElevation.parentElement.classList.toggle('form__row--hidden');
    inputCadence.parentElement.classList.toggle('form__row--hidden');

})