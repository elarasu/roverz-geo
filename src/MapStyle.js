
import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';

import MapView from 'react-native-maps';
import Geojson from 'react-native-geojson';
import { Card, Text } from 'roverz-chat';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const customStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class MapStyle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const alcatraz = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'Alcatrez',
            amenity: 'Prison',
            popupContent: 'What do we do here?!',
          },
          geometry: {
            type: 'Point',
            coordinates: [-122.42305755615234, 37.82687023785448],
          },
        },
      ],
    };
    const mapRegion = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    const gpsAccuracy = 100; // m accuracy
    return (
      <View style={styles.container}>
        <MapView.Animated
          provider={this.props.provider}
          style={styles.map}
          initialRegion={mapRegion}
          customMapStyle={customStyle}
        >
          <MapView.Circle
            center={mapRegion}
            radius={gpsAccuracy * 1.5}
            strokeWidth={0.5}
            strokeColor="rgba(66, 180, 230, 1)"
            fillColor="rgba(66, 180, 230, 0.2)"
          />

          <MapView.Circle
            center={mapRegion}
            radius={5}
            strokeWidth={0.5}
            strokeColor="rgba(66, 180, 230, 1)"
            fillColor="rgba(66, 180, 230, 1)"
          />

          <MapView.Marker coordinate={{ latitude: LATITUDE,
            longitude: LONGITUDE }}
          >

            <MapView.Callout>
              <Card
                image={{ uri: 'http://wp-api.mcnam.ee/wp-content/uploads/2016/10/brekkie-crumble-33651_l.jpeg' }}
              >
                <View>
                  <Text h5>Ritz Carlton</Text>
                  <Text>ritz carlton is located in heart of the city</Text>
                </View>
              </Card>
            </MapView.Callout>
          </MapView.Marker>

          <Geojson geojson={alcatraz} />
        </MapView.Animated>
      </View>
    );
  }
}

MapStyle.defaultProps = {
  provider: null,
};

MapStyle.propTypes = {
  provider: MapView.ProviderPropType,
};
