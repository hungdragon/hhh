import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import moment from "moment";
import "moment/locale/vi";
import { BASE_URL } from "src/utils";
import { setCode, setData, setId } from "../FootballSlice";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "src/redux";
const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const DATA_CARD = [
  {
    time: "06:00-07:00",
    id: 1,
    TimeStart: 6,
    Price: "500000",
  },
  {
    time: "07:00-08:00",
    id: 2,
    TimeStart: 7,
    Price: "500000",
  },
  {
    time: "08:00-09:00",
    id: 3,
    TimeStart: 8,
    Price: "122000",
  },
  {
    time: "09:00-10:00",
    id: 4,
    TimeStart: 9,
    Price: "199000",
  },
  {
    time: "10:00-11:00",
    id: 5,
    TimeStart: 10,
    Price: "220000",
  },
  {
    time: "11:00-12:00",
    id: 6,
    TimeStart: 11,
    Price: "230000",
  },
  {
    time: "15:00-16:00",
    id: 7,
    TimeStart: 15,
    Price: "500000",
  },
  {
    time: "16:00-17:00",
    id: 8,
    TimeStart: 16,
    Price: "5000000",
  },
  {
    time: "17:00-18:00",
    id: 9,
    TimeStart: 17,
    Price: "90000",
  },
  {
    time: "18:00-19:00",
    id: 10,
    TimeStart: 18,
    Price: "100000000",
  },
  {
    time: "19:00-20:00",
    id: 11,
    TimeStart: 19,
    Price: "100000",
  },
  {
    time: "20:00-21:00",
    id: 12,
    TimeStart: 24,
    Price: "200000",
  },
];
interface Props {
  navigation: any;
  route: any;
  namePitch: string;
}
const GridFootball: React.FC<Props> = ({ navigation, route, namePitch }) => {
  const dataPitch = useSelector(
    (state: ApplicationState) => state.footbalState.data
  );

  var date = new Date();
  var day = date.getDate();
  const dispatch = useDispatch();
  if (day < 10) {
    day = "0" + day;
  }
  var mm = date.getMonth() + 1;
  if (mm < 10) {
    mm = "0" + mm;
  }
 const code = String(day + mm);
  dispatch(dispatch(setCode(code)))
  const codeNew = useSelector(
    (state: ApplicationState) => state.footbalState.code
  );
  let getHour = new Date().getHours();
  const dateTimeNow = () => {
    var date = new Date();
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = date.getMonth() + 1;
    var dayOfWeek = date.getDay();
    console.log(dayOfWeek);
    let weekdays = "";
    switch (dayOfWeek) {
      case 0:
        weekdays = "Chủ nhật";
        break;
      case 1:
        weekdays = "Thứ 2";
        break;
      case 2:
        weekdays = "Thứ 3";
        break;
      case 3:
        weekdays = "Thứ 4";
        break;
      case 4:
        weekdays = "Thứ 5";
        break;
      case 5:
        weekdays = "Thứ 6";
        break;
      case 6:
        weekdays = "Thứ 7";
        break;
      default:
        weekdays = "9999";
    }

    console.log(weekdays);

    if (gg < 10) gg = "0" + gg;

    if (mm < 10) mm = "0" + mm;

    var cur_day = aaaa + "-" + mm + "-" + gg;

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (hours < 10) hours = "0" + hours;

    if (minutes < 10) minutes = "0" + minutes;

    if (seconds < 10) seconds = "0" + seconds;

    return cur_day + " " + hours + ":" + minutes + ":" + seconds;
  };
  // console.log(dateTimeNow());
  // console.log('AA',getHour);

  useEffect(() => {
    callAPI();
  }, []);
  const callAPI = async () => {
    const pitchName = "ha";
    const response = await axios.post(
      `${BASE_URL}api/data-pitch?idPitch=${pitchName}&code=${codeNew}`,
      { time: 10 * 1000 }
    );
    // console.log('data4---',response.data.footballPitch);
    dispatch(setData(response.data.footballPitch));
    dispatch(setCode(codeNew));
    dispatch(setId(response.data._id));
    console.log("AAA--", response.data.code);
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    console.log("ma code --", codeNew);
    wait(2000).then(() => setRefreshing(false));
    const pitchName = "ha";
    const response = await axios.post(
      `${BASE_URL}api/data-pitch?idPitch=${pitchName}&code=${codeNew}`,
      { time: 10 * 1000 }
    );
    dispatch(setData(response.data.footballPitch));
    dispatch(setId(response.data._id));
    dispatch(setCode(codeNew));
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{ zIndex: -1 }}
      style={{ zIndex: -1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={Styles.Pitch_container}>
        {dataPitch.map((item: any, index: any) => (
          <View key={index} style={Styles.Pitch_wrap}>
            <View style={Styles.Pitch_element}>
              <Text style={Styles.Time_Football}>{item.timeSlot}</Text>

              {item.status == "payed" && getHour < item.timeStart ? (
                <Animatable.View animation="flash" duration={1000}>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert("da dat san");
                    }}
                  >
                    <Icon
                      name="soccer-ball-o"
                      style={[Styles.Icon_Football, { color: "purple" }]}
                    />
                  </TouchableOpacity>
                </Animatable.View>
              ) : item.timeStart <= getHour <= item.timeEnd &&
                item.status === "payed" ? (
                <Icon
                  name="soccer-ball-o"
                  style={[Styles.Icon_Football, { color: "green" }]}
                />
              ) : item.timeStart >= getHour && code == "0305" ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("DetailsFootball", {
                      id: item.id,
                      nanmePitch: namePitch,
                      price: item.price,
                      time: item.timeSlot,
                    });
                  }}
                >
                  <Icon
                    name="plus"
                    style={[Styles.Icon_Football, { color: "gray" }]}
                  />
                </TouchableOpacity>
              ) : item.timeStart < getHour && code == "0305" ? (
                <Icon
                  name="close"
                  style={[Styles.Icon_Football, { color: "red" }]}
                />
              ) : item.timeStart >= getHour && code !== "0305" ? (
                <Icon
                  name="plus"
                  style={[Styles.Icon_Football, { color: "gray" }]}
                />
              ) : (
                <Icon
                  name="close"
                  style={[Styles.Icon_Football, { color: "red" }]}
                />
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
export default GridFootball;
const { height } = Dimensions.get("screen");
const height_pitch = height * 0.25;
const Styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flex: 1,
  },
  header: {
    flexDirection: "row",
    // backgroundColor:'blue',
    // backgroundColor: 'red',
    // height: 200
  },
  header_typePitch: {
    width: "50%",
    justifyContent: "center",
    // backgroundColor:"red"
    zIndex: 1,
  },
  _typePitch: {
    // width: "80%",
    backgroundColor: "white",
    margin: 10,
    paddingVertical: 2,
    borderRadius: 10,
    elevation: 10,
    // backgroundColor:"blue",
    marginHorizontal: 20,
  },
  // Calendar
  calendar: {
    width: "55%",
    //   backgroundColor: "green",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginLeft: 20,

    zIndex: 0,
    padding: 10,
  },
  calendar_block: {
    flexDirection: "row",
    width: "55%",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    marginHorizontal: 20,
    // overflow:'hidden',
  },
  dayofMonth: {
    backgroundColor: "orange",
    padding: 8,
    margin: 5,
    marginVertical: 5,
    borderRadius: 80,
    fontWeight: "bold",
    color: "#fff",
  },
  btn_navigation: {
    // margin:5
  },

  /// Book Football Pitch
  Pitch_container: {
    //  backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 20,
    zIndex: -1,
  },
  Pitch_wrap: {
    flexDirection: "row",
    margin: 8,
  },
  Pitch_element: {
    //  backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
    //padding:5,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 20,
    width: height / 8,
    height: height / 7.5,
    padding: 5,
  },
  Time_Football: {
    fontWeight: "bold",
    //paddingVertical:5,
    // marginHorizontal:5,
    fontSize: 16,
    justifyContent: "center",
  },
  Icon_Football: {
    fontSize: 35,
    paddingVertical: 5,
    marginTop: 8,
    // elevation:50,
    color: "#C0C0C0",
  },
  //FOOTER END

  footer_container: {
    backgroundColor: "white",
    height: height_pitch / 4,
    justifyContent: "center",
    // alignItems: 'flex-end',
    elevation: 1,
    // opacity:.5
    marginVertical: 5,
  },
  footer_wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  footer_element: {
    flexDirection: "row",
  },
  dot_status_playing: {
    padding: 3,
    color: "green",
    fontWeight: "bold",
    fontSize: 14,
  },
  dot_status_payed: {
    padding: 3,
    color: "purple",
    fontWeight: "bold",
    fontSize: 14,
  },
});
