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
        const options: IFeature = Object.assign({}, this.state.inputs, this.state.users);
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
                      open={true}
                      onRequestClose={closeCreateDialog}
                      autoScrollBodyContent={true}>

          <p> Creating a new feature </p>

          <div className="left box">
              <TextField
                  className="field"
                  value={this.state.inputs.name}
                  name="name"
                  floatingLabelText="Feature Name:"
                  errorText={this.state.errors['name']}
                  floatingLabelFixed={true}
                  onChange={ (_, value) => {
                      this.updateInput('name', value);
                  }}/>

              <TextField
                  className="field"
                  value={moment().format('YYYY-MM-DD')}
                  floatingLabelText="Created At:"
                  floatingLabelFixed={true}
                  disabled={true}/>
          </div>

          <div className="right box">
              <TextField
                  className="field"
                  defaultValue={this.state.inputs.description}
                  floatingLabelText="Description:"
                  errorText={this.state.errors['description']}
                  floatingLabelFixed={true}
                  onChange={ (_,value) => {
                      this.updateInput('description', value)
                  }}/>

              <PercentageSelect currentValue={this.state.inputs.percentage}
                                onChange={ (_ : any, value: number) => { this.updateInput('percentage', value) }} />
          </div>

          <Users users={this.state.users} onAdd={this.addUser} onDelete={this.removeUser}  />

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

}

export default CreateDialog;