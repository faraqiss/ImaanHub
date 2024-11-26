import React, { useCallback } from "react";
import {
  Box,
  Card,
  GluestackUIProvider,
  Image,
  Text,
  View,
  HStack,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { UserEdit } from "iconsax-react-native";
import { ChevronRight } from "lucide-react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";

const AboutScreens = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle('light')
    }, [])
  )

  const seeUserManual = () => {
    navigation.navigate("UserManualScreen");
  };

  const seeSourceLists = () => {
    navigation.navigate('SourceListsScreen')
  }

  const seeFaq = () => {
    navigation.navigate('FaqScreens')
  }

  return (
    <>
      <StatusBar style="light"/>
      <GluestackUIProvider config={config}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {/* <Text>About page</Text> */}
          <Box
            backgroundColor="#bf6b8f"
            padding={10}
            height={"$72"}
            justifyContent="center"
            alignItems="center"
          >
            <Image
              source={require("../assets/about_image.png")}
              alt="about_img"
              width={200}
              height={200}
            />
          </Box>
          <View marginHorizontal={15} marginTop={-56}>
            <TouchableOpacity onPress={() => seeSourceLists()}>
              <Card
                width={"$full"}
                borderBottomStartRadius={0}
                borderBottomEndRadius={0}
              >
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack>
                    <Text marginLeft={16} color="#000">
                      Source
                    </Text>
                  </HStack>
                  <ChevronRight size={24} color="#000" />
                </HStack>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => seeUserManual()}>
              <Card
                width={"$full"}
                borderTopWidth={0}
                borderTopRightRadius={0}
                borderTopLeftRadius={0}
                borderBottomStartRadius={0}
                borderBottomEndRadius={0}
              >
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack>
                    <Text marginLeft={16} color="#000">
                      User Manual
                    </Text>
                  </HStack>
                  <ChevronRight size={24} color="#000" />
                </HStack>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => seeFaq()}>
              <Card
                width={"$full"}
                borderTopWidth={0}
                borderTopRightRadius={0}
                borderTopLeftRadius={0}
              >
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack>
                    <Text marginLeft={16} color="#000">
                      FAQ
                    </Text>
                  </HStack>
                  <ChevronRight size={24} color="#000" />
                </HStack>
              </Card>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </GluestackUIProvider>
    </>
  );
};

export default AboutScreens;
