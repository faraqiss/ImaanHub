import React, { useEffect, useRef, useState } from "react";
import {
  GluestackUIProvider,
  View,
  Text,
  ScrollView,
  Card,
  Spinner,
  HStack,
  Fab
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronUpIcon } from "lucide-react-native";
 
const QuranScreen = () => {
  // To navigate detail quran screens
  const navigation = useNavigation();
 
  const QURAN_URL = "https://quran-api.santrikoding.com/api";
 
  const [isLoading, setIsLoading] = useState(false);
  const [quranList, setQuranList] = useState(null);
  const scrollViewRef = useRef(null)
 
  // Function to scroll the view back to the top
  function backToTop() {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }
 
  // Function to fetch the list of Quran surahs
  const getQuranList = async () => {
    try {
      setIsLoading(true);
      const ress = await axios.get(`${QURAN_URL}/surah`);
      const data = ress.data;
      setQuranList(data);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
 
  useEffect(() => {
    getQuranList();
  }, []);
 
  const seeDetail = async (id) => {
    navigation.navigate("DetailQuran", { id: id });
  };
 
  return (
    <GluestackUIProvider config={config}>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <View marginHorizontal={20} marginTop={10} marginBottom={20}>
          {isLoading ? (
            <Card width={"$full"} backgroundColor="#b4697e">
              <Spinner color={"white"} size={"small"} />
            </Card>
          ) : (
            <>
              {quranList &&
                quranList.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => seeDetail(item.nomor)}>
                    <Card
                      width={"$full"}
                      backgroundColor="#b4697e"
                      marginTop={10}
                    >
                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <HStack>
                          <Text color="white" fontWeight="$bold">
                            {item.nomor}.{" "}
                          </Text>
                          <Text color="white" fontWeight="$bold">
                            {item.nama_latin}
                          </Text>
                        </HStack>
                        <Text color="white">{item.nama}</Text>
                      </HStack>
                    </Card>
                  </TouchableOpacity>
                ))}
            </>
          )}
        </View>
      </ScrollView>
      <Fab
        onPress={backToTop}
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        backgroundColor="#f0c9d4"
        $active-backgroundColor="#252745"
      >
        <ChevronUpIcon color={"#fff"} />
      </Fab>
    </GluestackUIProvider>
  );
};
 
export default QuranScreen;