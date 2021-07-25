import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader ,InfoWindow} from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";

import { projectBootstrapQuery } from "queries/index";
import { useQueryClient } from "react-query";

import css from "./style.module.css";
  const center = { lat: 49.224893, lng: 28.451423 }; // Vinnytsia
  const options = {
    // How zoomed in you want the map to start at (always required)
    zoom: 14,
    scrollwheel: false,
    disableDefaultUI: true,
    // gestureHandling: 'none',
    styles: [
      {
        featureType: "administrative",
        elementType: "all",
        stylers: [
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          {
            visibility: "simplified",
          },
          {
            color: "#fcfcfc",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            visibility: "simplified",
          },
          {
            color: "#fcfcfc",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            visibility: "simplified",
          },
          {
            color: "#dddddd",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            visibility: "simplified",
          },
          {
            color: "#dddddd",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
          {
            visibility: "simplified",
          },
          {
            color: "#eeeeee",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            visibility: "simplified",
          },
          {
            color: "#dddddd",
          },
        ],
      },
    ],
  };
  const markers = [
    {
      id: 1,
      name: "iKIDZ, м. Вінниця вул. Городецького, 7",
      position: { lat: 49.23013, lng: 28.463489 },
    },
    {
      id: 2,
      name: "iKIDZ, м. Вінниця, вул, Сонячна, 9",
      position: { lat: 49.235795, lng: 28.469551 },
    },
    {
      id: 3,
      name: "iKIDZ, м. Вінниця вул. Козицького, 7",
      position: { lat: 49.237288, lng: 28.469758 },
    },
  ];
const Map = () => {

  const queryClient = useQueryClient();
  const data = queryClient?.getQueryData(projectBootstrapQuery);
  const { HomeInfo } = data || { HomeInfo: [] };
  const { email, facebook, instagram } = HomeInfo[0]?.contacts || {
    email: "",
    facebook: "",
    instagram: "",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_URL,
  });


  const containerStyle = {
    width: "100%",
    height: "550px",
  };
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);


  return (
    <section
      id="contacts"
      className={css["map-section"]}
    >
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          onClick={() => setActiveMarker(null)}
          zoom={14}
          options={options}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {markers.map(({ id, name, position }) => (
            <Marker
              title={ name}
              position={position}
              onMouseOver={() => handleActiveMarker(id)}
              onMouseOut={() => handleActiveMarker(null)}
            >
              {activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>{name}</div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
        </GoogleMap>
      ) : (
        <></>
      )}
      <div className={css["contacts"]}>
        <div className={css["c_head"]}>контакти</div>

        <div className={css["c_txt"]}>
          <span className={`${css["c_im"]} ${css["c_im_b2"]}`}></span> м.
          Вінниця, вул. Миколи Оводова, 16а
        </div>
        <div className={css["c_txt"]}>
          {" "}
          <div className={`${css["c_im"]} ${css["c_im_b2"]}`}></div> м. Вінниця,
          вул, Сонячна, 9
        </div>

        <div className={css["c_txt"]}>
          <span className={`${css["c_im"]} ${css["c_im_b2"]}`}></span> м.
          Вінниця, вул. Владислава Городецького, 7
        </div>
        <div className={css["c_txt"]}>
          <span className={`${css["c_im"]} ${css["c_im_b3"]}`}></span>{" "}
          <a href="tel:+38 (063) 99-576-09"> +38 (063) 99-576-09</a>
          <span>Юля</span>
        </div>

        <div className={css["c_txt"]}>
          <span className={`${css["c_im"]} ${css["c_im_b4"]}`}></span>{" "}
          <a href={`mailto:${email}`}>{email}</a>
        </div>

        <a className={css["cont_a"]} href={instagram} target="_blank">
          <div className={`${css["c_txt"]} ${css["center"]}`}>
            <div className={`${css["socico"]} ${css["c_im"]}`}>
              <img alt="instagram" src="images/instagram.svg" />
            </div>
            Instagram
          </div>
        </a>
        <a className={css["cont_a"]} href={facebook} target="_blank">
          <div className={`${css["c_txt"]} ${css["center"]}`}>
            <div className={`${css["socico"]} ${css["c_im"]}`}>
              <img alt="facebook" src="images/facebook.svg" />
            </div>
            Facebook
          </div>
        </a>
      </div>
    </section>
  );
};

export default React.memo(Map);
