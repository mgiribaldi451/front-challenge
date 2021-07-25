import React from "react";
import Grilla from "./views/vget";
import Metricas from "./views/metrics";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actual: "getServers",
    };
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <nav className="navbar">
            <ul className="navbar__lista">
              <li className="navbar__item">
                <button onClick={() => this.setState({ actual: "getServers" })}>
                  Home
                </button>
              </li>
              <li className="navbar__item">
                <button onClick={() => this.setState({ actual: "getMetricas" })}>
                  Top 3 Server Alerts
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="bodyContainer">
          {this.state.actual === "getServers" && <Grilla  />}
          
          {this.state.actual === "getMetricas" && <Metricas />}
        </div>
      </div>
    );
  }
}

export default App;
