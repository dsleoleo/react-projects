import React from 'react';
import Strategy from './Strategy';

class App extends React.Component {
    constructor(...args) {
        super(...args);        

    }
   


    render() {
        return (
            <div style={{display: "flex"}}>                                
                <Strategy id="first" width={20} height={300} numOfSlaves={1} numOfJobs={20} batching={false}></Strategy>                
                <Strategy id="first" width={20} height={300} numOfSlaves={3} numOfJobs={20} batching={false}></Strategy>                
                <Strategy id="second" width={20} height={300} numOfSlaves={4} numOfJobs={20} batching={false}></Strategy>
                <Strategy id="second" width={20} height={300} numOfSlaves={3} numOfJobs={20} batching={true}></Strategy>
            </div>
        )
    }
}

export default App;