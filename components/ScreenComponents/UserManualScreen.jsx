import React, { useCallback } from "react";
import {
  Card,
  GluestackUIProvider,
  HStack,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Box } from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { userManualLists } from "../../hooks/userManual";
 
const UserManualScreen = () => {
 
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
        <ScrollView style={{ backgroundColor: "#fff" }} showsVerticalScrollIndicator={false}>
          <View marginHorizontal={20} marginTop={20}>
            <Text>USER GUIDE</Text>
            <VStack marginTop={20} space="md">
              {userManualLists.map((item, index) => (
                <Card width={"$full"} variant="ghost" key={index}>
                  <TouchableOpacity>
                    <HStack space="lg">
                      <Image
                        source={item.image}
                        alt="home_alt"
                        width={100}
                        height={200}
                      />
                      <VStack width={200} space="md">
                        <Text fontWeight={"$medium"}>{item.title}</Text>
                        {Array.isArray(item.summary) ? (
                          item.summary.map((line, index) => (
                            <Text key={index} marginTop={0}>{line}</Text>
                          ))
                        ) : (
                          <Text>{item.summary}</Text>
                        )}
                      </VStack>
                    </HStack>
                  </TouchableOpacity>
                </Card>
              ))}
            </VStack>
          </View>
        </ScrollView>
      </GluestackUIProvider>
    </>
  );
};
 
export default UserManualScreen;