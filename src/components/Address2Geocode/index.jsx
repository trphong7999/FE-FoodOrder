import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

function Address2Geocode({ location, setLocation, geo, setGeo }) {
  const handleChange = (address) => {
    if (typeof location === "string") {
      setLocation(address);
      return;
    }
    setLocation({ ...location, address: address });
  };
  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        const { lat, lng } = latLng;
        if (typeof location !== "string")
          setLocation({ ...location, address: address });
        setGeo({ lat: lat, lng: lng });
      })
      .catch((error) => console.error("Error"));
  };

  return (
    <PlacesAutocomplete
      value={typeof location === "string" ? location : location.address}
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
            value={typeof location === "string" ? location : location.address}
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
