import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {useDispatch,useSelector} from 'react-redux';
import { ApplicationState } from 'src/redux';
import { BASE_URL } from 'src/utils';
import { setCode } from './Booking-Football/FootballSlice';


const PaymentScreen: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  const [currentDate, setCurrentDate] = useState('');
  const {ID_next,price,time,nameCustomera} = route.params;
  const [data, setData] = React.useState('');
  // const aa=id;
   const namePitch=useSelector((state: ApplicationState)=>state.footbalState.namePitch)
   const timeBooking=useSelector((state: ApplicationState)=>state.footbalState.timeBooking)
  console.warn(ID_next);

  // useEffect(()=>{
  //     var date = new Date().getDate() //current date
  //     var month =new Date().getMonth() + 1
  //     var year = new Date().getFullYear()

  //     setCurrentDate(
  //         date + '/' + month + '/' + year + ' '
  //     )

  // },[])
  const code =useSelector((state: ApplicationState)=>state.footbalState.code)
  console.log('code77',code);
  const id =useSelector((state: ApplicationState)=>state.footbalState.id)
  console.log('id-',id);
  const dispatch = useDispatch();
  const back= useCallback( async () => {
    var axios = require('axios');

    var config = {
      method: 'post',
      url: `${BASE_URL}api/data-pitch-update?code=${code}&id=${id}&idSlot=${ID_next}`,
      headers: { }
    };
    
    axios(config)
    .then(function (response:any) {
      console.log(JSON.stringify(response.data));
      const aa = navigation.navigate('BookFootballPitch', {ID_goback: ID_next}); // truyền lại về View A
      console.log(Alert.alert(
       'Đặt sân thành công !'
        ))
    })
    .catch(function (error) {
      console.log(error);
    });

    // const pitchName ='ha'
    // const response = await axios.post(`${BASE_URL}api/data-pitch?idPitch=${pitchName}&code=${code}`,{time: 10*1000})
    // console.log('data4---',response.data.footballPitch);
    //  console.log('cmmm---');
    // dispatch(setData(response.data.footballPitch))
    // dispatch(setCode(code))
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.Headers}></View>
      <View style={styles.Body_block}>
        <View style={styles.body_wrap}>
          <View style={styles.body_top_view}>
            <Text
              style={[
                styles.title_payment,
                {fontSize: 22, fontWeight: 'bold', paddingVertical: 10},
              ]}>
              Chi tiết thanh Toán
            </Text>
            <Text style={styles.title_payment}>Khung giờ:{time}</Text>
            <Text style={styles.title_payment}>Sân:{namePitch}</Text>
            <Text style={styles.title_payment}>
              Ngày:{timeBooking}
            </Text>
            <Text style={styles.title_payment}>---</Text>
            <Text style={styles.title_payment}>{ID_next}</Text>
          </View>
          <View style={styles.body_body_view}>
            <View style={styles.body_body_left}>
              <Text style={styles.body_body_text}>Khách hàng</Text>
              <Text style={styles.body_body_text}>Số điện thoại</Text>
              <Text style={styles.body_body_text}>Thông tin thêm</Text>
              <Text style={styles.body_body_text}>Tiền sân</Text>
            </View>
            <View style={styles.body_body_right}>
              <Text style={styles.body_body_text}>{nameCustomera}</Text>
              <Text style={styles.body_body_text}>0961461262</Text>
              <Text style={styles.body_body_text}>...</Text>
              <Text
                style={[
                  styles.body_body_text,
                  {fontWeight: 'bold', color: 'red'},
                ]}>
            {price+'.000'}
              </Text>
            </View>
          </View>

          {/* <View style={styles.service_view}>
            <View style={styles.service_view_left}>
              <Text style={styles.body_body_text}>
                Cho thuê bóng 25.000đ/lượt
              </Text>
            </View>
            <View style={styles.service_view_right}>
              <View style={styles.right_view}>
                <View style={styles.right_view_view}>
                  <Text style={styles.right_btn}>-</Text>
                </View>
                <View style={styles.right_view_view}>
                  <Text style={styles.right_btn}>1</Text>
                </View>
                <View style={styles.right_view_view1}>
                  <Text style={styles.right_btn}>+</Text>
                </View>
              </View>
            </View>
          </View> */}

          <View style={styles.footer_view}>
            <View style={styles.footer_wrap}>
              <Text style={styles.footer_btn}>Thêm sản phẩm</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.payment_view}>
        <View style={styles.payment_view_left}>
          <Text>Tổng thanh toán</Text>
          <Text style={{fontWeight: 'bold', color: 'red'}}>đ   {price+'.000'}</Text>
        </View>
        <View style={styles.payment_view_right}>
          <TouchableOpacity onPress={() => back()}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 16,
                marginHorizontal: 10,
              }}>
              Thanh toán
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    //  backgroundColor:'red',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  Headers: {
    width: '100%',
    height: '28%',
    backgroundColor: 'green',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: 'absolute',
  },
  // Body
  Body_block: {
    height: 'auto',
    width: '85%',
    position: 'absolute',
    top: '5%',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginHorizontal: 20,
    // justifyContent:'center',
    // alignItems: 'center',
    borderRadius: 10,
    elevation: 20,
  },
  body_wrap: {
    marginHorizontal: 10,
    justifyContent: 'center',
    //alignItems: 'center',
  },
  body_top_view: {
    // backgroundColor:'red',
    alignItems: 'center',
    marginVertical: 10,
  },
  title_payment: {
    paddingVertical: 2,
  },
  body_body_view: {
    // backgroundColor:'green',
    flexDirection: 'row',
  },
  body_body_left: {
    //  backgroundColor:'red',
    width: '50%',
    padding: 5,
  },
  body_body_right: {
    //  backgroundColor:'green',
    width: '50%',
    padding: 5,
  },
  body_body_text: {
    padding: 7,
  },

  /// service
  service_view: {
    // backgroundColor:'red',
    flexDirection: 'row',
  },
  service_view_left: {
    // backgroundColor:'green',
    width: '50%',
    padding: 5,
  },
  service_view_right: {
    //  backgroundColor:'red',
    width: '50%',
    justifyContent: 'center',
  },
  right_view: {
    // backgroundColor:'blue',
    flexDirection: 'row',
    //backgroundColor:'green',
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    borderRadius: 10,
    //justifyContent: 'center',
    height: 40,
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  right_view_view: {
    // borderRightWidth:1,
    width: '33%',
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right_view_view1: {
    // borderRightWidth:1,
    width: '33%',
    // borderRightWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right_btn: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // footer

  footer_view: {
    // backgroundColor:'pink',
    marginVertical: 10,
    marginBottom: 20,
  },
  footer_wrap: {
    marginHorizontal: 40,
    // justifyContent:'center',8i
    // backgroundColor:'red',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  footer_btn: {
    textAlign: 'center',
    padding: 8,
    color: 'green',
  },
  payment_view: {
    // backgroundColor:'pink',
    position: 'absolute',
    bottom: 0,
    height: '8%',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 10,
  },
  payment_view_left: {
    width: '70%',
    // backgroundColor:'red',
    alignItems: 'flex-end',
    padding: 10,
  },
  payment_view_right: {
    backgroundColor: 'orange',
    width: '30%',
    justifyContent: 'center',
  },
});
export default PaymentScreen;
