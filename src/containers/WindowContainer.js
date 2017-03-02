import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import Window from '../components/Window/Window'

const mapStateToProps = (state, ownProps) => {
  return {
      features: state.get('features'),
      deleteDialog: state.get('deleteDialog'),
      editDialog: state.get('editDialog'),
      createDialog: state.get('createDialog'),
      snakeMessage: state.get('snakeMessage'),
      googleAuth: state.get('googleAuth')
    }
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(actions, dispatch);

const WindowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Window);

export default WindowContainer;