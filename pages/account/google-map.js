/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '170px'
};

const center = {
    lat: 43.255721,
    lng: -79.871102
};

function MyComponent(props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDZfVO29Iytspv4xz7S68doIoiztiRLhbk"
    })

    const [position, setPosition] = useState({
        lat: 0,
        lng: 0
    });

    useEffect(() => {
        if(props && props.currentLocation){
            if(Object.keys(props.currentLocation).length > 0){                
                let _position = {};
                _position.lat = props.currentLocation.lat;
                _position.lng = props.currentLocation.lng;
                setPosition(_position)
            }else{
                setPosition(center)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentLocation])

    const [map, setMap] = useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const onMapClicked = (e) => {
        let location = {};
        location.lat = e.latLng.lat();
        location.lng = e.latLng.lng();

        setPosition(location);
        props.getPosition(location)
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={onMapClicked}
        >
            <Marker 
                icon={"/assets/marker.svg"} 
                position={{ lat: position.lat, lng: position.lng }}
            />
            <></>
        </GoogleMap> 
    ) : <></>
}

export default React.memo(MyComponent)