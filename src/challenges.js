// import express from "express";

// const app = express();

// // 미들웨어 만들기
// const URLLogger = (req, res, next) => {
//   console.log("Path: ", req.path);

//   next();
// };

// const timeLogger = (req, res, next) => {
//   const now = new Date();
//   console.log(
//     `Time: ${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`,
//   );

//   next();
// };

// const protectorLogger = (req, res, next) => {
//   if (req.path === "/protected") {
//     return res.send("<h1>Fobbiden</h1>");
//   }
//   next();
// };

// const secureLogger = (req, res, next) => {
//   if (req.protocol === "https") {
//     console.log("Secured");
//   } else {
//     console.log("Not Secured.");
//   }
//   next();
// };

// // 미들웨어 적용하기

// app.use(URLLogger, timeLogger, protectorLogger, secureLogger);

// // 라우팅
// app.get("/", (req, res) => {
//   return res.send("<h1>Hello!!</h1>");
// });

// app.get("/protected", (req, res) => {
//   return res.send("<h1>Protected!!</h1>");
// });

// // 서버 실행

// app.listen(5000, () => {
//   console.log("Server is on the PORT 5000");
// });
