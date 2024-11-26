import React, { useCallback, useEffect, useState } from "react";
import {
  GluestackUIProvider,
  View,
  Text,
  SafeAreaView,
  Button,
  ButtonText,
  HStack,
  Spinner,
  Modal,
  Heading,
  ModalBackdrop,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Icon,
  CloseIcon,
  Input,
  InputField,
  Card,
  Avatar,
  VStack,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";
import { ArrowDown2, ArrowUp2, Trash } from "iconsax-react-native";
import { Save, X } from "lucide-react-native";
import Toast from "react-native-toast-message";
 
// Importing functions for handling counter data
import { saveCount } from "../hooks/useTasbih";
import { getListCount, getListById } from "../hooks/useTasbih";
import { Platform, TouchableOpacity } from "react-native";
 
const TasbihScreens = () => {
  // States to manage count, title, modal visibility, and data
  const [count, setCount] = useState(0); // Current count
  const [title, setTitle] = useState(""); // Title for saving counter
 
  const [openListsModal, setOpenListsModal] = useState(false); // Modal visibility for list
  const [openSaveModal, setOpenSaveModal] = useState(false); // Modal visibility for saving
  const [isDisable, setIsDisable] = useState(false); // Button disable state based on counter
  const [isSaveLoading, setIsSaveLoading] = useState(false); // Loading state for saving
  const [listCounter, setListCounter] = useState(null); // Store list of saved counters
  const [selectedId, setSelectedId] = useState(null); // Store selected counter id for updating
 
  // save counter
  const saveCounter = async () => {
    try {
      setIsSaveLoading(true);
      const existingData = await getListCount();
      const updatedData = selectedId
        ? existingData.map((item) =>
            item.id === selectedId ? { ...item, last_count: count } : item
          )
        : [
            ...existingData,
            { id: existingData.length + 1, title, last_count: count },
          ];
      await saveCount(updatedData); // Save the updated data
      await getList(); // Refresh the list
    } catch (error) {
      setIsSaveLoading(false);
      console.error(error);
    } finally {
      // Reset the form and close modal after save
      setTimeout(() => {
        setIsSaveLoading(false);
        setOpenSaveModal(false);
        setTitle("");
        setCount(0);
        setSelectedId(null)
        Toast.show({
          type: "success",
          text1: "Success!",
        });
      }, 1000);
    }
  };
 
  // delete counter
  const deleteCountById = async (id) => {
    try {
      const existingData = await getListCount();
      const updatingData = existingData.filter((item) => item.id !== id);
      await saveCount(updatingData); // Save the updated data
    } catch (error) {
      console.error("error deleting data : ", error);
    } finally {
      Toast.show({
        type: "success",
        text1: "Success!",
      });
    }
  };
 
  // get list counter
  const getList = async () => {
    const data = await getListCount();
    setListCounter(data);
  };
  useEffect(() => {
    getList();
  }, []);
 
  // reset counter
  const resetCount = () => {
    setCount(0);
  };
 
  // handle delete counter
  const handleDelete = async (id) => {
    await deleteCountById(id);
    await getList();
  };
 
  // set button save condition
  useEffect(() => {
    if (count === 0) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [count]);
 
  // get last_counter by id
  const getItemById = async (id) => {
    const item = await getListById(id);
    if (item) {
      setCount(item.last_count);
      setSelectedId(id); 
    }
  };
 
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle("light");
    }, [])
  );
 
  return (
    <>
      <StatusBar style="light" />
      <GluestackUIProvider config={config}>
        <SafeAreaView flex={1} backgroundColor="#bd6c8f">
          <View marginHorizontal={20} marginTop={Platform.OS === 'android' ? 40 : 0}>
            <HStack justifyContent="space-between">
              <Button
                backgroundColor="#bd6c8f"
                borderRadius={50}
                isDisabled={isDisable}
                onPress={resetCount}
              >
                <ButtonText>Reset</ButtonText>
              </Button>
              <Button
                backgroundColor="#bd6c8f"
                borderRadius={50}
                isDisabled={isDisable}
                onPress={() => {
                  if (selectedId !== null) {
                    saveCounter()
                  } else {
                    setOpenSaveModal(true);
                  }
                }}
              >
                {isSaveLoading ? (
                  <Spinner size={"small"} color={"#fff"} />
                ) : (
                  <Save color="#fff" size={20} />
                )}
              </Button>
            </HStack>
            <View justifyContent="center" alignItems="center" marginTop={150}>
              <Text color="#fff" fontSize={120} marginTop={20}>
                {count}
              </Text>
              <Button
                borderRadius="$full"
                size="xl"
                backgroundColor="#c3a5ce"
                $active-backgroundColor="fafafa"
                w={120}
                h={120}
                borderWidth={2}
                borderColor="#fff"
                onPress={() => setCount((count) => count + 1)}
              >
                <ArrowUp2 color="#fff" size={40} />
              </Button>
              <Button
                isDisabled={isDisable}
                borderRadius="$full"
                size="xl"
                bg="#c3a5ce"
                w={60}
                h={60}
                borderColor="#fff"
                borderWidth={1}
                onPress={() => setCount((count) => count - 1)}
                marginTop={-10}
              >
                <ArrowDown2 color="#fff" size={20} />
              </Button>
            </View>
          </View>
        </SafeAreaView>
        <View backgroundColor="#bd6c8f">
          <View
            marginBottom={10}
            marginHorizontal={20}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              width={"$1/2"}
              backgroundColor="#fad8c5"
              $active-backgroundColor="#b5d5e5"
              onPress={() => setOpenListsModal(true)}
            >
              <ButtonText color="#000">List</ButtonText>
            </Button>
            {/* <Button
              width={"$1/2"}
              backgroundColor="#b9d9e4"
              $active-backgroundColor="#b5d5e5"
              onPress={() => deleteCount()}
            >
              <ButtonText color="#bd6c8f">Test delete</ButtonText>
            </Button> */}
          </View>
        </View>
 
        {/* modal save current counter */}
        <Modal
          isOpen={openSaveModal}
          onClose={() => {
            setOpenSaveModal(false);
          }}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="lg">Save Counter ?</Heading>
              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <Text marginBottom={10}>Title</Text>
              <Input>
                <InputField
                  value={title}
                  onChangeText={(e) => setTitle(e)}
                ></InputField>
              </Input>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                size="sm"
                action="secondary"
                mr="$3"
                onPress={() => {
                  setOpenSaveModal(false);
                }}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                size="sm"
                action="positive"
                borderWidth="$0"
                backgroundColor="#bd6c8f"
                onPress={saveCounter}
              >
                {isSaveLoading ? (
                  <Spinner size={"small"} color={"#fff"} />
                ) : (
                  <ButtonText>Save</ButtonText>
                )}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
 
        {/* modal see lists counter if exist */}
        <Modal
          isOpen={openListsModal}
          onClose={() => setOpenListsModal(false)}
          size="lg"
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="lg">Lists</Heading>
              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              {listCounter && listCounter.length > 0 ? (
                <>
                  {listCounter.map((item, index) => (
                    <Card width={"$full"} key={index} marginBottom={10}>
                      <TouchableOpacity
                        onPress={() => {
                          getItemById(item.id);
                          setOpenListsModal(false);
                        }}
                      >
                        <HStack justifyContent="space-between">
                          <VStack>
                            <Text>{item.title}</Text>
                            <Text>total count : {item.last_count}</Text>
                          </VStack>
                          <Button
                            w={40}
                            h={40}
                            borderRadius={"$full"}
                            variant="outline"
                            borderColor="red"
                            onPress={() => handleDelete(item.id)}
                          >
                            <Trash color="red" />
                          </Button>
                        </HStack>
                      </TouchableOpacity>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  <Card width={"$full"} alignItems="center" variant="filled">
                    <Avatar backgroundColor="red">
                      <X color={"#fff"} size={40} />
                    </Avatar>
                    <Text marginTop={20} fontSize={20} color="#000">
                      Lists Empty
                    </Text>
                  </Card>
                </>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
 
        {/* <ModalRN
          animationType="slide"
          transparent={true}
          visible={openListsModal}
        ></ModalRN> */}
      </GluestackUIProvider>
      <Toast />
    </>
  );
};
 
export default TasbihScreens;