const bcrypt = require('bcryptjs');

// Example to hash the password before inserting the user
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync('user_password_here', salt);

// Insert user into the Supabase table
const { data, error } = await supabase
  .from('users');
