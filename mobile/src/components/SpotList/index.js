import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

import styles from "./styles";
import api from "../../services/api";

export default function SpotList({ tech }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get("/spots", {
        params: { tech },
      });

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Empresas que usam <Text style={styles.boldText}>{tech}</Text>
      </Text>

      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={(spot) => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image
              style={styles.thumbnail}
              source={{ uri: item.thumbnail_url }}
            />
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>
              {item.price ? `R$${item.price}/dia` : "GRATUITO"}
            </Text>
            <TouchableOpacity onPres={() => {}} style={styles.button}>
              <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
