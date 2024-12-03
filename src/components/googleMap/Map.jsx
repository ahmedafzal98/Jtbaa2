import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import AddressAutocomplete from "../addressAutoComplete/AddressAutocomplete";
import "./Map.css";

const containerStyle = {
  width: "100%",
  height: "197px", // Map container dimensions
};

const MapComponent = ({ onDistanceUpdate }) => {
  const [pickupAddress, setPickupAddress] = useState(null);
  const [dropoffAddress, setDropoffAddress] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distanceInMiles, setDistanceInMiles] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [mapCenter, setMapCenter] = useState({
    lat: 40.748817,
    lng: -73.985428, // Default map center (New York City)
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDwWuccH8dEz-M4F9klwil_-4t-LlwvMgo",
    libraries: ["places"],
  });
  const [mapRef, setMapRef] = useState(null);
  // Effect to calculate directions when both pickup and dropoff addresses are selected
  useEffect(() => {
    if (pickupAddress && dropoffAddress) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickupAddress,
          destination: dropoffAddress,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
            const distance = result.routes[0].legs[0].distance.text;
            const miles = parseFloat(distance.replace(" mi", ""));
            setDistanceInMiles(miles);
            onDistanceUpdate(miles);

            // Fit bounds instead of setting center
            const bounds = new google.maps.LatLngBounds();
            result.routes[0].legs[0].steps.forEach((step) =>
              bounds.extend(step.start_location)
            );
            bounds.extend(result.routes[0].legs[0].end_location);

            if (mapRef) {
              mapRef.fitBounds(bounds);
            }
          } else {
            console.error("Error fetching directions:", result);
          }
        }
      );
    }
  }, [pickupAddress, dropoffAddress, onDistanceUpdate, mapRef]);

  // Handle Pickup Address selection
  const handlePickupSelect = (addressData) => {
    setPickupAddress(addressData);
  };

  // Handle Dropoff Address selection
  const handleDropoffSelect = (addressData) => {
    setDropoffAddress(addressData);
  };

  return (
    <div className="mapContainer">
      <div>
        <h3
          style={{ marginTop: 20, textAlign: "left", fontFamily: "InterBold" }}
        >
          Pickup Address
        </h3>
        <AddressAutocomplete
          label="Pickup Address"
          onAddressSelect={handlePickupSelect}
        />
      </div>

      <div>
        <h3
          style={{ marginTop: 20, textAlign: "left", fontFamily: "InterBold" }}
        >
          Dropoff Address
        </h3>
        <AddressAutocomplete
          label="Dropoff Address"
          onAddressSelect={handleDropoffSelect}
        />
      </div>

      <div
        style={{
          marginTop: 20,
          border: "2px solid #FE5E22 !important;",
          borderRadius: 10,
          padding: 2,
        }}
      >
        {!isLoaded && !pickupAddress ? (
          <p>Loading...</p>
        ) : (
          pickupAddress && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={14}
              onLoad={(map) => setMapRef(map)}
            >
              {pickupAddress && (
                <Marker
                  position={{ lat: pickupAddress.lat, lng: pickupAddress.lng }}
                />
              )}
              {dropoffAddress && (
                <Marker
                  position={{
                    lat: dropoffAddress.lat,
                    lng: dropoffAddress.lng,
                  }}
                />
              )}

              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          )
        )}
        <div>
          {distanceInMiles !== null && (
            <h1
              style={{
                marginTop: 10,
                fontFamily: "InterBold",
                textAlign: "left",
              }}
            >
              {" "}
              Distance: {distanceInMiles} miles
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
