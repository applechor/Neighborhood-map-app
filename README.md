# Neighborhood Map (React) project
This is a single page application using React showing a map of coffee shops in Chaingmai, Thailand. The project was bootstrapped with [`create-react-app`](https://github.com/facebook/create-react-app). It was implemented with [`google-maps-react`](https://www.npmjs.com/package/google-maps-react) package (provides a set of React components wrapping underlying Google Maps API instances) and use third-party API that is [`Foursquare API`](https://developer.foursquare.com/) to get data about locations.

## Development mode
Runs the app in the development mode:
* clone this respository and cd to directory which has this respository.
* install all project dependencies with `npm install`. 
* start the development server with `npm start`.
* launch the site in your browser at localhost:3000.

## Deployment mode
Builds the app for production to the build folder:
* run `npm run build`.
* serve -s build.
* navigate to localhost:5000.

## Inside Application:
### Development Steps
1. Obtain a Google Maps API Key and write code to add a full-screen map to my page using the Google Maps API.
2. Write code to display map markers and info windows identifying Top 15 of coffee shops in Chaingmai, Thailand. My app will display those locations by default when the page is loaded.
3. Implement a list view of the set of locations I have defined.
4. Provide a filter option (e.g., a text field) that uses an input field to filter both:
	* The list view
	* The map markers displayed by default on load. The list view and the markers should update accordingly in real time.
5. Add third-party APIs (e.g., Foursquare API) to provide information when a map marker or list view entry is clicked.

### Functionality
including: 
* Map markers to identify popular locations that are coffee shops in Chaingmai, Thailand.
* A search function to easily discover these locations.
* A list view to support simple browsing of all locations. 
* A search input text and a list view are on the left-side panel which has a toogle button to open or close that panel.
* The search input text should filter the list view and the markers on the map.
* Selecting a location via list item or map marker should cause the map marker to bounce. This indicates that the location has been selected, and an associated info window should open above the map marker with additional information.
* Clearing map, search input text, and list view, to be default should click clear search button or empty search input text.
* Closing info Window or stop bouncing marker, you should click wherever on map or click clear search button.
* Implement third-party APIs that provide additional information about each of these locations.

### Asynchronicity and Error Handling
All data API's used in the application should load asynchronously, and errors should be handled gracefully. In case of error (e.g., a situation in which a third party API does not return the expected result or Google Maps API error), A message is displayed that notifies the user that the data cannot be loaded.

## Dependencies
* create-react-app
* google-maps-react
* FourSquare API

## Reference resources
* [Google Map React Component](https://www.npmjs.com/package/google-maps-react)
* [How to call fitBounds()](https://github.com/fullstackreact/google-maps-react/issues/63)
* [How to get all markers in google-maps-react](https://stackoverflow.com/questions/51579671/how-to-get-all-markers-in-google-maps-react)
* [animate marker when click on a list item google-maps-react](https://stackoverflow.com/questions/51160344/animate-marker-when-click-on-a-list-item-google-maps-react)
