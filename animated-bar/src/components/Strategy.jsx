import React from 'react';
import PropTypes from 'prop-types';
import Rect from './Rect';
const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

class Strategy extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            snap: Snap(),
            rects: []
        };

    }
    componentDidMount() {
        const b = this.state.snap.rect(0, 0, 10, 10)
        b.addClass('btn')
        b.node.onclick = () => {
            console.log('clicked haha')
            this.startProcess()
        }
    }

    startProcess() {
        this.state.rects[0].changeHeight()
        this.state.rects[0].setLabel('1')
    }

    chain2() {
        this.state.rects[1].changeHeight()
        this.state.rects[1].setLabel('2')

    }

    chain3() {
        this.state.rects[2].changeHeight()
        this.state.rects[2].setLabel('3')
    }

    chain4() {
        this.state.rects[3].changeHeight()
        this.state.rects[3].setLabel('4')
    }

    render() {

        return (

            <div style={{ display: "flex" }}>
                <Rect snap={this.state.snap} x={0} y={0} w={50} h={200} chain={this.chain2.bind(this)} ref={(rect) => this.state.rects.push(rect)
                } />
                <Rect snap={this.state.snap} x={60} y={0} w={50} h={200} chain={this.chain3.bind(this)} ref={(rect) => this.state.rects.push(rect)
                } />
                <Rect snap={this.state.snap} x={120} y={0} w={50} h={200} chain={this.chain4.bind(this)} ref={(rect) => this.state.rects.push(rect)
                } />
                <Rect snap={this.state.snap} x={180} y={0} w={50} h={200} chain={() => { console.log('last one finished') }} ref={(rect) => this.state.rects.push(rect)
                } />
            </div>
        )
    }
}

export default Strategy;

Strategy.propTypes = {
    id: PropTypes.string.isRequired
    
}