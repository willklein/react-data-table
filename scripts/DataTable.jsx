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
      allRowsSelected: false,
      columns: this._getColumns(),
      data: props.data,
      selectedRows: []
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
    }, [
      <th>{ this._getCheckbox(this._selectAllRows, null, this.state.allRowsSelected) }</th>
    ]);
  }

  _getDataRows() {
    let data = this.props.data;

    return _.map(data, (item, key) => {
      let selected = _.contains(this.state.selectedRows, key);
      let props = {
        className: selected ? 'selected' : '',
        key: `rdt-tr-${key}`
      };

      return (
        <tr { ...props }>
          <td>{ this._getCheckbox(this._selectRows, key, selected) }</td>
          { this._getDataCells(item) }
        </tr>
      );
    });
  }

  _selectRows(key, selected) {
    let rows = this.state.selectedRows;

    if (selected) {
      rows = _.filter(rows, (k) => {
        return k !== key;
      });
    } else {
      rows.push(key);
    }

    this.setState({ selectedRows: rows });
  }

  _selectAllRows() {
    let rows;
    let data = this.props.data;
    let allRowsSelected = this.state.allRowsSelected;

    if (allRowsSelected) {
      rows = [];
    } else {
      rows = _.map(data, (item, key) => {
        return key;
      });
    }

    this.setState({
      allRowsSelected: !allRowsSelected,
      selectedRows: rows
    });
  }

  _getCheckbox(selectRows, key, selected) {
    let props = {
      className: selected
          ? 'svg-ic_check_box_24px svg-ic_check_box_24px-dims'
          : 'svg-ic_check_box_outline_blank_24px svg-ic_check_box_outline_blank_24px-dims',
      onClick: _.bind(selectRows, this, key, selected)
    };

    return <div { ...props }></div>;
  }

  _getDataCells(item) {
    return _.map(this.state.columns, (column, key) => {
      return <td key={ `rdt-td-${key}` } { ...column.additionalProps }>{ item[column.dataKey] }</td>;
    });
  }
}

DataTable.propTypes = propTypes;
