import React, { useState, useEffect, useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import AddressAutocomplete from "../addressAutoComplete/AddressAutocomplete";
import "./Map.css";

const containerStyle = {
  width: "100%",
  height: "197px",
};

const MapComponent = ({ data, errors, onChange }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDwWuccH8dEz-M4F9klwil_-4t-LlwvMgo",
    libraries: ["places"],
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [showMap, setShowMap] = useState(false); // State to track if the map should be shown

  useEffect(() => {
    if (data.address && data.dropoffAddress) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: data.address,
          destination: data.dropoffAddress,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);

            const distance = result.routes[0].legs[0].distance.text;
            const miles = parseFloat(distance.replace(" mi", ""));
            onChange("distance", miles);
          } else {
            console.error("Error fetching directions:", result);
          }
        }
      );
    }
  }, [data.address, data.dropoffAddress, onChange]);

  const handleAddressChange = (key, address) => {
    onChange(key, address);
    if (key === "address" && address) {
      setShowMap(true); // Show the map when pickup address is selected
    }
  };

  // Memoize the center value to prevent unnecessary re-renders of the map
  const center = useMemo(() => {
    return data.address
      ? { lat: data.address.lat, lng: data.address.lng }
      : { lat: 40.748817, lng: -73.985428 };
  }, [data.address]);

  // Memoize the directionsResponse to avoid re-fetching directions unnecessarily
  const directions = useMemo(() => {
    return directionsResponse;
  }, [directionsResponse]);

  return (
    <div className="mapContainer">
      <div>
        <h3 style={{ textAlign: "left" }}>Pickup Address</h3>
        <AddressAutocomplete
          label="Pickup Address"
          onAddressSelect={(address) => handleAddressChange("address", address)}
        />
      </div>

      <div>
        <h3 style={{ textAlign: "left" }}>Dropoff Address</h3>
        <AddressAutocomplete
          label="Dropoff Address"
          onAddressSelect={(address) =>
            handleAddressChange("dropoffAddress", address)
          }
        />
      </div>

      <div style={{ marginTop: 20, borderRadius: 10 }}>
        {!isLoaded ? (
          <p>Loading...</p>
        ) : showMap ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center} // Use memoized center value
            zoom={14}
            onLoad={(map) => setMapRef(map)}
          >
            {data.address && (
              <Marker
                position={{
                  lat: data.address.lat,
                  lng: data.address.lng,
                }}
                animation={null} // Prevent marker animation
              />
            )}
            {data.dropoffAddress && (
              <Marker
                position={{
                  lat: data.dropoffAddress.lat,
                  lng: data.dropoffAddress.lng,
                }}
                animation={null} // Prevent marker animation
              />
            )}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        ) : null}
      </div>

      {data.distance !== null && (
        <h3 style={{ marginTop: 10 }}>Distance: {data.distance} miles</h3>
      )}
    </div>
  );
};

export default React.memo(MapComponent); // Memoize the MapComponent to prevent unnecessary re-renders
