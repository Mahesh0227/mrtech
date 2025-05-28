// Sidebar Toggle sidebar
document.querySelector('.menu-icon').addEventListener('click', function () {
	document.querySelector('.sidebar').classList.toggle('show');
	// Toggle between 'menu' and 'cancel' icon
	if (this.textContent === "menu") {
		this.textContent = "cancel";
	} else {
		this.textContent = "menu";
	}
});


// Select elements
const notificationIcon = document.querySelector('.notification-icon');
const notificationDropdown = document.querySelector('.notification-dropdown');
const profileIcon = document.querySelector('.profile-icon');
const profileDropdown = document.querySelector('.profile-dropdown');

// Toggle notification dropdown
notificationIcon.addEventListener('click', function (event) {
	notificationDropdown.classList.toggle('show');
	profileDropdown.classList.remove('show'); // Close profile if open
	event.stopPropagation();
});

// Toggle profile dropdown
profileIcon.addEventListener('click', function (event) {
	profileDropdown.classList.toggle('show');
	notificationDropdown.classList.remove('show'); // Close notifications if open
	event.stopPropagation();
});

// Close dropdowns when clicking outside
window.addEventListener('click', function () {
	notificationDropdown.classList.remove('show');
	profileDropdown.classList.remove('show');
});

// Prevent closing when clicking inside the dropdowns
notificationDropdown.addEventListener('click', function (event) {
	event.stopPropagation();
});

profileDropdown.addEventListener('click', function (event) {
	event.stopPropagation();
});
//**end profile and notification */

// Dropdown Toggle Function
function toggleDropdown(menuSelector, submenuSelector, iconSelector) {
	document.querySelector(menuSelector).addEventListener('click', function () {
		document.querySelector(submenuSelector).classList.toggle('show');
		document.querySelector(iconSelector).textContent =
			document.querySelector(submenuSelector).classList.contains('show') ? 'expand_less' : 'expand_more';
	});
}

// Initialize dropdowns
toggleDropdown('.students-menu', '.students-submenu', '.students-toggle');
toggleDropdown('.courses-menu', '.courses-submenu', '.courses-toggle');
toggleDropdown('.Batches-menu', '.Batches-submenu', '.Batches-toggle');
toggleDropdown('.trainers-menu', '.trainers-submenu', '.trainers-toggle');
toggleDropdown('.FInance-menu', '.FInance-submenu', '.FInance-toggle');
toggleDropdown('.certificate-menu', '.certificate-submenu', '.certificate-toggle');

// Search to redirect the page
function redirectToSearch() {
	const searchInput = document.getElementById('searchInput').value;
	if (searchInput) {
		window.location.href = `search.html?query=${searchInput}`;
	}
	return false;
}

function handleKeyPress(event) {
	if (event.key === 'Enter') {
		redirectToSearch();
	}
}
//search on click rediretch to the search page end

//**Api's Starts here */

//**Display the total students */
document.addEventListener("DOMContentLoaded", function () {
	fetchTotalStudents();
	fetchTotalEnquiries();
});

// Function to get total students from the backend
function fetchTotalStudents() {
	fetch("/total-students")
		.then((response) => response.json())
		.then((data) => {
			document.getElementById("totalStudents").textContent = data.totalStudents || 0;
		})
		.catch((error) => console.error("Error fetching total students:", error));
}
// total students end

//fetch the total course count
document.addEventListener("DOMContentLoaded", () => {
	fetch("/totalcourses")
		.then((response) => response.json())
		.then((data) => {
			document.getElementById("totalcourses").innerText = data.total;
		})
		.catch((error) => {
			console.error("Error fetching total courses:", error);
			document.getElementById("totalcourses").innerText = "Error";
		});
});
// end the total course count  

//pop up code to the total courses
function viewTotalCourses() {
	fetch("/viewtotalcourses")
		.then(response => response.json())
		.then(data => {
			const tableBody = document.getElementById("courseTableBody");
			tableBody.innerHTML = "";

			data.forEach(course => {
				const row = `
					<tr>
						<td>${course.CourseID}</td>
						<td>${course.CourseName}</td>
						<td>${course.Duration}</td>
					</tr>
				`;
				tableBody.innerHTML += row;
			});

			document.getElementById("courseModal").style.display = "flex"; // Show Popup
		})
		.catch(err => console.error("Error Fetching Courses:", err));
}

// end the pop up code of total courses offered

// fetch the total active courses
document.addEventListener("DOMContentLoaded", () => {
	fetch("/batchcount")
		.then((response) => response.json())
		.then((data) => {
			document.querySelector("#activecourses").innerText = data.activeCourses;
		})
		.catch((error) => {
			console.error("Error fetching Active Courses:", error);
			document.querySelector("#activecourses").innerText = "Error";
		});
});
//end the total active courses

// Function to fetch total enquiries
function fetchTotalEnquiries() {
	fetch("/total-enquiries")
		.then(response => response.json())
		.then(data => {
			document.getElementById("totalEnquiries").textContent = data.totalEnquiries || 0;
		})
		.catch(error => console.error("Error fetching total enquiries:", error));
}
//TotalEnquiries,,,,, end

