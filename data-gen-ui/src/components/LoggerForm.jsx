import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Form, Segment, Label } from 'semantic-ui-react'
import QueryItem from './QueryItem'


class LoggerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            newHost: undefined,            
        }
    }

    addNewHost(e, newValue) {
        if (newValue.value)
            this.state.newHost = newValue.value
    }

    saveNewHost(e, newValue) {        
        if (!this.state.newHost) {            
            return;
        }

        if (!this.state.data.log_hosts)
            this.state.data.log_hosts = {};

        this.state.data.log_hosts[this.state.newHost] = {};
        this.state.newHost = undefined;
        this.setState(this.state);        
    }

    deleteHost(host) {
        delete this.state.data.log_hosts[host];
        this.setState(this.state)
    }

    render() {
        const existingHosts = this.state.data.log_hosts;                
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input placeholder={'new host name'} value={this.state.newHost}
                        onChange={this.addNewHost.bind(this)}
                        action={{ icon: 'add square', color: 'green', onClick: this.saveNewHost.bind(this) }} />
                </Form.Group>
                { existingHosts ? Object.keys(existingHosts).map(key =><QueryItem key={key} data={existingHosts[key]} removeHandle={this.deleteHost.bind(this)} host={key}/>) : 
                  <Label basic color='red' pointing>No Host</Label>
                }
            </Form>
        )
    }
}

LoggerForm.propTypes = {
    data: PropTypes.object.isRequired,
};

export default LoggerForm