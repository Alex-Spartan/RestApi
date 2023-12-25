import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUser = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ "authentication.sessionToken": sessionToken });

export const getUserById = (id: string) => UserModel.findById(id);

// export const createUser = (credential: Record<string, any>) => new UserModel(credential).save()
//     .then((user) => user.toObject())
//     .catch((error) => { throw error });
export const createUser = (credential: Record<string, any>) =>
    new UserModel(credential)
      .save()
      .then((user) => user.toObject())
      .catch((error) => {
        console.error('Error creating user:', error);
        throw error;
      });
  

export const deleteUser = (id: string) => UserModel.findByIdAndDelete(id);

export const updateUser = (id: string, credential: Record<string, any>) => UserModel.findByIdAndUpdate(id, credential);