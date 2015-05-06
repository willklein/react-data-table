import _ from 'lodash';
import React from 'react/addons';

import DataTableHeader from './DataTableHeader';
import DataTableColumn from './DataTableColumn';

import _style from '../styles/paper.css';

const propTypes = {
  data: React.PropTypes.array.isRequired
};

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this._getColumns()
    };
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
    return _.find(this.props.children, (child) => {
      return child.type.__DataTableHeader__;
    });
  }

  _getColumns() {
    let columns = _.reduce(this.props.children, (collection, child) => {
      if (child.type.__DataTableColumn__) {
        let column = child.props;

        if (column.align) {
          column.additionalProps = {
            style: {
              textAlign: column.align
            }
          };
        }

        collection.push(column);
      }

      return collection;
    }, []);

    if (columns.length) {
      return columns;
    }

    return this._getColumnsFromData();
  }

  _getColumnsFromData() {
    let first = _.first(this.props.data);
    let keys = _.keys(first);

    return _.map(keys, (key) => {
      return {
        dataKey: key,
        label: key
      }
    });
  }

  _getTableHeaders() {
    let columns = this.state.columns;

    return _.reduce(columns, (result, column, key) => {
      result.push(<th key={ `rdt-th-${key}` } { ...column.additionalProps }>{ column.label }</th>);

      return result;
    }, []);
  }

  _getDataRows() {
    return _.map(this.props.data, (item, key) => {
      return (
        <tr key={ `rdt-tr-${key}` }>
          { this._getDataCells(item) }
        </tr>
      );
    });
  }

  _getDataCells(item) {
    return _.map(this.state.columns, (column, key) => {
      return <td key={ `rdt-td-${key}` } { ...column.additionalProps }>{ item[column.dataKey] }</td>;
    });
  }
}

DataTable.propTypes = propTypes;
