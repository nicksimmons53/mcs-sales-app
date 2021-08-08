import 'react-native-gesture-handler';
import { AppRegistry, Platform } from 'react-native';
import AppWrapper from './app/Main/App';

AppRegistry.registerComponent('sageSalesApp', () => AppWrapper);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('sageSalesApp', { rootTag });
}
