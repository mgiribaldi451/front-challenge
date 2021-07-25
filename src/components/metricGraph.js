import React from 'react';
import "./metric.css"
import CustomStore from "devextreme/data/custom_store";
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
} from 'devextreme-react/pie-chart';


function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  
  const pieChartDataSource = new CustomStore({
    key: "ID",
    loadMode: "raw",
    load: () => {
      return fetch("api/metrics")
        .then(handleErrors)
        .then((response) => response.json())
        .catch((err) => {
          throw new Error(err)
        });
    }, paginate: false
  });

console.log("datasource pieChart: ", pieChartDataSource);

class Getmetricas extends React.Component {
  constructor(props) {
    super(props);

    this.pointClickHandler = this.pointClickHandler.bind(this);
    this.legendClickHandler = this.legendClickHandler.bind(this);
  }

  customLabel = arg => {
    return `${arg.valueText} (${arg.percentText})`}
  render() {
    return (
      <PieChart        
        legend={{font:{color:'#fff', size:20}}}
        dataSource={pieChartDataSource}
        palette="Office"
        title={{text:'Top 3 Servers Alerts', font:{color:'#fff'}}}
        onPointClick={this.pointClickHandler}
        onLegendClick={this.legendClickHandler}    
      >
        <Series 
          argumentField="name"
          valueField="count"        
        >
          <Label visible={true} customizeText={this.customLabel}>
            <Connector visible={true} width={1}  />
          </Label>
        </Series>

        <Size width={1000} />
   
      </PieChart>
    );
  }

  pointClickHandler(e) {
    this.toggleVisibility(e.target);
  }

  legendClickHandler(e) {
    let arg = e.target;
    let item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    this.toggleVisibility(item);
  }

  toggleVisibility(item) {
    item.isVisible() ? item.hide() : item.show();
  }
}

export default Getmetricas;