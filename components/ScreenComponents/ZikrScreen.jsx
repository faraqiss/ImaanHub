import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import {
  GluestackUIProvider,
  View,
  Text,
  Card,
  Heading,
  Button,
  ButtonText,
  HStack,
  Spinner,
  Badge,
  BadgeText,
  Box,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

// Main component for displaying Zikr content
const ZikrScreens = () => {
  const navigate = useNavigation();

  // Base URLs for fetching morning and evening zikr
  const BASE_URL_PAGI = 'https://dzikir.zakiego.com/api/v0/dzikir-pagi'
  const BASE_URL_PETANG = 'https://dzikir.zakiego.com/api/v0/dzikir-sore'

  // State variables to manage loading, zikr data, and selected zikr type
  const [isLoading, setIsLoading] = useState(false)
  const [zikrPagi, setZikrPagi] = useState(null)
  const [zikrPetang, setZikrPetang] = useState(null)
  const [selectedZikr, setSelectedZikr] = useState("pagi")

  // Fetch morning zikr data from API
  const getZikrPagi = async () => {
    try {
      console.log('zikr pagi rendered!')
      setIsLoading(true)
      const ress = await axios.get(`${BASE_URL_PAGI}`)
      const data = ress.data
      setZikrPagi(data)
      setSelectedZikr("pagi")
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getZikrPagi()
  },[])

  const getZikrPetang = async () => {
    try {
      console.log('zikr petang rendered!')
      setIsLoading(true)
      const ress = await axios.get(`${BASE_URL_PETANG}`)
      const data = ress.data
      setZikrPetang(data)
      setSelectedZikr("petang")
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View marginTop={10} marginHorizontal={20}>
            <HStack justifyContent="space-between" gap={10} alignItems="center" alignContent="center">
              <Button width={'$1/2'} backgroundColor="#e7a783" $active-backgroundColor="#fad8c5" onPress={getZikrPagi}>
              <ButtonText color="#fff">Pagi</ButtonText>
              </Button>
              <Button width={'$1/2'} backgroundColor="#e7a783" $active-backgroundColor="#fad8c5" onPress={getZikrPetang}>
              <ButtonText color="#fff">Petang</ButtonText>
              </Button>
            </HStack>

            {selectedZikr === 'pagi' ? (
              <>
                {isLoading ? (
                  <Card width={'$full'} bgColor="#fad8c5" marginTop={20}>
                    <Spinner size={'small'} />  
                  </Card>
                ) : (
                  <>
                    {zikrPagi && zikrPagi.map((item, index) => (
                      <Card key={index} width={'auto'} bgColor="#fad8c5" marginTop={20}>
                        <Text textAlign="right">{item.arabic}</Text>
                        <Text marginTop={20} fontSize={12}>{item.translation}</Text>
                        <Text marginTop={20} fontSize={12}>{item.source}</Text>
                        <Box width={'$1/3'} p={8} bgColor="#e7a783" marginTop={10} borderRadius={10}>
                          <Text color="#fff" textAlign="center">{item.read}</Text>
                        </Box>
                      </Card>
                    ))}
                  </>
                )}
              </>
            ) : (
              <>
              {isLoading ? (
                  <Card width={'$full'} bgColor="#fad8c5" marginTop={20}>
                    <Spinner size={'small'} />  
                  </Card>
                ) : (
                  <>
                    {zikrPetang && zikrPetang.map((item, index) => (
                      <Card key={index} width={'auto'} bgColor="#fad8c5" marginTop={20}>
                        <Text textAlign="right">{item.arabic}</Text>
                        <Text marginTop={20} fontSize={12}>{item.translation}</Text>
                        <Text marginTop={20} fontSize={12}>{item.source}</Text>
                        <Box width={'$1/3'} p={8} bgColor="#e7a783" marginTop={10} borderRadius={10}>
                          <Text color="#fff" textAlign="center">{item.read}</Text>
                        </Box>
                      </Card>
                    ))}
                  </>
                )}
              </>
            )}

          </View>
        </ScrollView>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

export default ZikrScreens;
