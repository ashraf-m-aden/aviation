// import axios from "axios";
// const auth = axios.create({
//   baseURL: process.env.VUE_APP_BACKEND,
// });
// auth.interceptors.request.use((config) => {
//   config.headers.common.Authorization =
//     "Bearer " + localStorage.getItem("token");
//   return config;
// });
 export default {   

//   signIn(user) {
//     return auth.post("/login", user);
//   },
//   getUser(token, id) {
//     return auth.post("/getMe", {
//       params: { token, id },
//     });
//   },
//   getAllUsers() {
//     return auth.get("/allUsers");
//   },
//   logout() {
//     return auth.post("/logout");
//   },
//   postStaff(staff) {
//     return auth.post("/newUser", {
//       params: staff,
//     });
//   },
//   modifyStaff(staff) {
//     return auth.post("/modifyStaff/" + staff._id, {
//       params: staff,
//     });
//   },
//   deleteStaff(staff) {
//     return auth.post("/deleteStaff/" + staff._id, {
//       params: staff,
//     });
//   },
 };
