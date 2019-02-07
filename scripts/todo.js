console.log("todo.js loaded");
const database = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();
let token;
let user;

////INITIALIZE CODE////
// Get redirect
firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) token = result.credential.accessToken;
  // The signed-in user info.
  user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  const {
    code,
    message,
    email,
    credential, // The firebase.auth.AuthCredential type that was used.
  } = error;

  console.log(code);
  console.log(message);
});

firebase.auth().onAuthStateChanged(function(user) {
  // User is signed in.
	if (user) {
    const {
      displayName,
      email,
      uid,
    } = user;
		console.log(displayName + email + uid);
		//Load tasks
		loadTasks();
	} else {
		// User is signed out.
		//Sign in with redirect
		firebase.auth().signInWithRedirect(provider);
	}
});
