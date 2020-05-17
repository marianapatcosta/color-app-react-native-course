/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  RefreshControl,
} from "react-native";
import PalettePreview from "../components/PalettePreview";

/* const SOLARIZED = [
  { colorName: 'Base03', hexCode: '#002b36' },
  { colorName: 'Base02', hexCode: '#073642' },
  { colorName: 'Base01', hexCode: '#586e75' },
  { colorName: 'Base00', hexCode: '#657b83' },
  { colorName: 'Base0', hexCode: '#839496' },
  { colorName: 'Base1', hexCode: '#93a1a1' },
  { colorName: 'Base2', hexCode: '#eee8d5' },
  { colorName: 'Base3', hexCode: '#fdf6e3' },
  { colorName: 'Yellow', hexCode: '#b58900' },
  { colorName: 'Orange', hexCode: '#cb4b16' },
  { colorName: 'Red', hexCode: '#dc322f' },
  { colorName: 'Magenta', hexCode: '#d33682' },
  { colorName: 'Violet', hexCode: '#6c71c4' },
  { colorName: 'Blue', hexCode: '#268bd2' },
  { colorName: 'Cyan', hexCode: '#2aa198' },
  { colorName: 'Green', hexCode: '#859900' },
];

const RAINBOW = [
  { colorName: 'Red', hexCode: '#FF0000' },
  { colorName: 'Orange', hexCode: '#FF7F00' },
  { colorName: 'Yellow', hexCode: '#FFFF00' },
  { colorName: 'Green', hexCode: '#00FF00' },
  { colorName: 'Violet', hexCode: '#8B00FF' },
];

const FRONTEND_MASTERS = [
  { colorName: 'Red', hexCode: '#c02d28' },
  { colorName: 'Black', hexCode: '#3e3e3e' },
  { colorName: 'Grey', hexCode: '#8a8a8a' },
  { colorName: 'White', hexCode: '#ffffff' },
  { colorName: 'Orange', hexCode: '#e66225' },
];

const COLOR_PALETTES = [
  { paletteName: 'Solarized', colors: SOLARIZED },
  { paletteName: 'Frontend Masters', colors: FRONTEND_MASTERS },
  { paletteName: 'Rainbow', colors: RAINBOW },
]; */

const Home = ({ navigation, route }) => {
  const newColorPalette = route.params ? route.params.newColorPalette : "";
  const [ColorPalettes, setColorPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchColorPalettes = useCallback(async () => {
    //setIsRefreshing(true);
    const response = await fetch(
      "https://color-palette-api.kadikraman.now.sh/palettes"
    );
    if (response.ok) {
      const palettes = await response.json();
      setColorPalettes(palettes);
      // setIsRefreshing(false);
    }
  }, []);

  useEffect(() => fetchColorPalettes(), [fetchColorPalettes]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchColorPalettes();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (newColorPalette) {
      setColorPalettes((prevPalettes) => [newColorPalette, ...prevPalettes]);
    }
  }, [newColorPalette]);

  //push takes component name, must be unique Each time you call push we add a new route to the navigation stack.
  //When you call navigate it first tries to find an existing route with that name,
  //and only pushes a new route if there isn't yet one on the stack.
  //every object in the data array is referenced through item property of the actual parameter passed to renderItem function.
  //If you want to use palette instead of item, then you can rename item to palette as renderItem= ({item: palette) => {...}

  return (
    <FlatList
      style={styles.list}
      data={ColorPalettes}
      keyExtractor={(item) => item.paletteName}
      renderItem={({ item }) => (
        <PalettePreview
          onPress={() => navigation.push("ColorPalette", item)}
          palette={item}
        />
      )}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => handleRefresh()}
        />
      }
      ListHeaderComponent={
        <TouchableOpacity onPress={() => navigation.push("AddNewPaletteModal")}>
          <Text style={styles.buttonText}>Add new palette</Text>
        </TouchableOpacity>
      }
    />
  );
};

// any scrollable element hve a refresh control prop than can be passed in or to customize RefreshControl component (ex loader);
// this component adapts itself to the environment and loader is different according to the environment;
// if we do no want to customize refreshCOntroll, we can pass the values directly in flat list, without using <RefreshControl component:
//  refreshing={true} onRefresh={() => handleRefresh()}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "teal",
    marginBottom: 10,
  },
});

export default Home;
