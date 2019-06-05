import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Action } from 'redux';
import './EnrichedDialog.scss';
import EnrichedData from '../Inputs/EnrichedData';

const UNDEFINED = 'Record not found';
const DOMAINS = EnrichedData.DOMAINS;
const SUB_DOMAINS_MAPPING = EnrichedData.SUB_DOMAINS_MAPPING;
const TARGET_AUDIENCE = EnrichedData.TARGET_AUDIENCE;
const PLATFORM = EnrichedData.PLATFORM;
const COUNTRIES = EnrichedData.COUNTRIES;

interface EnrichedDialogProps {
    closeEnrichedDialog: () => Action;
    isOpen: boolean;
    enriched_data: any;
}

class EnrichedDialog extends React.Component<EnrichedDialogProps> {

  public render() {

      const {
          closeEnrichedDialog,
          isOpen,
          enriched_data
      } = this.props;

      if (!isOpen) {
          return null;
      }

      const enriched_data_exists = Object.keys(enriched_data).length > 1;
      const features = {};

      features['Feature Name'] = enriched_data['name'];
      features['Is PRO'] = enriched_data_exists ? enriched_data['is_pro'] ? 'Yes' : 'No' : UNDEFINED;
      features['Domain'] = enriched_data_exists ? DOMAINS[enriched_data['domain']] : UNDEFINED;
      features['Subdomain'] = enriched_data_exists ? SUB_DOMAINS_MAPPING[enriched_data['domain']][enriched_data['subdomain']] : UNDEFINED;
      features['Buyer Target Audience'] = enriched_data_exists ? TARGET_AUDIENCE.buyer[enriched_data['target_audience_buyer']] : UNDEFINED;
      features['Seller Target Audience'] = enriched_data_exists ? TARGET_AUDIENCE.seller[enriched_data['target_audience_seller']] : UNDEFINED;
      features['Platform'] = enriched_data_exists ? PLATFORM[enriched_data['platform']] : UNDEFINED;
      features['Country'] = enriched_data_exists ? COUNTRIES[enriched_data['country']] : UNDEFINED;

      const entries = Object.keys(features).map(key => [key, features[key]]);

      const dialogActions = [
          <FlatButton label="Return" primary={true} onTouchTap={closeEnrichedDialog}/>,
      ];

      return (<Dialog className="dialog-enriched"
                      actions={dialogActions}
                      open={true}
                      onRequestClose={closeEnrichedDialog}
                      title="Enriched Preveiw"
                      autoScrollBodyContent={true}>

          <table className="enriched-data">
            <tr><th>Enriched Field</th><th>Value</th></tr>
              {
                entries.map(
                  ([label, value]) => <tr><td>{label}</td><td>{value}</td></tr>
                )
              }
          </table>

      </Dialog>)
  }
}

export default EnrichedDialog;