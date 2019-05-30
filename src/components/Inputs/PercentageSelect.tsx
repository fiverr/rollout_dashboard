import * as React from 'react';
import Slider from 'material-ui/Slider';

const PercentageSelect = (props: {currentValue: number, onChange: Function}) => {

    return(
        <div>
            <p className='center-text'>
              <span>{'Feature is '}</span>
              <span><b>{props.currentValue || 0}</b></span>
              <span>{'% open'}</span>
            </p>
            <Slider
                min={0}
                max={100}
                step={1}
                value={props.currentValue || 0}
                onChange={props.onChange}>
            </Slider>
        </div>);

};

export default PercentageSelect
