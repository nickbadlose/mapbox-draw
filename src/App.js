import React from 'react';
// import ReactDOM from "react-dom";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import location from './images/location.png';

import './styles.css';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiY3ljbGluZ2lzZnVuIiwiYSI6ImNrN2Z6cWIzNjA3bnAzZnBlbzVseWkxYWYifQ.U9iDr2Ez6ryAqDlkDK7jeA'
});

class App extends React.Component {
  state = {
    features: [
      {
        id: '939f91b44e6e9e02d291936b38d37d41',
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [
            [-2.243437194562347, 53.47937156671131],
            [-2.245279265879219, 53.48020470020762],
            [-2.244689803058094, 53.481037817344],
            [-2.2421109032150355, 53.48081857757853],
            [-2.242184586067509, 53.480380094648496],
            [-2.2416688060989145, 53.48011700271519]
          ]
        },
        type: 'LineString'
      },
      {
        id: 'd62ef1b6b3e5aea6bdc449c5fa083087',
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [-2.245278926116555, 53.48020142417977],
          type: 'Point'
        }
      },
      {
        id: '5758f5346eceea68c082b427b8f34d83',
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [-2.2448123582680353, 53.4810583735227],
          type: 'Point'
        }
      }
    ],
    selectedMarker: null
  };

  onDrawCreate = ({ features }) => {
    console.log(features);
    //when it is created take the layer, transform to geojson and stringify
    this.setState(currentState => {
      return { features: [...currentState.features, features] };
    });
  };

  onDrawUpdate = ({ features }) => {
    // console.log(features);
  };

  render() {
    const savedRoute = JSON.parse(localStorage.getItem('features'));

    return (
      <div>
        <h2>Welcome to react-mapbox-gl-draw</h2>
        <Map
          style='mapbox://styles/mapbox/streets-v9' // eslint-disable-line
          containerStyle={{
            height: '600px',
            width: '100vw'
          }}
          center={[-2.2426, 53.4808]}
          renderChildrenInPortal={true}>
          <DrawControl
            onDrawCreate={this.onDrawCreate}
            onDrawUpdate={this.onDrawUpdate}
          />
          {this.state.features && (
            <div>
              <Layer type='line' id='geojson'>
                <Feature
                  coordinates={this.state.features[0].geometry.coordinates}
                />
              </Layer>
              <Marker coordinates={this.state.features[1].geometry.coordinates}>
                <img
                  src={location}
                  height='30px'
                  onClick={() => {
                    this.setSelectedMarker(this.state.features[1]);
                  }}
                />
              </Marker>
              <Marker coordinates={this.state.features[2].geometry.coordinates}>
                <img
                  src={location}
                  height='30px'
                  onClick={() => {
                    this.setSelectedMarker(this.state.features[2]);
                  }}
                />
              </Marker>
              {this.state.selectedMarker !== null ? (
                <div>
                  <Popup
                    coordinates={this.state.selectedMarker.geometry.coordinates}
                    onClick={this.closePopUp}
                    closeButton={true}>
                  
                      <p>look at this!</p>
                  </Popup>
                </div>
              ) : null}
            </div>
          )}
        </Map>
      </div>
    );
  }
  //latitude={this.state.selectedMarker.geometry.coordinates[0]} longitude={this.state.selectedMarker.geometry.coordinates[1]}
  setSelectedMarker = object => {
    this.setState({ selectedMarker: object });
  };

  closePopUp = () => {
    this.setState({ selectedMarker: null });
  };

  // componentDidUpdate() {
  //   localStorage.setItem('features', JSON.stringify(this.state.features));
  // }
}

export default App;
