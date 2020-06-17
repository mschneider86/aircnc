import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  AsyncStorage,
  ScrollView,
} from "react-native";

import styles from "./styles";
import logo from "../../assets/logo.png";

import SpotList from "../../components/SpotList";

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("techs").then((storedTechs) => {
      const techsArray = storedTechs.split(",").map((tech) => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {techs.map((tech) => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
