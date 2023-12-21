const Auth = (req, res, next) => {
    if (!req.session.logged_in) {
      console.log('notloggedin')
      res.redirect('/login');
    } else {
      console.log('next')
      next();
    }
  };
  
  module.exports = Auth;