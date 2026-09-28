/* =========================================================
   SHIFTPLANNER
   PROFESSIONAL FRONTEND JAVASCRIPT
========================================================= */

console.log("🌱 ShiftPlanner app.js loaded successfully");


/* =========================================================
   DATA
========================================================= */

const defaultSwaps = [

    {
        id: 1,

        from: "Arun Kumar",
        to: "Rahul Rai",

        date: "28-09-2026",

        shift: "Morning",

        time: "06:00 - 14:00",

        colleagueApproval: "Pending",

        managerApproval: "Pending",

        status: "pending",

        requestedAt: "28/09/2026, 22:11"
    },

    {
        id: 2,

        from: "Priya Sharma",
        to: "Arun Kumar",

        date: "29-09-2026",

        shift: "Afternoon",

        time: "14:00 - 22:00",

        colleagueApproval: "Approved",

        managerApproval: "Pending",

        status: "pending",

        requestedAt: "28/09/2026, 20:42"
    },

    {
        id: 3,

        from: "Rahul Rai",
        to: "Priya Sharma",

        date: "30-09-2026",

        shift: "Night",

        time: "22:00 - 06:00",

        colleagueApproval: "Approved",

        managerApproval: "Approved",

        status: "accepted",

        requestedAt: "27/09/2026, 18:20"
    },

    {
        id: 4,

        from: "Arun Kumar",
        to: "Priya Sharma",

        date: "01-10-2026",

        shift: "Morning",

        time: "06:00 - 14:00",

        colleagueApproval: "Pending",

        managerApproval: "Declined",

        status: "rejected",

        requestedAt: "27/09/2026, 15:05"
    }

];


let swaps =
    JSON.parse(
        localStorage.getItem("shiftplannerSwaps")
    ) || defaultSwaps;


let activities =
    JSON.parse(
        localStorage.getItem("shiftplannerActivities")
    ) || [

        {
            icon: "🔄",
            title: "New swap request",
            description:
                "Arun Kumar requested a shift swap with Rahul Rai.",
            time: "10 minutes ago"
        },

        {
            icon: "✓",
            title: "Attendance updated",
            description:
                "Priya Sharma was marked present.",
            time: "32 minutes ago"
        },

        {
            icon: "📅",
            title: "Shift assigned",
            description:
                "Morning shift assigned to Arun Kumar.",
            time: "1 hour ago"
        }

    ];


let notifications =
    JSON.parse(
        localStorage.getItem("shiftplannerNotifications")
    ) || [

        {
            icon: "🔄",
            title: "New swap request",
            message:
                "Arun Kumar requested a shift swap."
        },

        {
            icon: "✓",
            title: "Colleague approved",
            message:
                "Rahul Rai approved the requested swap."
        }

    ];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const navItems =
    document.querySelectorAll(".nav-item");

const sections =
    document.querySelectorAll(".content-section");

const quickActions =
    document.querySelectorAll("[data-section-target]");

const pageTitle =
    document.getElementById("pageTitle");

const pageSubtitle =
    document.getElementById("pageSubtitle");

const swapList =
    document.getElementById("swapList");

const swapSearch =
    document.getElementById("swapSearch");

const swapFilter =
    document.getElementById("swapFilter");

const sidebarSwapCount =
    document.getElementById("sidebarSwapCount");

const dashboardPendingCount =
    document.getElementById("dashboardPendingCount");

const approvalCount =
    document.getElementById("approvalCount");

const timelineList =
    document.getElementById("timelineList");

const dashboardActivity =
    document.getElementById("dashboardActivity");

const notificationPanel =
    document.getElementById("notificationPanel");

const notificationList =
    document.getElementById("notificationList");

const notificationBtn =
    document.getElementById("notificationBtn");

const closeNotifications =
    document.getElementById("closeNotifications");

const notificationDot =
    document.getElementById("notificationDot");

const mobileMenu =
    document.getElementById("mobileMenu");

const sidebar =
    document.querySelector(".sidebar");


/* =========================================================
   SAVE DATA
========================================================= */

function saveData() {

    localStorage.setItem(
        "shiftplannerSwaps",
        JSON.stringify(swaps)
    );

    localStorage.setItem(
        "shiftplannerActivities",
        JSON.stringify(activities)
    );

    localStorage.setItem(
        "shiftplannerNotifications",
        JSON.stringify(notifications)
    );
}


/* =========================================================
   NAVIGATION
========================================================= */

const sectionInformation = {

    dashboard: {
        title: "Manager Dashboard",
        subtitle:
            "Overview of your workforce and today's activities."
    },

    employees: {
        title: "Employees",
        subtitle:
            "Manage employees and attendance."
    },

    assign: {
        title: "Assign Shift",
        subtitle:
            "Schedule employees for upcoming shifts."
    },

    roster: {
        title: "My Roster",
        subtitle:
            "View and manage your workforce schedule."
    },

    swaps: {
        title: "Shift Swap Management",
        subtitle:
            "Review, approve and manage employee shift swaps."
    },

    timeline: {
        title: "Activity Timeline",
        subtitle:
            "Track important workforce events."
    }

};


