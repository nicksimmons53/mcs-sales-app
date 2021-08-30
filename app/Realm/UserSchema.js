const UserSchema = {
    name: "user",
    properties: {
        id: "int",
        email: "string",
        firstName: "string",
        lastName: "string",
        phone: "string",
        sageEmployeeNumber: "int",
        sageUserId: "string",
        sagePassword: "string",
        token: "string"
    },
    primaryKey: "token"
};

export default UserSchema;