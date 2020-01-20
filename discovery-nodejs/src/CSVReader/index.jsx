import React, { Component } from 'react';
import CSVReader from "react-csv-reader";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import negative from '../assets/negative';
import positive from '../assets/positive';
import response_rate from '../assets/reponse_rate_vs_product.png';
import ReactWordCloud from 'react-wordcloud';






export default class CSVProcessor extends Component {

    classes = makeStyles({
        table: {
            minWidth: 650,
        },
    });



    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    rows = [
        this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        this.createData('Eclair', 262, 16.0, 24, 6.0),
        this.createData('Cupcake', 305, 3.7, 67, 4.3),
        this.createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];


    state = {
        data: null,
        hide: false,
        wordcloud: {}
    }
    wordFreq(string, freqMap) {
        var words = string.replace(/[.]/g, '').split(/\s/);
        words.forEach(function (w) {
            if (!freqMap[w]) {
                freqMap[w] = 0;
            }
            freqMap[w] += 1;
        });
        return freqMap;
    }

    handleUpload = data => {
        console.log(data);
        this.setState({ data: data, hide: true, wordcloud: {} });
        this.state.data.slice(1, this.state.data.length - 1).forEach(
            row => this.wordFreq(row[5], this.state.wordcloud)
        );
    }
    render() {
        return (
            <div>
                {!this.state.hide ? (
                    <CSVReader
                        cssClass="react-csv-input"
                        label="Select CSV with secret Death Star statistics"
                        onFileLoaded={this.handleUpload}
                    />) : (
                        <div className="table_main">
                            <TableContainer component={Paper}>
                                <Table className={this.classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            {this.state.data[0].slice(0, 10).map(r =>
                                                <TableCell>{r}</TableCell>
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.data.slice(1, 3).map(row => (
                                            <TableRow key={row[0]}>
                                                {row.slice(0, 10).map(r =>
                                                    <TableCell align="left">{r}</TableCell>
                                                )}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                            </TableContainer>

                            <div style={{ height: 400, width: 1200 }}>
                                <ReactWordCloud words={positive}

                                    options={{
                                        colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
                                        enableTooltip: true,
                                        deterministic: false,
                                        fontFamily: 'impact',
                                        fontSizes: [20, 80],
                                        fontStyle: 'normal',
                                        fontWeight: 'normal',
                                        padding: 1,
                                        rotations: 3,
                                        rotationAngles: [0, 90],
                                        scale: 'sqrt',
                                        spiral: 'archimedean',
                                        transitionDuration: 3000,
                                    }}
                                />
                            </div>

                            <div style={{ height: 400, width: 1200 }}>
                                <ReactWordCloud words={negative}

                                    options={{
                                        colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
                                        enableTooltip: true,
                                        deterministic: false,
                                        fontFamily: 'impact',
                                        fontSizes: [20, 80],
                                        fontStyle: 'normal',
                                        fontWeight: 'normal',
                                        padding: 1,
                                        rotations: 3,
                                        rotationAngles: [0, 90],
                                        scale: 'sqrt',
                                        spiral: 'archimedean',
                                        transitionDuration: 3000,
                                    }}
                                />
                            </div>
                            
                        </div>
                    )
                }
            </div>
        );
    }

}