import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Users from '../Inputs/Users/Users';
import PercentageSelect from '../Inputs/PercentageSelect';
import moment from 'moment';
import './EditDialog.scss';


class EditDialog extends React.Component {

  constructor (props) {
      super(props);

      let state = props.feature.toJS();
      state = Object.assign({}, state, { last_author: '', last_author_mail: '', errors: {} });

      this.state =  state;
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

        if(!this.state.last_author) {
            errors['last_author'] = 'This field is required';
        }

        if(!this.state.created_by) {
            errors['created_by'] = "This field is required cause you didn't create the feature via rollout-dashboard";
        }

        let authorMail = this.state.last_author_mail;

        if(!authorMail) {
            errors['last_author_mail'] = 'This field is required';
        } else if (!authorMail.match(/[a-zA-Z0-9._]{3,}@[a-zA-Z0-9._]{3,}\.[a-zA-Z]+/i)) {
            errors['last_author_mail'] = 'Nice try. Please enter a valid email address.';
        }

        if(!this.state.description) {
            errors['description'] = 'This field is required';
        }

        this.setState({errors});
        return !Object.keys(errors).length;
    }

  render() {

      const {
          onApproval,
          onClose,
          feature
      } = this .props;


      const dialogActions = [

          <FlatButton
              label="Cancel"
              primary={true}
              style={{color: 'red'}}
              onTouchTap={onClose}
          />,
          <FlatButton
              label="Confirm"
              primary={true}
              style={{color: 'green'}}
              onTouchTap={() => {
                const isValid = this.validate();
                if(!isValid) { return; }
                if(!confirm(`Are you sure you want to update the feature ${this.state.name}?`)) { return; }
                onApproval(this.state)}
              }
          />
      ];

      return (<Dialog className="dialog-create"
                      actions={dialogActions}
                      modal={false}
                      open={true}
                      onRequestClose={onClose}
                      autoScrollBodyContent={true}>

          <p> Editing {feature.get('name')}. </p>

          <div className="left box">
              <TextField
                  className="field"
                  value={this.state.name}
                  name="name"
                  floatingLabelText="Feature Name:"
                  floatingLabelFixed={true}
                  disabled={true}/>

              <TextField
                  className="field"
                  value={this.state.created_by}
                  floatingLabelText="Created By:"
                  errorText={this.state.errors['created_by']}
                  floatingLabelFixed={true}
                  disabled={!!this.state.created_by}
                  onChange={ (_,value) => {
                      this.updateInput('created_by', value)
                  }}
              />

              <TextField
                  className="field"
                  value={moment(this.state.created_at || Date.now()).format('YYYY-MM-DD')}
                  floatingLabelText="Created At:"
                  floatingLabelFixed={true}
                  disabled={true}
              />
          </div>
          <div className="right box">
              <PercentageSelect currentValue={this.state.percentage}
                                onChange={ (_, value) => { this.updateInput('percentage', value) }} />

              <TextField
                  className="field"
                  floatingLabelText="Author name:"
                  name="last_author"
                  errorText={this.state.errors['last_author']}
                  floatingLabelFixed={true}
                  onChange={ (_, value) => {
                      this.updateInput('last_author', value)
                  }}
              />

              <TextField
                  className="field"
                  floatingLabelText="Author mail:"
                  floatingLabelFixed={true}
                  name="last_author_mail"
                  errorText={this.state.errors['last_author_mail']}
                  onChange={ (_, value) => {
                      this.updateInput('last_author_mail', value)
                  }}
              />
          </div>

          <TextField
              className="description"
              defaultValue={this.state.description}
              floatingLabelText="Description:"
              errorText={this.state.errors['description']}
              floatingLabelFixed={true}
              multiLine={true}
              fullWidth={true}
              rows={2}
              onChange={ (_,value) => {
                  this.updateInput('description', value)
              }}
          />

          <Users users={this.state.users} onAdd={this.addUser} onDelete={this.removeUser} />

      </Dialog>)
  }


}

export default EditDialog;