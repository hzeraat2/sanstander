import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { Branch, branchAddress } from './Branch';

export default function Map({ closest }: { closest: Branch | undefined }) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 54.9,
          latitudeDelta: 9.278,
          longitude: -4.2605,
          longitudeDelta: 12.81,
        }}>
        {closest && closest.PostalAddress.GeoLocation && (
          <Marker
            key={closest.Identification}
            title={closest.Name}
            description={branchAddress(closest)}
            coordinate={{
              latitude: parseFloat(
                closest.PostalAddress.GeoLocation.GeographicCoordinates
                  .Latitude,
              ),
              longitude: parseFloat(
                closest.PostalAddress.GeoLocation.GeographicCoordinates
                  .Longitude,
              ),
            }}>
            <Callout tooltip>
              <View style={styles.callout}>
                <Text style={styles.calloutHeader}>
                  {closest.Name || closest.Identification}
                </Text>
                <Text style={styles.calloutText}>{branchAddress(closest)}</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  callout: {
    padding: 5,
    backgroundColor: '#ffffffa0',
    borderRadius: 4,
  },
  calloutHeader: {
    fontFamily: 'textBold',
    color: 'black',
    fontSize: 14,
  },
  calloutText: {
    fontFamily: 'textRegular',
    color: 'black',
    fontSize: 10,
  },
});
