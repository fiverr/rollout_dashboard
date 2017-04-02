import * as React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

interface DeleteDialogProps {
    onApproval: (featureName: string) => void,
    onClose: ()=> void,
    featureName: string

}

const DeleteDialog = (props: DeleteDialogProps) => {

    const actions = [

        <FlatButton
            label="Cancel"
            primary={true}
            style={{color: 'red'}}
            onTouchTap={props.onClose}
        />,
        <FlatButton
            label="Confirm"
            primary={true}
            style={{color: 'green'}}
            onTouchTap={() => { props.onApproval(props.featureName)}}
        />,
    ];

    return (<Dialog
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={props.onClose}>
        Are you sure you want to delete <span className="highlight">{props.featureName}</span> ?
    </Dialog>)
}

export default DeleteDialog;