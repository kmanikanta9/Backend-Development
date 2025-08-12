let express = require ('express');
const connectToDb = require ('./configs/db');
const notesRouter = require ('./routes/notesRoutes');
const userRouter = require ('./routes/userRoutes');
let app = express ();
app.use (express.json ());

connectToDb ();

app.get ('/test', (req, res) => {
  res.status (200).json ({message: 'Test Route is Working..'});
});

// user routes
app.use ('/user', userRouter);

// notes routes
app.use ('/notes', notesRouter);

// unhandled route
app.use ((req, res) => {
  res.status (404).json ({message: '404, Route is not found...'});
});

app.listen (3000, () => {
  console.log ('Server is running on the port 3000');
});
