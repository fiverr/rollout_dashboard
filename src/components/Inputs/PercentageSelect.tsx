import * as React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const PercentageSelect = (props: {currentValue: number, onChange: Function}) => {

    const options = [];
    for (let i = 0; i <= 100; i ++) {
        options.push(<MenuItem key={i}  value={i} primaryText={`${i}%`} />);
    }

    return(
        <SelectField
            value={props.currentValue || 0}
            maxHeight={200}
            floatingLabelText="Rollout Percentage:"
            onChange={props.onChange}>
            {options}
        </SelectField>);

};

export default PercentageSelect
