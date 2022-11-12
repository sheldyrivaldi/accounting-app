//==================================>>>>FUNCTION QUERY CATEGORY
function idQuery(req){
    return req.query.id
}
function categoryNameQuery(req){
    return req.query.category_name
}

//==================================>>>>FUNCTION BODY CATEGORY
function idBody(req){
    return req.body.id
}
function categoryNameBody(req){
    return req.body.category_name
}

//==================================>>>>FUNCTION CRUD CATEGORY
function getAllCategories(db, res){
    db.query(`SELECT * FROM categories;`,function(err, categories){
        if (err) throw err
        res.status(200).json(categories)
    })
    return
}
function getCategory(db, req, res){
    db.query(`SELECT * FROM categories WHERE category_name = "${categoryNameQuery(req)}"`, function(err, categories){
            if (err) throw err
            res.status(200).json(categories)
    })
    return
}

function createCategory(db, req, res){
    db.query(`INSERT INTO categories (category_name) 
    VALUES ("${categoryNameBody(req)}");`, function(err, categories){
            if (err) throw err
            res.status(200).json({message: "Category added successfully!"})
            return
    })
}
function updateCategory(db, req, res){
    db.query(`UPDATE categories SET category_name = "${categoryNameBody(req)}" WHERE id = ${idBody(req)};`, function(err,categories){
        if (err) throw err
        res.status(200).json({message: "Category updated successfully!"})
    })
    return
}

function deleteCategory(db, req, res){
    db.query(`DELETE from categories WHERE category_name = "${categoryNameQuery(req)}";`,function(err, categories){
        if (err) throw err
        res.status(200).json({message: "Category deleted successfully!"})
    })
    return
}


module.exports = {
    idQuery: idQuery,
    categoryNameQuery: categoryNameQuery,
    idBody: idBody,
    categoryNameBody: categoryNameBody,
    getAllCategories: getAllCategories,
    getCategory: getCategory,
    updateCategory: updateCategory,
    createCategory: createCategory,
    deleteCategory: deleteCategory
}