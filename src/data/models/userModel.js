import { Schema, model } from "mongoose";

const usersCollection = "users";

const UserSchema = new Schema({
    firstName: {
        type: Schema.Types.String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: Schema.Types.String,
        required: [true, "Last name is required"]
    },
    email: {
        type: Schema.Types.String,
        required: [true, "Email is required"],
        unique: true
    },
    age: {
        type: Schema.Types.Number,
        default: 18
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "roles",
        index: true,
        default: null
    },
    isAdmin: {
        type: Schema.Types.Boolean,
        default: false
    },
    password: {
        type: Schema.Types.String,
        required: [true, "Password is required"]
    }
});

UserSchema.pre("find", function () {
    this.populate("role");
});
  
UserSchema.pre("findOne", function () {
    this.populate("role");
});

export default model(usersCollection, UserSchema);
