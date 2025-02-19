
import React, { Component } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import MapWrapped from './MapWrapped'
import MapPlaces from './MapPlaces'
//import '../styles/Option.css'
import axios from "axios"
import "../Styles/Home.css"
import Directions from "././Directions/DirectionsIndex";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import AddTrip from './Home/AddTrip';
import MyTrip from './MyTrips';
import { KeyObject } from 'crypto';

import Axios from 'axios';
import NavBarHotPlaces from "./NavBarHotPlaces"
import { observer, inject } from 'mobx-react'
@inject("user")
@observer


class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      address: '',
      latLng: [],
      currentAddress: [],
      type: {
        Food: false,
        Extream: false,
        Nature: false,
        Art: false,
        Night: false,
        Beauty: false
      },
      popup: false,
      top: [],
      popup2: false,
      user: {},
      trip: false
    }
  }


  getUser = async () => {
    const userName = localStorage.getItem("user")
    console.log(userName);

    let data = await axios.get(`http://localhost:8080/user/${userName}`)
    let user = data.data
    this.setState({ user: user }, function () {
      console.log(this.state.user);

    })
    if (this.state.user.Trip) {
      this.setState({ trip: true }, function () {
        console.log(this.state.trip);

      })

    }
    else {
      this.setState({ trip: false }, function () {
        console.log(this.state.trip);

      })
    }

  }




  popup = () => {
    this.setState({ popup: !this.state.popup })
  }
  changeType = (interest) => {
    console.log(interest);
    console.log(this.state.type);



    for (let i in this.state.type) {
      console.log(i)
      if (i == interest) {
        console.log(i);
        this.state.type[i] = true
        console.log(this.state.type);

      }


    }

  }

  handleChange = address => {
    this.setState({ address }, function () { })
  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        // let data = [...this.state.latLng]
        // data.push(latlng)
        this.setState({ latLng: latlng }, function () {
          console.log(this.state)

        })
        console.log('Success', latlng)
      })
      .catch(error => console.error('Error', error))
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          let a = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.setState({
            currentAddress: a
          }, function () {
            console.log(this.state.currentAddress)
          })
        }
      )
    }
  }


  async componentDidUpdate() {
    console.log(this.props.user.user)
    let Test = this.props.user.user
    console.log(Test);


  }

  moveToComp = () => {
    console.log("here");

    window.location.pathname = '/MyTrip'

  }
  getNav = async () => {
    console.log(this.state);
    let a = await Axios.put("http://localhost:8080/GooglePlaces", this.state)
    console.log(a.data);

    this.setState({ top: a.data }, function () {
      console.log(this.state.top);

    })
    this.setState({ popup2: !this.state.popup2 }, function () { })


  }
  componentDidMount() {
    this.getUser()
  }
  render() {
    this.getGeoLocation()
    console.log(this.props.user.getTop())

    return (
      <div id="all" >

        {this.props.user.top ? <Directions data={this.props.user.top} /> : null}
      </div>
    );
  }
}
//data = {this.state.top}



export default Test;

