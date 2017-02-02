import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const DeleteDialog = ({onApproval, onClose, featureName}) => {
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
            onTouchTap={() => { onApproval(featureName)}}
        />,
    ];

    return (<Dialog
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={onClose}
    >
        Are you sure you want to delete {featureName} ?
    </Dialog>)

}

export default DeleteDialog;