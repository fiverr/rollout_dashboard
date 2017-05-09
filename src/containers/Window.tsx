import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Window from '../components/Window/';

const mapStateToProps = (state: any) => {
  return {
      features: state.get('features'),
      deleteDialog: state.get('deleteDialog'),
      editDialog: state.get('editDialog'),
      createDialog: state.get('createDialog'),
      snakeMessage: state.get('snakeMessage'),
      googleAuth: state.get('googleAuth'),
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => bindActionCreators((actions as any), dispatch);

const WindowContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)((Window as any));

export default WindowContainer;

