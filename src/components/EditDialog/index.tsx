import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Users from '../Inputs/Users/index';
import PercentageSelect from '../Inputs/PercentageSelect';
import './EditDialog.scss';
import {IFeature} from '../../models/Feature';
import EnrichedData from '../Inputs/EnrichedData';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const REASONS = EnrichedData.REASONS;
const REQUIRED_FIELD = 'This field is required';

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
        this.state = {
            errors: {}
        };
    }

    public render() {

        const {
            closeEditDialog,
            feature,
        } = this.props;

        if (!feature) {
            return null;
        }

        const {errors} = this.state;

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
                    if (!isValid) { return; }
                    if (!confirm(`Are you sure you want to update the feature ${feature.name}?`)) { return; }
                        this.props.saveUpdatedFeature();
                    }
                }
            /> ];

        return (<Dialog className="dialog-create dialog-edit"
                        actions={dialogActions}
                        modal={false}
                        open={true}
                        onRequestClose={closeEditDialog}
                        title="Update Feature Form"
                        autoScrollBodyContent={true}>

            <p> Editing <span className="highlight">{feature.name}</span>. </p>

            <div>

                <TextField
                    className="description"
                    value={feature.description}
                    floatingLabelText="Description"
                    errorText={errors.description}
                    floatingLabelFixed={true}
                    fullWidth={true}
                    onChange={ (_, value) => {
                        this.updateFeature('description', value);
                    }}
                />

                <SelectField value={feature.update_reason} 
                             key="update_reason"
                             floatingLabelText="Update Reason"
                             errorText={errors.update_reason}
                             autoWidth={false}
                             onChange={(_, __, value: string) => { this.updateFeature('update_reason', value); }}>
                    {Object.keys(REASONS).map((key) => 
                        <MenuItem value={key} 
                                  insetChildren={true} 
                                  primaryText={REASONS[key]} 
                                  key={key} /> )}
                </SelectField>

                <PercentageSelect currentValue={feature.percentage}
                                    onChange={ (_: any, value: number) => { this.updateFeature('percentage', value) }} />

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

        if (!this.props.feature.description) {
            errors['description'] = REQUIRED_FIELD;
        }

        if (!this.props.feature.update_reason) {
            errors['update_reason'] = REQUIRED_FIELD;
        }
        
        this.setState({errors});
        return !Object.keys(errors).length;
    }
}

export default EditDialog;