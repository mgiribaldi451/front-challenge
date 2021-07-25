import React from "react";
import CustomStore from "devextreme/data/custom_store";
import DataGrid, {
  Column,
  Pager,
  Paging,
  SearchPanel,
  FilterRow,
  FilterPanel

} from "devextreme-react/data-grid";

const pageSizes = [15, 30, 50, 60];

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const customDataSource = new CustomStore({
  key: "ID",
  loadMode: "raw",
  load: () => {
    return fetch("api/get-servers/")
      .then(handleErrors)
      .then((response) => response.json())
      .catch((err) => {
        throw new Error(err)
      });
  },
});

console.log("datasource: ", customDataSource);
class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.onContentReady = this.onContentReady.bind(this);
  }


  render() {
    return (
      <DataGrid
        dataSource={customDataSource}
        allowColumnReordering={true}
        showBorders={true}
        onContentReady={this.onContentReady}
        hoverStateEnabled={true}
        headerFilter={{ visible: true }}
        
      >
        <FilterRow visible={true} />
          <FilterPanel filterEnabled={true} />

        <SearchPanel visible={true} highlightCaseSensitive={true} style={{alignContent:"rigth;"}}/>
        
        <Column
          dataField="server"
          caption="Server"
          dataType="string"
          format="currency"
          alignment="center"
        />

        <Column
          dataField="description"
          caption="Description"
          dataType="string"
          format="string"
          alignment="center"
          width={700}
        />
        <Column
          dataField="created_at"
          caption="Date"
          dataType="Date"
          format="date"
          alignment="center"
        />

        <Column
          dataField="server_type"
          dataType="string"
          format="string"
          alignment="center"
        />
        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} showNavigationButtons={true}/>
        <Paging defaultPageSize={20} />
      </DataGrid>
    );
  }

  onContentReady(e) {
    if (!this.state.collapsed) {
      e.component.expandRow(["EnviroCare"]);
      this.setState({
        collapsed: true,
      });
    }
  }
}

export default Grid;
