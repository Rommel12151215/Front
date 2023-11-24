
// Definir la clave de API y las reservas
const API_KEY = '15f33112347e9934803ec502f3e02b83';
const reservations = [];


// Función para obtener el clima actual
function getWeather() {
 fetch(`https://api.openweathermap.org/data/2.5/weather?q=Guadalajara&appid=${API_KEY}`)
 .then(response => {
  if (!response.ok) {
      throw new Error('Error de red');
  }
  return response.json();
 })
 .then(data => {
  let kelvin = data.main.temp;
  let celsius = kelvin - 273.15;
  let fahrenheit = (celsius * 1.8) + 32;
  document.getElementById('weather').innerText = `Temperatura: ${celsius.toFixed(2)}°C (${fahrenheit.toFixed(2)}°F), Descripción: ${data.weather[0].description}`;
 })
 .catch(error => {
  console.error('Error:', error);
 });
}

// Función para actualizar la lista de reservas
function updateReservations() {
 const reservationsList = document.getElementById('reservations');
 reservationsList.innerHTML = '';
 for (let reservation of reservations) {
 const li = document.createElement('li');
 li.textContent = `Fecha: ${reservation.date}, Invitados: ${reservation.guests}`;
 reservationsList.appendChild(li);
 }
}


// Función para manejar el envío del formulario de reserva
document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const date = new Date(document.getElementById('date').value);
    let guests = document.getElementById('guests').value;
    
    // Verificar si la fecha y los invitados se han seleccionado
    if (!date || !guests) {
    alert('Por favor, selecciona una fecha y un número de invitados.');
    return;
    }
   
    // Verificar si la fecha ya está reservada
    for (let reservation of reservations) {
    if (reservation.date === date) {
    alert('La fecha ya está reservada. Por favor, elige una fecha diferente.');
    return;
    }
    }
    // Verificar si el número de invitados es negativo
    if (guests < 0) {
    alert('El número de invitados no puede ser negativo.');
    return;
    }
    // Verificar si el número de invitados excede la capacidad de la habitación
    const MAX_GUESTS = 4;
    if (guests > MAX_GUESTS) {
    alert(`El número de invitados excede la capacidad de la habitación. La capacidad máxima es ${MAX_GUESTS}.`);
    return;
    }
    // Verificar si la fecha es anterior a la fecha actual
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
    alert('No puedes reservar en fechas pasadas.');
    return;
    }
    // Si no hay conflictos, agregar la reserva
    reservations.push({ date, guests });
    alert('Reserva realizada con éxito.');
    updateReservations();
    // Actualizar el clima
    getWeather();
   });
   
   
// Llamar a la función getWeather al cargar la página
getWeather();