function showSection(sectionName) {

    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    const selectedSection =
        document.getElementById(
            sectionName + "Section"
        );


    if (selectedSection) {

        selectedSection.classList.add(
            "active-section"
        );
    }


    navItems.forEach(item => {

        item.classList.remove("active");

        if (
            item.dataset.section ===
            sectionName
        ) {

            item.classList.add("active");
        }

    });


    const information =
        sectionInformation[sectionName];


    if (information) {

        pageTitle.textContent =
            information.title;

        pageSubtitle.textContent =
            information.subtitle;
    }


    if (sidebar) {

        sidebar.classList.remove(
            "mobile-open"
        );
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* NAV BUTTONS */

navItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            showSection(
                item.dataset.section
            );

        }
    );

});


/* QUICK ACTIONS */

quickActions.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            showSection(
                button.dataset.sectionTarget
            );

        }
    );

});


/* =========================================================
   RENDER SWAPS
========================================================= */

function renderSwaps() {

    if (!swapList) {
        return;
    }


    const searchText =
        (swapSearch?.value || "")
            .trim()
            .toLowerCase();


    const filter =
        swapFilter?.value || "all";


    const filtered =
        swaps.filter(swap => {

            const matchesSearch =

                swap.from
                    .toLowerCase()
                    .includes(searchText)

                ||

                swap.to
                    .toLowerCase()
                    .includes(searchText)

                ||

                swap.shift
                    .toLowerCase()
                    .includes(searchText);


            const matchesFilter =

                filter === "all"

                ||

                swap.status === filter;


            return (
                matchesSearch &&
                matchesFilter
            );

        });


    if (filtered.length === 0) {

        swapList.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    🔍
                </div>

                <h3>
                    No swap requests found
                </h3>

                <p>
                    Try changing your search or filter.
                </p>

            </div>

        `;

        return;
    }


    swapList.innerHTML =
        filtered
            .map(createSwapCard)
            .join("");
}


/* =========================================================
   CREATE SWAP CARD
========================================================= */

function createSwapCard(swap) {

    const statusText =
        getStatusText(swap.status);


    const statusClass =
        "status-" + swap.status;


    const colleagueDone =
        swap.colleagueApproval ===
        "Approved";


    const managerDone =
        swap.managerApproval ===
        "Approved";


    let actionHTML = "";


    if (swap.status === "pending") {

        actionHTML = `

            <div class="swap-actions">

                <div class="swap-actions-left">
                    Requested ${swap.requestedAt}
                </div>

                <div class="swap-buttons">

                    <button
                        class="accept-btn"
                        type="button"
                        onclick="openSwapDecision(
                            ${swap.id},
                            'accepted'
                        )"
                    >
                        ✓ Accept Swap
                    </button>

                    <button
                        class="reject-btn"
                        type="button"
                        onclick="openSwapDecision(
                            ${swap.id},
                            'rejected'
                        )"
                    >
                        ✕ Reject
                    </button>

                </div>

            </div>

        `;

    } else if (swap.status === "accepted") {

        actionHTML = `

            <div class="swap-actions">

                <div class="swap-actions-left">
                    Approved ${swap.requestedAt}
                </div>

                <div class="swap-status status-accepted">
                    ✓ Swap Accepted
                </div>

            </div>

        `;

    } else {

        actionHTML = `

            <div class="swap-actions">

                <div class="swap-actions-left">
                    Reviewed ${swap.requestedAt}
                </div>

                <div class="swap-status status-rejected">
                    ✕ Swap Rejected
                </div>

            </div>

        `;

    }


    return `

        <article
            class="swap-card"
            data-swap-id="${swap.id}"
        >

            <div class="swap-header">

                <div class="swap-people">

                    <div class="swap-person-avatar">
                        ${getInitials(swap.from)}
                    </div>

                    <div>

                        <div class="swap-person-name">
                            ${escapeHTML(swap.from)}

                            <span class="swap-arrow">
                                →
                            </span>

                            ${escapeHTML(swap.to)}
                        </div>

                        <small style="color:#78909c;">
                            Employee shift swap request
                        </small>

                    </div>

                </div>


                <span class="
                    swap-status
                    ${statusClass}
                ">
                    ${statusText}
                </span>

            </div>


            <div class="swap-info-grid">

                <div class="swap-info">

                    <label>Date</label>

                    <strong>
                        ${swap.date}
                    </strong>

                </div>


                <div class="swap-info">

                    <label>Shift</label>

                    <strong>
                        ${swap.shift}
                    </strong>

                </div>


                <div class="swap-info">

                    <label>Time</label>

                    <strong>
                        ${swap.time}
                    </strong>

                </div>


                <div class="swap-info">

                    <label>Request</label>

                    <strong>
                        #SWP-${String(swap.id).padStart(3, "0")}
                    </strong>

                </div>

            </div>


            <div class="approval-track">

                <div class="
                    track-step
                    ${colleagueDone ? "done" : ""}
                ">

                    <span class="track-dot">
                        ${colleagueDone ? "✓" : "1"}
                    </span>

                    Colleague Approval

                </div>


                <div class="track-line"></div>


                <div class="
                    track-step
                    ${managerDone ? "done" : ""}
                ">

                    <span class="track-dot">
                        ${managerDone ? "✓" : "2"}
                    </span>

                    Manager Approval

                </div>


                <div class="track-line"></div>


                <div class="
                    track-step
                    ${swap.status === "accepted" ? "done" : ""}
                ">

                    <span class="track-dot">
                        ${swap.status === "accepted" ? "✓" : "3"}
                    </span>

                    Final Decision

                </div>

            </div>


            ${actionHTML}

        </article>

    `;
}


/* =========================================================
   STATUS TEXT
========================================================= */

function getStatusText(status) {

    if (status === "accepted") {

        return "Accepted";

    }

    if (status === "rejected") {

        return "Rejected";

    }

    return "Pending";
}


/* =========================================================
   INITIALS
========================================================= */

function getInitials(name) {

    return name
        .split(" ")
        .map(word => word.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase();
}


/* =========================================================
   HTML SAFETY
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   PENDING COUNT
========================================================= */

function updateCounts() {

    const pending =
        swaps.filter(
            swap =>
                swap.status === "pending"
        ).length;


    if (sidebarSwapCount) {

        sidebarSwapCount.textContent =
            pending;
    }


    if (dashboardPendingCount) {

        dashboardPendingCount.textContent =
            pending;
    }


    if (approvalCount) {

        approvalCount.textContent =
            pending + " Pending";
    }

}


/* =========================================================
   MODAL
========================================================= */

const confirmModal =
    document.getElementById(
        "confirmModal"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalMessage =
    document.getElementById(
        "modalMessage"
    );

const modalIcon =
    document.getElementById(
        "modalIcon"
    );

const confirmAction =
    document.getElementById(
        "confirmAction"
    );

const cancelModal =
    document.getElementById(
        "cancelModal"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );


let selectedSwapId = null;

let selectedDecision = null;


/* OPEN MODAL */

function openSwapDecision(
    swapId,
    decision
) {

    selectedSwapId =
        Number(swapId);

    selectedDecision =
        decision;


    const swap =
        swaps.find(
            item =>
                item.id ===
                selectedSwapId
        );


    if (!swap) {
        return;
    }


    if (decision === "accepted") {

        modalIcon.textContent = "✓";

        modalTitle.textContent =
            "Accept Shift Swap?";

        modalMessage.textContent =
            `You are about to approve the shift swap between ${swap.from} and ${swap.to}. The employee will be notified immediately.`;

        confirmAction.textContent =
            "Yes, Accept Swap";

        confirmAction.style.background =
            "var(--green)";

    } else {

        modalIcon.textContent = "✕";

        modalTitle.textContent =
            "Reject Shift Swap?";

        modalMessage.textContent =
            `You are about to reject the shift swap between ${swap.from} and ${swap.to}. The employee will be notified about this decision.`;

        confirmAction.textContent =
            "Yes, Reject";

        confirmAction.style.background =
            "var(--red)";
    }


    confirmModal.classList.add(
        "show"
    );
}


/* CLOSE MODAL */

function closeModal() {

    confirmModal.classList.remove(
        "show"
    );

    selectedSwapId = null;

    selectedDecision = null;

    confirmAction.style.background =
        "";
}


/* =========================================================
   CONFIRM DECISION
========================================================= */

function performSwapDecision() {

    if (
        selectedSwapId === null ||
        selectedDecision === null
    ) {
        return;
    }


    const swap =
        swaps.find(
            item =>
                item.id ===
                selectedSwapId
        );


    if (!swap) {
        return;
    }


    if (
        selectedDecision ===
        "accepted"
    ) {

        swap.status =
            "accepted";

        swap.managerApproval =
            "Approved";


        addActivity(

            "✓",

            "Shift swap approved",

            `${swap.from}'s shift swap with ${swap.to} was approved.`

        );


        addNotification(

            "Swap accepted",

            `${swap.from}'s shift swap has been approved.`

        );


        showToast(

            "Swap Accepted",

            "The employee has been notified.",

            "✓"

        );

    } else {

        swap.status =
            "rejected";

        swap.managerApproval =
            "Declined";


        addActivity(

            "✕",

            "Shift swap rejected",

            `${swap.from}'s shift swap with ${swap.to} was rejected.`

        );


        addNotification(

            "Swap rejected",

            `${swap.from}'s shift swap has been rejected.`

        );


        showToast(

            "Swap Rejected",

            "The employee has been notified.",

            "✕"

        );
    }


    saveData();

    closeModal();

    renderSwaps();

    renderTimeline();

    renderDashboardActivity();

    renderNotifications();

    updateCounts();

}


