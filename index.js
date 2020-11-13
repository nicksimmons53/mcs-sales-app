import { AppRegistry, Platform } from 'react-native';
import App from './app/Main/App';

AppRegistry.registerComponent('sageSalesApp', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('sageSalesApp', { rootTag });
}
