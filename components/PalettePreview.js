/* eslint-disable prettier/prettier */
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, FlatList } from 'react-native';

const PalettePreview = ({ palette, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.heading}>{palette.paletteName}</Text>
        <FlatList // horizontal={true} will aldo display the items horizontally (here we used flexDirection: row)
          style={styles.list}
          data={palette.colors.slice(0, 5)}
          keyExtractor={item => item.colorName}
          renderItem={({ item }) => (
            <View style={[styles.color, { backgroundColor: item.hexCode }]} />
          )}
        />
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    list: {
      flexDirection:'row',
      marginBottom: 30,
    },
    color: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 1,
      elevation: 2, //to make shadows work on Android too
      height: 40,
      width: 40,
      marginRight: 10,
    },
  });

export default PalettePreview;