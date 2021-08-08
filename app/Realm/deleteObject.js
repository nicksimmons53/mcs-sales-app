import Realm from "realm";
import UserSchema from "./UserSchema";

const deleteObject = async(object) => {
    const realm = await Realm.open({
        path: "user",
        schema: [ UserSchema ]
    });

    realm.write(( ) => {
        realm.delete(object);

        console.log("Delete Object: " + object);

        object = null;
    });

    realm.close( );
}

export default deleteObject;