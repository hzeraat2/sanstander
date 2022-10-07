import { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import * as Location from 'expo-location';
import { SearchLocation } from './SearchLocation';
import InputResults from './InputResults';

export default function BranchesInput({
  search,
  setSearch,
}: {
  search: SearchLocation;
  setSearch: React.Dispatch<React.SetStateAction<SearchLocation>>;
}) {
  const [input, setInput] = useState('');
  useEffect(() => {
    if (input.trim().length > 2) {
      setSearch('fetching');
      Location.geocodeAsync(input.trim())
        .then((result) => {
          setSearch(result[0] || 'no-result');
        })
        .catch(() => {
          setSearch('error');
        });
    } else {
      setSearch(undefined);
    }
  }, [input]);
  return (
    <>
      <TextInput
        value={input}
        onChangeText={setInput}
        style={styles.input}
        placeholder="Search for a branch"
        autoFocus
      />
      <View style={styles.result}>
        <InputResults search={search} input={input} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    fontFamily: 'textRegular',
    fontSize: 18,
    paddingVertical: 5,
    paddingHorizontal: 8,
    color: 'black',
    marginBottom: 10,
  },
});
