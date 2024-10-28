/*const sessionIdToUserMap = new Map();
*/
const jwt = require('jsonwebtoken');
const secret = 'mudit@123';

/*function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUser(id) {
  return sessionIdToUserMap.get(id);
}
*/

function setUser(user) {
  return jwt.sign({
 _id: user._id,
 email:user.email,
 role: user.role,
  },
 secret);
 
}

function getUser(token) {
if (!token) return null;
  return jwt.verify(token,secret);
}
module.exports = {
  setUser,
  getUser,
};