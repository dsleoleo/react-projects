import React, { Component } from 'react';
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LineChart,
    Line,
    Legend,
} from 'recharts';
import ratings from '../ratings.js';

export default class ResponseChart extends Component {
    state = {
        data: null,
        hasLoaded: false,
    }

    generateBarData = () => {

        return ratings;
    }

    static defaultProps = {
        colorLine: '#6ABA4F',
    };

    render() {
        return (
            <div>
                {!this.state.hasLoaded ? (
                    this.setState({ data: this.generateBarData(), hasLoaded: true })) :
                    <ResponsiveContainer width={500} height={250}>
                        <LineChart width={600} height={300} data={this.state.data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="response time" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="product rating" stroke="#8884d8" activeDot={{ r: 10 }} />
                            
                        </LineChart>
                    </ResponsiveContainer>}
            </div>
        );
    }
}
