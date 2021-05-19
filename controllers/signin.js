const handleSignin = (req, res, database, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('The form has incorrect credentials');
    }
    database.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const valid = bcrypt.compareSync(password, data[0].hash);
        if (valid) {
            return database.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        }
        else {
            res.status(400).json('wrong credentials')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignin: handleSignin
};