mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvdmVyYWhlcm5hbmRlemJpZGF0YSIsImEiOiJjbDMwZHc4cmswMDdqM2NydmIzYWF0cGl4In0.hsYQFPebleAB4j6mRckMzQ'
const map = new mapboxgl.Map({
    
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-70.54472121695899, -33.37859845289997],  
    projection: 'globe',
    zoom: 15,
    
});

            // create the popup
            const popup = new mapboxgl.Popup({ offset: 25 }).setText(`
            La Llavería 1894, Vitacura.`)
            
            // create DOM element for the marker
            const ubicacion = document.createElement('div');
            ubicacion.id = 'marker';
        
            new mapboxgl.Marker({
                color: '#00000',
                scale: .8
            })
                .setLngLat([-70.54472121695899, -33.37859845289997])
                .setPopup(popup) // sets a popup on this marker
                .addTo(map);
        
            // create the marker
            // new mapboxgl.Marker(el)
            
               
 
