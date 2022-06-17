const jwt = require('jsonwebtoken');

const requireAuth = (req: any, res: any, next: Function) => {
  const token = req.token;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err: Error, decodedToken: string) => {
        if (err) {
          console.log(err.message);
          res.redirect('/login');
        } else {
          console.log(decodedToken);
          next();
        }
      }
    );
  }
};

module.exports = { requireAuth };
