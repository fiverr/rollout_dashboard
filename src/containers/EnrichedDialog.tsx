import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeEnrichedDialog } from '../actions';
import EnrichedDialog from '../components/EnrichedDialog/index';

const mapStateToProps = (state: any) => {
  return {
      isOpen: state.get('createEnrichedDialogVisible'),
      enriched_data: state.get('enriched_data')
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => bindActionCreators({ closeEnrichedDialog }, dispatch);

const EnrichedDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EnrichedDialog);

export default EnrichedDialogContainer;