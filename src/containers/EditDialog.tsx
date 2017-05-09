import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions' 
import * as Immutable from 'immutable'
import EditDialog from '../components/EditDialog/EditDialog'

const mapStateToProps = (state: any) => {
  return {
      feature: state.getIn(['editDialog','feature']) || Immutable.Map(),
    }
};


const mapDispatchToProps = (dispatch: any, ownProps: any) => bindActionCreators((actions as any), dispatch);

const EditDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDialog);

export default EditDialogContainer;