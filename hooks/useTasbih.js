import AsyncStorage from "@react-native-async-storage/async-storage";
 
export const saveCount = async (val) => {
  const jsonValue = JSON.stringify(val);
  await AsyncStorage.setItem("tasbih_counter_list", jsonValue);
};
 
export const getListCount = async () => {
  const jsonValue = await AsyncStorage.getItem("tasbih_counter_list");
  return jsonValue != null ? JSON.parse(jsonValue) : [];
};
 
export const deleteCount = async () => {
  await AsyncStorage.removeItem("tasbih_counter_list");
};
 
export const getListById = async (id) => {
  const list = await getListCount();
  return list.find((item) => item.id === id) || null;
};