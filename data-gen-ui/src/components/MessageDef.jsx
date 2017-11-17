import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Form, Segment, Input, Label, Grid, Checkbox } from 'semantic-ui-react'
import Tree from './DataGenSortableTree';
import MessageTree from './MessageTree';


const transformData = (data) => {
    var message = data.messages;
    var hvfMessage = data['hvf-messages'];

    var messageChildren = [];
    var hvfMessageChildren = [];

    if (message) {
        Object.keys(message).forEach((key, index)=> {
            var value = message[key];             
            if (value) {
                var messageChild = [];
                Object.keys(value).forEach((k, i) => {
                    messageChild.push({title: k, children: []});
                })
                messageChildren.push({title: key, children : messageChild});
            }
        });
    }

    if (hvfMessage) {
        Object.keys(hvfMessage).forEach((key, index)=> {
            var value = hvfMessage[key]; 
            if (value) {
                var hvfMessageChild = [];
                Object.keys(value).forEach((k, i) => {
                    hvfMessageChild.push({title: k, children: []});
                })
                hvfMessageChildren.push({title: key, children: hvfMessageChild});
            }
        });
    }

    return [{ title: "messages", children: messageChildren }, { title: "hvf-messages", children: hvfMessageChildren }];
}

const reverseTransform = (arrayData) => {
    var result = null;
    if (arrayData) {
        result = {};        
        arrayData.forEach((data) => {
            result[data.title] = {};
            data.children.forEach((e) => {
                result[data.title][e.title] = 'value';
            })
        })
    }
    return result;
}

class MessageDef extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,            
            eventData: { treeData: {} }            
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


    formatEventBuilderData(treeData, subTreeData) {
        const newData = { treeData: [], filteredData: [] };
        const dataMap = new Map();
        const msgMap = new Map();
        const inListPattern = /.*InList[^\(]*\(\s*type\s*,([^\)]*)\).*/i;        
        const subTreeFormattedData = [];
        subTreeData.treeData.forEach(function (data) {
            var children = [];
            data.fieldExtractors.forEach(function (extractor) {
                extractor.fieldNames.forEach(function (fieldName) {
                    children.push({ title: fieldName });
                });
            });
            subTreeFormattedData.push({ title: data.name, children: children });
        });

        subTreeFormattedData.forEach((messageType) => {
            msgMap.set(messageType.title, messageType.children)
        })

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
                    var messageChildrenData = msgMap.get(messageType);
                    return { title: messageType, children: messageChildrenData ? messageChildrenData : [] }
                }
                )
                var childrenData = { title: key, children: messageTypeData }
                typeData.children.push(childrenData)
            }
            else {
                var typeData = { title: outputType, children: [] }
                var messageTypeData = messageTypes.map((messageType) => {
                    var messageChildrenData = msgMap.get(messageType);
                    return { title: messageType, children: messageChildrenData ? messageChildrenData : [] }
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

    captureMessageData(treeData) {
        //console.log(JSON.stringify(treeData));        
        this.state.data.messages = reverseTransform(treeData[0].children)
        this.state.data['hvf-messages'] = reverseTransform(treeData[1].children)
        console.log('data=' + JSON.stringify(this.state.data))
        this.setState(this.state);
    }

    render() {
        const existingHosts = this.state.data.log_hosts;
        return (
            <Segment.Group horizontal>
                <Segment>
                    <Label size='large' color='green' tag>Event Types </Label>
                    <br />
                    <br />
                    <br />
                    <Tree fetchUrl={"http://localhost:8909/api/eventbuilders"} fetchUrl2={"http://localhost:8909/api/messagetypes"} formatData={this.formatEventBuilderData} dndType={'message'} />
                </Segment>
                <Segment>
                    <Label size='large' color='blue' tag>Message Types </Label>
                    <br />
                    <br />
                    <br />
                    <Tree fetchUrl={"http://localhost:8909/api/messagetypes"} formatData={this.formatMessageData} dndType={'message'} />
                </Segment>
                <Segment>
                    <Label size='large' color='red' tag>Data Gen Message Types</Label>
                    <br />
                    <br />
                    <br />
                    <MessageTree treeData={transformData(this.state.data)} dndType={'message'} exportDataFunc={this.captureMessageData.bind(this)} />
                </Segment>
            </Segment.Group>

        )
    }
}

MessageDef.propTypes = {
    data: PropTypes.object.isRequired,
};

export default MessageDef