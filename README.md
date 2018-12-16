# Destination-Chooser (React + Google Maps)

Destination finder with Google Maps and React to get some basic meta data about the destination.

### Please feel free to fork and create a pull request with any enhancement possible!

## Built with

- React
- [React-google-maps](https://github.com/tomchentw/react-google-maps/)
- SASS/CSS
- Recompose

Default settings in project limits available cities to Swedish cities to enhance initial performance. This can be changed in `comps/Destination/index.js` though.

## Installing

    git clone https://github.com/tomchentw/react-google-maps/

Enter project root and run

    npm install

Create a config.js file with your **Google Maps API-key** like this

```javascript
// config.js
module.exports = "YOUR API KEY HERE";
```

Now run project by entering

    npm start
