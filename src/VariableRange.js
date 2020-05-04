import React from 'react';

import { Slider, Typography } from "@material-ui/core";

const FormContainer = ({defaultValue, currentValue, name, onChange, max = null, min = null}) => {
  return <div>
    <Typography id="discrete-slider-small-steps" gutterBottom>
      {name}
    </Typography>
  <Slider
    defaultValue={defaultValue}
    step={1}
    min={min ? min : 0}
    max={max ? max : defaultValue*2}
    onChange={(event, newValue) => onChange(newValue)}
    value={currentValue}
    valueLabelDisplay="auto"
  />
    </div>
}

export default FormContainer;