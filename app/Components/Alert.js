import { Alert } from 'react-native';

export const deleteFileAlert = (action) => (
  Alert.alert(
    "Delete File",
    "Are you sure you want to delete this file?",
    [
      {
        text: "Cancel",
        onPress: ( ) => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Continue", onPress: action }
    ]
  )
);

export const deleteContactAlert = (action) => (
  Alert.alert(
    "Delete Contact",
    "Are you sure you want to delete this contact?",
    [
      {
        text: "Cancel",
        onPress: ( ) => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Continue", onPress: action }
    ]
  )
);
