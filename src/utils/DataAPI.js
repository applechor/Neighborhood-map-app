// eslint-disable-next-line
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
const client_ID = "0PZMLR4C1VQ5RTO3S3GXTYKBXNFIC0DUURUME32CNGMV1FYQ"//"VXXKOU23M1YV1HW40RU3RVWRJ5JXA50MH5AD51M15W5SPB3Z"
const client_secret = "HU11MC3YLS3HUR1SYXZGB0FFKBX5SD2TKRAWYADP1F21KQ3E"//"4UG11WJJ0S5A1H3NXL42T0ORH4E4VY4PUH25VVJUTKMPOCXY"
const version = "20180323"//"20180930"
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
//https://api.foursquare.com/v2/venues/4ceb5edaf86537047e7ec2c4?client_id=VXXKOU23M1YV1HW40RU3RVWRJ5JXA50MH5AD51M15W5SPB3Z&client_secret=4UG11WJJ0S5A1H3NXL42T0ORH4E4VY4PUH25VVJUTKMPOCXY&v=20180930

export const getDetail = (venueId) =>
  	fetch(`${api}/${venueId}?client_id=${client_ID}&client_secret=${client_secret}&v=${version}`)
    	.then(res => res.json())
    	.then(data => data)
    	//.catch(err => console.log(err))
    	   //      .then(response => response.json()
        //   .then(text => ({
        //     json: text,
        //     meta: response
        //   }))
        // )
        // .then(({ json, meta }) => {
        //   return json
        // })


export const getAll = () =>
  	fetch(`${api}/explore?ll=${latlang}&query=${query}&near=${nearPlace}&limit=${number_of_results}&client_id=${client_ID}&client_secret=${client_secret}&v=${version}`)
    	.then(res => res.json())
    	.then(data => data)



  // fetch(`${api}/venues/search?ll=27.9158175,34.3299505&intent=browse&radius=10000&query=resorts&client_id=ETBUYYTEGDY4WCF1IZXYZJVILWVA5NTLHGQ0WHA13OL2QGA2&client_secret=MJRDFQ43T0FSXPBBFA535VVJVKLUFATMY5IHP2DOFTOKZSYP&v=20180708`)
  //   //.then(handleErrors)
  //   .then(res => res.json())
  //   .then(data => console.log(data.response.venues))