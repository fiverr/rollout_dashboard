import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import PercentageSelect from '../Inputs/PercentageSelect';
import Users from '../Inputs/Users/Users'
import './CreateDialog.scss';



class CreateDialog extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
          users: [],
          errors: {}
      };
      this.removeUser = this.removeUser.bind(this);
      this.addUser = this.addUser.bind(this);
      this.updateInput = this.updateInput.bind(this);
  }

    removeUser(userID) {
        const users  = this.state.users.filter(user => user !== userID );
        this.setState({users: users});
    }

    addUser(userID) {
        const users  = this.state.users;
        if(users.filter(user => user == userID ).length) { return; }
        users.push(userID);
        this.setState({users})
    }

    updateInput(inputName, inputValue) {
        const state = {};
        state[inputName] = inputValue;
        this.setState(state);
    }

    validate() {
        const errors = {};

        if(!this.state.description) {
            errors['description'] = 'This field is required';
        }

        let featureName = this.state.name;
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
          onApproval,
          onClose
      } = this .props;

      const dialogActions = [

          <FlatButton label="Cancel" primary={true} style={{color: 'red'}} onTouchTap={onClose}/>,
          <FlatButton label="Confirm" primary={true} style={{color: 'green'}}
                      onTouchTap={() => {
                          const isValid = this.validate();
                          if (!isValid) { return; }
                          onApproval(this.state)}
              }/>,
      ];

      return (<Dialog className="dialog-create"
                      actions={dialogActions}
                      modal={false}
                      open={true}
                      onRequestClose={onClose}
                      autoScrollBodyContent={true}>

          <p> Creating a new feature </p>

          <div className="left box">
              <TextField
                  className="field"
                  value={this.state.name}
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
                  defaultValue={this.state.description}
                  floatingLabelText="Description:"
                  errorText={this.state.errors['description']}
                  floatingLabelFixed={true}
                  onChange={ (_,value) => {
                      this.updateInput('description', value)
                  }}/>

              <PercentageSelect currentValue={this.state.percentage}
                                onChange={ (_, value) => { this.updateInput('percentage', value) }} />
          </div>

          <Users users={this.state.users} onAdd={this.addUser} onDelete={this.removeUser}  />

      </Dialog>)
  }

}

export default CreateDialog;