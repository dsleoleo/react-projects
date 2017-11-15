import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
//import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const myDateFormat = "YYYY-MM-DD";

class PickDate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: 
        props.isStart ? 
          props.data.start_date ? moment(props.data.start_date, myDateFormat) : moment() :
          props.data.end_date ? moment(props.data.end_date, myDateFormat) : moment()
    };
    
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
    console.log(this.props.isStart + ' ' + this.state.startDate.utc().format("YYYY-MM-DD"));
    if (this.props.isStart) {
      this.props.data.start_date = date.utc().format("YYYY-MM-DD");
    }
    else {
      this.props.data.end_date = date.utc().format("YYYY-MM-DD");
    }
  }

  render() {
    return <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange.bind(this)}
        monthsShown={2}
    />;
  }
}

PickDate.propTypes = {
  data: PropTypes.object.isRequired,
  isStart: PropTypes.bool.isRequired
};

export default PickDate