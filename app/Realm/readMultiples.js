import Realm from "realm";
import UserSchema from "./UserSchema";

const readObject = async(objectName) => {
    const realm = await Realm.open({
        path: "user",
        schema: [ UserSchema ]
    });
    
    let objects = realm.objects(objectName);

    return objects;
}

export default readObject;