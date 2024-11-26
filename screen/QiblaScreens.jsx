import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, SafeAreaView, Animated } from "react-native";
import { View, Image, Text } from "@gluestack-ui/themed";
import * as Location from "expo-location";
import { Magnetometer } from "expo-sensors";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";

const QiblaScreens = () => {
  // State to store location, error message, heading and bearing to Ka'bah
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // Initial heading is set to 0
  const [heading, setHeading] = useState(0);
  // Initial bearing to Ka'bah
  const [bearingToKabah, setBearingToKabah] = useState(0);
  // Create reference for animation rotation
  const rotateAnim = useRef(new Animated.Value(0)).current; // Animation reference

  // Coordinates of the Ka'bah in Makkah
  let latitudeKabah = 21.422487;
  let longitudeKabah = 39.826206;

  useEffect(() => {
    // Request location and set bearing to Ka'bah
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Get current location of the user
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setLocation(location);

      if (location) {
        let userLat = location.coords.latitude;
        let userLon = location.coords.longitude;
        const bearing = calculateBearing(
          userLat,
          userLon,
          latitudeKabah,
          longitudeKabah
        );
        setBearingToKabah(bearing);
      }
    })();

    // Subscribe to magnetometer to get compass heading
    const subscription = Magnetometer.addListener((data) => {
      let heading = Math.atan2(data.y, data.x) * (180 / Math.PI);
      heading = heading >= 0 ? heading : heading + 360; // Normalize heading
      setHeading(heading);

      // Rotate the arrow based on the heading and bearing difference
      const angleDifference = Math.abs(heading - bearingToKabah);
      rotateAnim.setValue(angleDifference); // Set the value for rotation
    });

    return () => {
      subscription && subscription.remove();
    };
  }, [bearingToKabah]);

  // Formula to calculate the bearing between two points
  const calculateBearing = (lat1, lon1, lat2, lon2) => {
    const toRadians = (deg) => (deg * Math.PI) / 180.0;
    const toDegrees = (rad) => (rad * 180.0) / Math.PI;

    const dLon = toRadians(lon2 - lon1);
    lat1 = toRadians(lat1);
    lat2 = toRadians(lat2);

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    const bearing = toDegrees(Math.atan2(y, x));
    return (bearing + 360) % 360; // Normalize to 0-360 degrees
  };

  // Interpolation for rotation
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle('dark')
    },[])
  )

  return (
    <>
      <StatusBar style="dark"/>
      <SafeAreaView style={styles.container}>
        <View marginTop={50} justifyContent="center" alignItems="center">
          <Image
            source={require("../assets/kabah.png")}
            alt="kabah_image"
            height={250}
            width={250}
            marginBottom={80}
          />
          <Animated.Image
            source={require("../assets/arrow.png")}
            alt="arrow_image"
            style={{
              height: 100,
              width: 100,
              transform: [{ rotate: rotateInterpolate }],
            }}
          />
        </View>
        <View>
          <Text marginTop={20}>
            Turn {Math.abs(heading - bearingToKabah).toFixed(2)}° to face the
            Ka'bah
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QiblaScreens;
