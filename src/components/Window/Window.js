import React from 'react'

import Snackbar from 'material-ui/Snackbar';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import EditDialog from '../EditDialog/EditDialog';
import CreateDialog from '../CreateDialog/CreateDialog';
import AuthDialog from '../AuthDialog/AuthDialog';
import './Window.scss';
import 'fixed-data-table/dist/fixed-data-table.css';
import Features from '../Features/';

class Window extends React.Component {


    componentDidMount() {
        this.props.getFeatures();
    }


    render() {

        const {
            deleteDialog,
            closeDeleteDialog,
            deleteFeature,
            createDialog,
            closeCreateDialog,
            updateFeature,
            editDialog,
            closeEditDialog,
            createFeature,
            snakeMessage,
            clearSnakeMessage,
            googleAuth,
            googleAuthentication
        } = this.props;


        if(!googleAuth) {
            return (<AuthDialog saveAuthenticationData={googleAuthentication} />)
        }

        return (
            <div>
                <Features {...this.props} />

                { deleteDialog && <DeleteDialog featureName={deleteDialog.get('featureName')} onClose={closeDeleteDialog} onApproval={deleteFeature}/>}
                { editDialog && <EditDialog feature={editDialog.get('feature')} onClose={closeEditDialog} onApproval={updateFeature}/>}
                { createDialog && <CreateDialog onClose={closeCreateDialog} onApproval={createFeature}/>}
                { snakeMessage  && <Snackbar open={true} message={snakeMessage} autoHideDuration={5000} onRequestClose={clearSnakeMessage} /> }
            </div>
        )
    }
}

export default Window;