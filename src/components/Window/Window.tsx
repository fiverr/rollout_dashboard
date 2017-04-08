import * as React from 'react'
import Snackbar from 'material-ui/Snackbar';
import DeleteDialog from '../../containers/DeleteDialog';
import EditDialog from '../../containers/EditDialog';
import CreateDialog from '../../containers/CreateDialog';
import AuthDialog from '../AuthDialog/AuthDialog';
import './Window.scss';
import 'fixed-data-table/dist/fixed-data-table.css';
import Features from '../../containers/Features';
import GithubContribute from '../GithubContribute/Index';

interface WindowProps {
    getFeatures: () => void;
    deleteDialog: any;
    closeDeleteDialog: () => void,
    deleteFeature: (featureName : string) => void,
    snakeMessage: (message: string) => void,
    clearSnakeMessage: () => void,
    googleAuth: () => void,
    googleAuthentication: () => void
}

class Window extends React.Component<WindowProps, {}>{

    public componentDidMount() {
        this.props.getFeatures();
    }

    public render() {

        const {
                snakeMessage,
                clearSnakeMessage,
                googleAuth,
                googleAuthentication
            } = this.props;
        

        if (!googleAuth) {
            return (<AuthDialog saveAuthenticationData={googleAuthentication} />)
        }

        return (
                <div>
                    <GithubContribute />
                    <Features />
                    <DeleteDialog />
                    <EditDialog />
                    <CreateDialog />
                    { snakeMessage  && <Snackbar open={true} message={snakeMessage} autoHideDuration={5000} onRequestClose={clearSnakeMessage} /> }
                </div>
        
        )
    }
}

export default Window;