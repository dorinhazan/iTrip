import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../Styles/NavBarHotPlaces.css'
import Axios from 'axios';
class NavBarHotPlaces extends Component { //now will be the navBar
   constructor() {
       super()
       this.state = {
       }
   }
   componentDidMount = async () => {
    const userName = localStorage.getItem("user")
    let data = await Axios.get(`/user/${userName}`)
    let user = data.data
    let trip =  this.props.data 
    let index = user.Trips.length
    trip.index= index
     user.Trips.push(trip)    
    let a = await Axios.put(`/addTrip/${userName}`, user)
    return(a.data)
      }
   
   render() {
       return (
           <div className='all'>
            {this.props.data.top.map(d =>  <div>{d.name}</div>)}
           </div>
       );
   }
}
export default NavBarHotPlaces;