//LatestStudents Api
// ========== STUDENT PAGINATION ==========
let studentCurrentPage = 1;
let studentPageSize = 10;
let studentTotalPages = 1;

document.addEventListener("DOMContentLoaded", function () {
	fetchStudentPage(studentCurrentPage);
	fetchEnquiryPage(enquiryCurrentPage);
});

function fetchStudentPage(page) {
	fetch(`/latest-students?page=${page}&limit=${studentPageSize}`)
		.then(response => response.json())
		.then(data => {
			const { students, total } = data;
			const tableBody = document.getElementById("latestStudents");
			tableBody.innerHTML = "";

			if (students.length === 0) {
				tableBody.innerHTML = `<tr><td colspan="6">No students found.</td></tr>`;
			} else {
				students.forEach(student => {
					const row = document.createElement("tr");
					row.innerHTML = `
						<td>${student.StudentID}</td>
						<td>${student.BatchCode}</td>
						<td>${student.FullName}</td>
						<td>${student.MobileNumber}</td>
						<td>${student.Course}</td>
						<td>${student.City}</td>
					`;
					tableBody.appendChild(row);
				});
			}

			studentTotalPages = Math.ceil(total / studentPageSize);
			studentCurrentPage = page;

			document.getElementById("studentCurrentPage").textContent = studentCurrentPage;
			document.getElementById("studentTotalPages").textContent = studentTotalPages;
		})
		.catch(error => console.error("Error fetching student page:", error));
}

function changeStudentPage(offset) {
	const newPage = studentCurrentPage + offset;
	if (newPage >= 1 && newPage <= studentTotalPages) {
		fetchStudentPage(newPage);
	}
}

function jumpToStudentPage(inputPage) {
	const page = parseInt(inputPage);
	if (page >= 1 && page <= studentTotalPages) {
		fetchStudentPage(page);
	} else {
		alert(`Please enter a page number between 1 and ${studentTotalPages}`);
	}
}

// ========== ENQUIRY PAGINATION ==========
let enquiryCurrentPage = 1;
let enquiryTotalPages = 1;

function fetchEnquiryPage(page) {
	fetch(`/latest-enquiries?page=${page}`)
		.then(response => response.json())
		.then(data => {
			const tableBody = document.getElementById("latestEnquiries");
			tableBody.innerHTML = "";

			if (data.enquiries.length === 0) {
				tableBody.innerHTML = `<tr><td colspan="5">No enquiries found.</td></tr>`;
			} else {
				data.enquiries.forEach(enquiry => {
					const row = document.createElement("tr");
					row.innerHTML = `
						<td>${enquiry.enrolldate}</td>
						<td>${enquiry.name}</td>
						<td>${enquiry.phone}</td>
						<td>${enquiry.course}</td>
						<td>${enquiry.city}</td>
					`;
					tableBody.appendChild(row);
				});
			}

			enquiryCurrentPage = data.currentPage;
			enquiryTotalPages = data.totalPages;

			document.getElementById("enquiryCurrentPage").textContent = enquiryCurrentPage;
			document.getElementById("enquiryTotalPages").textContent = enquiryTotalPages;
		})
		.catch(error => console.error("Error fetching enquiries:", error));
}

function changeEnquiryPage(offset) {
	const newPage = enquiryCurrentPage + offset;
	if (newPage >= 1 && newPage <= enquiryTotalPages) {
		fetchEnquiryPage(newPage);
	}
}

function jumpToEnquiryPage(inputPage) {
	const page = parseInt(inputPage);
	if (!isNaN(page) && page >= 1 && page <= enquiryTotalPages) {
		fetchEnquiryPage(page);
	} else {
		alert(`Please enter a page number between 1 and ${enquiryTotalPages}`);
	}
}

//**export enquries to excell */
function toggleCustomPageInputs() {
	const type = document.getElementById("exportType").value;
	document.getElementById("customPageRange").style.display = (type === "custom") ? "inline" : "none";
  }
  
  function exportEnquiries() {
	const type = document.getElementById("exportType").value;
  
	let url = "/export-enquiries?type=" + type;
  
	if (type === "current") {
	  url += `&page=${enquiryCurrentPage}`;
	} else if (type === "custom") {
	  const from = parseInt(document.getElementById("fromPage").value);
	  const to = parseInt(document.getElementById("toPage").value);
  
	  if (isNaN(from) || isNaN(to) || from < 1 || to < from || to > enquiryTotalPages) {
		alert("Please enter a valid custom page range.");
		return;
	  }
  
	  url += `&from=${from}&to=${to}`;
	}
  
	window.open(url, "_blank");
  }
  


//** END,,,,,GET THE LATEST 10 ENQURIES API  */

// Load statuses dynamically on page load
document.addEventListener("DOMContentLoaded", async () => {
	await loadStatuses(); // Load status list from DB
});

