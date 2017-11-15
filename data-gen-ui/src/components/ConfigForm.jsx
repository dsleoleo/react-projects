import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Form, Icon, Segment } from 'semantic-ui-react'
import DataInput from './DataInput'


class ConfigForm extends Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data }
    
  }

  valueIfDefined(data, alternative) {
    return data ? data : alternative
  }

  handleChange(e, newValue) {
    this.state.data[newValue.id] = newValue.value // : ) using id to hack around the field name value    
    this.setState(this.state);    
  }

  render() {    
    return (
      <Form>
        <Segment.Group horizontal>
          <Segment>
            <Icon name={'add user'} color={'green'} size={'large'} />            
            <Form.Input id={'num_of_users'} label={`Number of Users: ${this.valueIfDefined(this.state.data['num_of_users'], 0)} `}
              min={0} max={100000} step={100} type='range'         
              value = {this.valueIfDefined(this.state.data['num_of_users'], 0)}
              onChange={this.handleChange.bind(this)} />
          </Segment>
          <Segment >
            <Icon name={'sellsy'} />
            <Form.Input id={'num_of_ips'} label={`Number of Ips: ${this.valueIfDefined(this.state.data['num_of_ips'], 0)} `}
              min={0} max={100000} step={100} type='range'
              value={this.valueIfDefined(this.state.data['num_of_ips'], 0)}
              onChange={this.handleChange.bind(this)} />
          </Segment>
          <Segment >
            <Icon name={'server'} />
            <Form.Input id={'num_of_hosts'} label={`Number of Hosts: ${this.valueIfDefined(this.state.data['num_of_hosts'], 0)} `}
              min={0} max={100000} step={100} type='range'
              value={this.valueIfDefined(this.state.data['num_of_hosts'], 0)}
              onChange={this.handleChange.bind(this)} />
          </Segment>
        </Segment.Group>

        <Segment.Group horizontal>
          <Segment>
            <Icon name={'hand spock'} />
            <Form.Input id={'user_ip_ratio'} label={`User IP Ratio: ${this.valueIfDefined(this.state.data['user_ip_ratio'], 1)} `}
              min={1} max={100000} step={1} type='range'
              value={this.valueIfDefined(this.state.data['user_ip_ratio'], 1)}
              onChange={this.handleChange.bind(this)} />
          </Segment>
          <Segment >
            <Icon name={'users'} />
            <Form.Input id={'num_of_special_user'} label={`Number of Special Users: ${this.valueIfDefined(this.state.data['num_of_special_user'], 0)} `}
              min={0} max={100000} step={1} type='range'
              value={this.valueIfDefined(this.state.data['num_of_special_user'], 0)}
              onChange={this.handleChange.bind(this)} />
          </Segment>
        </Segment.Group>

        <Segment.Group horizontal>
          <Segment>
            <Icon name={'hourglass outline'} />
            <Form.Input id={'num_of_users_per_hour'} label={`Number of Users per Hour: ${this.valueIfDefined(this.state.data['num_of_users_per_hour'], 0)} `}
              min={0} max={100000} step={100} type='range'
              value={this.valueIfDefined(this.state.data['num_of_users_per_hour'], 0)}
              onChange={this.handleChange.bind(this)} />
          </Segment>
          <Segment >
            <Icon name={'warning circle'} />
            <Form.Input id={'rogue_chance'} label={`Rogue Chance: ${this.valueIfDefined(this.state.data['rogue_chance'], 0)} `}
              min={0} max={10000} step={0} type='range'
              value={this.valueIfDefined(this.state.data['rogue_chance'], 0)}
              onChange={this.handleChange.bind(this)} />
          </Segment>
        </Segment.Group>
      </Form>
    )
  }
}

ConfigForm.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ConfigForm