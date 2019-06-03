import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as moment from 'moment';
import PercentageSelect from '../Inputs/PercentageSelect';
import Users from '../Inputs/Users/';
import './CreateDialog.scss';
import { Action } from 'redux';
import {Feature, IFeature} from '../../models/Feature';
import styles from '../Styles/PredefinedStyles';
import EnrichedData from '../Inputs/EnrichedData';

const REQUIRED_FIELD = 'This field is required';
const DOMAINS = EnrichedData.DOMAINS;
const SUB_DOMAINS_MAPPING = EnrichedData.SUB_DOMAINS_MAPPING;
const TARGET_AUDIENCE = EnrichedData.TARGET_AUDIENCE;
const PLATFORM = EnrichedData.PLATFORM;
const COUNTRIES = EnrichedData.COUNTRIES;

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
        domain?: string;
        subdomain?: string;
        target_audience_buyer?: string;
        target_audience_seller?: string;
        is_pro?: boolean;
        platform?: string;
        country?: string;
    };
}

class CreateDialog extends React.Component<CreateDialogProps, CreateDialogState> {

    constructor(props: any) {
      super(props);
      this.state = {
        users: [],
        errors: {},
        inputs: {
          name: '',
          domain: '',
          subdomain: '',
          target_audience_buyer: '',
          target_audience_seller: '',
          is_pro: false,
          platform: '',
          country: '',
        }
      };

      this.removeUser = this.removeUser.bind(this);
      this.addUser = this.addUser.bind(this);
      this.updateInput = this.updateInput.bind(this);
    }

