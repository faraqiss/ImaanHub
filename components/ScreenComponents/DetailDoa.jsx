import React, { useEffect, useState } from "react";
import {
  GluestackUIProvider,
  View,
  Text,
  Card,
  HStack,
  VStack,
  Heading,
  Spinner,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import axios from "axios";
import { SafeAreaView, ScrollView } from "react-native";

const DetailDoa = ({ route }) => {
  // Get the prayer ID passed via navigation
  const id = route.params.id;

  // API base URL to fetch detailed prayer data
  const BASE_URL = "https://doa-doa-api-ahmadramadhan.fly.dev/api";
  const [isLoading, setIsLoading] = useState(false);
  const [detailDua, setDetailDua] = useState(null);


  // Function to fetch the detailed prayer data based on the ID
  const getDetail = async () => {
    try {
      setIsLoading(true);
      const ress = await axios.get(`${BASE_URL}/${id}`);
      const data = ress.data;
      setDetailDua(data);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect hook to fetch the detailed data
  useEffect(() => {
    getDetail();
  }, []);

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View marginHorizontal={20}>
            {isLoading ? (
              <Spinner size={"small"} />
            ) : (
              <>
                {detailDua &&
                  detailDua.map((item, index) => (
                    <Card
                      key={index}
                      width={"$full"}
                      backgroundColor="#d1c2d7"
                      p={10}
                      marginTop={20}
                    >
                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <VStack space="md">
                          <Heading fontSize={19}>{item.doa}</Heading>
                          <Text textAlign="right">{item.ayat}</Text>
                          <Text fontSize={13}>{item.latin}</Text>
                          <Text fontSize={14}>{item.artinya}</Text>
                        </VStack>
                      </HStack>
                    </Card>
                  ))}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

export default DetailDoa;
