const pool = require("../DB/index.js").pool;
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const id = uuidv4();
  const password = await bcrypt.hash(req.body.password, 12);

  try {
    let result = await pool.query(
      "INSERT INTO USER_DETAILS VALUES ($1,$2,$3,$4) RETURNING name,id,email",
      [name, id, email, password]
    );
    const token = signToken(result.rows[0].id);

    res.status(201).json({
      message: "success",
      token,
      data: result.rows[0],
    });
  } catch (e) {
    if (e.code === "23505") {
      res.status(400).json({
        message: "user already exists",
        detail: e.detail,
      });
    } else {
      res.status(400).json({
        message: "bad request",
      });
    }
  }
};

exports.uploadProfilePicture = async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  try {
    let user = await pool.query(
      "SELECT IMG_URL FROM USER_DETAILS WHERE ID=$1",
      [id]
    );
    if (user.rows.length === 0)
      return res.status(400).json({ message: "User with ID do not exist." });
    const oldImgName = user.rows[0].img_url;
    if (oldImgName !== "default.jpg") {
      const filePath = path.join(__dirname, `../public/imgs/${oldImgName}`);
      fs.unlink(filePath, function (err) {
        if (err) {
          console.error(err);
        } else {
          console.log("File removed:", filePath);
        }
      });
    }
    user = await pool.query(
      "UPDATE USER_DETAILS SET IMG_URL=$2 WHERE ID=$1 RETURNING *",
      [id, file.filename]
    );
    if (user.rows.length === 0)
      return res.status(400).json({ message: "Something went wrong" });
    return res.status(200).json({ message: "success", data: user.rows[0] });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ message: "Something went wrong", error: JSON.stringify(e) });
  }
};

exports.profileUpdate = async (req, res) => {
  const { username, email, gender, dob } = req.body;
  const { id } = req.params;
  if (!email || !username || email === "" || username === "") {
    return res.status(400).json({
      message: "please provide email and username",
    });
  }
  try {
    let user = await pool.query(
      "SELECT * FROM USER_DETAILS WHERE (EMAIL=$2 OR NAME=$3) AND ID<>$1",
      [id, email, username]
    );

    if (user.rows.length > 0) {
      return res.status(400).json({
        message: "email and/or username already taken.",
      });
    }

    user = await pool.query(
      "UPDATE USER_DETAILS SET NAME=$2, EMAIL=$3, GENDER=$4, DOB=$5 WHERE ID=$1 RETURNING *",
      [id, username, email, gender, dob]
    );

    if (user.rows.length === 1) {
      user.rows[0].password = undefined;
      res.status(200).json({
        message: "success",
        data: user.rows[0],
      });
    } else {
      res.status(400).json({
        message: "Unable to update the profile.",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "Unable update the profile.",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "please provide email and password",
    });
  }
  try {
    let user = await pool.query("SELECT * FROM USER_DETAILS WHERE EMAIL=$1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({
        message: "wrong email or password",
      });
    }
    const userPassword = user.rows[0].password;
    const correctPassword = await bcrypt.compare(password, userPassword);

    if (correctPassword) {
      const token = signToken(user.rows[0].id);
      user.rows[0].password = undefined;
      res.status(200).json({
        message: "success",
        token,
        data: user.rows[0],
      });
    } else {
      res.status(400).json({
        message: "wrong email or password",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.protect = async (req, res, next) => {
  //1 Get the token and check if it's exists
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "You're not logged in",
    });
  }

  //2 Verify the token

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    //3 Check if user still exists

    const freshUser = await pool.query(
      "SELECT * FROM USER_DETAILS WHERE ID=$1",
      [decoded.id]
    );

    if (!freshUser || freshUser.rows.length === 0) {
      return res.status(401).json({
        message: "You're not logged in",
      });
    }
    req.user = freshUser.rows[0];
    next();
  } catch (e) {
    return res.status(400).json({
      message: "You're not logged in",
    });
  }

  //4 Check if user changed password after the Token was issued

  //Grant access to protected route
};

exports.authorizeAdmin = async (req, res, next) => {
  // console.log(req.user)
  if (req.user.role.toLowerCase() === "admin") {
    next();
  } else {
    return res.status(401).json({
      message: "You're not authorized to perform this action",
    });
  }
};