/* MODAL EVENTS */

confirmAction.addEventListener(
    "click",
    performSwapDecision
);

cancelModal.addEventListener(
    "click",
    closeModal
);

modalClose.addEventListener(
    "click",
    closeModal
);


confirmModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            confirmModal
        ) {

            closeModal();
        }

    }
);


/* =========================================================
   ACTIVITY
========================================================= */

function addActivity(
    icon,
    title,
    description
) {

    activities.unshift({

        icon,

        title,

        description,

        time: "Just now"

    });


    if (activities.length > 15) {

        activities =
            activities.slice(0, 15);
    }

}


/* =========================================================
   RENDER TIMELINE
========================================================= */

function renderTimeline() {

    if (!timelineList) {
        return;
    }


    timelineList.innerHTML =

        activities
            .map(activity => `

                <div class="timeline-item">

                    <div class="timeline-icon">
                        ${activity.icon}
                    </div>

                    <div class="timeline-content">

                        <strong>
                            ${escapeHTML(
                activity.title
            )}
                        </strong>

                        <p>
                            ${escapeHTML(
                activity.description
            )}
                        </p>

                        <time>
                            ${escapeHTML(
                activity.time
            )}
                        </time>

                    </div>

                </div>

            `)
            .join("");
}


/* =========================================================
   DASHBOARD ACTIVITY
========================================================= */

