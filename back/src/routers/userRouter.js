import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import { UserModel } from "../db/schemas/user";

// userRouter에서 multer로 프로필 사진을 업로드 하는 기능을 넣어서 put 요청을 form-data로 받아야 함
const multer = require("multer");
const path = require("path");
const fs = require('fs');

const userAuthRouter = Router();

userAuthRouter.post("/user/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/user/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get(
  "/userlist",
  login_required,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      let page = Number(req.query.page);
      let perPage = parseInt(req.query.perPage);
      const skip = (page - 1) * perPage;
      const [total, posts] = await Promise.all([
        UserModel.countDocuments({}),
        UserModel.find({}).sort({ createdAt: -1 }).skip(skip).limit(perPage),
      ]);
      const totalPage = Math.ceil(total / perPage);
      res.status(200).json({ posts, page, perPage, totalPage });
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/user/current",
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const userId = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        userId,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 업로드 폴더 생성
    if (!fs.existsSync('upload/')) {
      fs.mkdirSync('upload/');
    }
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    const date = new Date().toISOString().replace(/:/g, "-");
    const filename = Buffer.from(file.originalname, "latin1").toString("utf8");
    cb(null, `${date}-${filename}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter }); // 업로드된 파일을 저장할 폴더 경로를 지정합니다.

userAuthRouter.put(
  "/users/:id",
  login_required,
  upload.single("profileImage"),
  async function (req, res, next) {
    try {
      const userId = req.params.id;
      const sendUser = req.body.user ?? null;
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const description = req.body.description ?? null;
      const pageBackgroundColor = req.body.pageBackgroundColor ?? null;
      const isLiked = req.body.isLiked ?? null;
      const profileImage = req.file ?? null;
      const toUpdate = {
        sendUser,
        name,
        email,
        password,
        description,
        pageBackgroundColor,
        isLiked,
        profileImage,
      };
      const updatedUser = await userAuthService.setUser({
        userId,
        toUpdate,
      });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ userId });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/upload/:imgPath",
  login_required,
  async function (req, res, next) {
    try {
      const { imgPath } = req.params;
      const absolutePath = path.join(__dirname,'../../upload', imgPath);
      res.sendFile(absolutePath);
    } catch (error) {
      next(error);
    }
  }
)
// id - 지금 보고있는 게시글 작성자, sendid - 지금 로그인해 있는 작성자, 이 둘울 인자로 sendid가 id에 좋아요를 눌렀는지 체크
userAuthRouter.get(
  "/users/:id/:sendid",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.params.id;
      const sendId = req.params.sendid;
      const currentLikeInfo = await userAuthService.getLikeInfo({ userId,sendId });

      if (currentLikeInfo.errorMessage) {
        throw new Error(currentLikeInfo.errorMessage);
      }
      res.status(200).send(currentLikeInfo);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.delete("/users/:id", async function (req, res, next) {
  try {
    const userId = req.params.id;

    const result = await userAuthService.deleteUser({ userId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { userAuthRouter };
