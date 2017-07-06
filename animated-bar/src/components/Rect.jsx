import React from 'react';
import PropTypes from 'prop-types';

const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);
class Rect extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            rect: '',
            text: ' '
        };

    }

    componentDidMount() {        
        const rect1 = this.props.snap.rect(this.props.x, this.props.y, this.props.w, this.props.h)
        const text1 = this.props.snap.text(this.props.x + this.props.w / 2, this.props.y + this.props.h / 2, '')
        text1.attr({
            fill: "green",
            fontFamily: "Verdana",
            fontSize: "25",            
        });
        this.state.rect = rect1
        this.state.text = text1
        
        this.props.snap.group(this.state.rect, this.state.text)
    }

    setLabel(newText) {        
        this.state.text.attr({ text: newText});
    }
    changeHeight() {
        this.state.rect.animate({ y: this.props.h }, this.props.h * 50, mina.linear, this.props.chain.bind(this));
    }


    render() {
        return (
            <div></div>
        )
    }
}

export default Rect;

Rect.propTypes = {
    snap: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    w: PropTypes.number.isRequired,
    h: PropTypes.number.isRequired,
    chain: PropTypes.func.isRequired    
}