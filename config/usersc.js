//==================================>>>>FUNCTION QUERY USERS
function idQuery(req){
        return req.query.id
}
function usernameQuery(req){
        return req.query.username
}
function emailQuery(req){
        return req.query.email
}
function phoneNumberQuery(req){
        return req.query.phone_number
}
function registerDateQuery(req){
        return req.query.register_date
}



//==================================>>>>FUNCTION BODY USERS
function idBody(req){
        return req.body.id
}
function usernameBody(req){
        return req.body.username
}
function passwordBody(req){
        return req.body.password
}
function emailBody(req){
        return req.body.email
}
function phoneNumberBody(req){
        return req.body.phone_number
}
function registerDateBody(req){
        return req.body.register_date
}

//==================================>>>> FUNCTION CRUD USERS
function getAllUsers(db, res){
        db.query(`SELECT * FROM users;`,function(err, users){
                if (err) throw err
                res.status(200).json(users)
        })
}

function getUser(db, res, query, value ){
        db.query(`SELECT * FROM users WHERE ${query} = "${value}"`, function(err, users){
                if (err) throw err
                res.status(200).json(users)
        })
        return
}

function createUser(db, req, res){
        let now = new Date
        let day = now.getDate()
        let month = now.getMonth() + 1
        let year = now.getFullYear()
        db.query(`INSERT INTO users (username, password, email, phone_number, register_date) 
        VALUES ("${usernameBody(req)}", "${passwordBody(req)}", "${emailBody(req)}", "${phoneNumberBody(req)}", "${year}-${month}-${day}" );`, function(err, users){
                if (err) throw err
                res.status(200).json({message: "User added successfully!"})
                return
        })

}

function updateUser(db, req, res){
        db.query(`UPDATE users SET
                username = "${usernameBody(req)}",
                password = "${passwordBody(req)}",
                email = "${emailBody(req)}",
                phone_number = "${phoneNumberBody(req)}"
                WHERE id = ${idBody(req)};`, function(err, users){
                if (err) throw err
                res.status(200).json({message: "User updated successfully!"})
                return
        })
}
function deleteUser(db, req, res){
        db.query(`DELETE from users WHERE username = "${usernameQuery(req)}";`,function(err, users){
                if (err) throw err
                res.status(200).json({message: "User deleted successfully!"})
        })
        return
}







module.exports = {
       idQuery: idQuery,
       usernameQuery: usernameQuery,
       emailQuery: emailQuery,
       phoneNumberQuery: phoneNumberQuery,
       registerDateQuery: registerDateQuery,
       idBody: idBody,
       usernameBody: usernameBody,
       passwordBody: passwordBody,
       emailBody: emailBody,
       phoneNumberBody: phoneNumberBody,
       registerDateBody: registerDateBody,
       getAllUsers: getAllUsers,
       getUser: getUser,
       createUser: createUser,
       updateUser: updateUser,
       deleteUser: deleteUser
}