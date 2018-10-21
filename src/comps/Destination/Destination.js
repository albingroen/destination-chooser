import React, { Component } from "react";
import cities from "cities.json";
import "./Destination.css";

class Destination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      cityContainer: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
      cityContainer: this.state.value.length > 0 ? true : false
    });
  }

  render() {
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
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Where do you want to go?"
          />
        </div>

        {this.state.cityContainer && (
          <ul>
            {seCities &&
              seCities.length > 0 &&
              seCities
                .filter(city => {
                  return city.name
                    .toUpperCase()
                    .includes(this.state.value.toUpperCase());
                })
                .map((city, index) => {
                  return (
                    <li
                      key={(city, index)}
                      onClick={() => {
                        this.props.setDestination(city);
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
