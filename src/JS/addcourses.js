// === Sidebar Toggle ===
document.querySelector('.menu-icon').addEventListener('click', function () {
	const sidebar = document.querySelector('.sidebar');
	sidebar.classList.toggle('show');
	this.textContent = sidebar.classList.contains('show') ? "cancel" : "menu";
});

// === Notification & Profile Dropdowns ===
const notificationIcon = document.querySelector('.notification-icon');
const notificationDropdown = document.querySelector('.notification-dropdown');
const profileIcon = document.querySelector('.profile-icon');
const profileDropdown = document.querySelector('.profile-dropdown');

// Toggle dropdowns
notificationIcon.addEventListener('click', function (event) {
	notificationDropdown.classList.toggle('show');
	profileDropdown.classList.remove('show');
	event.stopPropagation();
});
profileIcon.addEventListener('click', function (event) {
	profileDropdown.classList.toggle('show');
	notificationDropdown.classList.remove('show');
	event.stopPropagation();
});

// Close dropdowns on outside click
window.addEventListener('click', () => {
	notificationDropdown.classList.remove('show');
	profileDropdown.classList.remove('show');
});

// Prevent dropdowns from closing on inside click
notificationDropdown.addEventListener('click', e => e.stopPropagation());
profileDropdown.addEventListener('click', e => e.stopPropagation());

// === Sidebar Dropdown Menus ===
function toggleDropdown(menuSelector, submenuSelector, iconSelector) {
	document.querySelector(menuSelector).addEventListener('click', function () {
		const submenu = document.querySelector(submenuSelector);
		const icon = document.querySelector(iconSelector);
		submenu.classList.toggle('show');
		icon.textContent = submenu.classList.contains('show') ? 'expand_less' : 'expand_more';
	});
}

toggleDropdown('.students-menu', '.students-submenu', '.students-toggle');
toggleDropdown('.courses-menu', '.courses-submenu', '.courses-toggle');
toggleDropdown('.Batches-menu', '.Batches-submenu', '.Batches-toggle');
toggleDropdown('.trainers-menu', '.trainers-submenu', '.trainers-toggle');
toggleDropdown('.FInance-menu', '.FInance-submenu', '.FInance-toggle');
toggleDropdown('.certificate-menu', '.certificate-submenu', '.certificate-toggle');

// === Course Form Submission ===
document.getElementById("courseForm").addEventListener("submit", async function (event) {
	event.preventDefault();

	const courseid = document.getElementById("courseid").value.trim();
	const coursename = document.getElementById("coursename").value.trim();
	const duration = document.getElementById("duration").value.trim();

	if (!courseid || !coursename || !duration || isNaN(duration)) {
		displayMessage("All fields are required and duration must be a number", "red");
		return;
	}

	try {
		const response = await fetch("/addcourse", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ courseid, coursename, duration })
		});
 
		const data = await response.json();
		if (!response.ok) throw new Error(data.message);

		displayMessage(data.message, "green");
		document.getElementById("courseForm").reset();
		await loadCourses(); // Refresh course list after adding
	} catch (error) {
		displayMessage("Error: " + error.message, "red");
	}
});

// === Display Status Message ===
function displayMessage(msg, color) {
	const messageElem = document.getElementById("message");
	messageElem.textContent = msg;
	messageElem.style.color = color;
}

// === Load All Courses ===
async function loadCourses() {
	try {
		const response = await fetch("/getAllcourses");
		if (!response.ok) throw new Error("Failed to load courses");

		const courses = await response.json();
		const tableBody = document.getElementById("courseTableBody");
		tableBody.innerHTML = "";

		courses.forEach(course => {
			const row = document.createElement("tr");
			row.innerHTML = `
				<td>${course.courseid}</td>
				<td>${course.coursename}</td>
				<td>${course.duration}</td>
				<td><button class="delete-btn" onclick="deleteCourse('${course.courseid}')">Delete</button></td>
			`;
			tableBody.appendChild(row);
		});
	} catch (error) {
		console.error("Error loading courses:", error);
		displayMessage("Failed to load courses", "red");
	}
}

// === Delete Course by ID ===
async function deleteCourse(courseid) {
	if (!confirm("Are you sure you want to delete this course?")) return;

	try {
		const response = await fetch(`/deletecourse/${courseid}`, { method: "DELETE" });
		const data = await response.json();
		if (!response.ok) throw new Error(data.message);

		alert(data.message);
		await loadCourses(); // Reload course list after deletion
	} catch (error) {
		alert("Error: " + error.message);
	}
}

// === Initialize on Page Load ===
document.addEventListener("DOMContentLoaded", loadCourses);
