import React from 'react/addons';

const propTypes = {
  checked: React.PropTypes.bool,
  onClick: React.PropTypes.func
};

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let checked = this.props.checked;
    let props = {
      className: 'checkbox' + (checked ? ' checked' : ''),
      onClick: this.props.onClick
    };

    return (
      <div { ...props }>
        { checked ? this._getChecked() : this._getUnchecked() }
      </div>
    );
  }

  _getChecked() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path className="svg-path-fill-none" d="M0 0h24v24H0z"/>
          <path className="svg-path" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }

  _getUnchecked() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path className="svg-path" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
          <path className="svg-path-fill-none" d="M0 0h24v24H0z"/>
      </svg>
    );
  }
}

Checkbox.propTypes = propTypes;
