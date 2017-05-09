import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions' 
import Component from '../components/Features/'

const mapStateToProps = (state: any) => {
  return {
      features: state.get('features'),
      deleteDialog: state.get('deleteDialog'),
      editDialog: state.get('editDialog'),
      createDialog: state.get('createDialog'),
      googleAuth: state.get('googleAuth')
    }
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => bindActionCreators((actions as any), dispatch);

const Features = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default Features;