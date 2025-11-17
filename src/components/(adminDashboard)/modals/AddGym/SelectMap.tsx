"use client"
import type React from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"

const SelectMap = ({
    height = "300px",
    selectedLocation,
    setSelectedLocation,
    defaultLocation,
}: {
    height?: string
    selectedLocation: { latitude: number; longitude: number } | null
    setSelectedLocation: React.Dispatch<React.SetStateAction<{ latitude: number; longitude: number } | null>>
    defaultLocation?: { latitude: number; longitude: number }
}) => {

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat()
            const lng = e.latLng.lng()
            setSelectedLocation({ latitude: lat, longitude: lng })
        }
    }

    return (

        <GoogleMap
            mapContainerStyle={{ height: height, width: "100%" }}
            center={
                selectedLocation
                    ? { lat: selectedLocation.latitude, lng: selectedLocation.longitude }
                    : defaultLocation
                        ? { lat: defaultLocation.latitude, lng: defaultLocation.longitude }
                        : { lat: 53.3498, lng: -6.2603 }
            }
            zoom={10}
            onClick={handleMapClick}
        >
            {(selectedLocation || defaultLocation) && (
                <Marker
                    position={{
                        lat: (selectedLocation || defaultLocation)?.latitude ?? 53.3498,
                        lng: (selectedLocation || defaultLocation)?.longitude ?? -6.2603
                    }}
                />

            )}
        </GoogleMap>
    )
}

export default SelectMap;
