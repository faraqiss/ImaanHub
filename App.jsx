import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment-hijri'; 
import { Card } from '@gluestack-ui/themed';
 
import HomeScreens from './screen/HomeScreens';
import QiblaScreens from './screen/QiblaScreens';
import TasbihScreens from './screen/TasbihScreens';
 
import DailyDoa from './components/ScreenComponents/DailyDoa';
import DetailDoa from './components/ScreenComponents/DetailDoa';
import ZikrScreens from './components/ScreenComponents/ZikrScreen';
import HadithScreen from './components/ScreenComponents/HadithScreen';
import DetailHadith from './components/ScreenComponents/DetailHadith';
import QuranScreen from './components/ScreenComponents/QuranScreen';
import DetailQuran from './components/ScreenComponents/DetailQuran';
 
import AboutScreens from './screen/AboutScreens';
import UserManualScreen from './components/ScreenComponents/UserManualScreen';
import SourceLists from './components/ScreenComponents/SourceLists';
import FaqScreen from './components/ScreenComponents/FaqScreen';
 
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
 
function HomeScreenChildren() {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name='Dashboard'
        component={HomeScreens}
        options={{ 
          headerShown:false
        }}
      />
      <Stack.Screen 
        name='DailyDua'
        component={DailyDoa}
        options={{ 
          headerShown:true,
          headerBackTitleVisible: false,
          headerTintColor: '#000',
          headerTitle: 'Doa Harian',
        }}
      />
      <Stack.Screen 
        name="DetailDoa"
        component={DetailDoa}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: "#000",
          headerTitle: 'Doa Harian',
        }}
      />
      <Stack.Screen
        name = "ZikrScreen"
        component = {ZikrScreens}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: "#000",
          headerTitle: 'Zikir Harian',
        }}
      />
      <Stack.Screen 
        name="HadithScreen"
        component={HadithScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: "#000",
          headerTitle: 'Senarai Hadis'
        }}
      />
      <Stack.Screen 
          name="DetailHadith"
          component={DetailHadith}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerTintColor: "#000",
            headerTitle: 'Senarai Hadis'
          }}
        />
        <Stack.Screen
        name="QuranScreen"
        component={QuranScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: "#000",
          headerTitle: "Surah",
        }}
      />
      <Stack.Screen
        name="DetailQuran"
        component={DetailQuran}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: "#000",
          headerTitle: "Surah",
        }}
      />
    </Stack.Navigator>
  )
}
 
function AboutScreenChildren() {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name='AboutScreen'
        component={AboutScreens}
        options={{ headerShown: false}}
      />
      <Stack.Screen 
        name='UserManualScreen'
        component={UserManualScreen}
        options={{
          headerTitle: 'User Manual',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTintColor: '#fff'
        }}
      />
      <Stack.Screen 
        name='SourceListsScreen'
        component={SourceLists}
        options={{
          headerTitle: 'Source Lists',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTintColor: '#fff'
        }}
      />
      <Stack.Screen 
        name='FaqScreens'
        component={FaqScreen}
        options={{
          headerTitle: 'FAQ',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTintColor: '#fff'
        }}
      />
 
    </Stack.Navigator>
  )
}
 
 
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
 
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Qibla') {
              iconName = focused ? 'compass' : 'compass-outline';
            } else if (route.name === 'Tasbih') {
              iconName = focused ? 'heart' : 'heart-outline'; 
            } else if (route.name === 'About') {
              iconName = focused ? 'exclamationcircleo' : 'exclamationcircle'
            }
 
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#bd6c8f',
          tabBarInactiveTintColor: '#808080',
          // tabBarStyle: {
          //   // backgroundColor: '#f8f9fa',
          //   // height: 60,
          //   // paddingBottom: 10,
          // },
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "Home"
            const hide = [
              "DailyDua",
              "DetailDoa",
              "ZikrScreen",
              "HadithScreen",
              "DetailHadith",
              "QuranScreen",
              "DetailQuran",
              "UserManualScreen",
              "SourceListsScreen",
              "FaqScreens"
            ].includes(routeName)
            return hide ? { display: "none"} : {};
          })(route),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          tabBarIconStyle: {
            marginBottom: -5,
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreenChildren} 
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Qibla" 
          component={QiblaScreens} 
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Tasbih" 
          component={TasbihScreens} 
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="About" 
          component={AboutScreenChildren} 
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyl: {
    textAlign: 'center',
    fontSize: 25,
  },
});