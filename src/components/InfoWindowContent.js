// eslint-disable-next-line
import React, { Component } from 'react';
import * as DataAPI from '../utils/DataAPI'

class InfoWindowContent extends Component {

	state = {
		locationsDetail: []
	}

	// componentWillMount(){
 //    		console.log(this.props.locationIds)
		this.props.locationIds.map(locationId => 
			DataAPI.getDetail(locationId)
			.then(data => {//this.setState({locationsDetail: data})
				console.log(data)
				if (data.meta.code !== 200 || data === undefined) {
					console.log("Error DataAPI.getDetail: error_code "+data.meta.code +" error_detail "+ data.meta.errorDetail)
				}
				this.setState({
					locationsDetail: data.response.venue
				})
				//console.log(this.state.locationsDetail)
			})
			.catch(err => console.log("Error DataAPI.getDetail: ", err))
		)
  		


		
	// }

  
	render() {
		return (
			 <div className="aa">
			  
				{/*<div>
				{/*style={{display: inline-block; overflow: auto; max-height:654px;max-width;654px}}<div>
				{/*style={{display: inline-block; overflow: auto; max-height:654px;max-width;654px}}*/}
					<h4>{this.props.selectedPlaceName}</h4>
					<p>{this.props.selectedPlaceAddress}</p>
					<p>"Hello World"</p>

				
					
			
			
			  
			</div>
		);
	}
}

export default InfoWindowContent;

//------------------------------- get DataAPI.getDetail
  // DataAPI.getAll()   
  //       .then(res => {
  //           if (res.meta.code === 200) {
  //               console.log(res)
  //               return (res.response.groups[0].items);
  //           }
  //       }) 


 // .then(listVenues => {
 //            console.log(listVenues)
 //            console.log(listVenues[0].venue.id)
 //            let listVenuesIds =[]
 //            listVenues.map(listVenue => listVenuesIds.push(listVenue.venue.id))
 //            //listVenues.map(listVenue => {
 //                // Fetch detail of each venue by id
 //            //    console.log(listVenue.venue.id)
 //            //    DataAPI.getDetail(listVenue.venue.id)
 //            //listVenuesId.push()
 //            console.log(listVenuesIds)
 //            return listVenuesIds

 //        })
 //        .then(ListVenueIds => {
 //            //console.log(ListVenueIds)
 //            //let allVenuesDetails = []
 //                // if(venueDetails.meta.code !== 200 || venueDetails === undefined) {
 //                //     console.log("Error DataAPI.getDetail: "+venueDetails.meta.code +" "+ venueDetails.meta.errorDetail)
 //                // }
 //            ListVenueIds.map(venueId => DataAPI.getDetail(`${venueId}`)
 //                .then (venueDetails => console.log(venueDetails)
 //                //     if(venueId.meta.code !== 200 || venueId === undefined) {
 //                //      console.log("Error DataAPI.getDetail: "+venueId.meta.code +" "+ venueId.meta.errorDetail)
 //                // }
 //                    )
				
 //                )
			
 //           // allVenuesDetails.push(venueDetails)
 //            //console.log(allVenuesDetails)
 //        }) 
 //        .catch(err => console.log(err))