const db = require('../config/database');
const ExcelJS = require('exceljs');


// **Handle Inquiry Form Submission**
const enquiryController = {
    submitEnquiry: (req, res) => {
        const { name, email, mobile, course, city, education } = req.body;
        const today = new Date();

        const sql = `INSERT INTO enroll (name, email, phone, course, city, education, enrolldate) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        db.query(sql, [name, email, mobile, course, city, education, today], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.status(500).json({ success: false, message: "Database error: " + err.message });
            }
            console.log("Data inserted successfully:", result);
            res.json({ success: true, message: "Enquiry submitted successfully!" });
        });
    },


    // API to get total enquiry count from 'enroll' table
    getTotalEnquiries: (req, res) => {
        const query = "SELECT COUNT(*) AS totalEnquiries FROM enroll";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database query failed" });
            }
            res.json({ totalEnquiries: result[0].totalEnquiries });
        });
    },

    // API to fetch the latest 10 enquiries

    updateEnquiryStatus: (req, res) => {
        const { id, status, remark } = req.body;
        if (!id || !status) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        }

        const query = `UPDATE enroll SET status = ?, remark = ? WHERE id = ?`;
        db.query(query, [status, remark || null, id], (err, result) => {
            if (err) {
                console.error("Error updating enquiry status:", err);
                return res.status(500).json({ success: false, message: "Database update error" });
            }
            return res.json({ success: true });
        });
    },

    // In your server.js or relevant controller file

    getstatusoptions: (req, res) => {
        const query = "SELECT DISTINCT status FROM enroll";
        db.query(query, (err, results) => {
            if (err) return res.status(500).json({ error: "Database query failed" });
            const statuses = results.map(row => row.status);
            res.json(statuses);
        });
    },

    getEnquiries: (req, res) => {
        const { status, page } = req.query;
        const limit = 10;
        const offset = (page - 1) * limit;

        let query = "SELECT * FROM enroll";
        let countQuery = "SELECT COUNT(*) as count FROM enroll";
        let whereClause = "";
        let params = [];

        if (status && status !== "Select Status") {
            whereClause = " WHERE status = ?";
            params.push(status);
        }

        db.query(countQuery + whereClause, params, (err, countResults) => {
            if (err) return res.status(500).json({ error: "Count query failed" });
            const total = countResults[0].count;
            const totalPages = Math.ceil(total / limit);

            db.query(query + whereClause + " ORDER BY id DESC LIMIT ? OFFSET ?", [...params, limit, offset], (err, data) => {
                if (err) return res.status(500).json({ error: "Data query failed" });
                res.json({ enquiries: data, totalPages, currentPage: parseInt(page) });
            });
        });
    },

    //**export enquries to excell */
    exportexcellEnquiries: (req, res) => {
        const type = req.query.type;
        const status = req.query.status;
        const limit = 10;

        let baseQuery = `
            SELECT DATE_FORMAT(enrolldate, '%Y-%m-%d') AS enrolldate,
                   name, phone, course, city, status, remark
            FROM enroll`;

        let conditions = [];
        let params = [];

        if (status && status.toLowerCase() !== "all" && status.toLowerCase() !== "select status") {
            conditions.push("status = ?");
            params.push(status);
        }

        if (conditions.length > 0) {
            baseQuery += " WHERE " + conditions.join(" AND ");
        }

        if (type === "current") {
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * limit;
            baseQuery += " ORDER BY id DESC LIMIT ? OFFSET ?";
            params.push(limit, offset);
        } else if (type === "custom") {
            const from = parseInt(req.query.from);
            const to = parseInt(req.query.to);
            const offset = (from - 1) * limit;
            const total = (to - from + 1) * limit;
            baseQuery += " ORDER BY id DESC LIMIT ? OFFSET ?";
            params.push(total, offset);
        } else {
            baseQuery += " ORDER BY id DESC";
        }

        db.query(baseQuery, params, async (err, results) => {
            if (err) return res.status(500).json({ error: "Export query error" });

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Enquiries");

            worksheet.columns = [
                { header: "Date", key: "enrolldate", width: 15 },
                { header: "Name", key: "name", width: 25 },
                { header: "Phone", key: "phone", width: 15 },
                { header: "Course", key: "course", width: 20 },
                { header: "City", key: "city", width: 20 },
                { header: "Status", key: "status", width: 15 },
                { header: "Remark", key: "remark", width: 30 }
            ];

            worksheet.addRows(results);

            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", `attachment; filename=enquiries_${type}_${status}.xlsx`);

            await workbook.xlsx.write(res);
            res.end();
        });
    },
};

module.exports = enquiryController;
