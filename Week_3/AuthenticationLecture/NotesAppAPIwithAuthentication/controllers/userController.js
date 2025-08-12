const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


let signUp = async (req, res) => {
  try {
    console.log (req.body);
    let {password} = req.body;
    bcrypt.hash (password, saltRounds, async function (err, hash) {
      try {
        let user = await userModel.create ({...req.body, password: hash});
        res
          .status (201)
          .json ({message: 'User SignUp Successfully completed', user});
      } catch (error) {
        res.status (500).json ({message: 'Something Went Wrong', Error: err});
      }
    });
  } catch (error) {
    console.log (error.message);
    res.status (500).json ({message: error.message});
  }
};

module.exports = signUp;
