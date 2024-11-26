import React from "react";
import {
  Card,
  GluestackUIProvider,
  ScrollView,
  VStack,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { StatusBar } from "expo-status-bar";
import { View, Box, Text } from "@gluestack-ui/themed";

const SourceLists = () => {
  return (
    <>
      <StatusBar style="light" />
      <GluestackUIProvider config={config}>
        <View>
          <Box
            backgroundColor="#bf6b8f"
            padding={10}
            height={100}
            justifyContent="center"
            alignItems="center"
          ></Box>
        </View>
        <ScrollView style={{ marginHorizontal: 20, marginTop: 20 }} showsVerticalScrollIndicator={false}>
          <VStack space="md">
            <Card width={"$full"}>
              <Text>Prayer Times - JAKIM</Text>
            </Card>
            <Card width={"$full"}>
              <Text>Doa Harian - Ahmad Ramadhan's Doa</Text>
            </Card>
            <Card width={"$full"}>
              <Text>Zikir - Zakiego's Dzikir</Text>
            </Card>
            <Card width={"$full"}>
              <Text>Hadis - Hadis.my</Text>
            </Card>
            <Card width={"$full"}>
              <Text>Quran - SantriKoding Quran</Text>
            </Card>
            <Card width={"$full"}>
              <Text>Petikan Islamik - eCentral Malaysia</Text>
            </Card>
          </VStack>
        </ScrollView>
      </GluestackUIProvider>
    </>
  );
};

export default SourceLists;
