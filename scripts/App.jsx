import React from 'react';
import DataTable from './DataTable';
import DataTableHeader from './DataTableHeader';
import data from './data.js';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <DataTable data={ data }/>

        <DataTable data={ data }>
          <DataTableHeader>
            Nutrition
          </DataTableHeader>
        </DataTable>
      </div>
    );
  }
}
