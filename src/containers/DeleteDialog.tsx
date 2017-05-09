import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions' 
import DeleteDialog from '../components/DeleteDialog/'

const mapStateToProps = (state: any) => {
  return {
      featureName: state.getIn(['deleteDialog','featureName'])
    }
};


const mapDispatchToProps = (dispatch: any, ownProps: any) => bindActionCreators((actions as any), dispatch);

const DeleteDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteDialog);

export default DeleteDialogContainer;