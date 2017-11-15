import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Form, Segment, Input, Label, Grid, Checkbox } from 'semantic-ui-react'
import Tree from './DataGenSortableTree';


class MessageDef extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            messageData: { treeData : [{title: "message", children: []}, 
        {title: "hvf-message", children: []}]}
        }
    }

    formatMessageData(treeData) {
        const newData = { treeData: [], filteredData: [] };
        treeData.treeData.forEach(function (data) {
            var children = [];
            data.fieldExtractors.forEach(function (extractor) {
                extractor.fieldNames.forEach(function (fieldName) {
                    children.push({ title: fieldName });
                });
            });
            newData.treeData.push({ title: data.name, children: children });
        });
        newData.filteredData = JSON.parse(JSON.stringify(newData.treeData));
        return newData
    }


    formatEventBuilderData(treeData) {
        const newData = { treeData: [], filteredData: [] };
        const dataMap = new Map();
        const inListPattern = /.*InList[^\(]*\(\s*type\s*,([^\)]*)\).*/i;

        Object.keys(treeData.treeData).forEach(function (key, index) {
            var data = treeData.treeData[key];
            var children = [];
            var outputType = data['output-type'];
            var inputMessage = data['input-message'];
            var expressionData = inputMessage instanceof Array ? inputMessage[0]['expression'] : inputMessage['expression'] //funky
            var exp = inListPattern.exec(expressionData);

            var messageTypes = exp ? exp[1].replace(/^\s+|\s+$/g, "").replace(/\'/g, "").replace(/\s\,|\,\s/g, ",").split(",") :
                [expressionData];


            if (dataMap.get(outputType)) {
                var typeData = dataMap.get(outputType);
                var messageTypeData = messageTypes.map((messageType) => {
                    return { title: messageType, children: [] }
                }
                )
                var childrenData = { title: key, children: messageTypeData }
                typeData.children.push(childrenData)
            }
            else {
                var typeData = { title: outputType, children: [] }
                var messageTypeData = messageTypes.map((messageType) => {
                    return { title: messageType, children: [] }
                }
                )
                var childrenData = { title: key, children: messageTypeData }
                typeData.children.push(childrenData)
                dataMap.set(outputType, typeData);
            }
        });

        for (var [key, value] of dataMap) {
            newData.treeData.push(value);
        }

        newData.filteredData = JSON.parse(JSON.stringify(newData.treeData));
        return newData
    }

    captureTreeData(treeData) {
        console.log(JSON.stringify(treeData));
        this.state.messageData = treeData;
    }

    render() {
        const existingHosts = this.state.data.log_hosts;
        return (
            <Segment.Group horizontal>
                <Segment>
                    <Label size='large' color='blue' tag>Message Types </Label>
                    <br />
                    <br />
                    <br />
                    <Tree fetchUrl={"http://localhost:8909/api/messagetypes"} formatData={this.formatMessageData} dndType={'message'} />
                </Segment>
                <Segment>
                    <Label size='large' color='green' tag>Event Types </Label>
                    <br />
                    <br />
                    <br />
                    <Tree fetchUrl={"http://localhost:8909/api/eventbuilders"} formatData={this.formatEventBuilderData} dndType={'event'} />
                </Segment>
                <Segment>
                    <Label size='large' color='red' tag>Data Gen Message Types</Label>
                    <br />
                    <br />
                    <br />
                    <Tree treeData = {this.state.messageData} dndType={'message'} exportDataFunc={this.captureTreeData.bind(this)}/>
                </Segment>
            </Segment.Group>

        )
    }
}

MessageDef.propTypes = {
    data: PropTypes.object.isRequired,
};

export default MessageDef