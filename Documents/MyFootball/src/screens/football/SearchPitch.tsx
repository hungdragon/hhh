import React, { useState } from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "src/redux";
import _ from "lodash";
import { setDataFind } from "./FindPitchSlice";
interface Props {
  navigation: any;
}
const SearchPitch: React.FC<Props> = ({ navigation }) => {
  const data = useSelector(
    (state: ApplicationState) => state.findPitchState.data
  );
  const dispatch= useDispatch();
  const [text, setText] = useState("");

  const handleKeyPress = async(name:string) => {
    console.log('name--',name);
      if (name) {
        const newData = _.filter(data, (o: any) => {
          const itemData = o.pitchName
            ? o.pitchName.toUpperCase()
            : "".toUpperCase();
          const nameData = name.toUpperCase();
          return itemData.indexOf(nameData) > -1;
        });
        console.log("6c", newData);
        dispatch(setDataFind(newData))
      } else {
       // dispatch(setDataFind(data));
      }
     navigation.goBack()
    setText("");
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="dark-content"
      />
      <View style={styles.top_search}>
        <View style={styles.leftIconHeader}>
          <Icon name="arrow-left" size={22} style={{ marginTop: 7 }} />
        </View>
        <View style={styles.search_element}>
          <TextInput
            value={text}
            onSubmitEditing={()=>{handleKeyPress(text)}}
            onChangeText={(newText) => setText(newText)}
            autoFocus={true}
            style={{ width: "100%", paddingLeft: 5 }}
            placeholder="miky way"
          ></TextInput>
        </View>
        <View style={styles.rightIconHeader}>
          {/* <TouchableOpacity >
        <MaterialIcon name ='crosshairs-gps' size={25} style={{marginBottom:6}}/>
        </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top_search: {
    height: "10%",
    // backgroundColor:'blue',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    // backgroundColor: "red",
    width: "100%",
    paddingTop: 10,
  },
  leftIconHeader: {
    // backgroundColor: "blue",
    width: "10%",

    justifyContent: "center",
    alignItems: "center",
  },
  search_element: {
    flexDirection: "row",
    backgroundColor: "gray",
    //width: height / 3,
    padding: 5,
    borderRadius: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "70%",
  },
  rightIconHeader: {
    width: "10%",
    // backgroundColor:'green',
    justifyContent: "center",
    alignItems: "center",
    //padding: 5,
  },
});
export default SearchPitch;


