import { useContext } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { Branch, branchAddress } from './Branch';
import { ClosestBranchContext } from '../App';

export default function Map() {
  const closestBranches: Branch[] | undefined = useContext(ClosestBranchContext);
  const firstBank = closestBranches ? closestBranches[0] : null;

  const initialRegion = {
    latitude: 54.9,
    latitudeDelta: 9.278,
    longitude: -4.2605,
    longitudeDelta: 12.81,
  }

  let dynamicRegion = {
    latitude: firstBank?.PostalAddress?.GeoLocation?.GeographicCoordinates.Latitude as unknown as number || 54.9,
    latitudeDelta: 2,// 9.278,
    longitude: firstBank?.PostalAddress?.GeoLocation?.GeographicCoordinates.Longitude as unknown as number || -4.2605,
    longitudeDelta: 2,// 12.81,
  }

  const getRegion = () => {
    if (firstBank) {
      return dynamicRegion;
    } else {
      return initialRegion;
    }
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={getRegion()} initialRegion={getRegion()}>
        {closestBranches?.map(closest =>
          closest.PostalAddress?.GeoLocation && (
            <Marker
              key={closest.Identification}
              title={closest.Name}
              description={branchAddress(closest)}
              coordinate={{
                latitude: parseFloat(
                  closest.PostalAddress?.GeoLocation.GeographicCoordinates
                    .Latitude,
                ),
                longitude: parseFloat(
                  closest.PostalAddress?.GeoLocation.GeographicCoordinates
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
          )
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