// Load statuses from server
async function loadStatuses() {
	const statusSelect = document.getElementById("BatchStatus");

	try {
		const response = await fetch("/getStudentBatches");
		const statuses = await response.json();

		statusSelect.innerHTML = `<option value="">Select Status</option>`;

		statuses.forEach(item => {
			const option = document.createElement("option");
			option.value = item.Status;
			option.textContent = item.Status;
			statusSelect.appendChild(option);
		});
	} catch (error) {
		console.error("Failed to fetch statuses", error);
	}
}

// Load batch codes based on selected status
async function loadBatchCodes() {
	const status = document.getElementById("BatchStatus").value;
	const batchSelect = document.getElementById("batchCodeDropdown");

	batchSelect.innerHTML = `<option value="">Select Batch</option>`;
	if (!status) return;

	try {
		const response = await fetch(`/getBatchesByStatus/${status}`);
		const batches = await response.json();

		batches.forEach(batch => {
			const option = document.createElement("option");
			option.value = batch.BatchCode;
			option.textContent = batch.BatchCode;
			batchSelect.appendChild(option);
		});
	} catch (error) {
		console.error("Error loading batch codes", error);
	}
}

// Download Excel File for Selected Batch
function downloadExcel() {
	const batchCode = document.getElementById("batchCodeDropdown").value; // Fixed reference
	if (!batchCode) {
		alert("Please select a batch code.");
		return;
	}
	window.location.href = `/export-students?batchCode=${batchCode}`;
}

// Load statuses on page load (fixed reference)
window.onload = loadStatuses;


// view content on screen pop up 
let studentsData = []; // Store all students data
let currentPage = 0;
const pageSize = 10;

async function viewStudents() {
	const batchCode = document.getElementById("batchCodeDropdown").value;
	if (!batchCode) {
		alert("Please select a batch code!");
		return;
	}

	try {
		const response = await fetch(`/getstudents?batchCode=${batchCode}`);
		if (!response.ok) throw new Error("Failed to fetch students.");
		studentsData = await response.json();

		document.getElementById("studentCount").innerText = `Total Students: ${studentsData.length}`;

		if (studentsData.length === 0) {
			alert("No students found for this batch.");
			return;
		}

		currentPage = 0;
		displayStudents();
		document.getElementById("studentModal").style.display = "flex"; // Fixed Display to Flex
	} catch (error) {
		console.error("Error:", error);
		alert("Error fetching students.");
	}
}

function displayStudents() {
	const tableBody = document.getElementById("studentTableBody");
	tableBody.innerHTML = "";

	const start = currentPage * pageSize;
	const end = start + pageSize;
	const studentsToShow = studentsData.slice(start, end);

	studentsToShow.forEach(student => {
		const row = `<tr>
			<td>${student.StudentID}</td>
			<td>${student.FirstName}</td>
			<td>${student.LastName}</td>
			<td>${student.Course}</td>
			<td>${student.MobileNumber}</td>
			<td>${student.EmailID}</td>
		</tr>`;
		tableBody.innerHTML += row;
	});

	// Pagination Buttons
	document.getElementById("prevBtn").disabled = currentPage === 0;
	document.getElementById("nextBtn").disabled = end >= studentsData.length;

	// Update Page Info
	document.getElementById("pageInfo").innerText = `Page ${currentPage + 1} of ${Math.ceil(studentsData.length / pageSize)}`;
}

function nextPage() {
	if ((currentPage + 1) * pageSize < studentsData.length) {
		currentPage++;
		displayStudents();
	}
}

function prevPage() {
	if (currentPage > 0) {
		currentPage--;
		displayStudents();
	}
}

//**batches active list pop up */
async function showActiveCoursesPopup() {
	try {
		const response = await fetch("/active-courses");
		const courses = await response.json();

		const tableBody = document.getElementById("activeCoursesList");
		tableBody.innerHTML = "";

		if (courses.length > 0) {
			courses.forEach((course) => {
				const row = `
				<tr>
					<td>${course.batchid}</td>
					<td>${course.coursename}</td>
					<td>${course.duration}</td>
					<td>${course.trainer}</td>
					<td>${course.status}</td>
				</tr>`;
				tableBody.innerHTML += row;
			});
		} else {
			tableBody.innerHTML = `<tr><td colspan="5">No Active Courses Available</td></tr>`;
		}

		document.getElementById("batchactive").style.display = "flex";
	} catch (error) {
		console.error("Error fetching active courses:", error);
		alert("Failed to fetch active courses!");
	}
}
function closePopup() {
	document.getElementById("batchactive").style.display = "none";
}


//**! batches active list pop up */

//**closse modal of pop up */
function closeModal(modalID) {
	const modal = document.getElementById(modalID);
	modal.style.display = "none";
}

window.onclick = function (event) {
	const smodal = document.getElementById("studentModal");
	if
		(event.target == smodal) {
		closeModal('studentModal');
	}
	const cmodal = document.getElementById("courseModal");
	if (event.target == cmodal) {
		closeModal('courseModal');
	}
	const bactive = document.getElementById("batchactive");
	if (event.target == bactive) {
		closeModal('batchactive');
	}

};

// end the view content on screen pop up