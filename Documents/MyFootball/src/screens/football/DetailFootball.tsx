import React, { useEffect, useState } from "react";
import { View ,Text, Button, TextInput,StyleSheet,Image, TouchableOpacity} from "react-native";
import { useDispatch,useSelector } from "react-redux";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Images from 'themes/index'
import { ApplicationState } from "src/redux";
const DetailsFootball: React.FC<{navigation:any,route:any}>=({navigation,route})=>{
    const fullName = useSelector((state: ApplicationState) => state.userState.fullName);
    console.log('d----'+fullName);
    const [ currentDate, setCurrentDate]=useState('')
    const {id,price,time} =route.params;
    const [nameCustomer,setNameCustomer]=useState(fullName);
    console.log(price);
    const money = price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const discount=15;
    const Total=price - discount;
    const ac:string = Total.toString();
    let a=ac.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    console.log(Total+'.000');                                            
    const [data, setData] = React.useState('');
  
    useEffect(()=>{
        var date = new Date().getDate() //current date
        var month =new Date().getMonth() + 1
        var year = new Date().getFullYear()

        setCurrentDate(
            date + '/' + month + '/' + year + ' '
        )
       
    },[])
    const dispatch = useDispatch();
    // nút back lại đây
    
    const textInputChange=(value:any)=>{
       
        setNameCustomer(value);
    }
    function next(){
        //const {params} =route;
        //console.warn("check",params);
       // alert({params})
       // params.callback();//gọi  hàm callback
       //const aa= navigation.navigate('Sân 7',{screen:'HomeBooking',hung:id,});// truyền lại về View A
       const aa= navigation.navigate("PaymentScreen",{ID_next:id,price:a,time:time,nameCustomera:nameCustomer});// truyền lại về View A
       
       
        // const {goBack}=navigation;
    
      //  goBack();
        
        
     
        //goBack2();
    }
    return(
        <View>
           <View style={styles.Header}>
                <View style={styles.text_Date}>
                    <IconFontAwesome  name='calendar' color='white' />
                        <Text style={{height:30,fontSize:20, marginLeft:5,color:'white'}}>  
                        {currentDate}
                        </Text>
                        <Text>id ={id}</Text>
                    </View>
           </View>

            <View style={styles.Body_block}>
                <View  style={styles.body_wrap}>
                    <View style={styles.top_block}>
                    <IconAntDesign name='clockcircleo'  color='black' style={{paddingVertical:10}} />
                        <Text style={styles.text_timeFootball}>  
                                {time}
                        </Text>
                    <Image source={Images.Icon_san_dau} style={{width:30,height:30}} />
                    </View>
                    <View style={{flexDirection:'column'}}>
                       <View style={styles.input_info}>
                            <Text style={{paddingVertical:10}}><IconAntDesign name="user"/></Text>
                            <TextInput    onChangeText={val => textInputChange(val)} placeholder='Nhap ten' >{fullName}</TextInput> 
                       </View>
                       <View style={styles.input_info}>
                            <Text style={{paddingVertical:10}}><IconFontAwesome name="phone"/></Text>
                            <TextInput placeholder='Nhap ten'> 0961461262</TextInput> 
                       </View>
                        <TextInput placeholder="Thông tin thêm" multiline={true} numberOfLines={4}style={styles.input_info_area}></TextInput>

                        <View style={styles.input_info_2}>
                            <View style={styles.input_info_2_1}>
                                <Text>Tiền sân</Text>
                                <Text>{money}</Text>
                            </View>
                            <View style={styles.input_info_2_1}>
                                <Text style={styles.input_info_2_0}>Được giảm giá</Text>
                                <View style={styles.input_info_2_2}>
                                <Text style={{marginVertical:5}}>15.000</Text>
                                <Text style={{borderLeftWidth:1,borderLeftColor:'gray',marginHorizontal:5,textAlign:'right'}} ></Text>
                                <Text style={{marginVertical:5,fontWeight:'bold'}}>%</Text>
                                </View>
                            </View>
                            <View style={styles.input_info_2_1}>
                                <Text style={styles.input_info_2_0}>Tổng tiền</Text>
                                <Text style={styles.input_info_2_3} >{a}.000</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View>
                    {/* <Text style={styles.btn_ss} onPress={()=>navigation.navigate('NavigationBack',{ix:5})}> ĐẶT SÂN</Text> */}
                    <Text style={styles.btn_ss} onPress={()=>next()}> ĐẶT SÂN</Text>
                </View>

            </View> 
            
        </View>
    )
}
const  styles =StyleSheet.create({
    Header:{
        height:'40%',
        backgroundColor:'green',
        borderRadius:30
    },
    text_Date:{
        flexDirection:'row',
        backgroundColor:'#006400',
        padding:5,
        paddingHorizontal:10,
        marginHorizontal:20,
        borderRadius:5,

        marginTop:50,
        
    },

    // Body
    Body_block:{
        backgroundColor:'white',
        paddingHorizontal:10,
        marginHorizontal:20,
        marginTop:-160,
        borderRadius:10,
        elevation:20,
    },
    body_wrap:{
        marginHorizontal:10,
        marginVertical:10,
        padding:5
    },
    top_block:{
        flexDirection:'row'
    },
    text_timeFootball:{
        fontSize:15,
        color:'black',
        marginBottom:15,
        marginVertical:5,
        marginEnd:3
    },
    input_info:{
        flexDirection:'row',
        padding:8,
        borderRadius:5,
        borderWidth:1,
        borderColor:'grey',
        marginVertical:8
    },
    input_info_area:{
        height:100,
        textAlignVertical:'top',
        padding:8,
        borderRadius:5,
        borderWidth:1,
        borderColor:'grey',
        marginVertical:8
    },
    input_info_2:{
      
        padding:8,
        borderRadius:5,
        borderWidth:1,
        borderColor:'grey',
        marginVertical:8
    },
    input_info_2_0:{
        paddingHorizontal:6,
        paddingVertical:6,
    },
    input_info_2_1:{
        flexDirection:'row',
        marginVertical:10,
        justifyContent:'space-between',
        //alignItems:'flex-start'
        marginEnd:30,
        
        
    },
    input_info_2_2:{
        flexDirection:'row',
        //marginVertical:10,
       // justifyContent:'space-between',
        //alignItems:'flex-start'
        //marginEnd:30,
        paddingHorizontal:6,
        //paddingVertical:6,
        width:'40%',
        borderRadius:6,
        borderWidth:1,
        borderColor:'gray',
        justifyContent:'flex-end'
    },
    input_info_2_3:{
        flexDirection:'row',
        //marginVertical:10,
       // justifyContent:'space-between',
        //alignItems:'flex-start'
        //marginEnd:30,
        paddingHorizontal:6,
        paddingVertical:6,
        width:'40%',
        borderRadius:6,
        borderWidth:1,
        borderColor:'gray',
        textAlign:'right',
        color:'red'
    },
    btn_ss:{
        justifyContent:'center',
        backgroundColor:'green',
        color:'white',
        borderRadius:30,
        paddingVertical:15,
        textAlign:'center',
        marginHorizontal:60,
        marginBottom:20

    }
    
})
export default DetailsFootball;