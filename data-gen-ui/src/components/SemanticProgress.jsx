import React, { Component } from 'react';
import { Button, Progress } from 'semantic-ui-react';

export default class SemanticProgress extends Component {
  constructor(props) {
    super(props);
    this.state = { percent: 33 }    
  }

  increment() { this.setState({
    percent: this.state.percent >= 100 ? 0 : this.state.percent + 20,
  })
}
  
  render() {
    return (
      <div>
        <Progress percent={this.state.percent} indicating />
        <Button onClick={this.increment.bind(this)}>Increment</Button>
      </div>
    )
  }
}