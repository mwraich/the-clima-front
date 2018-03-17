import React from "react";
import axios from "axios";
// import data from "../sample-data";

import Nav from "../components/Nav";
import Temperature from "../components/Temperature";
import Time from "../components/Time";
import Today from "../components/Today";
import Daily from "../components/Daily";
// import Chat from "../components/Chat";

import {
  Loading, // small div to wrap text when loading data
  CityContainer, // wraps the entire content in this component
  CityBackground, // displays a background image covering whole page
  Forecast // Wrapper for when showing the Daily components
} from "../elements/city";

export default class City extends React.Component {
  state = {
    weather: null,
    weatherError: false,
    time: new Date().toISOString()
  };

  // lifecyclefunction, similar to rails before_save, after_save callbacks
  // when want to change value of state call setState
  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: new Date().toISOString()
      });
    }, 1000); //this is 1s, 1000ms

    this.fetchWeatherData();
  }

  fetchWeatherData = async () => {
    try {
      const response = await axios.get
      ("https://abnormal-weather-api.herokuapp.com/cities/search",
        {
        params: { city: this.props.match.params.city }
        }
      );
      this.setState({
        weather: response.data
      });
    } catch(error) {
      this.setState({
        weatherError: true
      });
    }
  };

  render() {
    const { weather, time } = this.state;
    if (this.state.weatherError) {
      return <Loading>Whoops...City Not found</Loading>
    }
    if (!this.state.weather) {
      return (
        <Loading>Loading...</Loading>
      )
    }

    // const backgroundStyles = {backgroundImage:}
    return (
      <CityContainer>
        <CityBackground />

        <Nav />
        <Temperature temp={weather.current.temp} city={weather.city}/>
        <Time time={time}/>
        <Today date={weather.current.date}/>
        <Forecast>
          {weather.forecast.map(daily => (
          <Daily
            key={daily.date}
            date={daily.date}
            low={daily.low}
            high={daily.high}/>
          ))}
        </Forecast>
      </CityContainer>
    );
  }
}
