import Realm from 'realm';
import UserSchema from "./UserSchema";

// Object Name  => string
// Data         => object
const createObject = async(objectName, data) => {
    const realm = await Realm.open({
        path: "user",
        schema: [ UserSchema ]
    });

    let object;
    realm.write(( ) => {
        object = realm.create(objectName, data);

        console.log("Create Object: " + object);
    });

    realm.close( );
};

export default createObject;