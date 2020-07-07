import { AppRegistry, Platform } from 'react-native';
import App from './app/Main/App';

AppRegistry.registerComponent('salesapp', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('salesapp', { rootTag });
}
