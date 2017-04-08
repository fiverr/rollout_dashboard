import * as React from 'react'
import Window from '../containers/Window'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const App = () => (
    <MuiThemeProvider>
        <Window />
    </MuiThemeProvider>
)

export default App