//==================================>>>> FUNCTION PRODUCTS QUERY VALUE 
function idQuery(req){
    return req.query.id
}
function productNameQuery(req){
    return req.query.product_name
}
function productCodeQuery(req){
    return req.query.product_code
}
function barcodeQuery(req){
    return req.query.barcode
}
function categoryQuery(req){
    return req.query.category
}
function sellingPriceQuery(req){
    return req.query.selling_price
}
function quantityQuery(req){
    return req.query.quantity
}
function idParams(req){
    return req.params.id
}

//==================================>>>>  FUNCTION PRODUCTS BODY VALUE 
function idBody(req){
    return req.body.id
}
function productNameBody(req){
    return req.body.product_name
}
function productCodeBody(req){
    return req.body.product_code
}
function barcodeBody(req){
    return req.body.barcode
}
function categoryBody(req){
    return req.body.category
}
function sellingPriceBody(req){
    return req.body.selling_price
}
function quantityBody(req){
    return req.body.quantity
}


//==================================>>>> FUNCTION CRUD PRODUCTS
function getAllProducts(db, res){
    db.query('SELECT * FROM products', function (err, products) {
            if (err) throw err
            res.status(200).json(products)
            })
    return
}

function getProduct(db, res, query, value){
    db.query(`SELECT * FROM products WHERE ${query} = "${value}"`, function(err, products){
            if (err) throw err
            res.status(200).json(products)
    })
    return
}
function createProduct(db, req, res){
    db.query(`INSERT INTO products (product_name, product_code, barcode, category, selling_price, quantity)
    VALUES ("${productNameBody(req)}", "${productCodeBody(req)}", "${barcodeBody(req)}", "${categoryBody(req)}", ${sellingPriceBody(req)}, ${quantityBody(req)});`, function(err, products){
            if (err) throw err
            res.status(200).json({message: "Product added successfully!"})
    })
    return
}
function updateProduct(db, req, res){
    db.query(`UPDATE products SET 
    product_name = "${productNameBody(req)}",
    product_code = "${productCodeBody(req)}",
    barcode = "${barcodeBody(req)}",
    category = "${categoryBody(req)}",
    selling_price = ${sellingPriceBody(req)},
    quantity = ${quantityBody(req)}
    WHERE id = ${idParams(req)};`, function(err, products){
            if (err) throw err
            res.status(200).json({message: "Product updated successfully!"})
    })
    return
}

function deleteProduct(db, req, res){
    db.query(`DELETE from products WHERE id = "${idParams(req)}";`,function(err, products){
            if (err) throw err
            res.status(200).json({message: "Product deleted successfully!"})
    })
    return
}

module.exports = {
    idQuery: idQuery,
    productNameQuery: productNameQuery,
    productCodeQuery: productCodeQuery,
    barcodeQuery: barcodeQuery,
    categoryQuery: categoryQuery,
    sellingPriceQuery: sellingPriceQuery,
    quantityQuery: quantityQuery,
    idBody: idBody,
    productNameBody: productNameBody,
    productCodeBody: productCodeBody,
    barcodeBody: barcodeBody,
    categoryBody: categoryBody,
    sellingPriceBody: sellingPriceBody,
    quantityBody: quantityBody,
    getAllProducts: getAllProducts,
    getProduct: getProduct,
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
}