// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/*======================FourSquare API===========================*/
const api = "https://api.foursquare.com/v2/venues"
const client_ID = "VXXKOU23M1YV1HW40RU3RVWRJ5JXA50MH5AD51M15W5SPB3Z"
const client_secret = "4UG11WJJ0S5A1H3NXL42T0ORH4E4VY4PUH25VVJUTKMPOCXY"
const version = "20180930"
const latlang = "18.787747,98.993128"
const query = "coffee"
const nearPlace = "Chiang Mai, Thailand"
const number_of_results = "3"

// function handleError(response) {
// 	if(!response.ok) {
// 		throw Error(response.statusText?response.statusText:"unknown network error")
// 	}
// 	return response.json();
// }


export const getDetail = (venueId) =>
  	fetch(`${api}/${venueId}?client_id=${client_ID}&client_secret=${client_secret}&v=${version}`)
    	.then(res => res.json())
    	.then(data => data)
    	//.catch(err => console.log(err))

export const getListAll = () =>
  	fetch(`${api}/explore?ll=${latlang}&query=${query}&near=${nearPlace}&limit=${number_of_results}&client_id=${client_ID}&client_secret=${client_secret}&v=${version}`)
    	.then(res => res.json())
    	.then(data => data)



  // fetch(`${api}/venues/search?ll=27.9158175,34.3299505&intent=browse&radius=10000&query=resorts&client_id=ETBUYYTEGDY4WCF1IZXYZJVILWVA5NTLHGQ0WHA13OL2QGA2&client_secret=MJRDFQ43T0FSXPBBFA535VVJVKLUFATMY5IHP2DOFTOKZSYP&v=20180708`)
  //   //.then(handleErrors)
  //   .then(res => res.json())
  //   .then(data => console.log(data.response.venues))