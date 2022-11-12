//==================================>>>> FUNCTION PRODUCTS QUERY VALUE
function idBody(req){
    return req.body.id
}
function expenseNameBody(req){
    return req.body.expense_name
}
function priceBody(req){
    return req.body.price
}
function dateBody(req){
    return req.body.date
}

//==================================>>>>  FUNCTION PRODUCTS BODY VALUES 
function idQuery(req){
    return req.query.id
}
function expenseNameQuery(req){
    return req.query.expense_name
}
function priceQuery(req){
    return req.query.price
}
function dateQuery(req){
    return req.query.date
}

//==================================>>>> FUNCTION CRUD PRODUCTS
function getAllExpense(db, res){
    db.query('SELECT * FROM expenses', function (err, expenses) {
        if (err) throw err
        res.status(200).json(expenses)
        })
    return
}

function getExpense(db, res, query, value){
    db.query(`SELECT * FROM expenses WHERE ${query} = "${value}"`, function(err, expenses){
            if (err) throw err
            res.status(200).json(expenses)
    })
    return
}
function createExpense(db, req, res){
    let now = new Date
    let day = now.getDate()
    let month = now.getMonth() + 1
    let year = now.getFullYear()
    db.query(`INSERT INTO expenses (expense_name, price, date)
    VALUES ("${expenseNameBody(req)}", ${priceBody(req)}, "${year}-${month}-${day}");`, function(err, expenses){
            if (err) throw err
            res.status(200).json({message: "Expense added successfully!"})
    })
    return
}
function deleteExpense(db, req, res){
    db.query(`DELETE from expenses WHERE id = "${idQuery(req)}";`,function(err, expenses){
            if (err) throw err
            res.status(200).json({message: "Expense deleted successfully!"})
    })
    return
}

module.exports = {
    idBody: idBody,
    idQuery:idQuery,
    expenseNameBody: expenseNameBody,
    expenseNameQuery: expenseNameQuery,
    priceBody: priceBody,
    priceQuery: priceQuery,
    dateBody: dateBody,
    dateQuery: dateQuery,
    getAllExpense: getAllExpense,
    getExpense: getExpense,
    createExpense: createExpense,
    deleteExpense: deleteExpense
}
