import * as React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton  from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as moment from 'moment';
import PercentageSelect from '../Inputs/PercentageSelect';
import Users from '../Inputs/Users/Users'
import './CreateDialog.scss';
import {Action} from '../../actions/index'

interface Error {
    [key: string]: string;
} 

interface CreateDialogProps {
    createFeature: (payload: any) => (dispatch: any, getState: any) => Promise<any>
    closeCreateDialog: () => Action<any>;
    isOpen: boolean;
}

interface StateInput {
    [key: string]: string;
}

interface CreateDialogState {
    users?: Array<number>;
    errors?: Error;
    inputs: StateInput;
}

class CreateDialog extends React.Component<CreateDialogProps, CreateDialogState> {

  constructor(props: any) {
      super(props);
      this.state = { users: [], errors: {}, inputs: {} };
      this.removeUser = this.removeUser.bind(this);
      this.addUser = this.addUser.bind(this);
      this.updateInput = this.updateInput.bind(this);
  }

    private removeUser(userID : any) : void {
        const users  = this.state.users.filter(user => user !== userID );
        this.setState({users: users});
    }

    addUser(userID : any) {
        const users  = this.state.users;
        if(users.filter(user => user == userID ).length) { return; }
        users.push(userID);
        this.setState({users})
    }

    updateInput(inputName: string, inputValue : string) {   
        const input = {}  
        input[inputName] = inputValue

        const inputs = Object.assign({}, this.state.inputs, input)
        this.setState({
            inputs
        });
    }

    validate() {
        const errors : Error = {}

        if(!this.state.inputs.description) {
            errors['description'] = 'This field is required';
        }

        let featureName = this.state.inputs.name;
        if(!featureName) {
            errors['name'] = 'This field is required';
        } else if(!featureName.match(/^[a-z_]+$/)){
            errors['name'] = 'This name must follow this pattern "^[a-z_]+$"';
        }

        this.setState({errors});
        return !Object.keys(errors).length;
    }

  render() {

      const {
          createFeature,
          closeCreateDialog,
          isOpen
      } = this.props;

      if(!isOpen) {
          return null;
      }
      
      const dialogActions = [

          <FlatButton label="Cancel" primary={true} style={{color: 'red'}} onTouchTap={closeCreateDialog}/>,
          <FlatButton label="Confirm" primary={true} style={{color: 'green'}}
                      onTouchTap={() => {
                          const isValid = this.validate();
                          if (!isValid) { return; }
                          createFeature(this.state)}
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
                  onChange={ (_,value) => {
                      this.updateInput('name', value)
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

              <PercentageSelect currentValue={parseInt(this.state.inputs.percentage)}
                                onChange={ (_ : any, value : number) => { this.updateInput('percentage', value.toString()) }} />
          </div>

          <Users users={this.state.users} onAdd={this.addUser} onDelete={this.removeUser}  />

      </Dialog>)
  }

}

export default CreateDialog;