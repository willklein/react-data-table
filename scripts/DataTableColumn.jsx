import React from 'react';

const propTypes = {
  align: React.PropTypes.string,
  dataKey: React.PropTypes.string.isRequired,
  label: React.PropTypes.string
};

export default class DataTableColumn extends React.Component {
  render() {
    return null;
  }
}

DataTableColumn.propTypes = propTypes;

DataTableColumn.__DataTableColumn__ = true;
