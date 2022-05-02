mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: statepark.geometry.coordinates, // starting position [lng, lat]
    zoom: 8 // starting zoom
});


new mapboxgl.Marker()
    .setLngLat(statepark.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h4>${statepark.title}</h4><p>${statepark.location}</p>`
            )
    )
    .addTo(map)

map.addControl(new mapboxgl.NavigationControl(), 'topright');
