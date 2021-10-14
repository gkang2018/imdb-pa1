const jsonwebtoken = require('jsonwebtoken');
const QueryService = require("../services/QueryService")

/**
 * Creates a encrypted JWT based on the MySQL user
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MySQL email
 * @return {object} returns an object containing the signed token along with the expiration
 */
const issueJWT = (email) => {
  const expiresIn = '1d';

  const payload = {
    sub: email,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, "secret");
  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  };
};

/**
 * Decodes JWT and returns user payload 
 */
const decode = async (token) => {
    try {
        const tokenString = token.split("Bearer ")[1];
        const jwt = await jsonwebtoken.decode(tokenString, {complete: true}); 
        if (jwt) {
            const payload = jwt.payload.sub; 
            const user = await QueryService.fetchUser(payload);
            return user
        }
        return null;    
    } catch (error) {
        throw error;
    }
}


const signup = async (email, name, age) => {
  try {
    const signupSuccess = await QueryService.signupUser(email, name, age);
    if (signupSuccess) {
      const token = issueJWT(email);
      return token;
    }
  } catch (error) {
    throw error;
  }
}

const login = async (email) => {
  try {
    const user = await QueryService.loginUser(email);
    if (user) {
      const token = issueJWT(user.email);
      return token;
    }
    else {
      throw new Error("User account not found")
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  issueJWT: issueJWT,
  decode: decode,
  signup: signup, 
  login: login
};