function renderDashboardActivity() {

    if (!dashboardActivity) {
        return;
    }


    dashboardActivity.innerHTML =

        activities
            .slice(0, 4)
            .map(activity => `

                <div class="timeline-item">

                    <div class="timeline-icon">
                        ${activity.icon}
                    </div>

                    <div class="timeline-content">

                        <strong>
                            ${escapeHTML(
                activity.title
            )}
                        </strong>

                        <p>
                            ${escapeHTML(
                activity.description
            )}
                        </p>

                        <time>
                            ${escapeHTML(
                activity.time
            )}
                        </time>

                    </div>

                </div>

            `)
            .join("");
}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function addNotification(
    title,
    message
) {

    notifications.unshift({

        icon: "🔔",

        title,

        message

    });


    if (notifications.length > 10) {

        notifications =
            notifications.slice(0, 10);
    }

}


function renderNotifications() {

    if (!notificationList) {
        return;
    }


    notificationList.innerHTML =

        notifications
            .slice(0, 6)
            .map(notification => `

                <div class="notification-item">

                    <div class="notification-item-icon">
                        ${notification.icon}
                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(
                notification.title
            )}
                        </strong>

                        <p>
                            ${escapeHTML(
                notification.message
            )}
                        </p>

                    </div>

                </div>

            `)
            .join("");


    if (notifications.length > 0) {

        notificationDot.style.display =
            "block";

    } else {

        notificationDot.style.display =
            "none";
    }
}


/* NOTIFICATION PANEL */

notificationBtn.addEventListener(
    "click",
    () => {

        notificationPanel.classList.toggle(
            "show"
        );

    }
);


closeNotifications.addEventListener(
    "click",
    () => {

        notificationPanel.classList.remove(
            "show"
        );

    }
);


/* =========================================================
   TOAST
========================================================= */

const toast =
    document.getElementById(
        "toast"
    );

const toastTitle =
    document.getElementById(
        "toastTitle"
    );

const toastMessage =
    document.getElementById(
        "toastMessage"
    );

const toastIcon =
    document.getElementById(
        "toastIcon"
    );


let toastTimer;


function showToast(
    title,
    message,
    icon = "✓"
) {

    toastTitle.textContent =
        title;

    toastMessage.textContent =
        message;

    toastIcon.textContent =
        icon;


    toast.classList.add(
        "show"
    );


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3500
        );
}


/* =========================================================
   SEARCH
========================================================= */

if (swapSearch) {

    swapSearch.addEventListener(
        "input",
        renderSwaps
    );
}


if (swapFilter) {

    swapFilter.addEventListener(
        "change",
        renderSwaps
    );
}


/* =========================================================
   MOBILE MENU
========================================================= */

if (mobileMenu) {

    mobileMenu.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "mobile-open"
            );

        }
    );
}


/* =========================================================
   LOGOUT
========================================================= */

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        () => {

            const shouldLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!shouldLogout) {
                return;
            }


            showToast(

                "Logged Out",

                "Redirecting to login page...",

                "↪"

            );


            setTimeout(
                () => {

                    /*
                       Change this to your
                       actual login page.
                    */

                    window.location.href =
                        "login.html";

                },
                1000
            );

        }
    );

}


/* =========================================================
   ASSIGN SHIFT
========================================================= */

const assignShiftBtn =
    document.getElementById(
        "assignShiftBtn"
    );


