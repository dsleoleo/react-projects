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
import negative from '../assets/negative_feedback.png';
import positive from '../assets/positive_feedback.png';




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
        hide: false
    }
    handleUpload = data => {
        console.log(data);
        this.setState({ data: data, hide: true });
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
                                        {this.state.data[0].slice(0, 5).map(r =>
                                            <TableCell>{r}</TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.data.slice(1, this.state.data.length - 1).map(row => (
                                        <TableRow key={row[0]}>
                                            {row.slice(0, 5).map(r =>
                                                <TableCell align="left">{r}</TableCell>
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            
                        </TableContainer>
                        <img src={negative} width="400" height="400" alt="Negative"/>                                      
                        </div>
                    )
                }
            </div>
        );
    }

}