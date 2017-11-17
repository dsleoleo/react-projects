import React from 'react'
import PropTypes from 'prop-types';
import { Button, Container, Divider, Grid, Dimmer, Header, Loader, Image, Menu, Segment, Progress } from 'semantic-ui-react';
import ProgressModal from './ProgressModal'

class DataGenContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: this.props.step,
            onComplete: this.props.onComplete,
            hideSave: this.props.hideSave,
            onGenerate: this.props.onGenerate,              
            loading: false
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }    

    startProgress() {
        this.state.onGenerate();
        this.setState({loading : true})
    }

    render() {
        this.state = {
            step: this.props.step, onComplete: this.props.onComplete,
            hideSave: this.props.hideSave, onGenerate: this.props.onGenerate, percent: this.state.percent,
            loading: this.state.loading
        };
        return (
            <Container style={{ marginTop: '1em' }} textAlign='left' >
                <Header as='h1'>{this.state.step.title}</Header>
                <Header as='h3'>{this.state.step.description}</Header>                
                
                {this.props.children}
                <br />
                <br />
                <Divider fitted />
                <br />
                <br />
                <br />
                {
                    this.state.loading ? <ProgressModal/> :

                        this.state.hideSave ?
                            <Button.Group>
                                <Button color='red' onClick={this.startProgress.bind(this)}>Generate</Button>
                            </Button.Group> :
                            <Button.Group>
                                <Button>Cancel</Button>
                                <Button.Or />
                                <Button positive onClick={this.state.onComplete.bind(null, this.state.step)}>Save</Button>
                            </Button.Group>
                }
            </Container>
        );
    }
}

DataGenContent.propTypes = {
    step: PropTypes.object.isRequired,
    onComplete: PropTypes.func.isRequired,
    hideSave: PropTypes.bool,
    onGenerate: PropTypes.func,
};
export default DataGenContent