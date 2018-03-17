import React from "react";

// import data from "../sample-data";

import Nav from "../components/Nav";
import Temperature from "../components/Temperature";
// import Time from "../components/Time";
// import Today from "../components/Today";
// import Daily from "../components/Daily";
// import Chat from "../components/Chat";

import {
  Loading, // small div to wrap text when loading data
  CityContainer, // wraps the entire content in this component
  CityBackground, // displays a background image covering whole page
  Forecast // Wrapper for when showing the Daily components
} from "../elements/city";

export default class City extends React.Component {
  state = {
    temp: -7,
    city: "Toronto",
    time: new Date().toISOString()
  };

  render() {
    return (
      <CityContainer>
        <CityBackground />
        <Nav />
        <Temperature temp={this.state.temp} city={this.state.city}/>
      </CityContainer>
    );
  }
}
