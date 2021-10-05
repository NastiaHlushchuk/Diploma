import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-native-elements';
import AppContainer from './navigation';
import store from './reducers';
import theme from './theme';
import navigationService from './service/navigationService';
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppContainer
            ref={(navigatorRef) => {
              navigationService.setTopLevelNavigator(navigatorRef);
            }}
            {...this.props}
          />
        </Provider>
      </ThemeProvider>
    )
  }
}