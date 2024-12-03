import React, { useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import "./AddressAutoComplete.css";

// This component will handle address search and selection
const AddressAutocomplete = ({ onAddressSelect, label }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    if (autocomplete) {
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          onAddressSelect({
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        }
      });
    }
  }, [autocomplete, onAddressSelect]);

  return (
    <div className="autoComplete">
      <Autocomplete
        onLoad={(autocomp) => setAutocomplete(autocomp)}
        onPlaceChanged={() => {}}
      >
        <input
          className="autoCompleteInput"
          type="text"
          placeholder={`Enter ${label}`}
        />
      </Autocomplete>
    </div>
  );
};

export default AddressAutocomplete;
