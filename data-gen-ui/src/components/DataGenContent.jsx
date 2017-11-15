import React from 'react'
import PropTypes from 'prop-types';
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react'

const DataGenContent = ({ step, onComplete, children }) => (
    <Container style={{ marginTop: '1em' }} textAlign='left' >
        <Header as='h1'>{step.title}</Header>
        <Header as='h3'>{step.description}</Header>
        {children}
        <br />
        <br />
        <Divider fitted />
        <br />
        <br />
        <Button.Group>
            <Button>Cancel</Button>
            <Button.Or />
            <Button positive onClick={onComplete.bind(null, step)}>Save</Button>
        </Button.Group>
    </Container>
)

DataGenContent.propTypes = {
    step: PropTypes.object.isRequired,
    onComplete: PropTypes.func.isRequired
};
export default DataGenContent