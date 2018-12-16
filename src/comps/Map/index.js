import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline
} from "react-google-maps";

// In the mapsStyle json file you can paste any map style you would like. Hint: snazzymaps
import mapsStyle from "../../mapsStyle.json";

// Create a config file and export your API-key / or just enter it directly
import apiKey from "../../config";

export const Map = compose(
  // Set your API key and size of the map here
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
    defaultZoom={7}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    center={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && (
      <Marker position={{ lat: props.lat, lng: props.lng }} />
    )}

    {props.destination && (
      <div>
        <Marker
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }}
          position={{
            lat: Number(props.destination.lat),
            lng: Number(props.destination.lng)
          }}
        />

        {/* The Polyline component renders a line between your position and your entered destination */}
        <Polyline
          path={[
            { lat: props.lat, lng: props.lng },
            {
              lat: Number(props.destination.lat),
              lng: Number(props.destination.lng)
            }
          ]}
          options={{
            strokeColor: "dodgerblue",
            strokeOpacity: 1,
            strokeWeight: 2
          }}
        />
      </div>
    )}
  </GoogleMap>
));
