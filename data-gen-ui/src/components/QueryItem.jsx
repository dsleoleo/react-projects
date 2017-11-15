import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Form, Segment, List, Label, Checkbox } from 'semantic-ui-react'

class QueryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            newQuery: undefined
        }
    }

    addNewQuery(e, newValue) {
        if (newValue.value)
            this.state.newQuery = newValue.value
    }

    saveNewQuery(e, newValue) {
        if (!this.state.data.query)
            this.state.data.query = [];
        if (this.state.newQuery) {
            this.state.data.query.push(this.state.newQuery);
            this.state.newQuery = undefined;
            this.setState(this.state)
        }
    }

    parallelChanged(e, newValue) {        
        this.state.data.parallel = newValue.checked;
        this.setState(this.state);
    }

    deleteSelf(e, v) {
        this.props.removeHandle(this.props.host); //delegate to remove handle
    }

    render() {
        return (

            <Segment.Group horizontal>
                <Segment>
                    <Label color='teal' tag>{this.props.host}</Label>
                </Segment>
                <Segment>
                    <Form.Input placeholder={'new query name'} value={this.state.newQuery}
                        onChange={this.addNewQuery.bind(this)}
                        action={{ icon: 'add square', color: 'green', onClick: this.saveNewQuery.bind(this) }} />
                </Segment>
                <Segment>{
                    this.state.data.query ?
                        (<List celled horizontal>
                            {this.state.data.query.map(q => <List.Item key={q} >{q}</List.Item>)}
                        </List>) : <Label basic color='red' pointing>No Query</Label>
                }
                </Segment>
                <Segment>
                    <Checkbox label='Parallel' checked={this.state.data.parallel} onChange={this.parallelChanged.bind(this)} />
                </Segment>
                <Segment>
                    <Form.Button icon={'remove'} color={'red'} onClick={this.deleteSelf.bind(this)}/>
                </Segment>
            </Segment.Group>

        )
    }
}

QueryItem.propTypes = {
    data: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    removeHandle: PropTypes.func.isRequired
};

export default QueryItem