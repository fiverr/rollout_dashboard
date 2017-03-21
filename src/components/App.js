import React from 'react'
import Window from '../containers/WindowContainer'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


injectTapEventPlugin();

const App = () => (
    <MuiThemeProvider>
        <Window />
    </MuiThemeProvider>
)

export default App