import React, { useEffect, useState } from "react";
import {
  GluestackUIProvider,
  View,
  Text,
  Card,
  Spinner,
  Heading,
  ScrollView,
  Divider,
  Button,
  ButtonText,
  HStack,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Eye } from "lucide-react-native";
 
const HadithScreen = () => {
  // Set up navigation for moving to the detail hadith
  const navigation = useNavigation();

  // Define the base URL for the Hadith API
  const HADITH_URL = "https://hadis.my/api/";
 
  const [isLoading, setIsLoading] = useState(false);
  const [listKitab, setListKitab] = useState(null);
 
  // Fetch the list of Kitab from the API
  useEffect(() => {
    const getKitab = async () => {
      try {
        setIsLoading(true);
        const ress = await axios.get(`${HADITH_URL}/kitab`);
        const data = ress.data.data;
        setListKitab(data);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getKitab();
  }, []);
 
  // Function to navigate to the DetailHadith screen 
  const seeDetail = (val) => {
    navigation.navigate("DetailHadith", { id: val });
  };
 
  return (
    <GluestackUIProvider config={config}>
      <ScrollView
        marginBottom={20}
        marginHorizontal={20}
        showsVerticalScrollIndicator={!true}
      >
        <>
          {isLoading ? (
            <Card width={"$full"} padding={25} backgroundColor="#9f4a54">
              <Spinner color={"#fff"} size={"small"} />
            </Card>
          ) : (
            <>
              {listKitab &&
                listKitab.map((kitab, index) => (
                  <Card
                    width={"full"}
                    padding={8}
                    backgroundColor="#cf7f89"
                    key={index}
                    marginTop={20} 
                  >
                    <Heading color="#fff">{kitab.name}</Heading>
                    <Divider marginBottom={10} />
                    <Text fontSize={14} color="#fff">
                      {kitab.description}
                    </Text>
 
                    <HStack justifyContent="flex-end">
                      <Button
                        marginTop={20}
                        onPress={() => seeDetail(kitab.id)}
                        backgroundColor="#fbcdd3"
                        size="xs"
                      >
                        <Eye color={'#cf7f89'}/>
                        {/* <ButtonText>detail </ButtonText> */}
                      </Button>
                    </HStack>
                  </Card>
                ))}
            </>
          )}
        </>
      </ScrollView>
    </GluestackUIProvider>
  );
};
 
export default HadithScreen;