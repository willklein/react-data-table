import React from 'react';

export default class DataTableHeader extends React.Component {
  render() {
    return (
      <div className="rdt-header">
        { this.props.children }
      </div>
    );
  }
}

DataTableHeader.__DataTableHeader__ = true;
