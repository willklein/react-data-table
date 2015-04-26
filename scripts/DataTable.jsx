import _ from 'lodash';
import React from 'react/addons';

import DataTableHeader from './DataTableHeader';

import _style from '../styles/paper.css';

export default class DataTable extends React.Component {
  propTypes: {
    data: React.PropTypes.array.isRequired
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
    let first = _.first(this.props.data);
    let keys = _.keys(first);

    return _.reduce(keys, (result, n, key) => {
      result.push(<th>{ n }</th>);
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
    return _.map(item, (value) => {
      return <td>{ value }</td>;
    });
  }
}
