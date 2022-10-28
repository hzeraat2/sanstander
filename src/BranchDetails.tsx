import { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Branch } from './Branch';
import { ClosestBranchContext } from '../App';

export default function BranchDetails() {
  const closestBranches: Branch[] | undefined = useContext(ClosestBranchContext);

  const formatString = (rawString: string) => {
    let formattedString = rawString;
    const listOfCapitalLetters = rawString.match(/[A-Z][a-z]+/g);
    listOfCapitalLetters?.forEach(capLetter => {
      const prefixSpace = rawString.indexOf(capLetter) === 0 ? '' : ' ';
      const suffixSpace = rawString.indexOf(capLetter) === 0 ? '' : ' ';
      formattedString = formattedString.replace(capLetter, `${prefixSpace}${capLetter.toLocaleLowerCase()}${suffixSpace}`);
    });
    return formattedString;
  }

  return (
    <View style={styles.container}>
      {closestBranches?.map(branch =>
        <>
          <View style={styles.row}>
            <Text style={styles.text}>Branch name:</Text>
            <Text style={styles.textBold}>{branch?.Name}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>Services:</Text>
            <Text style={styles.textBold}>
              {formatString(branch?.ServiceAndFacility.join(', '))}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>Accessibility:</Text>
            <Text style={styles.textBold}>{formatString(branch?.Accessibility.join(', '))}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#80808030',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'textRegular',
    color: 'black',
    fontSize: 14,
    flex: 1,
  },
  textBold: {
    fontFamily: 'textBold',
    color: 'black',
    fontSize: 14,
    flex: 1,
  },
});
