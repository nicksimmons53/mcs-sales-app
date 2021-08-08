import Realm from "realm";
import UserSchema from "./UserSchema";

const readObject = async(objectName, key) => {
    const realm = await Realm.open({
        path: "user",
        schema: [ UserSchema ]
    });

    let object = realm.objectForPrimaryKey(objectName, key);

    console.log("Read Object: " + object);

    return object;
}

export default readObject;