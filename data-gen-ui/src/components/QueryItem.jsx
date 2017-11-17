import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Form, Segment, List, Icon, Label, Checkbox, Table } from 'semantic-ui-react'

class QueryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            newQuery: undefined
        }
    }

    addNewQuery(e, newValue) {        
        this.state.newQuery = newValue.value
    }

    saveNewQuery(e, newValue) {
        if (!this.state.data.query)
            this.state.data.query = [];
        if (this.state.data.parallel == null || this.state.data.parallel == undefined) {
            this.state.data.parallel = false;
        }    
        if (this.state.newQuery) {
            this.state.data.query.push(this.state.newQuery);
            this.state.newQuery = undefined;
            this.setState(this.state)
            this.props.updateHandle();
        }
    }

    parallelChanged(e, newValue) {        
        this.state.data.parallel = newValue.checked;
        this.setState(this.state);
        this.props.updateHandle();
    }

    deleteSelf(e, v) {
        this.props.removeHandle(this.props.host); //delegate to remove handle
        this.props.updateHandle();
    }

    render() {
        return (

            <Table.Row>
                <Table.Cell>
                    <Icon name='folder'/>{this.props.host}
                </Table.Cell>
                <Table.Cell>
                    <Form.Input placeholder={'new query name'} value={this.state.newQuery}
                        onChange={this.addNewQuery.bind(this)}
                        action={{ icon: 'add square', color: 'green', onClick: this.saveNewQuery.bind(this) }} />
                </Table.Cell>
                <Table.Cell>{
                    this.state.data.query ?
                        (<List celled horizontal>
                            {this.state.data.query.map(q => <List.Item key={q} >{q}</List.Item>)}
                        </List>) : <Label basic color='red' pointing>No Query</Label>
                }
                </Table.Cell>
                <Table.Cell>
                    <Checkbox label='Parallel' checked={this.state.data.parallel} onChange={this.parallelChanged.bind(this)} />
                </Table.Cell>
                <Table.Cell>
                    <Form.Button icon={'remove'} color={'red'} onClick={this.deleteSelf.bind(this)}/>
                </Table.Cell>
            </Table.Row>

        )
    }
}

QueryItem.propTypes = {
    data: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    removeHandle: PropTypes.func.isRequired,
    updateHandle: PropTypes.func
};

export default QueryItem