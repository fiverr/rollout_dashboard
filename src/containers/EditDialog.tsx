import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions' ;
import EditDialog from '../components/EditDialog/index';

const mapStateToProps = (state: any) => {
  return {
      feature: state.get('editDialog') && state.get('editDialog').feature,
      errors: {},
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => bindActionCreators((actions as any), dispatch);

const EditDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditDialog);

export default EditDialogContainer;