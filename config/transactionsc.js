//==================================>>>>FUNCTION QUERY TRANSACTIONS
function idQuery(req){
    return req.query.id
}
function productNameQuery(req){
    return req.query.product_name
}
function categoryQuery(req){
    return req.query.category
}
function priceQuery(req){
    return req.query.price
}
function quantityQuery(req){
    return req.query.quantity
}
function totalQuery(req){
    return req.query.total
}
function transactionDateQuery(req){
    return req.query.transaction_date
}

//==================================>>>>FUNCTION BODY TRANSACTIONS
function idBody(req){
    return req.body.id
}
function productNameBody(req){
    return req.body.product_name
}
function categoryBody(req){
    return req.body.category
}
function priceBody(req){
    return req.body.price
}
function quantityBody(req){
    return req.body.quantity
}
function totalBody(req){
    return req.body.total
}
function transactionDateBody(req){
    return req.body.transaction_date
}

//==================================>>>>FUNCTION CRUD TRANSACTIONS
function getAllTransactions(db, res){
    db.query(`SELECT * FROM transactions;`,function(err, transactions){
        if (err) throw err
        res.status(200).json(transactions)
    })
}
function getTransaction(db, res, query, value ){
    db.query(`SELECT * FROM transactions WHERE ${query} = "${value}"`, function(err, transactions){
            if (err) throw err
            res.status(200).json(transactions)
    })
    return
}

function createTransactions(db, req, res){
    let now = new Date
    let day = now.getDate()
    let month = now.getMonth() + 1
    let year = now.getFullYear()
    db.query(`INSERT INTO transactions (product_name, category, price, quantity, total, transaction_date) 
    VALUE ("${productNameBody(req)}", "${categoryBody(req)}", ${priceBody(req)}, ${quantityBody(req)}, ${totalBody(req)}, "${year}-${month}-${day}" );`, function(err, transactions){
            if (err) throw err
            res.status(200).json({message: "Transaction successfully!"})
            return
    })

}


module.exports = {
    idQuery:idQuery,
    productNameQuery: productNameQuery,
    categoryQuery: categoryQuery,
    priceQuery: priceQuery,
    quantityQuery: quantityQuery,
    totalQuery: totalQuery,
    transactionDateQuery: transactionDateQuery,
    idBody: idBody,
    productNameBody: productNameBody,
    categoryBody: categoryBody,
    priceBody: priceBody,
    quantityBody: quantityBody,
    totalBody: totalBody,
    transactionDateBody: transactionDateBody,
    getAllTransactions: getAllTransactions,
    getTransaction: getTransaction,
    createTransactions: createTransactions
}