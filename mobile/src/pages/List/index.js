import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import {
  SafeAreaView,
  Text,
  Image,
  AsyncStorage,
  ScrollView,
  Alert,
} from "react-native";

import styles from "./styles";
import logo from "../../assets/logo.png";

import SpotList from "../../components/SpotList";

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then((user_id) => {
      const socket = socketio("http://192.168.0.3:3333", {
        query: { user_id },
      });

      socket.on("booking_response", (booking) => {
        console.log(JSON.stringify(booking));
        Alert.alert(
          "Informação de Reserva",
          `Sua reserva em \n ${booking.spot.company} em ${booking.date}  foi ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        );
      });
    });
  }, []);

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
