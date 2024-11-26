import React, { useEffect, useState } from "react";
import {
  GluestackUIProvider,
  View,
  Text,
  ScrollView,
  Card,
  Spinner,
  VStack,
  HStack,
  Avatar,
  Button,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import axios from "axios";
import { List, MapPin, Play } from "lucide-react-native";
import { Audio } from "expo-av";
import { Pause } from "iconsax-react-native";
 
// Retrieve the id parameter
const DetailQuran = ({ route }) => {
  const id = route.params.id;
 
  const SURAH_URL = "https://quran-api.santrikoding.com/api/surah";
  const [isLoading, setIsLoading] = useState(false);
  const [dataDetailSurah, setDataDetailSurah] = useState(null);
  const [detailSurah, setDetailSurah] = useState(null);

  // State hooks for audio control
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null)
 
  // Fetching the surah details
  useEffect(() => {
    const getDetail = async () => {
      try {
        setIsLoading(true);
        const ress = await axios.get(`${SURAH_URL}/${id}`);
        const data = ress.data;
        const surah = data.ayat;
        setDataDetailSurah(data);
        setDetailSurah(surah);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDetail();
  }, []);
 
  // Function to play the audio of the surah
  const setAudioPressed = async (val) => {
    try {
      // Set audio mode settings for background play and silent mode
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
      });
      const { sound } = await Audio.Sound.createAsync(
        { uri: val },
        { shouldPlay: true }
      );
      console.log("Playing Sound");
      await sound.playAsync();
      setIsPlaying(true)
      setSound(sound)
 
      // Monitor playback status to handle completion of sound
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false)
        }
      })
    } catch (error) {
      console.log("error playing audio : ", error);
    }
  };
 
  // Function to pause the audio
  const pauseAudio = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }
 
  // Toggle between play and pause based on current audio state
  const toggleAudio = (val) => {
    if (isPlaying) {
      pauseAudio()
    } else {
      setAudioPressed(val)
    }
  }
 
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
 
  return (
    <GluestackUIProvider config={config}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View marginHorizontal={20} marginTop={15}>
            <Card width={"$full"} padding={25} backgroundColor="#b4697e">
              <Spinner color={"white"} size={"small"} />
            </Card>
          </View>
        ) : (
          <>
            <View marginHorizontal={20} marginTop={20}>
              <Card backgroundColor="#b4697e" width={"$full"}>
                <HStack justifyContent="space-between">
                  <VStack>
                    <Text color="white" fontWeight="$bold">
                      {dataDetailSurah && dataDetailSurah.nama_latin} -{" "}
                      {dataDetailSurah && dataDetailSurah.nama}
                    </Text>
                    <HStack alignItems="center" marginTop={10}>
                      <List color={"white"} size={15} />
                      <Text color="#fff" fontSize={15}>
                        {" "}
                        Jumlah Ayat :{" "}
                        {dataDetailSurah && dataDetailSurah.jumlah_ayat}
                      </Text>
                    </HStack>
                    <HStack marginTop={10}>
                      <MapPin color={"white"} size={15} />
                      <Text color="#fff" fontSize={15}>
                        Tempat Diturunkan :{" "}
                        {dataDetailSurah && dataDetailSurah.tempat_turun}
                      </Text>
                    </HStack>
                  </VStack>
                  <Button
                    backgroundColor="#b4244d"
                    $active-backgroundColor="#252745"
                    borderRadius={100}
                    w={50}
                    onPress={() => toggleAudio(dataDetailSurah.audio)}
                  >
                    {isPlaying ? (
                      <Pause color="#fff" />
                    ) : (
                      <Play color="#fff" />
                    )}
                  </Button>
                </HStack>
              </Card>
              {detailSurah &&
                detailSurah.map((item, index) => (
                  <Card
                    key={index}
                    width={"$full"}
                    backgroundColor="#f0c9d4"
                    marginTop={10}
                  >
                    <VStack space="md">
                      <HStack
                        justifyContent="flex-end"
                        space="lg"
                        alignItems="center"
                      >
                        <Avatar size="xs" backgroundColor="#b4697e">
                          <Text color="$white">{item.nomor}</Text>
                        </Avatar>
                        <Text textAlign="right" color="#000" fontWeight="$bold">
                          {item.ar}
                        </Text>
                      </HStack>
                      <Text color="#000" marginTop={15}>
                        {item.idn}
                      </Text>
                    </VStack>
                  </Card>
                ))}
            </View>
          </>
        )}
      </ScrollView>
    </GluestackUIProvider>
  );
};
 
export default DetailQuran;