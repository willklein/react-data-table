import _ from 'lodash';
import React from 'react/addons';

import DataTableHeader from './DataTableHeader';
import DataTableColumn from './DataTableColumn';

import _style from '../styles/paper.css';

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this._getColumns()
    };
  }

  _getColumns() {
    let columns = [];
    React.Children.forEach(this.props.children, (child, index) => {
      if (child == null) {
        return;
      }

      if (child.type.__DataTableColumn__) {
        columns.push(child);
      }
    });

    if (!columns.length) {
      let first = _.first(this.props.data);
      let keys = _.keys(first);

      return _.map(keys, (key) => {
        return {
          dataKey: key,
          label: key
        }
      });
    }

    return _.map(columns, (column) => {
      return {
        dataKey: column.props.dataKey,
        label: column.props.label
      };
    });
  }

  render() {
    return (
      <div className="rdt-container">
        { this._getHeader() }
        <table className="rdt-table">
          <thead>
            <tr>
              { this._getTableHeaders() }
            </tr>
          </thead>
          <tbody>
            { this._getDataRows() }
          </tbody>
        </table>
      </div>
    );
  }

  _getHeader() {
    let header;

    // console.log(React.children.forEach);
    React.Children.forEach(this.props.children, (child, index) => {
      if (child == null) {
        return;
      }

      if (child.type.__DataTableHeader__) {
        header = child;
      }
    });

    // let header = _.find(this.props.children, (child) => {
    //   return child.type === DataTableHeader.type;
    // });

    return header;
  }

  _getTableHeaders() {
    let columns = this.state.columns;

    return _.reduce(columns, (result, column, key) => {
      result.push(<th>{ column.label }</th>);
      return result;
    }, []);
  }

  _getDataRows() {
    return _.map(this.props.data, (item) => {
      return (
        <tr>
          { this._getDataCells(item) }
        </tr>
      );
    });
  }

  _getDataCells(item) {
    return _.map(this.state.columns, (column) => {
      return <td>{ item[column.dataKey] }</td>;
    });
  }
}

DataTable.propTypes = {
  data: React.PropTypes.array.isRequired
};
