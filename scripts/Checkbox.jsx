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
    let props = {
      className: this.props.checked
          ? 'svg-ic_check_box_24px svg-ic_check_box_24px-dims'
          : 'svg-ic_check_box_outline_blank_24px svg-ic_check_box_outline_blank_24px-dims',
      onClick: this.props.onClick
    };
    return <div { ...props }></div>;
  }
}

Checkbox.propTypes = propTypes;
