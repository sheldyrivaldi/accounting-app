function getReportIncomeExpense(db, req, res){
    db.query(`SELECT category_name, COALESCE(SUM(amount)) as amount FROM transactions WHERE type = "income" GROUP BY category_name;`, (err, income_categories)=>{
        if (err) throw err
        db.query(`SELECT category_name, COALESCE(SUM(amount)) as amount FROM transactions WHERE type = "expense" GROUP BY category_name;`, (err, expense_categories)=>{
            if (err) throw err
            db.query(`SELECT "total", COALESCE(SUM(amount)) as amount FROM transactions WHERE type = "income";`, (err, income_total)=>{
                if (err) throw err
                db.query(`SELECT "total", COALESCE(SUM(amount)) as amount FROM transactions WHERE type = "expense";`, (err, expense_total)=>{
                    if (err) throw err
                    res.status(200).json({
                        "income_categories": income_categories, 
                        "income_total": income_total,
                        "expense_categories": expense_categories,
                        "expense_total": expense_total
                        
                    })
                })
            })
            
        })
    })
    
}
function filterDateRange(db, req, res, interval){
    db.query(`SELECT category_name, COALESCE(SUM(amount)) as amount FROM transactions WHERE DATE(transaction_date) >= DATE(NOW()) - INTERVAL ${interval} DAY AND type = "income" GROUP BY category_name;`, (err, income_categories)=>{
        if (err) throw err
        db.query(`SELECT category_name, COALESCE(SUM(amount)) as amount FROM transactions WHERE DATE(transaction_date) >= DATE(NOW()) - INTERVAL ${interval} DAY AND type = "expense" GROUP BY category_name;`, (err, expense_categories)=>{
            if (err) throw err
            db.query(`SELECT "total", COALESCE(SUM(amount)) as amount FROM transactions WHERE DATE(transaction_date) >= DATE(NOW()) - INTERVAL ${interval} DAY AND type = "income";`, (err, income_total)=>{
                if (err) throw err
                db.query(`SELECT "total", COALESCE(SUM(amount)) as amount FROM transactions WHERE DATE(transaction_date) >= DATE(NOW()) - INTERVAL ${interval} DAY AND type = "expense";`, (err, expense_total)=>{
                    if (err) throw err
                    res.status(200).json({
                        "income_categories": income_categories,
                        "income_total": income_total,
                        "expense_categories": expense_categories,
                        "expense_total": expense_total
                    })
                })
            })
        })
    })
}

function filterMonth(db, req, res){
    let idParams = req.params.id
    db.query(`SELECT category_name, COALESCE(SUM(amount)) as amount FROM transactions WHERE MONTH(transaction_date) = ${idParams} AND type = "income" GROUP BY category_name;`, (err, income_categories)=>{
        if (err) throw err
        db.query(`SELECT category_name, COALESCE(SUM(amount)) as amount FROM transactions WHERE MONTH(transaction_date) = ${idParams} AND type = "expense" GROUP BY category_name;`, (err, expense_categories)=>{
            if (err) throw err
            db.query(`SELECT "total", COALESCE(SUM(amount)) as amount FROM transactions WHERE MONTH(transaction_date) = ${idParams} AND type = "income";`, (err, income_total)=>{
                if (err) throw err
                db.query(`SELECT "total", COALESCE(SUM(amount)) as amount FROM transactions WHERE MONTH(transaction_date) = ${idParams} AND type = "expense";`, (err, expense_total)=>{
                    if (err) throw err
                    res.status(200).json({
                        "income_categories": income_categories,
                        "income_total": income_total,
                        "expense_categories": expense_categories,
                        "expense_total": expense_total
                    })
                })
            })
        })
    })
}

module.exports = {
    getReportIncomeExpense: getReportIncomeExpense,
    filterDateRange: filterDateRange,
    filterMonth: filterMonth
}