import React from "react";
import { geolocated } from "react-geolocated";
import { MyMapComponent } from "./comps/Map";
import Destination from "./comps/Destination/Destination";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      destinationChosen: false,
      destination: {}
    };
  }

  render() {
    return !this.props.isGeolocationAvailable ? (
      <p>Allow geolocation please.</p>
    ) : this.props.coords ? (
      <div>
        {this.state.destinationChosen ? (
          <MyMapComponent
            test="hello"
            isMarkerShown
            lat={Number(this.state.destination.lat)}
            long={Number(this.state.destination.lng)}
          />
        ) : (
          <MyMapComponent
            test="hello"
            isMarkerShown
            lat={this.props.coords.latitude}
            long={this.props.coords.longitude}
          />
        )}
        <Destination
          setDestination={city =>
            this.setState({ destination: city, destinationChosen: true })
          }
        />
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
