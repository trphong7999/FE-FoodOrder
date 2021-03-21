import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

function Address2Geocode({ location, setLocation }) {
  const handleChange = (address) => {
    setLocation({ ...location, address: address });
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        const { lat, lng } = latLng;
        setLocation({ ...location, lat: lat, lng: lng, address: address });
      })
      .catch((error) => console.error("Error"));
  };

  return (
    <PlacesAutocomplete
      value={location.address}
      onChange={handleChange}
      onSelect={handleSelect}
      onClick={handleChange}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="input_address">
          <input
            {...getInputProps({
              placeholder: "Địa chỉ",
              className: "location-search-input",
            })}
            name="address"
            required
          />
          <div
            className="autocomplete-dropdown-container"
            style={{ position: "absolute", zIndex: 1000, width: "57%" }}
          >
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? {
                    backgroundColor: "#fafafa",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    padding: "1rem",
                  }
                : {
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    padding: "1rem",
                  };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default Address2Geocode;