    public validate() {
        const errors = {};

        if (!this.state.inputs.description) {
            errors['description'] = REQUIRED_FIELD;
        }

        const featureName = this.state.inputs.name;
        if(!featureName) {
            errors['name'] = REQUIRED_FIELD;
        } else if(!featureName.match(/^[a-z_]+$/)) {
            errors['name'] = 'This name must follow this pattern "^[a-z_]+$"';
        }

        if (!this.state.inputs.domain) {
            errors['domain'] = REQUIRED_FIELD;
        }

        if (!this.state.inputs.subdomain) {
            errors['subdomain'] = REQUIRED_FIELD;
        }

        if (!this.state.inputs.target_audience_buyer) {
            errors['target_audience_buyer'] = REQUIRED_FIELD;
        }

        if (!this.state.inputs.target_audience_seller) {
            errors['target_audience_seller'] = REQUIRED_FIELD;
        }

        if (!this.state.inputs.platform) {
            errors['platform'] = REQUIRED_FIELD;
        }

        if (!this.state.inputs.country) {
            errors['country'] = REQUIRED_FIELD;
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

      const { 
          inputs,
          errors,
          users
      } = this.state;

      const {
          domain,
          subdomain,
          target_audience_buyer,
          target_audience_seller,
          name,
          description,
          percentage,
          platform,
          country,
      } = inputs;

      const subdomains = SUB_DOMAINS_MAPPING[domain] || [];
      const target_audience_buyer_list = TARGET_AUDIENCE.buyer;
      const target_audience_list_seller = TARGET_AUDIENCE.seller;

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
                      title="New Feature Form"
                      autoScrollBodyContent={true}>

          <div>

              <TextField
                  className="field"
                  fullWidth={true}
                  value={name}
                  name="name"
                  floatingLabelText="Feature Name"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  errorText={errors['name']}
                  onChange={ (_, value) => {
                      this.updateInput('name', value);
                  }}/>

              <TextField
                    className="field"
                    fullWidth={true}
                    multiLine={true}
                    defaultValue={description}
                    errorText={errors['description']}
                    floatingLabelText="Description"
                    hintText="Human readable description, please"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    onChange={ (_, value: string) => {
                        this.updateInput('description', value);
                    }}/>

              <PercentageSelect currentValue={percentage} 
                  onChange={ (_ : any, value: number) => { this.updateInput('percentage', value) }} />

              <TextField
                  className="field"
                  fullWidth={true}
                  value={moment().format('YYYY-MM-DD')}
                  floatingLabelText="Created At"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  disabled={true}/>

              <Users users={users} onAdd={this.addUser} onDelete={this.removeUser}  />

              <Toggle label="Is PRO"
                      labelPosition="right"
                      defaultToggled={false}
                      style={styles.toggle}
                      onToggle={(_, value) => this.updateInput('is_pro', value) } />

              <div>
                <SelectField value={domain} 
                             key="domain"
                             floatingLabelText="Select a Domain"
                             style={(styles.customWidth)}
                             autoWidth={false}
                             errorText={errors['domain']}
                             onChange={(_, __, value: string) => { this.updateInput('domain', value); }}>
                    {Object.keys(DOMAINS).map((key) => 
                        <MenuItem value={key} 
                                  insetChildren={true} 
                                  primaryText={DOMAINS[key]} 
                                  key={key} /> )}
                </SelectField>

                <SelectField value={subdomain} 
                             key="subdomain"
                             floatingLabelText="Select a Subdomain"
                             style={(styles.customWidth)}
                             autoWidth={false}
                             errorText={errors['subdomain']}
                             onChange={(_, __, value: string) => { this.updateInput('subdomain', value); }}>
                     {Object.keys(subdomains).map(key => 
                         <MenuItem value={key}
                                   insetChildren={true} 
                                   primaryText={subdomains[key]} 
                                   key={key} />
                         )}
                </SelectField>
              </div>

              <div>
                <SelectField value={target_audience_buyer} 
                             key="target_audience_buyer"
                             floatingLabelText="Select the Buyer Targeted Audience"
                             style={(styles.customWidth)}
                             autoWidth={false}
                             errorText={errors['target_audience_buyer']}
                             onChange={(_, __, value: string) => { this.updateInput('target_audience_buyer', value); }}>
                    {Object.keys(target_audience_buyer_list).map((key) => 
                        <MenuItem value={key} 
                                  insetChildren={true} 
                                  primaryText={target_audience_buyer_list[key]} 
                                  key={key} /> )}
                </SelectField>

                <SelectField value={target_audience_seller} 
                             key="target_audience_seller"
                             floatingLabelText="Select the Seller Targeted Audience"
                             style={(styles.customWidth)}
                             autoWidth={false}
                             errorText={errors['target_audience_seller']}
                             onChange={(_, __, value: string) => { this.updateInput('target_audience_seller', value); }}>
                    {Object.keys(target_audience_list_seller).map((key) => 
                        <MenuItem value={key} 
                                  insetChildren={true} 
                                  primaryText={target_audience_list_seller[key]} 
                                  key={key} /> )}
                </SelectField>
              </div>

              <div>
                <SelectField value={platform} 
                             key="platform"
                             floatingLabelText="Select Platform"
                             style={(styles.customWidth)}
                             autoWidth={false}
                             errorText={errors['platform']}
                             onChange={(_, __, value: string) => { this.updateInput('platform', value); }}>
                    {Object.keys(PLATFORM).map((key) => 
                        <MenuItem value={key} 
                                  insetChildren={true} 
                                  primaryText={PLATFORM[key]} 
                                  key={key} /> )}
                </SelectField>

                <SelectField value={country} 
                             key="country"
                             floatingLabelText="Select a country"
                             style={(styles.customWidth)}
                             autoWidth={false}
                             errorText={errors['country']}
                             onChange={(_, __, value: string) => { this.updateInput('country', value); }}>
                    {Object.keys(COUNTRIES).map((key) => 
                        <MenuItem value={key} 
                                  insetChildren={true} 
                                  primaryText={COUNTRIES[key]} 
                                  key={key} /> )}
                </SelectField>
              </div>
              
          </div>

      </Dialog>)
  }

    private removeUser(userID: any): void {
        const users  = this.state.users.filter((user) => user !== userID );
        this.setState({users});
    }

    private addUser(userID: any) {
        const { users }  = this.state;
        if (users.filter((user) => user === userID ).length) { return; }

        users.push(userID);
        this.setState({users});
    }

    private updateInput(inputName: string, inputValue: string|number|boolean) {
        const input = {};
        input[inputName] = inputValue;

        const inputs = Object.assign({}, this.state.inputs, input);
        this.setState({
            inputs,
        });
    }

}

export default CreateDialog;