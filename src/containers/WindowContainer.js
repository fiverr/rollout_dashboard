import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import Window from '../components/Window'

const mapStateToProps = (state, ownProps) => {
  return {
      features: state.get('features')
    }
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(actions, dispatch);

const WindowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Window);

export default WindowContainer;