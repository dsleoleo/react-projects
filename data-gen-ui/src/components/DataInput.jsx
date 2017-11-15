import React from 'react'
import PropTypes from 'prop-types';
import { Form, Input, Icon } from 'semantic-ui-react'

const DataInput = ({ inputConfig, data }) => (    
    <Form.Input label={`${inputConfig.label}: ${ data[inputConfig.fieldName] ? data[inputConfig.fieldName] : inputConfig.min } `} placeholder={inputConfig.placeholder} error = {inputConfig.error}
        min = {inputConfig.min} max = {inputConfig.max}  step={inputConfig.step}
        type='range'
        value={ data[inputConfig.fieldName] ? data[inputConfig.fieldName] : inputConfig.min } 
        onChange={(e, newValue) => {              //this needs to trigger reload
                data[inputConfig.fieldName] = newValue.value            
        }} />
)

DataInput.propTypes = {
    inputConfig: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
};
export default DataInput