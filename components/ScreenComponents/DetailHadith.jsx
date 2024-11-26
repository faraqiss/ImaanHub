import React, { useEffect, useRef, useState } from "react";
import {
  GluestackUIProvider,
  View,
  Text,
  ScrollView,
  Card,
  Spinner,
  Heading,
  Divider,
  HStack,
  Button,
  ButtonText,
  Fab,
  FabLabel,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import axios from "axios";
import { ChevronLeft, ChevronRight, ChevronUpIcon } from "lucide-react-native";
 
const DetailHadith = ({ route }) => {
  // Extract 'id' parameter passed from the previous screen
  const id = route.params.id;
 
  // Define the base URL for the Hadith API
  const HADITH_URL = "https://hadis.my/api";
  const [isLoading, setIsLoading] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [page, setPage] = useState(1);
  const idKitab = id;
 
  // Reference to the ScrollView for scrolling to the top
  const scrollViewRef = useRef(null);
 
  // Function to scroll back to the top of the page when the Fab button is clicked
  function backToTop() {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }

   // Function to fetch the details of the Hadith based on the Kitab ID
  const getDetail = async () => {
    const formData = new FormData();
    formData.append("kitabid", idKitab);
    formData.append("page", 1);
    try {
      setIsLoading(true);
      const response = await fetch("https://hadis.my/api/hadisbykitab", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      const data = result.data;
      setDetailData(data);
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);
 
  return (
    <GluestackUIProvider config={config}>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View marginHorizontal={20} marginTop={20}>
            <Card width={"$full"} padding={25} backgroundColor="#fbcdd3">
              <Spinner color={"white"} size={"small"} />
            </Card>
          </View>
        ) : (
          <>
            <View marginHorizontal={20} marginTop={20}>
              {detailData &&
                detailData.map((item, index) => (
                  <Card
                    key={index}
                    width={"$full"}
                    backgroundColor="#fbcdd3"
                    marginTop={10}
                  >
                    <Heading color="#000">{item.kitab}</Heading>
                    <Divider marginBottom={10} />
                    <Text fontSize={14} color="#000" textAlign="justify">
                      {item.hadis}
                    </Text>
                  </Card>
                ))}
            </View>
          </>
        )}
      </ScrollView>
      <Fab
        onPress={backToTop}
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        backgroundColor="#f596a2"
        $active-backgroundColor="#252745"
      >
        <ChevronUpIcon color={"#fbcdd3"} />
      </Fab>
    </GluestackUIProvider>
  );
};
 
export default DetailHadith;