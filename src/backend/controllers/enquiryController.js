const db = require('../config/database');


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
        const query = "SELECT DISTINCT status FROM enroll   "; // adjust table/column name as per your DB
        db.query(query, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database query failed" });
            }
            // results will be like [{status: 'Joined'}, {status: 'Not Interested'}, ...]
            const statuses = results.map(row => row.status);
            res.json(statuses);
        });
    },
};

module.exports = enquiryController;
