import React, { Component } from "react";
import Grid from "../../components/Grid";
import { getServers } from "../../services/api";

class Grilla extends Component {

  componentDidMount() {
    console.log(
      "este console log se va a renderizar cuando se monte el componente VGET" ,
    );
    getServers().then(data=>console.log("getserver", data))
    
  }

  render() {
    return (
      <div>
        <Grid />
      </div>
    );
  }
}

export default Grilla;
