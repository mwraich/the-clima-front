import { observable, action } from "mobx";
import axios from "axios";

class WeatherStore {
  @observable time = new Date().toISOString();
  @observable weather = null;
  @observable weatherError = false;
  @observable messages = [];

  @action
  setMessages = messages => {
    this.messages = messages;
  };


  @action
  fetchWeatherData = async city => {
    try {
      const response = await axios.get
      ("https://abnormal-weather-api.herokuapp.com/cities/search",
        {
        params: { city }
        }
      );

      this.weather = response.data;
    } catch(error) {
        this.weatherError = true
    }
  };
}

export default new WeatherStore();
