import * as React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

interface DeleteDialogProps {
    deleteFeature: (featureName: string) => void;
    closeDeleteDialog: ()=> void;
    featureName: string;
}

const DeleteDialog = (props: DeleteDialogProps) => {
    if (!props.featureName) {
        return null;
    }
    
    const actions = [

        <FlatButton
            label="Cancel"
            primary={true}
            style={{color: 'red'}}
            onTouchTap={props.closeDeleteDialog}
        />,
        <FlatButton
            label="Confirm"
            primary={true}
            style={{color: 'green'}}
            onTouchTap={() => { props.deleteFeature(props.featureName)}}
        />,
    ];

    return (<Dialog
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={props.closeDeleteDialog}>
        Are you sure you want to delete <span className="highlight">{props.featureName}</span> ?
    </Dialog>)
}

export default DeleteDialog;