if (assignShiftBtn) {

    assignShiftBtn.addEventListener(
        "click",
        () => {

            const employee =
                document.getElementById(
                    "assignEmployee"
                ).value;

            const date =
                document.getElementById(
                    "assignDate"
                ).value;

            const shift =
                document.getElementById(
                    "assignShift"
                ).value;


            if (!date) {

                showToast(

                    "Missing Date",

                    "Please select a shift date.",

                    "!"

                );

                return;
            }


            addActivity(

                "📅",

                "Shift assigned",

                `${shift} shift assigned to ${employee}.`

            );


            addNotification(

                "Shift assigned",

                `${shift} shift assigned to ${employee}.`

            );


            saveData();

            renderTimeline();

            renderDashboardActivity();

            renderNotifications();


            showToast(

                "Shift Assigned",

                `${employee} has been scheduled successfully.`,

                "✓"

            );

        }
    );

}


/* =========================================================
   EMPLOYEE ATTENDANCE BUTTONS
========================================================= */

document
    .querySelectorAll(".small-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const row =
                    button.closest(
                        ".employee-row"
                    );


                if (!row) {
                    return;
                }


                const name =
                    row.querySelector(
                        "strong"
                    )?.textContent ||
                    "Employee";


                const markingAbsent =
                    button.classList.contains(
                        "danger"
                    );


                if (markingAbsent) {

                    button.textContent =
                        "Mark Present";

                    button.classList.remove(
                        "danger"
                    );

                    button.classList.add(
                        "success"
                    );

                } else {

                    button.textContent =
                        "Mark Absent";

                    button.classList.remove(
                        "success"
                    );

                    button.classList.add(
                        "danger"
                    );

                }


                const status =
                    row.querySelector(
                        ".status"
                    );


                if (status) {

                    status.textContent =
                        markingAbsent
                            ? "● Absent"
                            : "● Present";

                    status.className =
                        markingAbsent
                            ? "status absent"
                            : "status present";

                }


                addActivity(

                    markingAbsent
                        ? "🔴"
                        : "🟢",

                    "Attendance updated",

                    `${name} was marked ${
                        markingAbsent
                            ? "absent"
                            : "present"
                    }.`

                );


                saveData();

                renderTimeline();

                renderDashboardActivity();

                showToast(

                    "Attendance Updated",

                    `${name}'s attendance has been updated.`,

                    "✓"

                );

            }
        );

    });


/* =========================================================
   ADD EMPLOYEE
========================================================= */

const addEmployeeBtn =
    document.getElementById(
        "addEmployeeBtn"
    );


if (addEmployeeBtn) {

    addEmployeeBtn.addEventListener(
        "click",
        () => {

            showToast(

                "Employee Management",

                "Employee creation form is ready for integration.",

                "+"

            );

        }
    );

}


/* =========================================================
   LOGOUT / INITIAL LOAD
========================================================= */

function initializeApp() {

    renderSwaps();

    renderTimeline();

    renderDashboardActivity();

    renderNotifications();

    updateCounts();

    console.log(
        "🌱 ShiftPlanner initialized successfully"
    );
}

initializeApp();
/* =========================================================
   EMPLOYEE DASHBOARD
   ADDED WITHOUT CHANGING MANAGER FUNCTIONS
========================================================= */

console.log("👨‍💼 Employee module loaded");


/* =========================================================
   EMPLOYEE DATA
========================================================= */

const employeeShifts = [

    {
        id: 101,
        employee: "employee",
        date: "28-09-2026",
        shift: "Morning",
        time: "06:00 - 14:00",
        status: "Scheduled"
    },

    {
        id: 102,
        employee: "employee",
        date: "29-09-2026",
        shift: "Afternoon",
        time: "14:00 - 22:00",
        status: "Scheduled"
    },

    {
        id: 103,
        employee: "employee",
        date: "30-09-2026",
        shift: "Night",
        time: "22:00 - 06:00",
        status: "Scheduled"
    },

    {
        id: 104,
        employee: "employee",
        date: "01-10-2026",
        shift: "Morning",
        time: "06:00 - 14:00",
        status: "Scheduled"
    }

];


const employeeColleagues = [

    "Arun Kumar",
    "Rahul Rai",
    "Priya Sharma",
    "Karthik Kumar"
];


let employeeRequests =
    JSON.parse(
        localStorage.getItem(
            "shiftplannerEmployeeRequests"
        )
    ) || [];


let employeeActivities =
    JSON.parse(
        localStorage.getItem(
            "shiftplannerEmployeeActivities"
        )
    ) || [

        {
            icon: "📅",
            text: "Your Morning shift is scheduled for 28-09-2026.",
            time: "Today"
        }

    ];


/* =========================================================
   EMPLOYEE ROLE
========================================================= */

function isEmployee() {

    return (
        localStorage.getItem(
            "shiftplannerRole"
        ) === "employee"
    );

}


/* =========================================================
   EMPLOYEE DASHBOARD START
========================================================= */

