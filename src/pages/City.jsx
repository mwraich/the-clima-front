import React from "react";
import axios from "axios";
import { Motion, spring } from "react-motion";
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
    time: new Date().toISOString(),
    showForecast: false
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

    const backgroundStyles = {
      backgroundImage: `url(${weather.image_url})`
    }

    return (
      <CityContainer>
        <CityBackground style={backgroundStyles} />
        <Nav city={weather.city} />
        <Temperature temp={weather.current.temp} city={weather.city}/>
        <Time time={time}/>
        <Today date={weather.current.date}/>

        {/* Motion does not want a div, it wants a function, so pass a
        function that returns a div */}
        <Motion
          defaultStyle={{x: -200, opacity: 0}}
          style={{
            x: spring(0, { stiffness: 170, damping: 10 }),
            opacity: spring(1, {stiffness: 30, damping: 26})
          }}
        >
          {style => (
            <Forecast
              style={{
                transform: `translateX(${style.x}px)`,
                opacity: style.opacity
            }}
            >
              {weather.forecast.map(daily => (
              <Daily
                key={daily.date}
                date={daily.date}
                low={daily.low}
                high={daily.high}/>
              ))}
            </Forecast>
          )}
        </Motion>
      </CityContainer>
    );
  }
}
