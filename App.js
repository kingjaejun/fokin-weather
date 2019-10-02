import React from "react";
import Loading from "./Loading";
import * as Location from "expo-location";
import {Alert} from "react-native";
import axios from "axios";
import Weather from "./Weather";
const API_KEY = "f0aa3928b28b33ee79da4dc983590f6c";

export default class extends React.Component{
  state = {
    isLoading:true
  }
  getWeather = async(latitude, longitude) =>{
    const {
      data :{
      main:{temp}, 
      weather
      }
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    this.setState({
      isLoading:false,
      condition: weather[0].main,
      temp 
    });
  };
  getLocation = async() => {
    try{
      await Location.requestPermissionsAsync();
      const {
        coords: {latitude, longitude} 
      } = await Location.getCurrentPositionAsync();
      //Send to API and get weather
      this.getWeather(latitude, longitude);
    }catch(error){
       Alert.alert("Can't find you.", "Where are you?");
    }
  };
  componentDidMount(){
    this.getLocation();
  }
    
  render(){
      const { isLoading,temp,condition } = this.state;
      return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
  }
}

