import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortableTree from 'react-sortable-tree';
import { Input, Loader } from 'semantic-ui-react'
import { changeNodeAtPath } from '../js/tree-data-utils.js'

export default class MessageTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
            searchString: '',
            loading: false
        };
    }
    componentWillMount() {
        this.state.loading = true;
    }

    componentDidMount() {
        this.state.loading = false;
        this.state.treeData = this.props.treeData;
        this.setState(this.state);
    }

    render() {
        const getNodeKey = ({ treeIndex }) => treeIndex;
        return (

            <div style={{ height: 500 }}>
                <Input label={"Search"} placeholder="Node name or subnode name"
                    value={this.state.searchString}
                    onChange={(event) => this.setState({ searchString: event.target.value })}
                />
                {
                    this.state.loading ? <Loader active /> :
                        <SortableTree
                            treeData={this.state.treeData}
                            onChange={treeData => {
                                if (this.props.exportDataFunc)
                                    this.props.exportDataFunc(treeData);
                                this.setState({ treeData: treeData })
                            }
                            }
                            searchQuery={this.state.searchString}
                            dndType={this.props.dndType}
                            shouldCopyOnOutsideDrop={true}
                            generateNodeProps={({ node, path }) => {
                                //console.log('node=' + JSON.stringify(node) + ' path=' + JSON.stringify(path));
                                if (path.length > 1) {
                                    return ({
                                        title: (
                                            <input
                                                value={node.title}
                                                onChange={event => {
                                                    const title = event.target.value;
                                                    this.setState(state => ({
                                                        treeData: changeNodeAtPath({
                                                            treeData: state.treeData,
                                                            path,
                                                            getNodeKey,
                                                            newNode: { ...node, title },
                                                        }),
                                                    }));
                                                }}
                                            />
                                        ),
                                    });
                                }
                                else {
                                    return node;
                                }

                            }}
                        />
                }
            </div>
        );
    }
}

MessageTree.propTypes = {
    treeData: PropTypes.array,
    dndType: PropTypes.string.isRequired,
    exportDataFunc: PropTypes.func
};