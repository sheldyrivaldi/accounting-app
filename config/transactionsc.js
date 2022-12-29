function idParams(req){
    return req.params.id
}
function titleBody(req){
    return req.body.title
}
function typeBody(req){
    return req.body.type
}
function categoryNameBody(req){
    return req.body.category_name
}
function amountBody(req){
    return req.body.amount
}
function walletBody(req){
    return req.body.wallet
}
function transactionDateBody(req){
    return req.body.transaction_date
}


function getAllTransactions(db, res){
    db.query('SELECT * FROM transactions;', function(err, transactions){
        if(err) throw err
        res.status(200).json(transactions)
    })
    return
}
function getTransaction(db, req, res){
    db.query(`SELECT * FROM transactions WHERE id = ${idParams(req)};`, function(err, transactions){
        if(err) throw err
        res.status(200).json(transactions)
    })
    return
}
function createTransaction(db, req, res){
    let now = new Date
    let day = now.getDate()
    let month = now.getMonth() + 1
    let year = now.getFullYear()
    db.query(`INSERT INTO transactions (title, type, category_name, amount, wallet, transaction_date) 
        VALUES ("${titleBody(req)}", "${typeBody(req)}", "${categoryNameBody(req)}", ${amountBody(req)}, "${walletBody(req)}", "${year}-${month}-${day}");`, function(err, transactions){
            if (err) throw err
            res.status(200).json({
                message: "Transactions added successfully!"
            })
        })
    
}
function updateTransaction(db, req, res){
    db.query(`UPDATE transactions SET
        title = "${titleBody(req)}",
        type = "${typeBody(req)}",
        category_name = "${categoryNameBody(req)}",
        amount = ${amountBody(req)},
        wallet = "${walletBody(req)}",
        transaction_date = "${transactionDateBody(req)}"
        WHERE id = ${idParams(req)};`, function(err, transactions){
    if(err) throw err
    res.status(200).json({
        message: "Transaction updated successfully!"
        })
    })
    
    return
}
function deleteTransaction(db, req, res){
    db.query(`DELETE FROM transactions WHERE id = ${idParams(req)};`, function(err, transactions){
        if (err) throw err
        res.status(200).json({
            message: "Transaction deleted successfully!"})
        })
    return
}

module.exports = {
    idParams: idParams,
    titleBody: titleBody,
    typeBody: typeBody,
    categoryNameBody: categoryNameBody,
    amountBody: amountBody,
    walletBody: walletBody,
    transactionDateBody: transactionDateBody,
    getAllTransactions: getAllTransactions,
    getTransaction: getTransaction,
    createTransaction: createTransaction,
    updateTransaction: updateTransaction,
    deleteTransaction: deleteTransaction
}