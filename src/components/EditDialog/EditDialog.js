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
      state = Object.assign({}, state, { errors: {}});

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

          <p> Editing <span className="highlight">{feature.get('name')}</span>. </p>

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
                  value={this.state.author}
                  floatingLabelText="Author Name:"
                  errorText={this.state.errors['author']}
                  floatingLabelFixed={true}
                  disabled={true}
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
                  className="description"
                  defaultValue={this.state.description}
                  floatingLabelText="Feature Description:"
                  errorText={this.state.errors['description']}
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={ (_,value) => {
                      this.updateInput('description', value)
                  }}
              />

              <Users users={this.state.users} onAdd={this.addUser} onDelete={this.removeUser} />
          </div>

      </Dialog>)
  }
}

export default EditDialog;