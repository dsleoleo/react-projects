import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Form, Segment, Divider, Label, Message, Table } from 'semantic-ui-react'
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
    updateHost() {
        this.forceUpdate();
        this.setState(this.state);
        console.log(JSON.stringify(this.state.data.log_hosts))
    }

    renderQueryItems() {
        const existingHosts = this.state.data.log_hosts;

        return existingHosts ?
            <div>
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Host Name</Table.HeaderCell>
                            <Table.HeaderCell>Add Query</Table.HeaderCell>
                            <Table.HeaderCell>Queries</Table.HeaderCell>
                            <Table.HeaderCell>Parallel Feed</Table.HeaderCell>
                            <Table.HeaderCell>Remove</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            Object.keys(existingHosts).map((key, index) => <QueryItem key={key} data={existingHosts[key]} removeHandle={this.deleteHost.bind(this)} host={key}
                                updateHandle={this.updateHost.bind(this)} />)
                        }
                    </Table.Body>
                </Table>
                <Divider fitted />
                {
                    Object.keys(existingHosts).map((key, index) => {
                        if (existingHosts[key].query) {
                            return (
                                <Message key={key} info><Message.Header>Example Message Files</Message.Header>
                                    {existingHosts[key].query.map((q) =>
                                        <div key={q}><span >{'07.' + key + '.' + q + (existingHosts[key].parallel ? '.02' : '') + '.msg.gz'}</span><br></br></div>)
                                    }

                                </Message>);
                        }
                        else {
                            return null;
                        }
                    })
                }
            </div>
            :
            <Label basic color='red' pointing>No Host</Label>

    }

    render() {

        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input placeholder={'new host name'} value={this.state.newHost}
                        onChange={this.addNewHost.bind(this)}
                        action={{ icon: 'add square', color: 'green', onClick: this.saveNewHost.bind(this) }} />
                </Form.Group>
                {this.renderQueryItems()}
            </Form>
        )
    }
}

LoggerForm.propTypes = {
    data: PropTypes.object.isRequired,
};

export default LoggerForm