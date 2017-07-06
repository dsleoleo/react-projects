import React from 'react';
import PropTypes from 'prop-types';
const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

class Strategy extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            snap: Snap(),
            rects: [],
            slaves: [],
            workLeft: [],
            partitioned: []
        };

        var xi = 0, yi = 0, wi = this.props.width
        for (var ii = 0; ii < this.props.numOfJobs; ii++) {
            var hi = Math.floor(Math.random() * this.props.height)
            var rect = this.state.snap.rect(xi, yi, wi, hi);
            this.state.rects.push(rect);
            this.state.workLeft.push(rect);
            xi += (wi + 5)
        }
        for (var kk = 1; kk <= this.props.numOfSlaves; kk++) {
            this.state.slaves.push(kk);
        }
        if (this.props.batching) {
            var i, j, temparray, chunk = Math.ceil(this.props.numOfJobs / this.props.numOfSlaves);
            for (i = 0, j = this.state.rects.length; i < j; i += chunk) {
                temparray = this.state.rects.slice(i, i + chunk);
                this.state.partitioned.push(temparray)
            }
        }
    }
    componentDidMount() {
        const lastRect = this.state.rects[this.state.rects.length - 1]

        const b = this.state.snap.rect(Number(lastRect.attr('x')) + Number(lastRect.attr('width')) + 10, 0, 50, 20)
        b.addClass('btn')
        b.node.onclick = () => {
            console.log('clicked haha')
            this.assignWork()
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async assignWork() {
        if (this.state.workLeft.length == 0) {
            console.log('No more work to be done')
            return;
        }
        while (this.state.slaves.length == 0) {
            console.log('no slave avaliable waiting here')
            await this.sleep(2000);
        }
        while (this.state.slaves.length != 0) {
            var slave = this.state.slaves.shift()
            if (!this.props.batching) {
                var work = this.state.workLeft.shift()
                this.doWork(work, slave)
            }
            else {
                var work = this.state.partitioned[slave - 1].shift()
                this.doWork(work, slave)
            }
        }
    }

    async doWork(rect, slave) {
        console.log('doing work with slave', slave)
        var h = Number(rect.attr('height'))
        rect.animate({ y: this.props.height }, h * 15, mina.linear, () => {
            this.state.slaves.push(slave);
            this.assignWork()
        });
    }

    render() {
        return (
            <div style={{ display: "flex" }}>
            </div>
        )
    }
}

export default Strategy;

Strategy.propTypes = {
    id: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    numOfSlaves: PropTypes.number.isRequired,
    numOfJobs: PropTypes.number.isRequired,
    batching: PropTypes.bool.isRequired,
}