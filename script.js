const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.value = localStorage.getItem(input.id) || '';
    input.addEventListener('input', () => {
        localStorage.setItem(input.id, input.value);
    });
});
function printFlightPlan() { window.print(); }
function saveFlight() {
    const name = prompt('Enter a name for this flight plan:');
    if (!name) return;
    const flightData = {};
    inputs.forEach(input => { flightData[input.id] = input.value; });
    localStorage.setItem('flight_' + name, JSON.stringify(flightData));
    updateFlightList();
    alert('Flight plan saved as "' + name + '"');
}
function loadFlight() {
    const select = document.getElementById('savedFlights');
    const name = select.value;
    if (!name) return;
    const flightData = JSON.parse(localStorage.getItem(name));
    inputs.forEach(input => { input.value = flightData[input.id] || ''; localStorage.setItem(input.id, input.value); });
}
function updateFlightList() {
    const select = document.getElementById('savedFlights');
    select.innerHTML = '<option value="">Load Saved Flight</option>';
    for (let key in localStorage) {
        if (key.startsWith('flight_')) {
            const opt = document.createElement('option');
            opt.value = key; opt.text = key.replace('flight_', '');
            select.appendChild(opt);
        }
    }
}
function newFlight() { inputs.forEach(input => { input.value=''; localStorage.setItem(input.id,''); }); }
updateFlightList();