function initializeEmployeeDashboard() {

    if (!isEmployee()) {
        return;
    }


    const managerElements = [

        ".sidebar",
        ".topbar",
        "#dashboardSection",
        "#employeesSection",
        "#assignSection",
        "#rosterSection",
        "#swapsSection",
        "#timelineSection"

    ];


    managerElements.forEach(selector => {

        document
            .querySelectorAll(selector)
            .forEach(element => {

                element.style.display = "none";

            });

    });


    const employeeDashboard =
        document.getElementById(
            "employeeDashboardSection"
        );


    if (!employeeDashboard) {

        console.error(
            "Employee dashboard HTML not found."
        );

        return;
    }


    employeeDashboard.style.display =
        "block";


    loadEmployeeDashboard();

}


/* =========================================================
   LOAD EMPLOYEE DASHBOARD
========================================================= */

function loadEmployeeDashboard() {

    const username =
        localStorage.getItem(
            "shiftplannerUsername"
        ) || "employee";


    const displayName =
        document.getElementById(
            "employeeDisplayName"
        );


    if (displayName) {

        displayName.textContent =
            username === "employee"
                ? "Employee"
                : username;
    }


    renderEmployeeRoster();

    renderEmployeeShiftOptions();

    renderEmployeeColleagues();

    renderIncomingRequests();

    renderMyEmployeeRequests();

    renderEmployeeActivities();

    updateEmployeeCounts();

    setupEmployeeButtons();

}


/* =========================================================
   EMPLOYEE ROSTER
========================================================= */

