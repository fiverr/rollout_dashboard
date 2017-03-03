import React from 'react'
import Dialog from 'material-ui/Dialog';
import './Auth-Dialog.scss';

class AuthDialog extends React.Component {

    constructor (props) {
      super(props);
    }

    componentDidMount() {
        gapi.load('client', this.initClient.bind(this));

    }

    initClient() {
        gapi.client.init({
            'apiKey': GOOGLE_AUTH_API_KEY,
            'clientId': GOOGLE_AUTH_CLIENT_ID,
            'scope': 'email profile'
        }).then(() => {
            this.GoogleAuth = gapi.auth2.getAuthInstance();
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
      const basicProfile = user.getBasicProfile();
      this.props.saveAuthenticationData(basicProfile.getId(),`${basicProfile.getGivenName()} ${basicProfile.getFamilyName()}`,basicProfile.getEmail())
  }

  render() {
      return (<Dialog className="auth-dialog"
                      modal={true}
                      open={true}>

          <p> Please authenticate yourself before continuing further </p>
          <a href="#!" ref="login" className="btn-login" onClick={this.connect.bind(this)}>
                    <i className="google"> </i>
                    Continue with Google
                </a>
      </Dialog>)
  }

}

export default AuthDialog;