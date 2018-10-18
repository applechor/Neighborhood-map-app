// eslint-disable-next-line

/*======================FourSquare API===========================*/
const api = "https://api.foursquare.com/v2/venues"
const client_ID = "VXXKOU23M1YV1HW40RU3RVWRJ5JXA50MH5AD51M15W5SPB3Z"
const client_secret = "4UG11WJJ0S5A1H3NXL42T0ORH4E4VY4PUH25VVJUTKMPOCXY"
const version = "20180930"
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
