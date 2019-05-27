import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as moment from 'moment';
import PercentageSelect from '../Inputs/PercentageSelect';
import Users from '../Inputs/Users/';
import './CreateDialog.scss';
import { Action } from 'redux';
import {Feature, IFeature} from '../../models/Feature';
import styles from '../Inputs/Styles';

const customContentStyle = {
  width: '40%',
  maxWidth: 'none',
};

interface CreateDialogProps {
    createFeature: (payload: Feature) => (dispatch: any, getState: any) => Promise<any>;
    closeCreateDialog: () => Action;
    isOpen: boolean;
}

interface CreateDialogState {
    users?: number[];
    errors?: {
        [key: string]: string;
    };
    inputs: {
        name: string;
        description?: string;
        percentage?: number;
    };
}

class CreateDialog extends React.Component<CreateDialogProps, CreateDialogState> {

    constructor(props: any) {
      super(props);
      this.state = { users: [], errors: {}, inputs: {name: ''} };
      this.removeUser = this.removeUser.bind(this);
      this.addUser = this.addUser.bind(this);
      this.updateInput = this.updateInput.bind(this);
    }

    public validate() {
        const errors = {};

        if (!this.state.inputs.description) {
            errors['description'] = 'This field is required';
        }

        const featureName = this.state.inputs.name;
        if(!featureName) {
            errors['name'] = 'This field is required';
        } else if(!featureName.match(/^[a-z_]+$/)) {
            errors['name'] = 'This name must follow this pattern "^[a-z_]+$"';
        }

        this.setState({errors});
        return !Object.keys(errors).length;
    }

    public createFeature(): Feature {
        const options: IFeature = Object.assign({}, this.state.inputs, {users: this.state.users});
        return new Feature(options);
    }

  public render() {

      const {
          createFeature,
          closeCreateDialog,
          isOpen,
      } = this.props;

      if (!isOpen) {
          return null;
      }
      
      const dialogActions = [

          <FlatButton label="Cancel" primary={true} style={{color: 'red'}} onTouchTap={closeCreateDialog}/>,
          <FlatButton label="Confirm" primary={true} style={{color: 'green'}}
                      onTouchTap={() => {
                          const isValid = this.validate();
                          if (!isValid) { return; }

                          createFeature(this.createFeature());
                      }
              }/>,
      ];

      return (<Dialog className="dialog-create"
                      actions={dialogActions}
                      modal={false}
                      contentStyle={customContentStyle}
                      open={true}
                      onRequestClose={closeCreateDialog}
                      title="New Feature Form"
                      titleStyle={styles.dialogTitleStyle}
                      autoScrollBodyContent={true}>

          <div>
              <TextField
                  className="field"
                  fullWidth={true}
                  value={this.state.inputs.name}
                  name="name"
                  floatingLabelText="Feature Name"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  errorText={this.state.errors['name']}
                  onChange={ (_, value) => {
                      this.updateInput('name', value);
                  }}/>

              <PercentageSelect currentValue={this.state.inputs.percentage} 
                  onChange={ (_ : any, value: number) => { this.updateInput('percentage', value) }} />

              <TextField
                    className="field"
                    fullWidth={true}
                    defaultValue={this.state.inputs[name]}
                    errorText={this.state.errors[name]}
                    floatingLabelText="Human Readable Description"
                    hintText="So normal people can understand your shit"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    onChange={ (_, value: string) => {
                        this.updateInput(name, value);
                    }}/>

              <TextField
                  className="field"
                  fullWidth={true}
                  value={moment().format('YYYY-MM-DD')}
                  floatingLabelText="Created At"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  disabled={true}/>

              <Users users={this.state.users} onAdd={this.addUser} onDelete={this.removeUser}  />
          </div>

          <div className="extended-attributes">
            {
              this.extendedAttributes().map(({name, ...rest}) => <TextField
                    className="field"
                    fullWidth={true}
                    defaultValue={this.state.inputs[name]}
                    errorText={this.state.errors[name]}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    {...rest}
                    onChange={ (_, value: string) => {
                        this.updateInput(name, value);
                    }}/>)
            }
          </div>

      </Dialog>)
  }

    private removeUser(userID: any): void {
        const users  = this.state.users.filter((user) => user !== userID );
        this.setState({users});
    }

    private addUser(userID: any) {
        const users  = this.state.users;
        if (users.filter((user) => user === userID ).length) { return; }

        users.push(userID);
        this.setState({users});
    }

    private updateInput(inputName: string, inputValue: string|number) {
        const input = {};
        input[inputName] = inputValue;

        const inputs = Object.assign({}, this.state.inputs, input);
        this.setState({
            inputs,
        });
    }

    private extendedAttributes() {
      return [
        {name: 'new-attribute', floatingLabelText: 'new-attribute', hintText: 'new-attribute'}
      ];
    }

}

export default CreateDialog;