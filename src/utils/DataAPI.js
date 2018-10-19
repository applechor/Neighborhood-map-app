// eslint-disable-next-line

/*======================FourSquare API===========================*/
const api = "https://api.foursquare.com/v2/venues"
const client_ID = "ETBUYYTEGDY4WCF1IZXYZJVILWVA5NTLHGQ0WHA13OL2QGA2"
const client_secret = "MJRDFQ43T0FSXPBBFA535VVJVKLUFATMY5IHP2DOFTOKZSYP"
const version = "20180708"
const latlang = "18.787747,98.993128"
const query = "coffee shop"
const nearPlace = "Chiang Mai, Thailand"
const number_of_results = "15"

// fetch venues data in details by passing venueID
export const getDetail = (venueId) =>
  	fetch(`${api}/${venueId}?client_id=${client_ID}&client_secret=${client_secret}&v=${version}`)
    	.then(res => res.json())
    	.then(data => data)

// fetch lists of venue data that spcificed place and query
export const getAll = () =>
  	fetch(`${api}/explore?ll=${latlang}&query=${query}&near=${nearPlace}&limit=${number_of_results}&client_id=${client_ID}&client_secret=${client_secret}&v=${version}`)
    	.then(res => res.json())
    	.then(data => data)
