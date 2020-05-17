/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'; //safeareaView is used in ios do give the header
import Constants from 'expo-constants';
import ColorBox from '../components/ColorBox';

const statusBarHeight = Constants.statusBarHeight;

const ColorPalette = ({ route }) => {
  const { paletteName, colors} = route.params;
  return (
    <View style={[styles.container]}>
    <FlatList
        data={colors}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
        <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
        )}
        />
        {/* ListHeaderComponent={<Text style={styles.header}>{paletteName}</Text>} */}
    {/* <Text style={styles.header}>Here are some colors</Text> 
    <ColorBox colorName="Cyan" hexCode="#2aa198"/>
    <ColorBox colorName="Blue" hexCode="#268bd2"/>
    <ColorBox colorName="Magenta" hexCode="#d33682"/>
    <ColorBox colorName="Orange" hexCode="#cb4b16"/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  box: {
    marginVertical: 10,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  container: {
    /* paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30, */
    paddingVertical: 50,
    paddingHorizontal: 10,
    /* marginTop: statusBarHeight,  */  
    flex: 1, //makes the content the same height as its parent
    backgroundColor: 'white',
  },
});

export default ColorPalette;
