import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { GluestackUIProvider, View, Text, Card, VStack, Heading, HStack, Button, ButtonText, Spinner } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import axios from "axios";
import { ChevronRight } from "lucide-react-native";

import { useNavigation } from "@react-navigation/native";

const DailyDoa = () => {
  // Navigation hook for navigating to the detailed view of a detail doa
  const navigation = useNavigation();

  // API endpoint for fetching dua
  const BASE_URL = 'https://doa-doa-api-ahmadramadhan.fly.dev/api/'

  // States to handle loading and the fetched prayer list data
  const [isLoading, setIsLoading] = useState(false)
  const [listDua, setListDua] = useState(null)

  // useEffect hook to fetch prayer data
  useEffect(() => {
    const getListDua = async () => {
      try {
        setIsLoading(true)
        const ress = await axios.get(`${BASE_URL}`)
        const data = ress.data
        setListDua(data)
      } catch (error) {
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }
    getListDua()
  },[])

  // Function to navigate to the details screen of a detail dua
  function seeDetail(val) {
    navigation.navigate('DetailDoa', {id: val})
  }

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView marginHorizontal={20}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <Spinner size={'small'}/>
          ) : (
            <>
              {listDua && listDua.map((item, index) => (
                <Card key={index} width={'$full'} backgroundColor="#897491" p={10} marginTop={20}>
                  <HStack justifyContent="space-between" alignItems="center">
                    <VStack space="md">
                      <Heading fontSize={15} color="#fff">{item.doa}</Heading> 
                    </VStack>
                      <Button size="sm" $bgColor="#d1c2d7" $active-bgColor="#d9ccde" onPress={() => seeDetail(item.id)}>
                        <ChevronRight color={'#aa90b4'}/>
                      </Button>
                  </HStack>
                </Card>
              ))}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

export default DailyDoa;