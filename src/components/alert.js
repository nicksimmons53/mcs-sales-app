import React from "react";
import { AlertDialog, Button } from "native-base";

export const AlertNotification = ({ shown, setShown, header, body, action }) => {
  const onClose = () => setShown(false);

  const cancelRef = React.useRef(null);

  return (
    <AlertDialog isOpen={shown} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        {header && <AlertDialog.Header>{header}</AlertDialog.Header>}
        {body && <AlertDialog.Body>{body}</AlertDialog.Body>}
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button onPress={onClose} ref={cancelRef} variant={"unstyled"}>Cancel</Button>
            <Button
              ref={cancelRef}
              colorScheme={"danger"}
              onPress={() => {
                action();
                onClose();
              }}>
              Delete
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
