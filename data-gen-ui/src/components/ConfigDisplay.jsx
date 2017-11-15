import React from 'react'
import PropTypes from 'prop-types';
import { Grid, Message, Label, Segment, Container } from 'semantic-ui-react';

const ConfigDisplay = ({ data }) => (
    <Container textAlign='left'>
        <Message info>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Message>
    </Container>
)

ConfigDisplay.propTypes = {
    data: PropTypes.object.isRequired,
};
export default ConfigDisplay