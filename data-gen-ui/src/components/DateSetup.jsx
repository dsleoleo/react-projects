import React from 'react'
import PropTypes from 'prop-types';
import { Grid, Image, Label, Divider, Segment } from 'semantic-ui-react';
import PickDate from './PickDate'

import 'react-datepicker/dist/react-datepicker.css';

const DateSetup = ({dateData}) => (
<Grid columns={1}>
    <Grid.Column>
      <Segment raised>
        <Label as='a' color='green' ribbon>Start</Label>
        <span>Training Start</span>
        <br/>
        <br/>
        <PickDate data = {dateData} isStart={true}/>
        <br/>
        <br/>
        <Divider fitted />
        <br/>
        <br/>
        <Label as='a' color='blue' ribbon>End</Label>
        <span>Training End</span>
        <br/>
        <br/>
        <PickDate data = {dateData} isStart={false}/>        
      </Segment>
    </Grid.Column>    
  </Grid>    

)

DateSetup.propTypes = {
    dateData: PropTypes.object.isRequired,    
};
export default DateSetup