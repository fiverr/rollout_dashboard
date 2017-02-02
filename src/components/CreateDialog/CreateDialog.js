import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import moment from 'moment';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import './CreateDialog.scss';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


const CreateDialog = ({onApproval, onClose, feature}) => {

    let items = [];
    for (let i = 1; i <= 100; i ++) {
        items.push(<MenuItem key={i}  value={i} primaryText={i} />)
    }

    const actions = [

        <FlatButton
            label="Cancel"
            primary={true}
            style={{color: 'red'}}
            onTouchTap={onClose}
        />,
        <FlatButton
            label="Confirm"
            primary={true}
            style={{color: 'green'}}
            onTouchTap={() => { onApproval(feature)}}
        />,
    ];

    return (<Dialog className="dialog-create"
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={onClose}
                    autoScrollBodyContent={true}

    >
        <p> Editing {feature.get('name')}. </p>

        <div className="left box">
            <TextField
                className="field"
                value={feature.get('name')}
                floatingLabelText="Feature Name:"
                floatingLabelFixed={true}
                disabled={true}
            />
            <TextField
                className="field"
                value={feature.get('created_by')}
                floatingLabelText="Created By:"
                floatingLabelFixed={true}
                disabled={true}
            />
            <TextField
                className="field"
                value={moment(feature.get('created_at')).format('YYYY-MM-DD')}
                floatingLabelText="Created At:"
                floatingLabelFixed={true}
                disabled={true}
            />
        </div>
        <div className="right box">
            <TextField
                className="field"
                defaultValue={feature.get('description')}
                floatingLabelText="Description:"
                floatingLabelFixed={true}
            />

            <SelectField
                value={feature.get('percentage')}
                maxHeight={200} >
            {items}
            </SelectField>

            <TextField
                className="field"
                floatingLabelText="Author name:"
                floatingLabelFixed={true}
            />
            <TextField
                className="field"
                floatingLabelText="Author mail:"
                floatingLabelFixed={true}
            />
        </div>


            <div className="chips-container">
                <h1> Users: </h1>

                {feature.get('users').map((user)=> {
                    return (
                        <Chip
                            className="user"
                            key={user}
                            onRequestDelete={() => {}}
                        >
                            {user}
                        </Chip>
                    )

                })}
        </div>

    </Dialog>)

}

export default CreateDialog;