function renderEmployeeRoster() {

    const table =
        document.getElementById(
            "employeeRosterBody"
        );


    if (!table) {
        return;
    }


    table.innerHTML = "";


    employeeShifts.forEach(
        function (shift) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${shift.date}
                </td>

                <td>
                    <strong>
                        ${shift.shift}
                    </strong>
                </td>

                <td>
                    ${shift.time}
                </td>

                <td>
                    <span class="
                        employee-status
                        accepted
                    ">
                        ✓ ${shift.status}
                    </span>
                </td>

            `;


            table.appendChild(row);

        }
    );


    if (employeeShifts.length > 0) {

        const next =
            employeeShifts[0];


        const shiftName =
            document.getElementById(
                "employeeNextShift"
            );


        const todayName =
            document.getElementById(
                "todayShiftName"
            );


        const todayTime =
            document.getElementById(
                "todayShiftTime"
            );


        const todayDate =
            document.getElementById(
                "todayShiftDate"
            );


        if (shiftName) {

            shiftName.textContent =
                next.shift;
        }


        if (todayName) {

            todayName.textContent =
                next.shift + " Shift";
        }


        if (todayTime) {

            todayTime.textContent =
                next.time;
        }


        if (todayDate) {

            todayDate.textContent =
                next.date;
        }

    }

}


/* =========================================================
   SHIFT DROPDOWN
========================================================= */

function renderEmployeeShiftOptions() {

    const select =
        document.getElementById(
            "employeeShiftSelect"
        );


    if (!select) {
        return;
    }


    select.innerHTML = "";


    employeeShifts.forEach(
        function (shift) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                shift.id;


            option.textContent =
                `${shift.date} • ${shift.shift} • ${shift.time}`;


            select.appendChild(option);

        }
    );

}


/* =========================================================
   COLLEAGUE DROPDOWN
========================================================= */

function renderEmployeeColleagues() {

    const select =
        document.getElementById(
            "employeeColleagueSelect"
        );


    if (!select) {
        return;
    }


    select.innerHTML =
        `<option value="">
            Select colleague
        </option>`;


    employeeColleagues.forEach(
        function (name) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                name;


            option.textContent =
                name;


            select.appendChild(option);

        }
    );

}


/* =========================================================
   SEND SWAP REQUEST
========================================================= */

function sendEmployeeSwapRequest() {

    const shiftSelect =
        document.getElementById(
            "employeeShiftSelect"
        );


    const colleagueSelect =
        document.getElementById(
            "employeeColleagueSelect"
        );


    const reasonInput =
        document.getElementById(
            "employeeSwapReason"
        );


    const message =
        document.getElementById(
            "employeeSwapMessage"
        );


    const shift =
        employeeShifts.find(
            item =>
                item.id ===
                Number(shiftSelect.value)
        );


    const colleague =
        colleagueSelect.value;


    const reason =
        reasonInput.value.trim();


    if (!shift) {

        message.textContent =
            "Please select your shift.";

        message.style.color =
            "#d62828";

        return;
    }


    if (!colleague) {

        message.textContent =
            "Please select a colleague.";

        message.style.color =
            "#d62828";

        return;
    }


    if (!reason) {

        message.textContent =
            "Please enter a reason.";

        message.style.color =
            "#d62828";

        return;
    }


    const request = {

        id:
            Date.now(),

        requester:
            "Employee",

        colleague:
        colleague,

        date:
        shift.date,

        shift:
        shift.shift,

        time:
        shift.time,

        reason:
        reason,

        colleagueApproval:
            "Pending",

        managerApproval:
            "Pending",

        status:
            "Pending",

        createdAt:
            new Date().toLocaleString()

    };


    employeeRequests.unshift(
        request
    );


    employeeActivities.unshift({

        icon: "🔄",

        text:
            `Swap request sent to ${colleague}.`,

        time:
            "Just now"

    });


    saveEmployeeData();


    renderMyEmployeeRequests();

    renderEmployeeActivities();

    updateEmployeeCounts();


    message.textContent =
        "✓ Swap request sent successfully.";

    message.style.color =
        "#008f7a";


    reasonInput.value = "";

    colleagueSelect.value = "";


    showEmployeeToast(
        "Swap Request Sent",
        `Your request was sent to ${colleague}.`
    );

}


/* =========================================================
   INCOMING REQUESTS
========================================================= */

function renderIncomingRequests() {

    const container =
        document.getElementById(
            "incomingSwapList"
        );


    if (!container) {
        return;
    }


    /*
       Demo incoming request.
       Once another employee sends a request,
       it can be stored here.
    */

    const incoming =
        employeeRequests.filter(
            request =>
                request.colleague ===
                "Employee"
        );


    if (incoming.length === 0) {

        container.innerHTML = `

            <div class="employee-request-card">

                <strong>
                    No incoming requests
                </strong>

                <p class="employee-request-details">
                    New colleague swap requests
                    will appear here.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML =
        incoming.map(
            function (request) {

                return `

                    <div
                        class="employee-request-card"
                    >

                        <div
                            class="employee-request-top"
                        >

                            <div>

                                <div
                                    class="employee-request-name"
                                >
                                    ${request.requester}
                                </div>

                                <div
                                    class="employee-request-details"
                                >
                                    ${request.date}
                                    •
                                    ${request.shift}
                                    •
                                    ${request.time}
                                </div>

                            </div>

                            <span
                                class="
                                    employee-status
                                    ${request.status.toLowerCase()}
                                "
                            >
                                ${request.status}
                            </span>

                        </div>


                        <div
                            class="employee-request-details"
                        >
                            Reason:
                            ${request.reason}
                        </div>


                        ${
                    request.status === "Pending"
                        ? `

                                    <div
                                        class="employee-request-actions"
                                    >

                                        <button
                                            class="employee-accept-btn"
                                            onclick="
                                                employeeAcceptRequest(
                                                    ${request.id}
                                                )
                                            "
                                        >
                                            ✓ Accept
                                        </button>

                                        <button
                                            class="employee-decline-btn"
                                            onclick="
                                                employeeDeclineRequest(
                                                    ${request.id}
                                                )
                                            "
                                        >
                                            ✕ Decline
                                        </button>

                                    </div>

                                `
                        : ""
                }

                    </div>

                `;

            }
        ).join("");

}


/* =========================================================
   ACCEPT REQUEST
========================================================= */

function employeeAcceptRequest(id) {

    const request =
        employeeRequests.find(
            item =>
                item.id === id
        );


    if (!request) {
        return;
    }


    request.colleagueApproval =
        "Accepted";


    request.status =
        "Colleague Accepted";


    employeeActivities.unshift({

        icon: "✓",

        text:
            `You accepted ${request.requester}'s swap request.`,

        time:
            "Just now"

    });


    saveEmployeeData();


    renderIncomingRequests();

    renderMyEmployeeRequests();

    renderEmployeeActivities();

    updateEmployeeCounts();


    showEmployeeToast(
        "Swap Accepted",
        "Waiting for manager final approval."
    );

}


/* =========================================================
   DECLINE REQUEST
========================================================= */

function employeeDeclineRequest(id) {

    const request =
        employeeRequests.find(
            item =>
                item.id === id
        );


    if (!request) {
        return;
    }


    request.colleagueApproval =
        "Declined";


    request.status =
        "Rejected";


    employeeActivities.unshift({

        icon: "✕",

        text:
            `You declined ${request.requester}'s swap request.`,

        time:
            "Just now"

    });


    saveEmployeeData();


    renderIncomingRequests();

    renderEmployeeActivities();

    updateEmployeeCounts();


    showEmployeeToast(
        "Swap Declined",
        "The requester has been notified."
    );

}


/* =========================================================
   MY REQUESTS
========================================================= */

function renderMyEmployeeRequests() {

    const container =
        document.getElementById(
            "myEmployeeSwapList"
        );


    if (!container) {
        return;
    }


    const myRequests =
        employeeRequests.filter(
            request =>
                request.requester ===
                "Employee"
        );


    if (myRequests.length === 0) {

        container.innerHTML = `

            <div class="employee-request-card">

                <strong>
                    No swap requests yet
                </strong>

                <p class="employee-request-details">
                    Your submitted requests
                    will appear here.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML =
        myRequests.map(
            function (request) {

                let statusClass =
                    "pending";


                if (
                    request.status ===
                    "Rejected"
                ) {

                    statusClass =
                        "rejected";

                } else if (
                    request.status ===
                    "Completed"
                ) {

                    statusClass =
                        "completed";

                } else if (
                    request.colleagueApproval ===
                    "Accepted"
                ) {

                    statusClass =
                        "accepted";

                }


                return `

                    <div
                        class="employee-request-card"
                    >

                        <div
                            class="employee-request-top"
                        >

                            <div>

                                <div
                                    class="employee-request-name"
                                >
                                    Swap with
                                    ${request.colleague}
                                </div>

                                <div
                                    class="employee-request-details"
                                >
                                    ${request.date}
                                    •
                                    ${request.shift}
                                    •
                                    ${request.time}
                                </div>

                            </div>


                            <span
                                class="
                                    employee-status
                                    ${statusClass}
                                "
                            >
                                ${request.status}
                            </span>

                        </div>


                        <div
                            class="employee-request-details"
                        >

                            Colleague:
                            ${request.colleagueApproval}

                            <br>

                            Manager:
                            ${request.managerApproval}

                            <br>

                            Reason:
                            ${request.reason}

                        </div>

                    </div>

                `;

            }
        ).join("");

}


/* =========================================================
   EMPLOYEE ACTIVITY
========================================================= */

function renderEmployeeActivities() {

    const container =
        document.getElementById(
            "employeeActivityList"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        employeeActivities
            .slice(0, 8)
            .map(
                function (activity) {

                    return `

                        <div
                            class="employee-activity-item"
                        >

                            <div
                                class="employee-activity-icon"
                            >
                                ${activity.icon}
                            </div>

                            <div>

                                <strong>
                                    ${activity.text}
                                </strong>

                                <p>
                                    ${activity.time}
                                </p>

                            </div>

                        </div>

                    `;

                }
            ).join("");

}


/* =========================================================
   EMPLOYEE COUNTS
========================================================= */

function updateEmployeeCounts() {

    const requestCount =
        document.getElementById(
            "employeeRequestCount"
        );


    const pendingCount =
        document.getElementById(
            "employeePendingCount"
        );


    const notificationCount =
        document.getElementById(
            "employeeNotificationCount"
        );


    const myRequests =
        employeeRequests.filter(
            request =>
                request.requester ===
                "Employee"
        );


    const pending =
        myRequests.filter(
            request =>
                request.status ===
                "Pending"
        );


    if (requestCount) {

        requestCount.textContent =
            myRequests.length;
    }


    if (pendingCount) {

        pendingCount.textContent =
            pending.length;
    }


    if (notificationCount) {

        notificationCount.textContent =
            employeeActivities.length;
    }

}


/* =========================================================
   EMPLOYEE BUTTONS
========================================================= */

function setupEmployeeButtons() {

    const rosterBtn =
        document.getElementById(
            "viewRosterBtn"
        );


    const swapBtn =
        document.getElementById(
            "requestSwapBtn"
        );


    const requestsBtn =
        document.getElementById(
            "viewRequestsBtn"
        );


    const sendBtn =
        document.getElementById(
            "sendSwapRequestBtn"
        );


    const logoutBtn =
        document.getElementById(
            "employeeLogoutBtn"
        );


    if (rosterBtn) {

        rosterBtn.onclick =
            function () {

                document
                    .getElementById(
                        "employeeRosterPanel"
                    )
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            };

    }


    if (swapBtn) {

        swapBtn.onclick =
            function () {

                document
                    .getElementById(
                        "employeeSwapPanel"
                    )
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            };

    }


    if (requestsBtn) {

        requestsBtn.onclick =
            function () {

                document
                    .getElementById(
                        "incomingRequestsPanel"
                    )
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            };

    }


    if (sendBtn) {

        sendBtn.onclick =
            sendEmployeeSwapRequest;

    }


    if (logoutBtn) {

        logoutBtn.onclick =
            function () {

                localStorage.removeItem(
                    "shiftplannerLoggedIn"
                );

                localStorage.removeItem(
                    "shiftplannerRole"
                );

                localStorage.removeItem(
                    "shiftplannerUsername"
                );

                window.location.href =
                    "login.html";

            };

    }

}


/* =========================================================
   SAVE EMPLOYEE DATA
========================================================= */

function saveEmployeeData() {

    localStorage.setItem(
        "shiftplannerEmployeeRequests",
        JSON.stringify(
            employeeRequests
        )
    );


    localStorage.setItem(
        "shiftplannerEmployeeActivities",
        JSON.stringify(
            employeeActivities
        )
    );

}


/* =========================================================
   EMPLOYEE TOAST
========================================================= */

function showEmployeeToast(
    title,
    message
) {

    /*
       Use existing manager toast
       if available.
    */

    if (
        typeof showToast ===
        "function"
    ) {

        showToast(
            title,
            message,
            "✓"
        );

        return;
    }


    alert(
        title + "\n\n" + message
    );

}


/* =========================================================
   START EMPLOYEE MODE
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeEmployeeDashboard
    );

} else {

    initializeEmployeeDashboard();

}