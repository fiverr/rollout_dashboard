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

const customContentStyle = {
  width: '40%',
  maxWidth: 'none',
};

const DOMAINS = {
    all: 'All',
    payments: 'Payments',
    homepage: 'Homepage',
    algos: 'Algos',
    gigs: 'Gigs',
    buyers: 'Buyers',
    sellers: 'Sellers',
    communication: 'Communication',
    marketing: 'Marketing',
    customer_support: 'Customer Support',
    performance: 'Performance',
    platform: 'Platform',
    quality: 'Quality',
};

const SUB_DOMAINS_MAPPING = {
    payments: {
        payment_page: 'Payment Page',
        shopping_balance: 'Shopping Balance',
        sales_balance: 'Sales Balance',
        withdrawal: 'Withdrawal',
        refunds: 'Refunds',
    },
    homepage: {
        homepage: 'Homepage',
        login: 'Login',
        registration: 'Registration',
    },
    algos: {
        search: 'Search',
        subcategories: 'Subcategories',
        recomendations: 'Recomendations',
    },
    gigs: {
        gig_page: 'Gig Page',
        packages: 'Packages',
        gig_components: 'Gig Components',
    },
    buyers: {
        checkout: 'Checkout',
        order_page: 'Order Page',
        buyer_request: 'Buyer Request',
        pro: 'PRO',
    },
    sellers: {
        user_page: 'User Page',
        seller_dashboard: 'Seller Dashboard',
        seller_onboarding: 'Seller Onboarding',
        pro: 'PRO',
    },
    communication: {
        inbox: 'Inbox',
        order_page: 'Order Page',
        custom_offer: 'Custom Offer',
    },
    all: {
        all: 'All',
    },
    marketing: {
        affiliate: 'Affiliate',
        seo: 'SEO',
        retention: 'Retention',
        sem: 'SEM',
        social: 'Social',
        brand: 'Brand',
    },
    customer_support: {
        customer_support: 'Customer Support',
        customer_success: 'Customer Success',
        education: 'Education',
        editorial: 'Editorial',
        mi: 'MI',
        risk: 'Risk',
        trust_and_safety: 'Trust & Safety',
    },
    performance: {
        performance: 'Performance',
    },
    platform: {
        platform: 'Platform',
    },
    quality: {
        quality: 'Quality',
    },
};

const TARGET_AUDIENCE = {
  buyer: {
    all: 'All',
    none: 'None',
    guest: 'Guest',
    rnc: 'RNC',
    ftb: 'FTB',
    repeat_buyer: 'Repeat Buyer',
  },
  seller: {
    all: 'All',
    none: 'None',
    guest: 'Guest',
    fts: 'FTS',
    repeat_seller: 'Repeat Seller',
    gigger: 'Gigger',
  }
};

const PLATFORM = {
  all: 'All',
  app: 'App',
  web: 'Web',
  mobile_web: 'Mobile Web',
  web_and_mobile_web: 'Web & Mobile Web',
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
        domain?: string;
        subdomain?: string;
        target_audience_buyer?: string;
        target_audience_seller?: string;
        is_pro?: boolean;
        platform?: string;
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
          domain: 'all',
          subdomain: 'all',
          target_audience_buyer: 'all',
          target_audience_seller: 'all',
          is_pro: false,
          platform: 'all',
        }
      };

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
      } = inputs;

      const subdomains = SUB_DOMAINS_MAPPING[domain];
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
                             onChange={(_, __, value: string) => { this.updateInputDomain('domain', value); }}>
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
                             onChange={(_, __, value: string) => { this.updateInput('platform', value); }}>
                    {Object.keys(PLATFORM).map((key) => 
                        <MenuItem value={key} 
                                  insetChildren={true} 
                                  primaryText={PLATFORM[key]} 
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

    private updateInputDomain(inputName: string, inputValue: string|number) {
        const input = {};
        input[inputName] = inputValue;
        input['subdomain'] = Object.keys(SUB_DOMAINS_MAPPING[inputValue])[0];

        const inputs = Object.assign({}, this.state.inputs, input);
        this.setState({
            inputs,
        });
    }

}

export default CreateDialog;