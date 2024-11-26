import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, SafeAreaView, Platform, TouchableOpacity, ScrollView, } from "react-native";
import moment from "moment-hijri";
import HijriDate from "../components/HijriDate";
import { format, parse } from 'date-fns'
import axios from "axios";
import {
  GluestackUIProvider,
  View,
  Text,
  Card,
  HStack,
  VStack,
  Spinner,
  Box,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
 
import { CloudSunny, Sun1, Cloud, SunFog, Moon, CloudFog, Candle, Book, BookSquare } from "iconsax-react-native";
import { HandHelping, MapPinned } from "lucide-react-native";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";
import Carousel from "../components/Carousel";
import Toast from "react-native-toast-message";
 
// Define HomeScreens component
const HomeScreens = () => {
    //DATE 
    useEffect(() => {
      const today = new Date();
 
      const formattedDate = today.toLocaleDateString("ms-MS", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }); // Format date to Malaysian date format
 
      setCurrentDate(formattedDate);
 
      const hijri = moment(today).format("iMMMM iDD, iYYYY");
      setHijriDate(hijri);
    }, []); // Set Hijri date in state
    //DATE
 
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState("");
  const [hijriDate, setHijriDate] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const BASE_URL = 'https://api.waktusolat.app/v2/solat'
  const [prayerTime, setPrayerTime] = useState(null);
 
  // Function to parse and format prayer times
  const parseTime = (val) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit'
    };
    const formattedTime = new Date(val * 1000).toLocaleTimeString([], options);
    return formattedTime;
  };
 
 
  //PRAYER TIMES
  useEffect(() => {
    // Function to fetch prayer times from API
    const getPrayertime = async () => {
      const url = `${BASE_URL}/wly01`
      try {
        setIsLoading(true)
        const response = await fetch(url,{
          method: "GET",
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const ress = await response.json()
        const today = new Date()
        const todayDate = today.getDate()
        const todayPrayers = ress.prayers.find(prayer => prayer.day === todayDate)
        setPrayerTime(todayPrayers)
      } catch (error) {
        setIsLoading(false)
        console.error('Error get prayer time : ',error)
        Toast.show({
          type: 'error',
          text1: 'Error Get Prayer Time',
        })
      } finally {
        setIsLoading(false)
      }
    };
    getPrayertime();
  }, []);
  //PRAYER TIMES
 
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle('dark')
    }, [])
  )
 
  // MENU SECTION
  // Navigation functions to navigate to various screens
  function seeDuaLists() {
    navigation.navigate('DailyDua')
  }
 
  function seeDailyZikr() {
    navigation.navigate('ZikrScreen')
  }
 
  function seeHadith() {
    navigation.navigate("HadithScreen")
  }
 
  function seeQuran() {
    navigation.navigate('QuranScreen')
  }
  // MENU SECTION
 
  // Render UI for HomeScreens component
  return (
    <>
      <StatusBar style="dark" />
 
      <GluestackUIProvider config={config}>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View marginHorizontal={20} marginTop={20}>
              <VStack space="md" marginTop={Platform.OS == 'android' && 50} justifyContent="center" alignItems="center">
                <Text style={styles.hijriDate}>{hijriDate}</Text>
                <Text>{currentDate}</Text>
              </VStack>
 
 
              {/* card sections */}
              <Card backgroundColor="#dfafc3" marginTop={20}>
                <Card style={styles.smallCard}>
                  <Text size="md" style={styles.kualaLumpurText}>
                    Kuala Lumpur
                  </Text>
                </Card>
 
                <HStack space="md" marginTop={15} justifyContent="center">
                  <VStack space="sm">
                    <Box alignItems="center" p={1} w={60}>
                      {isLoading ? (
                        <Spinner size={'small'} />
                      ) : (
                        <>
                          <Text fontSize={15} marginBottom={5} color="#000" fontWeight="bold">Subuh</Text>
                          <CloudSunny color="#b2366b" style={{ marginBottom: 5 }} />
                          {prayerTime !== null  && (
                            <Text fontSize={10} color="#000" fontWeight="bold">{parseTime(prayerTime.fajr)}</Text>
                          )}
                        </>
                      )}
                    </Box>
                  </VStack>
 
                  <VStack space="sm" alignItems="center">
                    <Box alignItems="center" p={1} w={60}>
                      {isLoading ? (
                        <Spinner size={'small'} />
                      ) : (
                        <>
                          <Text fontSize={15} marginBottom={5} color="#000" fontWeight="bold">Zohor</Text>
                          <Sun1 color="#b2366b" style={{ marginBottom: 5 }} />
                          {prayerTime !== null  && (
                            <Text fontSize={10} color="#000" fontWeight="bold">{parseTime(prayerTime.dhuhr)}</Text>
                          )}
                        </>
                      )}
                    </Box>
                  </VStack>
 
                  <VStack space="sm" alignItems="center">
                    <Box alignItems="center" p={1} w={60}>
                      {isLoading ? (
                        <Spinner size={'small'} />
                      ) : (
                        <>
                          <Text fontSize={15} marginBottom={5} color="#000" fontWeight="bold">Asar</Text>
                          <Cloud color="#b2366b" style={{ marginBottom: 5 }} />
                          {prayerTime !== null  && (
                            <Text fontSize={10} color="#000" fontWeight="bold">{parseTime(prayerTime.asr)}</Text>
                          )}
                        </>
                      )}
                    </Box>
                  </VStack>
 
                  <VStack space="sm" alignItems="center">
                    <Box alignItems="center" p={1} w={60}>
                      {isLoading ? (
                        <Spinner size={'small'} />
                      ) : (
                        <>
                          <Text fontSize={15} marginBottom={5} color="#000" fontWeight="bold">Magrib</Text>
                          <CloudFog color="#b2366b" style={{ marginBottom: 5 }} />
                          {prayerTime !== null  && (
                            <Text fontSize={10} color="#000" fontWeight="bold">{parseTime(prayerTime.maghrib)}</Text>
                          )}
                        </>
                      )}
                    </Box>
                  </VStack>
 
                  <VStack space="sm" alignItems="center">
                    <Box alignItems="center" p={1} w={60}>
                      {isLoading ? (
                        <Spinner size={'small'} />
                      ) : (
                        <>
                          <Text fontSize={15} marginBottom={5} color="#000" fontWeight="bold">Isha'</Text>
                          <Moon color="#b2366b" style={{ marginBottom: 5 }} />
                          {prayerTime !== null  && (
                            <Text fontSize={10} color="#000" fontWeight="bold">{parseTime(prayerTime.isha)}</Text>
                          )}
                        </>
                      )}
                    </Box>
                  </VStack>
 
 
                </HStack>
              </Card>
 
              {/* first menu sections */}
              <HStack marginTop={20} alignItems="center" justifyContent="space-between" marginHorizontal={20}>
                <Box width={'$1/2'} backgroundColor="#c3a5ce" p={8} borderRadius={8} alignItems="center" marginRight={10}>
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => seeDuaLists()}>
                    <HandHelping color={'#4e3e53'} size={50} />
                    <Text color="#000" fontSize={20} marginTop={10} fontWeight="bold">Doa Harian</Text>
                  </TouchableOpacity>
                </Box>
 
                <Box width={'$1/2'} backgroundColor="#fad8c5" p={8} borderRadius={8} alignItems="center">
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => seeDailyZikr()}>
                    <Candle color="#83604c" size={50} />
                    <Text color="#000" fontSize={20} marginTop={10} fontWeight="bold">Zikir</Text>
                  </TouchableOpacity>
                </Box>
              </HStack>
 
              {/* second menu sections */}
              <HStack marginTop={20} alignItems="center" justifyContent="space-between" marginHorizontal={20}>
                <Box width={'$1/2'} backgroundColor="#f596a2" p={8} borderRadius={8} alignItems="center" marginRight={10}>
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => seeHadith()}>
                    <Book color={'#9f4a54'} size={50} />
                    <Text color="#000" fontSize={20} marginTop={10} fontWeight="bold">Hadis</Text>
                  </TouchableOpacity>
                </Box>
 
                <Box width={'$1/2'} backgroundColor="#f0c9d4" p={8} borderRadius={8} alignItems="center">
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => seeQuran()}>
                    <BookSquare color={'#b4697e'} size={50} />
                    <Text color="#000" fontSize={20} marginTop={10} fontWeight="bold">Quran</Text>
                  </TouchableOpacity>
                </Box>
              </HStack>
 
              <Carousel></Carousel>
 
            </View>
          </ScrollView>
        </SafeAreaView>
      </GluestackUIProvider>
      <Toast />
    </>
  );
};
 
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#c3a5ce",
    padding: 20,
  },
  hijriDate: {
    fontSize: 23,
    marginVertical: 10,
    color: "#000",
    fontWeight: "bold",
  },
  currentDate: {
    fontSize: 15,
    marginVertical: 5,
    color: "#000",
 
  },
  card: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#b9d9e4",
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  smallCard: {
    marginTop: 0,
    padding: 10,
    backgroundColor: "#bd6c8f",
    borderRadius: 20,
    width: "70%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  kualaLumpurText: {
    color: "white",
    alignContent: "center",
  },
});
 
export default HomeScreens;