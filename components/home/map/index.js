import React ,{useEffect} from 'react'
import css from './style.module.css'
const Map = () => {

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 14,
        scrollwheel: false,
        disableDefaultUI: true,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(49.224893, 28.451423), // Vinnytsia

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "color": "#fcfcfc"
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "color": "#fcfcfc"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "color": "#dddddd"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "color": "#dddddd"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "color": "#eeeeee"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "color": "#dddddd"
            }]
        }]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(49.230130, 28.463489),
        map: map,
        title: 'iKIDZ, м. Вінниця вул. Городецького, 7'
    });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(49.235795, 28.469551),
        map: map,
        title: 'iKIDZ, м. Вінниця, вул, Сонячна, 9'
    });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(49.237288, 28.469758),
        map: map,
        title: 'iKIDZ, м. Вінниця вул. Козицького, 7'
    });
}
    useEffect(()=> {
    google.maps.event.addDomListener(window, 'load', init);



    },[])



    return (
        <section className={css['map-section']} >
        <div className={css['map']} id='map'> </div>
            <div className={css["contacts"]}>
            <div className={css["c_head"]}>контакти</div>

            <div className={css["c_txt"]}>
                <span className={`${css["c_im"]} ${css['c_im_b2']}`}></span> м. Вінниця, вул. Миколи
                Оводова, 16а
            </div>
                <div className={css["c_txt"]}> <div className={`${css["c_im"]} ${css['c_im_b2']}`}></div> м. Вінниця, вул, Сонячна, 9</div> 

            <div className={css["c_txt"]}>
               <span className={`${css["c_im"]} ${css['c_im_b2']}`}></span> м. Вінниця, вул. Владислава
                Городецького, 7
            </div>
            <div className={css["c_txt"]}>
                <span className={`${css["c_im"]} ${css['c_im_b3']}`}></span> <a href="tel:+38 (063) 99-576-09" > +38 (063) 99-576-09</a>
                <span>Юля</span>
            </div>

            <div className={css["c_txt"]}>
                <span className={`${css["c_im"]} ${css['c_im_b4']}`}></span> <a href="mailto:ikidz.vin@gmail.com">ikidz.vin@gmail.com</a> 
            </div>

            <a className={css["cont_a"]} href="https://www.instagram.com/ikidz.vin/"
                target="_blank">
                <div className={`${css["c_txt"]} ${css['center']}`}>
                    <div className={`${css["socico"]} ${css["c_im"]}`}>
                        <img src="images/instagram.svg"/>
                    </div>
                    Instagram
                </div>
            </a>
            <a className={css["cont_a"]} href="https://www.facebook.com/IKIDZvin/"
                target="_blank">
                <div className={`${css["c_txt"]} ${css['center']}`}>
                    <div className={`${css["socico"]} ${css[ 'c_im']}`}>
                        <img src="images/facebook.svg"/>
                    </div>
                    Facebook
                </div>
            </a>
        </div>
        </section>
    )
}

export default Map
