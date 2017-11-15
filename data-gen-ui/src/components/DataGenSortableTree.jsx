import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortableTree from 'react-sortable-tree';
import { Input, Loader } from 'semantic-ui-react'

export default class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
      filteredData: [],
      loading: false,
      searchString: ''
    };
  }
  componentWillMount() {
    this.state.loading = true;
  }

  componentDidMount() {
    if (this.props.fetchUrl) {
      fetch(this.props.fetchUrl)
        .then(result => result.json())
        .then(treeData =>
          this.setTreeData({ treeData })
        )
    }
    else {
      this.setTreeData(this.props.treeData);
    }
  }

  setTreeData(treeData) {
    const newData = this.props.formatData ? this.props.formatData(treeData) : {treeData: treeData.treeData, filteredData: treeData.treeData};
    this.state.loading = false;
    this.setState({ treeData: newData.treeData, filteredData: newData.filteredData });
  }

  searchFilterTree(event) {
    this.state.searchString = event.target.value
    const pattern = this.state.searchString
    this.state.filteredData = this.state.treeData.filter(node => node.title.match(pattern))
    this.setState({ filteredData: this.state.filteredData, searchString: this.state.searchString });
  }

  render() {

    return (

      <div style={{ height: 500 }}>
        <Input label={"Search"} placeholder="Node name or subnode name"
          value={this.state.searchString}
          onChange={this.searchFilterTree.bind(this)}
        />
        {
          this.state.loading ? <Loader active /> :
            <SortableTree
              treeData={this.state.filteredData}
              onChange={treeData => {
                if (this.props.exportDataFunc)
                  this.props.exportDataFunc(treeData);
                this.setState({ filteredData: treeData })}
              }
              dndType={this.props.dndType}
              
            />
        }
      </div>
    );
  }
}

Tree.propTypes = {
  fetchUrl: PropTypes.string,
  treeData: PropTypes.object,
  formatData: PropTypes.func,
  dndType: PropTypes.string.isRequired,
  exportDataFunc: PropTypes.func
};