const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import auth middleware
const { verifyToken } = require('./src/backend/middleware/authMiddleware');
const { get } = require('https');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log('Connected to MySQL Database.');

// Import controllers
const authController = require('./src/backend/controllers/authController');
const studentController = require('./src/backend/controllers/studentController');
const enquiryController = require('./src/backend/controllers/enquiryController');
const coursecontrollers = require("./src/backend/controllers/coursecontrollers");
const batchControllers = require("./src/backend/controllers/batchController");
const trainerController = require("./src/backend/controllers/trainerController");
const paymentscontrollers = require("./src/backend/controllers/paymentscontrollers");
const certificateController = require("./src/backend/controllers/certificateController");
const securityController = require("./src/backend/controllers/securityController");
const settingsController = require("./src/backend/controllers/settingsController");
const studentdashboardController = require("./src/backend/controllers/studentdashboardController");



//**indext.html api's */
app.get("/coursesdropdown", coursecontrollers.getCourses);


// << AUTH ROUTES >>
app.post('/login', authController.loginUnified);
app.post("/new-register-student", authController.registernewStudent);
app.post("/verify-phone", authController.verifyPhone);
app.post('/signup', authController.createAccount);
app.post('/verify-email', authController.verifyEmail);
app.post('/reset-password', authController.resetPassword);
app.post('/verify-batch', authController.verifyBatch);
app.post('/verify-aadhar', authController.verifyAadhar);
app.post('/verify-mobile', authController.verifyMobile);

// <<< SECURITY ROUTS>>
app.post("/check-email", securityController.checkEmail);
app.post("/check-username", securityController.checkUsername);
app.post("/check-password", securityController.checkPassword);
app.post("/update-security", securityController.updateSecurity);

//<< student dashboard>>>
app.get("/profile", verifyToken, studentdashboardController.getProfile);

// << SETTINGS >>
app.get("/getAdminDetails", settingsController.getAdminDetails);
app.post("/updateAdminDetails", settingsController.updateAdminDetails);

// << ENQUIRY ROUTES >>>
app.post('/EnquiryForm', enquiryController.submitEnquiry);
app.get('/total-enquiries', enquiryController.getTotalEnquiries);
app.post('/update-enquiry-status', enquiryController.updateEnquiryStatus);
app.get('/get-status-options', enquiryController.getstatusoptions);
app.get("/export-enquiries", enquiryController.exportexcellEnquiries);
app.get('/get-enquiries',enquiryController.getEnquiries);

// << COURSE ROUTES >>
app.get('/courses', coursecontrollers.getCourses);// Course routes dor add batch also 
app.get("/totalcourses", coursecontrollers.getTotalCourses);//**fretch api to diplay the total courses frm the coourse table */
app.get('/viewtotalcourses', coursecontrollers.getviewtotalcourses);//**get the total courses view waht we offered */
app.post("/addcourse", coursecontrollers.addCourse);
app.get('/getAllcourses', coursecontrollers.getAllCourses);
app.delete("/deletecourse/:courseid", coursecontrollers.deleteCourse);

// <<< TRAINER ROUTES >>
// Trainer routes
app.post('/trainers', trainerController.addTrainer);

// << STUDENT ROUTES >>
app.post('/register', studentController.registerStudent);
app.get('/students', studentController.getStudents);
app.get('/latest-student', studentController.getLatestStudent);// fech api to the pdf /latest-student
app.get('/student/:id', studentController.getStudentById);// GET THE PDF the studentid = student data
app.get('/latest-students', studentController.getLatestStudents);//fech api to the /latest-students latest 10 student registrations
app.get('/total-students', studentController.getTotalStudents);// fech api to the /total-students total count of registrations
app.get('/total-enquiries', studentController.getTotalEnquiries);// fech api to the /total-enquiries total enquiries count

app.get('/get-batch-codes', studentController.getBatchCodes);//**FECH API RO THE /get-batch-codes TO GET THE STUDENT TABLE */
app.get('/export-students', studentController.exportStudents);//**fetch the /export-students api to dwnload the excel sheet */
app.get('/getstudents', studentController.getstudents);//**FETCH THE API TO VEW THE STUNDETS WITH SAME CODE */
app.get("/search", studentController.searchStudents);//**fetch  the get studnets from the students table */
app.put("/update/:id", studentController.updateStudent);//**fetch the aoi to edit teh data of the students */
app.get("/getCourseTypes", studentController.getCourseTypes);//**disly the datata to view the fee pending */
app.get("/getStatusesByCourseType/:courseType", studentController.getStatusesByCourseType);
app.get("/getBatches/:courseType/:status", studentController.getBatchesByCourseTypeAndStatus);
app.get("/getStudents/:batchCode", studentController.getStudentsByBatch);
app.post("/updateStudentStatus", studentController.updateStudentStatus);
app.get("/getStudentBatches", studentController.getStudentBatches);
app.get("/getBatchesByStatus/:status", studentController.getBatchesByStatus);
app.get("/getBatchesByStatus/:status", studentController.getBatchCodes)
app.get("/student-logins", studentController.getAllStudentLogins);
app.delete("/student-logins/:can_id", studentController.deleteStudentLogin);

// << BATCH ROUTES >>
app.get('/batchcount', batchControllers.Activecount);//**FETCH THE API TO VEW THE count of teh running course */
app.get('/active-courses', batchControllers.getActiveCourses);
app.post("/addBatch", batchControllers.addBatch);//**fetch teh api to add the active batches */
app.get('/batches', batchControllers.getBatches);// Batch routes disply only teh batches if from the batches table
app.get("/batchecode", batchControllers.Batcheactive);
app.get("/getBatches", batchControllers.getBatchesdata);//**can up date the total batch fee to this api */
app.post("/updateBatchStatus", batchControllers.updateBatchStatus);//**set inactive batch status */

// <<< PAYMENTS ROUTES >>>
app.get("/getStudentsdata", paymentscontrollers.Studentspayment);//**disply teh data */
app.post("/savePayment", paymentscontrollers.savePayment);//**to done successfully teh payment */
app.get("/dailytransactions", paymentscontrollers.getDailyTransactions);//**get the /dailytransactions to view the data enetry */
app.get("/checkTermExists", paymentscontrollers.checkTermExists);//**error check */
app.get("/getTerms", paymentscontrollers.getTerms);//**get the pop up of the term date and amout */

// ===== CERTIFICATE ROUTES =====
app.post("/upload", certificateController.uploadCertificate); // Route for uploading certificates
app.get("/certificate/:id", certificateController.getCertificate); // Route for retrieving certificates by Student ID



// Protected route
app.get('/protected', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'Dashboard.html'));
});

// Static file serving
app.use(express.json());
app.use(express.static(path.join(__dirname, "src")));// Serve all static files from the src directory


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});