const pool = require("../database/index")
const companyController = {
    getAllCompany: async (req, res) => {
        try {
            const [result] = await pool.query("select * from company")
            res.json({
                data: result
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "Failed to get all company data."
            })
        }
    },
    getCompanyById: async (req, res) => {
        try {
            const { id } = req.params
            const [result] = await pool.query("select * from company where id = ?",[id])
            res.json({
                data: result
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "Failed to get company data."
            })
        }
    },
    createCompany: async (req, res) => {
        try {
            const { name,owner } = req.body
            const sql = "insert into company (name,owner) values (?,?)"
            const [result] = await pool.query(sql, [name,owner])

            // 檢查是否成功插入一筆資料
            if (result.affectedRows === 1) {
                const [rows] = await pool.query("select * from company where id = ?", [result.insertId])  
                res.json({
                    data: rows
                })
            } else {
                throw new Error("Failed to insert data.")
            }
        } catch (error) {
            console.log(error)
            res.json({
                status: "Failed to insert data."
            })
        }
    },
    updateCompany: async (req, res) => {
        try {
            const { id } = req.params
            const { name } = req.body
            const sql = "update company set name = ? where id = ?"
            const [result] = await pool.query(sql, [name,id])

            if (result.affectedRows === 1) {
                const [rows] = await pool.query("select * from company where id = ?", [id])
                res.json({
                    data: rows
                })
                
            } else {
                throw new Error("Failed to update data.")
            }
        } catch (error) {
            console.log(error)
            res.json({
                status: "Failed to update data."
            })
        }
    }, 
    deleteCompany: async (req, res) => {
        try {
            const { id } = req.params
            const [result] = await pool.query("delete from company where id = ?", [id])
            res.json({
                status: "Delete data success."
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "Failed to delete data."
            })
        }
    }
}

module.exports = companyController