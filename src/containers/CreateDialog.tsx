import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions' 
import CreateDialog from '../components/CreateDialog/CreateDialog'



const mapStateToProps = (state: any) => {
  return {
      isOpen: state.get('createDialog'),
    }
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => bindActionCreators((actions as any), dispatch);

const CreateDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateDialog);

export default CreateDialogContainer;