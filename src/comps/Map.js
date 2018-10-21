import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import mapsStyle from "../mapsStyle.json";
import apiKey from "../config";

export const MyMapComponent = compose(
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
    defaultCenter={{ lat: props.lat, lng: props.long }}
    center={{ lat: props.lat, lng: props.long }}
  >
    {props.isMarkerShown && (
      <Marker position={{ lat: props.lat, lng: props.long }} />
    )}
  </GoogleMap>
));
