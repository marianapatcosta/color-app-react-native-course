/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ColorBox = ({ colorName, hexCode }) => {
    const boxColor = {
        backgroundColor: hexCode,
    };

    const textColor = {
        color:
          parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.1
            ? 'black'
            : 'white',
    };

  return (
    <View style={[styles.box, boxColor]}>
      <Text style={[styles.text, textColor]}>
        {colorName}: {hexCode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "bold",
  },
  box: {
    marginVertical: 10,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default ColorBox;
