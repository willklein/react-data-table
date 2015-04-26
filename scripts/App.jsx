import React from 'react';
import DataTable from './DataTable';
import DataTableHeader from './DataTableHeader';
import DataTableColumn from './DataTableColumn';
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

          <DataTableColumn
            label="Dessert"
            dataKey="dessert"/>

          <DataTableColumn
            label="Calories"
            dataKey="calories"
            align="right"/>

          <DataTableColumn
            label="Fat (g)"
            dataKey="fat"
            align="right"/>

          <DataTableColumn
            label="Carbs (g)"
            dataKey="carbs"
            align="right"/>

          <DataTableColumn
            label="Protein (g)"
            dataKey="protein"
            align="right"/>

          <DataTableColumn
            label="Sodium (mg)"
            dataKey="sodium"
            align="right"/>

          <DataTableColumn
            label="Calcium (%)"
            dataKey="calcium"
            align="right"/>

          <DataTableColumn
            label="Iron (%)"
            dataKey="iron"
            align="right"/>
        </DataTable>
      </div>
    );
  }
}
