function idParams(req){
    return req.params.id
}

function getExpenseCategories(db, res){
    db.query('SELECT * FROM expense_categories;', function(err, expense_categories){
        if(err) throw err
        res.status(200).json(expense_categories)
    })
    return
}

function getExpenseCategory(db, req, res){
    db.query(`SELECT * FROM expense_categories WHERE id = ${idParams(req)};`, function(err, expense_categories){
        if(err) throw err
        res.status(200).json(expense_categories)
    })
    return
}
function createExpenseCategory(db, req, res){
    let categoryName = req.body.category_name
    db.query(`INSERT INTO expense_categories (category_name) VALUES ("${categoryName}");`, function(err, expense_categories){
        if(err) throw err
        res.status(200).json({
            message: "Category added successfully!"})
    })
    return
}
function updateExpenseCategory(db, req, res){
    let categoryName = req.body.category_name
    db.query(`UPDATE expense_categories SET
            category_name = "${categoryName}"
            WHERE id = ${idParams(req)};`, function(err, expense_categories){
        if(err) throw err
        res.status(200).json({
            message: "Category updated successfully!"})
    })
    return
}
function deleteExpenseCategory(db, req, res){
    db.query(`DELETE FROM wallets WHERE id = ${idParams(req)};`, function(err, expense_categories){
        if(err) throw err
        res.status(200).json({
            message: "Category deleted successfully!"})
        })
        return
}

module.exports = {
    idParams: idParams,
    getExpenseCategories: getExpenseCategories,
    getExpenseCategory: getExpenseCategory,
    createExpenseCategory: createExpenseCategory,
    updateExpenseCategory: updateExpenseCategory,
    deleteExpenseCategory: deleteExpenseCategory
}