import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import './Auth-Dialog.scss';

interface AuthDialogProps {
    saveAuthenticationData: (idToken: string, username: string, mail: string) => void;
}

declare const GOOGLE_AUTH_CLIENT_ID: string;
declare const GOOGLE_AUTH_API_KEY: string;

class AuthDialog extends React.Component<AuthDialogProps, {}> {

    public GoogleAuth: any;

    public componentDidMount() {
        (window as any).gapi.load('client', this.initClient.bind(this));
    }

    public render() {
        return (
            <Dialog className="auth-dialog" modal={true} open={true}>
                <p> Please authenticate yourself before continuing further </p>
                <a href="#!" ref="login" className="btn-login" onClick={this.connect.bind(this)}>
                    <i className="google"> </i>
                    Continue with Google
                </a>
            </Dialog>);
    }

    private initClient() {
         (window as any).gapi.client.init({
            apiKey: GOOGLE_AUTH_API_KEY,
            clientId: GOOGLE_AUTH_CLIENT_ID,
            scope: 'email profile',
        }).then(() => {
            this.GoogleAuth =  (window as any).gapi.auth2.getAuthInstance();
            this.GoogleAuth.isSignedIn.listen(this.statusChanged.bind(this));
            this.connect();
        });
    }

  private connect() {
      if (this.GoogleAuth.isSignedIn.get()) {
          this.statusChanged();
      } else {
          this.GoogleAuth.signIn();
      }
  }
  private statusChanged() {
      const user = this.GoogleAuth.currentUser.get();
      const authResponse = user.getAuthResponse();
      const basicProfile = user.getBasicProfile();

      this.props.saveAuthenticationData(authResponse.id_token, basicProfile.getName(), basicProfile.getEmail());
  }
}

export default AuthDialog;