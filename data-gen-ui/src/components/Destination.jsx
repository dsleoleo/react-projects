import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Form, Segment, Input, Label, Grid, Checkbox } from 'semantic-ui-react'


class Destination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
    }

    useHdfsChanged(e, v) {
        this.state.data.use_hdfs = v.checked;
        this.setState(this.state);
    }

    baseDirChanged(e, v) {
        this.state.data.base_dir = v.value;
    }

    hdfsHostChanged(e, v) {
        this.state.data.hdfs_host = v.value;
    }

    hdfsPortChanged(e, v) {
        this.state.data.hdfs_port = v.value;
    }


    renderHdfs() {
        if (this.state.data.use_hdfs)

            return (
                <Form.Group>
                    <Form.Input label={'HDFS Host Name'} placeholder={'HDFS host name'} value={this.state.data.hdfs_host ? this.state.data.hdfs_host : undefined}
                        onChange={this.hdfsHostChanged.bind(this)} width={6} />
                    <Form.Input label={'HDFS Port'} placeholder={'HDFS port'} value={this.state.data.hdfs_port}
                        onChange={this.hdfsPortChanged.bind(this)} width={2} />
                </Form.Group>
            )
    }

    render() {
        const existingHosts = this.state.data.log_hosts;
        return (
            <Form>
                <Form.Group>
                    <Form.Checkbox label='Use HDFS' checked={this.state.data.use_hdfs} onChange={this.useHdfsChanged.bind(this)} width={2} />
                    <Form.Input placeholder={'Base directory to put the files'} value={this.state.data.base_dir}
                        onChange={this.baseDirChanged.bind(this)} width={6} />
                </Form.Group>
                {
                    this.renderHdfs()
                }

            </Form>
        )
    }
}

Destination.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Destination