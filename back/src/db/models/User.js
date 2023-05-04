import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    return UserModel.create(newUser);
  }
  static async findByEmail({ email }) {
    return UserModel.findOne({ email });
  }

  static async findById({ userId }) {
    return UserModel.findOne({ id: userId });
  }
  
  static async findAll() {
    return UserModel.find({});
  }

  static async deleteById({ userId }) {
    const deleteResult = await UserModel.deleteOne({ id: userId });
    return deleteResult.deletedCount === 1;
  }
}

export { User };
