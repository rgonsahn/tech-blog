const withAuth = (req, res, next) => {
  // redirects user if not logged in
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // allows user to view page if logged in
    next();
  }
};

module.exports = withAuth;