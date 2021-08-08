const UserSchema = {
    name: "user",
    properties: {
        id: "int",
        email: "string",
        firstName: "string",
        lastName: "string",
        phone: "string",
        sageUserId: "int",
        sagePassword: "string",
        token: "string"
    },
    primaryKey: "token"
};

export default UserSchema;