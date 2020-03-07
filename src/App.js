import React from "react";
// import ReactDOM from "react-dom";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import "./styles.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiY3ljbGluZ2lzZnVuIiwiYSI6ImNrN2Z6cWIzNjA3bnAzZnBlbzVseWkxYWYifQ.U9iDr2Ez6ryAqDlkDK7jeA"
});

function App() {
  const onDrawCreate = ({ features }) => {
    console.log(features);
  };

  const onDrawUpdate = ({ features }) => {
    console.log(features);
  };

  return (
    <div>
      <h2>Welcome to react-mapbox-gl-draw</h2>
      <Map
        style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
        containerStyle={{
          height: "600px",
          width: "100vw"
        }}
      >
        <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} />
      </Map>
    </div>
  );
}

export default App;
