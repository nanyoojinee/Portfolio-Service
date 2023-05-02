import { User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";


class userAuthService {
  static async addUser({ name, email, password }) {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newUser = { id, name, email, password: hashedPassword };

    // db에 저장
    return User.create({ newUser });
  }

  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ userId: user.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = user.id;
    const name = user.name;
    const description = user.description;

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
      errorMessage: null,
    };

    return loginUser;
  }

  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

static async setUser({ userId, toUpdate}) {
  let user = await User.findById({userId});

  if (!user) {
    const errorMessage = `${userId} ID와 일치하는 유저를 찾을 수 없습니다.. 다시 한 번 확인해 주세요.`;
    return { errorMessage };
  }

  if (toUpdate.name) {
    user.name = toUpdate.name;
  }

  if (toUpdate.email) {
    user.email = toUpdate.email;
  }

  if (toUpdate.password) {
    user.password = bcrypt.hash(toUpdate.password, 10);
  }

  if (toUpdate.description) {
    user.description = toUpdate.description;
  }

  if (toUpdate.pageBackgroundColor) {
    user.pageBackgroundColor = toUpdate.pageBackgroundColor;
  }

  if (toUpdate.socialLikes) {
    user.socialLikes = toUpdate.socialLikes;
  }
  
  if (toUpdate.profileImage) {
    const { mimetype, filename, path } = toUpdate.profileImage;
    user.profileImage = { mimetype, filename, path };
  }
  
  return user.save();
}


  static async getUserInfo({ userId }) {
    const user = await User.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }
}

export { userAuthService };
