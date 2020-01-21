import React, { Component } from 'react';
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ScatterChart,
    Scatter,
    ZAxis,
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
    getTrendData = () => {
        return [
            { "response time": 100, "product rating": 3.3 },
            { "response time": 150, "product rating": 3.4 },
            { "response time": 500, "product rating": 3.5 },
            { "response time": 1000, "product rating": 4.2 },
            { "response time": 1500, "product rating": 4.5 },
        ];
    }

    static defaultProps = {
        colorLine: '#6ABA4F',
    };

    render() {
        return (
            <div>
                {!this.state.hasLoaded ? (
                    this.setState({ data: this.generateBarData(), hasLoaded: true })) :
                    <ResponsiveContainer width={600} height={500}>
                        <ScatterChart width={600} height={300} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey={'response time'} name='response time' unit='seconds' />
                            <YAxis type="number" dataKey={'product rating'} name='product rating' domain={[0,5]} />

                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Legend />
                            <Scatter name='response time vs product ratings' data={this.state.data} fill='#8884d8' />
                            <Scatter name='trend ' data={this.getTrendData()} fill='#e2237e' line shape="diamond" /> */}
                        </ScatterChart>
                    </ResponsiveContainer>}
            </div>
        );
    }
}
