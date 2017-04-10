import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeCreateDialog, createFeature } from '../actions' 
import CreateDialog from '../components/CreateDialog/CreateDialog'

const mapStateToProps = (state: any) => {
  return {
      isOpen: state.get('createDialogVisible')
    }
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => bindActionCreators({ closeCreateDialog, createFeature }, dispatch);

const CreateDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateDialog);

export default CreateDialogContainer;