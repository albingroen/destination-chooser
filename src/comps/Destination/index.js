import React, { Component } from "react";
import cities from "cities.json";
import "./style.css";

class Destination extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      cityContainer: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
      cityContainer: true
    });
  }

  render() {
    const { setDestination } = this.props;
    const { value, cityContainer } = this.state;

    // Limiting cities to only cities in Sweden to improve performance
    const seCities = [];

    cities
      .filter(city => {
        return city.country === "SE";
      })
      .map(city => {
        return seCities.push(city);
      });

    return (
      <div className="destinationContainer">
        <div>
          <input
            type="text"
            value={value}
            onChange={this.handleChange}
            placeholder="Where do you want to go?"
          />
        </div>

        {cityContainer && (
          <ul>
            {seCities &&
              seCities.length > 0 &&
              seCities
                .filter(city => {
                  return city.name.toUpperCase().includes(value.toUpperCase());
                })
                .map((city, index) => {
                  return (
                    <li
                      key={(city, index)}
                      onClick={() => {
                        setDestination(city);
                        this.setState({ value: "", cityContainer: false });
                      }}
                    >
                      {city.name}
                    </li>
                  );
                })}
          </ul>
        )}
      </div>
    );
  }
}

export default Destination;
