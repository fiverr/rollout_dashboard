import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const PercentageSelect = ({currentValue, onChange}) => {

    let options = [];
    for (let i = 0; i <= 100; i ++) {
        options.push(<MenuItem key={i}  value={i} primaryText={`${i}%`} />)
    }

    return(
        <SelectField
            value={currentValue || 0}
            maxHeight={200}
            name="percentage"
            floatingLabelText="Rollout Percentage:"
            onChange={onChange}>
            {options}
        </SelectField>
    )

};

export default PercentageSelect