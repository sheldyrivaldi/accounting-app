function idParams(req){
    return req.params.id
}

function getIncomeCategories(db, res){
    db.query('SELECT * FROM income_categories;', function(err, income_categories){
        if(err) throw err
        res.status(200).json(income_categories)
    })
    return
}

function getIncomeCategory(db, req, res){
    db.query(`SELECT * FROM income_categories WHERE id = ${idParams(req)};`, function(err, income_categories){
        if(err) throw err
        res.status(200).json(income_categories)
    })
    return
}
function createIncomeCategory(db, req, res){
    let categoryName = req.body.category_name
    db.query(`INSERT INTO income_categories (category_name) VALUES ("${categoryName}");`, function(err, income_categories){
        if(err) throw err
        res.status(200).json({
            message: "Category added successfully!"})
    })
    return
}
function updateIncomeCategory(db, req, res){
    let categoryName = req.body.category_name
    db.query(`UPDATE income_categories SET
            category_name = "${categoryName}"
            WHERE id = ${idParams(req)};`, function(err, income_categories){
        if(err) throw err
        res.status(200).json({
            message: "Category updated successfully!"})
    })
    return
}
function deleteIncomeCategory(db, req, res){
    db.query(`DELETE FROM wallets WHERE id = ${idParams(req)};`, function(err, income_categories){
        if(err) throw err
        res.status(200).json({
            message: "Category deleted successfully!"})
        })
        return
}

module.exports = {
    idParams: idParams,
    getIncomeCategories: getIncomeCategories,
    getIncomeCategory: getIncomeCategory,
    createIncomeCategory: createIncomeCategory,
    updateIncomeCategory: updateIncomeCategory,
    deleteIncomeCategory: deleteIncomeCategory
}