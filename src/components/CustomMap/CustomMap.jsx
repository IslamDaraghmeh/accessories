import React, { useState, useCallback } from 'react';
import './CustomMap.css';
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 32.23548410992548,
    lng: 35.254203625171954
};

const points = [
    {
        id: 1,
        name: 'مختبر طيبة-طولكرم',
        position: {
            lat: 32.31403852132221,
            lng: 35.029855360585316

        }
    },
    {
        id: 2,
        name: 'مكتبة البيدر-نابلس',
        position: {
            lat: 32.22769254463344,
            lng:  35.22056579615814
        }
    },
    {
        id: 3,
        name: 'حي كفر سابا-قلقيلية',
        position: {
            lat: 32.18743371289837,
            lng:34.97517011085704
        }
    }
];

function CustomMap() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB4CuCSAM8OxGCqIzdL4lcb74nAW_3Oj0Y"
    });

    const [activePoint, setActivePoint] = useState(null);

    const handleActivePoint = (id) => {
        setActivePoint(id);
    };

    const onLoad = useCallback((map) => {
        const bounds = new window.google.maps.LatLngBounds();
        points.forEach(({ position }) => {
            bounds.extend(position);
        });
        map.fitBounds(bounds);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={onLoad}
            onClick={() => handleActivePoint(null)}
            options={{
                streetViewControl: false,
                mapTypeControl: false
            }}
        >
            {points.map(({ position, id, name }) => (
                <MarkerF
                    key={id}
                    position={position}
                    onClick={() => handleActivePoint(id)}
                >
                    {activePoint === id && (
                        <InfoWindowF onCloseClick={() => setActivePoint(null)}>
                            <div>{name}</div>
                        </InfoWindowF>
                    )}
                </MarkerF>
            ))}
            <></>
        </GoogleMap>
    ) : <></>;
}

export default CustomMap;
