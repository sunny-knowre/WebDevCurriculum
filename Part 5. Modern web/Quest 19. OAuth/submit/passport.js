const GoogleStrategy = require('passport-google-oauth20').Strategy,
      passport       = require('passport'),
      db             = require('./db');
      config         = {
        OAUTH2_CLIENT_ID: '56559251780-9ki0s6brcmk5vpg5imspc741fv60bt6t.apps.googleusercontent.com',
        OAUTH2_CLIENT_SECRET: 'KoOB33qxZu16xLiqOxV4QYWW',
        OAUTH2_CALLBACK: 'http://localhost:8080/auth/google/callback'
      };

extractProfile = async profile => {
    let imageUrl = '';
    if (profile.photos && profile.photos.length) {
        imageUrl = profile.photos[0].value;
    }
    return {
        id: profile.id,
        name: profile.displayName,
        image: imageUrl,
        email: profile.emails[0].value
    };
}

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
passport.use(new GoogleStrategy({
    clientID: config['OAUTH2_CLIENT_ID'],
    clientSecret: config['OAUTH2_CLIENT_SECRET'],
    callbackURL: config['OAUTH2_CALLBACK'],
    accessType: 'offline'
  }, (accessToken, refreshToken, profile, done) => {
    // Extract the minimal profile information we need from the profile object
    // provided by Google
    process.nextTick(async () =>  {
      const googleUser = await extractProfile(profile);
      const verified = await db.user.verifyEmail(googleUser.name, googleUser.email );
      try {
        if(verified){
          return done(null, verified);
        } else {
          const newUser = await db.user.addGoogleUser(googleUser);
          return done(null, newUser);
        }
      } catch (err) {
        return done(err);
      }
    });
  }));
    
  
module.exports = (() => {
   return passport; 
})();