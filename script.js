
const days = [
    "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
];

const times = [
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 1:00",
    "1:00 - 2:00",
    "2:00 - 3:00"
];

// Sample timetable
let lectures = JSON.parse(localStorage.getItem("lectures")) || [
    {
        day: "Monday",
        time: "9:00 - 10:00",
        subject: "Full Stack Development",
        teacher: "Mr. Rahul",
        room: "Lab 1"
    },
    {
        day: "Tuesday",
        time: "10:00 - 11:00",
        subject: "Database Management",
        teacher: "Mrs. Priya",
        room: "Room 102"
    },
    {
        day: "Wednesday",
        time: "11:00 - 12:00",
        subject: "Java Programming",
        teacher: "Mr. Amit",
        room: "Lab 2"
    }
];

let editIndex = -1;

// Display today's date
document.getElementById("todayDate").innerText =
    "Today: " + new Date().toDateString();

// Display timetable
function displayTimetable() {

    const tbody = document.getElementById("timetableBody");
    tbody.innerHTML = "";

    times.forEach(time => {

        let row = `<tr><th>${time}</th>`;

        days.forEach(day => {

            const index = lectures.findIndex(
                l => l.day === day && l.time === time
            );

            if (index !== -1) {

                const lecture = lectures[index];

                row += `
                    <td>
                        <div class="lecture">
                            <strong>${lecture.subject}</strong>
                            <small>${lecture.teacher}</small>
                            <small>${lecture.room}</small>

                            <button class="edit-btn"
                                onclick="editLecture(${index})">
                                Edit
                            </button>

                            <button class="delete-btn"
                                onclick="deleteLecture(${index})">
                                Delete
                            </button>
                        </div>
                    </td>
                `;

            } else {
                row += "<td>Free</td>";
            }

        });

        row += "</tr>";
        tbody.innerHTML += row;

    });

}

// Open form
function openForm() {
    document.getElementById("lectureForm").style.display = "block";
}

// Close form
function closeForm() {
    document.getElementById("lectureForm").style.display = "none";
    document.getElementById("myForm").reset();
    editIndex = -1;
    document.getElementById("formTitle").innerText = "Add New Lecture";
}

// Save lecture
document.getElementById("myForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const day = document.getElementById("day").value;
    const time = document.getElementById("time").value;
    const subject = document.getElementById("subject").value;
    const teacher = document.getElementById("teacher").value;
    const room = document.getElementById("room").value;

    // Check whether slot is already occupied
    const existingIndex = lectures.findIndex(
        (l, i) =>
            l.day === day &&
            l.time === time &&
            i !== editIndex
    );

    if (existingIndex !== -1) {
        alert("This time slot is already occupied!");
        return;
    }

    const lecture = {
        day,
        time,
        subject,
        teacher,
        room
    };

    if (editIndex === -1) {
        lectures.push(lecture);
        alert("Lecture added successfully!");
    } else {
        lectures[editIndex] = lecture;
        alert("Lecture updated successfully!");
    }

    localStorage.setItem("lectures", JSON.stringify(lectures));

    displayTimetable();
    closeForm();

});

// Edit lecture
function editLecture(index) {

    const lecture = lectures[index];

    document.getElementById("day").value = lecture.day;
    document.getElementById("time").value = lecture.time;
    document.getElementById("subject").value = lecture.subject;
    document.getElementById("teacher").value = lecture.teacher;
    document.getElementById("room").value = lecture.room;

    editIndex = index;

    document.getElementById("formTitle").innerText = "Edit Lecture";

    openForm();

}

// Delete lecture
function deleteLecture(index) {

    if (confirm("Are you sure you want to delete this lecture?")) {

        lectures.splice(index, 1);

        localStorage.setItem("lectures", JSON.stringify(lectures));

        displayTimetable();

        alert("Lecture deleted successfully!");

    }

}

// Initial display
displayTimetable();
