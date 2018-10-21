import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import mapsStyle from "./mapsStyle.json";
import Geolocation from "react-geolocation";

const apiKey = "AIzaSyAHFkbhHMtXhADOWYR645JeaxjYP5wJ3Z0";

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultOptions={{ styles: mapsStyle }}
    defaultZoom={15}
    defaultCenter={{ lat: Number(props.lat), lng: Number(props.long) }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 18, lng: 59 }} />}
  </GoogleMap>
));

export default class App extends React.Component {
  render() {
    return (
      <Geolocation
        render={({
          fetchingPosition,
          position: { coords: { latitude, longitude } = {} } = {},
          error,
          getCurrentPosition
        }) => (
          <div>
            <button onClick={getCurrentPosition}>Get Position</button>
            {error && <div>{error.message}</div>}
            <pre>
              latitude: {latitude}
              longitude: {longitude}
            </pre>
            <MyMapComponent
              test="hello"
              isMarkerShown
              lat={latitude}
              long={longitude}
            />
          </div>
        )}
      />
    );
  }
}
