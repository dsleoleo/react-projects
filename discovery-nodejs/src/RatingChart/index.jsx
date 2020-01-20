import React, { Component } from 'react';
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ComposedChart,
    BarChart,
    Bar,
    Legend,
} from 'recharts';

export default class RatingChart extends Component {
    state = {
        data: null,
        hasLoaded: false,
    }

    generateBarData = () => {
        

        const final = [{"category" : "CS satisfaction", "rating" : 3.2}, 
                       {"category" : "Product satisfaction", "rating" : 3.5}, 
                       {"category" : "NPS response", "rating" : 6.2}];
        return final;
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
                        <BarChart
                            data={this.state.data}
                            barSize="3"
                            margin={{
                                ...ComposedChart.defaultProps.margin,
                                top: 15,
                                right: 15,
                            }}
                        >
                            <Bar
                                dataKey="rating"
                                name="customer ratings"
                                fill="#e2237e"
                            />

                            
                            <CartesianGrid stroke="#ccc" />
                            <XAxis
                                dataKey="category"
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            />
                </BarChart>
                    </ResponsiveContainer>}
            </div>
        );
    }
}
