import React from "react";

import { TweenMax } from "gsap"; //Has timelinelite etc, for animations one after another
import axios from "axios";
import PlacesAutocomplete from "react-places-autocomplete";
// import { inject, observer } from "mobx-react";
import {
  Container, // Wrapper (div) for all the content in this component
  Logo, // The logo image (img)
  Form, // Form wrapping the search
  Label, // Label for the search input
  NearbyCities, // List (ul) which will show nearby cities
  NearbyCity, // List item (li) showing the nearby city
  NearbyLink, // Making the city clickable (a)
  autoComplete // some styles for the autocomplete component
} from "../elements/home";

import logo from "../images/theclima.svg";

export default class Home extends React.Component {
  state = {
    searchValue: "",
    nearby: []
  };

  componentDidMount() {
    TweenMax.fromTo(
      this.logoRef,
      1,
      {opacity: 0, scale: 0.5},
      {opacity: 1, scale: 1}
    );
    // this id, for 1 s, change to this
    this.loadNearby();
  }
  // navigator is global term for browser
  loadNearby = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
      {
        const { latitude, longitude } = position.coords;
        // same as this but more concise const latitude = position.coords.latitude
        this.fetchNearbyCities(latitude, longitude);
        // this.fetchNearbyCities(43, -74); incase geolocation not working
      });
    }
  };

  fetchNearbyCities = async (latitude, longitude) => {
    const response = await axios.get(
      "https://abnormal-weather-api.herokuapp.com/cities/nearby",
      { params: { latitude, longitude } }
    );

    this.setState({
      nearby: response.data
    })
  };
// Use innerRef because you want something within the thing you're referencing
// Otherwise would use ref
  render() {
    return (
      <Container>
        <Logo
          innerRef={ element => {
          this.logoRef = element
        }}
         src={logo} />

        <Form>
          <Label>Search For Your City</Label>
          <PlacesAutocomplete inputProps={{
            value: this.state.searchValue,
            onChange: newValue => {
              this.setState({
                searchValue: newValue
              });
            }
          }}
          styles={autoComplete}
          onSelect={selectedValue => {
            this.props.history.push(`/${selectedValue}`)
          }}
          />
        </Form>

        <NearbyCities>
          {this.state.nearby.map((city) => (
            <NearbyCity key={city.id}>
              <NearbyLink to={`/${city.name}`}>{city.name}</NearbyLink>
            </NearbyCity>
          ))}
        </NearbyCities>
      </Container>
    );
  }
}
