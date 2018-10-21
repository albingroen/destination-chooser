import React from "react";
import { geolocated } from "react-geolocated";
import { Map } from "./comps/Map/index";
import Destination from "./comps/Destination";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      destinationChosen: false,
      destination: {}
    };
  }

  // Function for transforming degrees to radians
  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // Function for calulating distance in km between 2 coordinates
  destinationDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // this.deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Math.round(d);
  }

  render() {
    const { coords, isGeolocationAvailable } = this.props;
    const { destination, destinationChosen } = this.state;

    return !isGeolocationAvailable ? (
      <p>Allow geolocation please.</p>
    ) : coords ? (
      <div>
        {destinationChosen ? (
          <Map
            isMarkerShown
            lat={coords.latitude}
            lng={coords.longitude}
            destination={destination}
          />
        ) : (
          <Map isMarkerShown lat={coords.latitude} lng={coords.longitude} />
        )}

        <Destination
          setDestination={city =>
            this.setState({ destination: city, destinationChosen: true })
          }
        />

        {/* Here we just render some cards with information about the destination */}
        {destinationChosen && (
          <div>
            <div className="destinationInfo">
              <label htmlFor="distance">Distance (km)</label>
              <h2>
                {this.destinationDistance(
                  coords.latitude,
                  coords.longitude,
                  Number(destination.lat),
                  Number(destination.lng)
                )}{" "}
                km
              </h2>
            </div>

            <div className="destinationInfo2">
              <label htmlFor="distance">Distance (m)</label>
              <h2>
                {this.destinationDistance(
                  coords.latitude,
                  coords.longitude,
                  Number(destination.lat),
                  Number(destination.lng)
                ) / 10}{" "}
                m
              </h2>
            </div>

            <div className="destinationInfo3">
              <label htmlFor="distance">Destination</label>
              <h2>{destination.name}</h2>
            </div>
          </div>
        )}
      </div>
    ) : (
      <p>Getting location data...</p>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(App);
