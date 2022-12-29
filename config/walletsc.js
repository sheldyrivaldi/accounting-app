function idParams(req){
    return req.params.id
}


function getAllWallets(db, res){

    db.query(`select * from wallets;`, function(err, wallets){
        if(err) throw err
        res.status(200).json(wallets)
    })
    return
}

function getWallet(db, req, res){
    db.query(`SELECT * FROM wallets WHERE id = ${idParams(req)};`, function(err, wallets){
        if(err) throw err
        res.status(200).json(wallets)
    })
    return
}
function createWallet(db, req, res){
    let walletName = req.body.wallet_name
    db.query(`INSERT INTO wallets (wallet_name, balance) VALUES ("${walletName}", 0);`, function(err, wallets){
        if(err) throw err
        res.status(200).json({
            message: "Wallet added successfully!"})
    })
    return
}
function updateWallet(db, req, res){
    let walletName = req.body.wallet_name
    db.query(`UPDATE wallets SET
            wallet_name = "${walletName}"
            WHERE id = ${idParams(req)};`, function(err, wallets){
        if(err) throw err
        res.status(200).json({
            message: "Wallet updated successfully!"})
    })
    return
}
function deleteWallet(db, req, res){
    db.query(`DELETE FROM wallets WHERE id = ${idParams(req)};`, function(err, wallets){
        if(err) throw err
        res.status(200).json({
            message: "Wallet deleted successfully!"})
        })
        return
}

module.exports = {
    idParams: idParams,
    getAllWallets: getAllWallets,
    getWallet: getWallet,
    createWallet: createWallet,
    updateWallet: updateWallet,
    deleteWallet: deleteWallet
}