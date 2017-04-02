import * as React from 'react'
import Dialog from 'material-ui/Dialog';
import './Auth-Dialog.scss';

interface AuthDialogProps {
    saveAuthenticationData: (idToken: string, username: string) => void
}

class AuthDialog extends React.Component<AuthDialogProps, {}> {

    public GoogleAuth: any;

    componentDidMount() {
        window.gapi.load('client', this.initClient.bind(this));

    }

    initClient() {
        window.gapi.client.init({
            'apiKey': 'GOOGLE_AUTH_API_KEY',
            'clientId': 'GOOGLE_AUTH_CLIENT_ID',
            'scope': 'email profile'
        }).then(() => {
            this.GoogleAuth = window.gapi.auth2.getAuthInstance();
            this.GoogleAuth.isSignedIn.listen(this.statusChanged.bind(this));
            this.connect();
        });
    }

  connect() {
      if (this.GoogleAuth.isSignedIn.get()) {
          this.statusChanged();
      } else {
          this.GoogleAuth.signIn();
      }
  }

  statusChanged() {
      const user = this.GoogleAuth.currentUser.get();
      const authResponse = user.getAuthResponse();
      this.props.saveAuthenticationData(authResponse.id_token, user.getBasicProfile().getName())
  }

  render() {
      return (
      <Dialog className="auth-dialog" modal={true} open={true}>
        <p> Please authenticate yourself before continuing further </p>
        <a href="#!" ref="login" className="btn-login" onClick={this.connect.bind(this)}>
            <i className="google"> </i>
            Continue with Google
        </a>
      </Dialog>)
  }

}

export default AuthDialog;