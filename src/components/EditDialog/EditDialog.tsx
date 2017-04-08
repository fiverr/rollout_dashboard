import * as React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Users from '../Inputs/Users/Users';
import PercentageSelect from '../Inputs/PercentageSelect';
import * as moment from 'moment';
import './EditDialog.scss';

interface EditDialogProps {
    updateFeature: any,
    saveUpdatedFeature: any;
    closeEditDialog :any,
    feature :any,
    open: any
}

interface EditDialogState {
    users: any,
    description: string,
    errors: any,
    name: string,
    author: string,
    created_at: any,
    percentage: any
}

class EditDialog extends React.Component<EditDialogProps,EditDialogState> {

  constructor (props: any) {
      super(props);
      this.removeUser = this.removeUser.bind(this);
      this.addUser = this.addUser.bind(this);
      this.updateInput = this.updateInput.bind(this);
  }
    
    removeUser(userID: number) {
        const users  = this.props.feature.get('users').filter((user: any) => user !== userID );
        this.updateInput('users', users)
    }

    addUser(userID: number) {
        const users  = this.props.feature.get('users');
        if(users.filter((user: any) => user == userID ).length) { return; }
        this.updateInput('users', users.push(userID))
    }

    updateInput(inputName: any, inputValue: any) {
        this.props.updateFeature(inputName, inputValue);
    }

    validate() {
        const errors: any = {};

        if(!this.props.feature.get('description')) {
            errors['description'] = 'This field is required';
        }

        this.updateInput('errors', errors)
        return !Object.keys(errors).length;
    }

  render() {

      const {
          closeEditDialog,
          feature
      } = this .props;

    if(!feature.count()) {
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
                if(!confirm(`Are you sure you want to update the feature ${feature.get('name')}?`)) { return; }
                    this.props.saveUpdatedFeature();
                }
              }
          />
      ];

      return (<Dialog className="dialog-create"
                      actions={dialogActions}
                      modal={false}
                      open={true}
                      onRequestClose={closeEditDialog}
                      autoScrollBodyContent={true}>

          <p> Editing <span className="highlight">{feature.get('name')}</span>. </p>

          <div className="left box">
              <TextField
                  className="field"
                  value={feature.get('name')}
                  name="name"
                  floatingLabelText="Feature Name:"
                  floatingLabelFixed={true}
                  disabled={true}/>

              <TextField
                  className="field"
                  value={feature.get('author')}
                  floatingLabelText="Author Name:"
                  errorText={feature.getIn(['errors','author'])}
                  floatingLabelFixed={true}
                  disabled={true}
              />

              <TextField
                  className="field"
                  value={moment(feature.get('created_at') || Date.now()).format('YYYY-MM-DD')}
                  floatingLabelText="Created At:"
                  floatingLabelFixed={true}
                  disabled={true}
              />
          </div>
          <div className="right box">
              <PercentageSelect currentValue={feature.get('percentage')}
                                onChange={ (_: any, value: any) => { this.updateInput('percentage', value) }} />

              <TextField
                  className="description"
                  value={feature.get('description')}
                  floatingLabelText="Feature Description:"
                  errorText={feature.getIn(['errors','description'])}
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={ (_,value) => {
                      this.updateInput('description', value)
                  }}
              />

              <Users users={feature.get('users') || []} onAdd={this.addUser} onDelete={this.removeUser} />
          </div>

      </Dialog>)
  }
}

export default EditDialog;