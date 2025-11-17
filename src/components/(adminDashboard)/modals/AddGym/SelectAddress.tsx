"use client";
import { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Form, Input } from "antd";

export default function SelectAddress(
    {
        setSelectedLocation,
        pickupInputValue,
        setPickupInputValue,
        isReadonly = false
    }
        : {
            selectedLocation: { latitude: number; longitude: number } | null
            setSelectedLocation: React.Dispatch<React.SetStateAction<{ latitude: number; longitude: number } | null>>,
            pickupInputValue: string,
            setPickupInputValue: React.Dispatch<React.SetStateAction<string>>,
            isReadonly ?: boolean
        }
) {

    // Refs for the autocomplete instances
    const pickupAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(
        null
    );

    // Handle place selection for pickup location
    const handlePickupPlaceSelect = () => {
        if (pickupAutocompleteRef.current) {
            const place = pickupAutocompleteRef.current.getPlace();

            if (place && place.geometry && place.geometry.location) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();

                setSelectedLocation({ longitude: lng, latitude: lat });
                setPickupInputValue(place.formatted_address || place.name || "");
            }
        }
    };

    // Handle pickup autocomplete load
    const onPickupAutocompleteLoad = (
        autocomplete: google.maps.places.Autocomplete
    ) => {
        pickupAutocompleteRef.current = autocomplete;
    };

    return (
        <Autocomplete
            onLoad={onPickupAutocompleteLoad}
            onPlaceChanged={handlePickupPlaceSelect}
            options={{
                // types: ["(cities)"],
                // fields: ["formatted_address", "geometry", "address_components"],
            }}>
            <Form.Item name="address" label={"Address"}>
                <Input
                    className=""
                    size="large"
                    placeholder="eg : Dublin, Ireland"
                    value={pickupInputValue}
                    readOnly={isReadonly}
                    onChange={(e) => setPickupInputValue(e.target.value)}
                />
            </Form.Item>
        </Autocomplete>

    );
}