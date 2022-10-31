import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BranchesInput from './src/BranchesInput';
import { SearchLocation } from './src/SearchLocation';
import Map from './src/Map';
import Spinner from './src/Spinner';
import useLoading from './src/useLoading';
import BranchDetails from './src/BranchDetails';
import useClosestBranch from './src/useClosestBranch';

export const ClosestBranchContext: any = React.createContext(undefined);

export default function App() {
  const [state, branches] = useLoading();
  const [search, setSearch] = useState<SearchLocation>();
  const closest = useClosestBranch(branches, search);
  return (
    <ClosestBranchContext.Provider value={closest}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Map />
        <View style={styles.footer}>
          {state === 'ready' ? (
            <>
              <BranchesInput search={search} setSearch={setSearch} />
              {closest &&
                <BranchDetails />}
            </>
          ) : state === 'error' ? (
            <View style={styles.centred}>
              <Text style={styles.error}>An error has occurred</Text>
            </View>
          ) : (
            <View style={styles.centred}>
              <Spinner height={60} />
            </View>
          )}
        </View>
      </View>
    </ClosestBranchContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  error: {
    fontFamily: 'textRegular',
    fontSize: 24,
    color: '#ED0000',
    padding: 10,
    backgroundColor: '#80808030',
  },
  centred: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 0.5,
    padding: 20,
  },
});
