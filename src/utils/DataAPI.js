// eslint-disable-next-line

/*======================FourSquare API===========================*/
const api = "https://api.foursquare.com/v2/venues"
//const client_ID = "VXXKOU23M1YV1HW40RU3RVWRJ5JXA50MH5AD51M15W5SPB3Z"
//const client_secret = "4UG11WJJ0S5A1H3NXL42T0ORH4E4VY4PUH25VVJUTKMPOCXY"
//const version = "20180930"
const client_ID ="0PZMLR4C1VQ5RTO3S3GXTYKBXNFIC0DUURUME32CNGMV1FYQ" // from other1
const client_secret = "HU11MC3YLS3HUR1SYXZGB0FFKBX5SD2TKRAWYADP1F21KQ3E"// from other1
const version ="20180323"// from other1
//const client_ID = "ETBUYYTEGDY4WCF1IZXYZJVILWVA5NTLHGQ0WHA13OL2QGA2"// from other2
//const client_secret = "MJRDFQ43T0FSXPBBFA535VVJVKLUFATMY5IHP2DOFTOKZSYP"// from other2
//const version = "20180708"// from other2
const latlang = "18.787747,98.993128"
const query = "coffee shop"
const nearPlace = "Chiang Mai, Thailand"
const number_of_results = "13"

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
