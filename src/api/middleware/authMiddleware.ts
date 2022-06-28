const jwt = require('jsonwebtoken');

const requireAuth = (req: any, res: any, next: Function) => {
  const bearerHeader = req.headers['authorization'];
  const bearer = bearerHeader.split(' ');
  const token = bearer[1];

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
