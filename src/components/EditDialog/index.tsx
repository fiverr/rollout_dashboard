import * as React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Users from '../Inputs/Users/index';
import PercentageSelect from '../Inputs/PercentageSelect';
import * as moment from 'moment';
import './EditDialog.scss';
import {IFeature} from "../../models/Feature";

interface EditDialogProps {
    updateFeature: any;
    saveUpdatedFeature: any;
    closeEditDialog: any;
    feature: IFeature;
    errors: {
        [key: string]: string;
    };
    open: boolean;
}

interface EditDialogState {
    feature: IFeature;
    errors: {
        [key: string]: string;
    };
}

class EditDialog extends React.Component<EditDialogProps, EditDialogState> {

    constructor(props: any) {
        super(props);
        this.removeUser = this.removeUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.updateFeature = this.updateFeature.bind(this);
    }


    public render() {

        const {
            closeEditDialog,
            errors,
            feature,
        } = this .props;

        if (!feature) {
            return null;
        }

        const dialogActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                style={{color: 'red'}}
                onTouchTap={closeEditDialog}
            />,
            <FlatButton
                label="Confirm"
                primary={true}
                style={{color: 'green'}}
                onTouchTap={() => {
                    const isValid = this.validate();
                    if(!isValid) { return; }
                    if(!confirm(`Are you sure you want to update the feature ${feature.name}?`)) { return; }
                        this.props.saveUpdatedFeature();
                    }
                }
            /> ];

        return (<Dialog className="dialog-create"
                        actions={dialogActions}
                        modal={false}
                        open={true}
                        onRequestClose={closeEditDialog}
                        autoScrollBodyContent={true}>

            <p> Editing <span className="highlight">{feature.name}</span>. </p>

            <div className="left box">
                <TextField
                    className="field"
                    value={feature.name}
                    name="name"
                    floatingLabelText="Feature Name:"
                    floatingLabelFixed={true}
                    disabled={true}/>

                <TextField
                    className="field"
                    value={feature.author}
                    floatingLabelText="Author Name:"
                    errorText={errors.author}
                    floatingLabelFixed={true}
                    disabled={true}
                />

                <TextField
                    className="field"
                    value={moment(feature.createdAt || Date.now()).format('YYYY-MM-DD')}
                    floatingLabelText="Created At:"
                    floatingLabelFixed={true}
                    disabled={true}
                />
            </div>
            <div className="right box">
                <PercentageSelect currentValue={feature.percentage}
                                    onChange={ (_: any, value: any) => { this.updateFeature('percentage', value) }} />

                <TextField
                    className="description"
                    value={feature.description}
                    floatingLabelText="Feature Description:"
                    errorText={errors.description}
                    floatingLabelFixed={true}
                    fullWidth={true}
                    onChange={ (_, value) => {
                        this.updateFeature('description', value);
                    }}
                />

                <Users users={feature.users} onAdd={this.addUser} onDelete={this.removeUser} />
            </div>

        </Dialog>);
  }
    private removeUser(userID: number) {
        const users  = this.props.feature.users.filter((user) => user !== userID );
        this.updateFeature('users', users);
    }

    private addUser(userID: number) {
        const users  = this.props.feature.users;
        if (users.filter((user) => user === userID ).length) { return; }
        this.updateFeature('users', users.concat(userID));
    }

    private updateFeature(inputName: string, inputValue: string | number| number[]) {
        this.props.updateFeature(inputName, inputValue);
    }

    private validate() {
        const errors: any = {};

        if(!this.props.feature.description) {
            errors['description'] = 'This field is required';
        }

        this.updateFeature('errors',errors);
        return !Object.keys(errors).length;
    }
}

export default EditDialog;