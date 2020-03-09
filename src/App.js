import React from "react";
// import ReactDOM from "react-dom";
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import "./styles.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiY3ljbGluZ2lzZnVuIiwiYSI6ImNrN2Z6cWIzNjA3bnAzZnBlbzVseWkxYWYifQ.U9iDr2Ez6ryAqDlkDK7jeA"
});

class App extends React.Component {
  state = {
    features: []
  }

   onDrawCreate = ({features}) => { 
    console.log(features);
    //when it is created take the layer, transform to geojson and stringify
    this.setState((currentState) => {
      return {features: [...currentState.features, features]}
    })
  };

   onDrawUpdate = ({ features }) => {
    // console.log(features);
  };

  render() {
    const savedRoute = JSON.parse(localStorage.getItem('features'))
    console.log(savedRoute)
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
        <DrawControl onDrawCreate={this.onDrawCreate} onDrawUpdate={this.onDrawUpdate} />
        {/* {savedRoute[0][0].geometry &&  */}
        {/* <div> */}
        <Layer type='line' id='savedRoute'>
          <Feature coordinates={savedRoute[0][0].geometry.coordinates} />
        </Layer>
        {/* <Layer type="symbol"
  layout={{ "icon-image": "harbor-15" }} id='savedRoute'>
          <Feature coordinates={savedRoute[1][0].geometry.coordinates} />
        </Layer> */}
        {/* </div> */}
        {/* } */}
      </Map>
    </div>
  );
      }
      
  componentDidUpdate() {
    localStorage.setItem('features', JSON.stringify(this.state.features))
  }
}

export default App;
