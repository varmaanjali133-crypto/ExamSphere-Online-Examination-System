/* =========================================================
   ExamSphere - Premium EdTech SaaS Platform
   File: script.js
   Part 1 / Core System + Theme + Loader + Toasts
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL APP
========================================================= */

const ExamSphere = {

    appName: "ExamSphere",

    currentUser: null,

    currentExam: null,

    currentQuestion: 0,

    score: 0,

    timer: null,

    timeRemaining: 0,

    selectedAnswers: [],

    leaderboard: [],

    examHistory: []
};

/* =========================================================
   STORAGE KEYS
========================================================= */

const STORAGE_KEYS = {

    USER: "examsphere_user",

    HISTORY: "examsphere_history",

    LEADERBOARD: "examsphere_leaderboard",

    THEME: "examsphere_theme",

    RESULT: "examsphere_result"
};

/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeApplication();

});

/* =========================================================
   APP INITIALIZER
========================================================= */

function initializeApplication() {

    initializeLoader();

    initializeTheme();

    initializeNavbar();

    initializeCounters();

    initializeRevealAnimations();

    initializeSmoothScroll();

    initializeCurrentYear();

    initializeUserData();

    initializeLeaderboard();

    initializeContactForm();

    initializeAuthForms();

}

/* =========================================================
   LOADER
========================================================= */

function initializeLoader() {

    const loader = document.querySelector(".loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 800);

    });

}

/* =========================================================
   THEME SYSTEM
========================================================= */

function initializeTheme() {

    const themeButton =
        document.querySelector(".theme-toggle");

    const savedTheme =
        localStorage.getItem(STORAGE_KEYS.THEME);

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

    }

    if (!themeButton) return;

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const isLight =
            document.body.classList.contains("light-mode");

        localStorage.setItem(
            STORAGE_KEYS.THEME,
            isLight ? "light" : "dark"
        );

        showToast(
            isLight
                ? "Light mode enabled"
                : "Dark mode enabled",
            "info"
        );

    });

}

/* =========================================================
   NAVBAR SCROLL
========================================================= */

function initializeNavbar() {

    const navbar =
        document.querySelector(".navbar");

    if (!navbar) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });

}

/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initializeSmoothScroll() {

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", e => {

                const target =
                    document.querySelector(
                        link.getAttribute("href")
                    );

                if (!target) return;

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth"

                });

            });

        });

}

/* =========================================================
   REVEAL ANIMATION
========================================================= */

function initializeRevealAnimations() {

    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) return;

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        }, {
            threshold: 0.15
        });

    elements.forEach(item => {

        observer.observe(item);

    });

}

/* =========================================================
   COUNTER ANIMATION
========================================================= */

function initializeCounters() {

    const counters =
        document.querySelectorAll(".counter");

    if (!counters.length) return;

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const element = entry.target;

                const target =
                    parseInt(
                        element.dataset.target
                    );

                let current = 0;

                const increment =
                    Math.ceil(target / 100);

                const update = () => {

                    current += increment;

                    if (current >= target) {

                        element.textContent = target;

                        return;
                    }

                    element.textContent = current;

                    requestAnimationFrame(update);

                };

                update();

                observer.unobserve(element);

            });

        });

    counters.forEach(counter => {

        observer.observe(counter);

    });

}

/* =========================================================
   TOAST NOTIFICATIONS
========================================================= */

function showToast(message, type = "info") {

    let container =
        document.querySelector(".toast-container");

    if (!container) {

        container =
            document.createElement("div");

        container.className =
            "toast-container";

        document.body.appendChild(container);

    }

    const toast =
        document.createElement("div");

    toast.className =
        `toast ${type}`;

    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {

        toast.style.opacity = "0";

        toast.style.transform =
            "translateX(100px)";

        setTimeout(() => {

            toast.remove();

        }, 400);

    }, 3000);

}

/* =========================================================
   USER STORAGE
========================================================= */

function initializeUserData() {

    const storedUser =
        localStorage.getItem(
            STORAGE_KEYS.USER
        );

    if (storedUser) {

        ExamSphere.currentUser =
            JSON.parse(storedUser);

    }

    const history =
        localStorage.getItem(
            STORAGE_KEYS.HISTORY
        );

    if (history) {

        ExamSphere.examHistory =
            JSON.parse(history);

    }

}

/* =========================================================
   SAVE USER
========================================================= */

function saveUser(userData) {

    ExamSphere.currentUser = userData;

    localStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify(userData)
    );

}

/* =========================================================
   EXAM HISTORY
========================================================= */

function saveExamHistory(record) {

    const history =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEYS.HISTORY
            )
        ) || [];

    history.unshift(record);

    localStorage.setItem(
        STORAGE_KEYS.HISTORY,
        JSON.stringify(history)
    );

}

/* =========================================================
   LEADERBOARD STORAGE
========================================================= */

function initializeLeaderboard() {

    const storedLeaderboard =
        localStorage.getItem(
            STORAGE_KEYS.LEADERBOARD
        );

    if (storedLeaderboard) {

        ExamSphere.leaderboard =
            JSON.parse(storedLeaderboard);

    } else {

        ExamSphere.leaderboard = [

            {
                name: "Aarav",
                score: 98
            },
            {
                name: "Priya",
                score: 95
            },
            {
                name: "Rahul",
                score: 92
            },
            {
                name: "Ananya",
                score: 90
            }

        ];

        localStorage.setItem(
            STORAGE_KEYS.LEADERBOARD,
            JSON.stringify(
                ExamSphere.leaderboard
            )
        );

    }

}

/* =========================================================
   UPDATE LEADERBOARD
========================================================= */

function updateLeaderboard(
    username,
    score
) {

    const board =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEYS.LEADERBOARD
            )
        ) || [];

    board.push({

        name: username,
        score: score

    });

    board.sort(
        (a, b) => b.score - a.score
    );

    const topTen =
        board.slice(0, 10);

    localStorage.setItem(
        STORAGE_KEYS.LEADERBOARD,
        JSON.stringify(topTen)
    );

}

/* =========================================================
   CURRENT YEAR
========================================================= */

function initializeCurrentYear() {

    const yearElement =
        document.getElementById(
            "currentYear"
        );

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

}

/* =========================================================
   CONTACT FORM
========================================================= */

function initializeContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            showToast(
                "Message sent successfully!",
                "success"
            );

            form.reset();

        }
    );

}

/* =========================================================
   LOGIN / SIGNUP
========================================================= */

function initializeAuthForms() {

    const loginForm =
        document.getElementById(
            "loginForm"
        );

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            handleLogin
        );

    }

    const signupForm =
        document.getElementById(
            "signupForm"
        );

    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            handleSignup
        );

    }

}

function handleLogin(event) {

    event.preventDefault();

    const name =
        document.getElementById(
            "loginName"
        )?.value || "Student";

    saveUser({

        name

    });

    showToast(
        "Login successful!",
        "success"
    );

    setTimeout(() => {

        window.location.href =
            "index.html";

    }, 1200);

}

function handleSignup(event) {

    event.preventDefault();

    const name =
        document.getElementById(
            "signupName"
        )?.value || "Student";

    saveUser({

        name

    });

    showToast(
        "Account created successfully!",
        "success"
    );

}

/* =========================================================
   END OF PART 1
   NEXT:
   Question Bank
   Random Exam Generator
   Quiz Engine
   Timer
   Navigation Palette
   Score Calculation
   ========================================================= */

/* =========================================================
ExamSphere - Premium EdTech SaaS Platform
File: script.js
Part 2 / Question Bank + Quiz Engine + Timer
========================================================= */

/* =========================================================
   QUESTION BANK
========================================================= */

const QUESTION_BANK = {

    java: [

        {
            question: "Which keyword is used to inherit a class in Java?",
            options: ["implement", "extends", "inherit", "super"],
            answer: 1,
            category: "OOP"
        },

        {
            question: "Which JVM component executes bytecode?",
            options: ["Compiler", "JDK", "Interpreter", "Servlet"],
            answer: 2,
            category: "Core Java"
        },

        {
            question: "Which collection stores unique values?",
            options: ["ArrayList", "LinkedList", "HashSet", "Vector"],
            answer: 2,
            category: "Collections"
        },

        {
            question: "What is the default value of int?",
            options: ["0", "null", "1", "-1"],
            answer: 0,
            category: "Variables"
        },

        {
            question: "Which method starts a thread?",
            options: ["execute()", "run()", "start()", "begin()"],
            answer: 2,
            category: "Multithreading"
        }
    ],

    web: [

        {
            question: "Which HTML tag creates a hyperlink?",
            options: ["link", "href", "a", "hyper"],
            answer: 2,
            category: "HTML"
        },

        {
            question: "Which CSS property changes text color?",
            options: ["font", "text", "color", "background"],
            answer: 2,
            category: "CSS"
        },

        {
            question: "JavaScript is a ______ language.",
            options: ["compiled", "markup", "scripting", "database"],
            answer: 2,
            category: "JavaScript"
        },

        {
            question: "Which CSS layout system is one-dimensional?",
            options: ["Grid", "Flexbox", "Bootstrap", "Float"],
            answer: 1,
            category: "CSS"
        },

        {
            question: "Which symbol is used for IDs in CSS?",
            options: ["#", ".", "@", "$"],
            answer: 0,
            category: "CSS"
        }
    ],

    aptitude: [

        {
            question: "25% of 200 = ?",
            options: ["25", "50", "75", "100"],
            answer: 1,
            category: "Percentage"
        },

        {
            question: "If x = 5 and y = 10, x+y=?",
            options: ["15", "20", "25", "10"],
            answer: 0,
            category: "Arithmetic"
        },

        {
            question: "Find the next number: 2,4,8,16,?",
            options: ["18", "24", "32", "30"],
            answer: 2,
            category: "Series"
        },

        {
            question: "What is 15% of 300?",
            options: ["30", "40", "45", "60"],
            answer: 2,
            category: "Percentage"
        },

        {
            question: "12 × 8 = ?",
            options: ["86", "92", "96", "88"],
            answer: 2,
            category: "Arithmetic"
        }
    ]

};

/* =========================================================
   RANDOM QUESTION GENERATOR
========================================================= */

function generateRandomQuestions(
    examType = "java",
    totalQuestions = 5
) {

    const source =
        QUESTION_BANK[examType] ||
        QUESTION_BANK.java;

    const shuffled =
        [...source].sort(
            () => Math.random() - 0.5
        );

    return shuffled.slice(0, totalQuestions);

}

/* =========================================================
   QUIZ INITIALIZER
========================================================= */

function initializeQuiz() {

    const quizContainer =
        document.getElementById("quizApp");

    if (!quizContainer) return;

    const examType =
        localStorage.getItem("selectedExam")
        || "java";

    ExamSphere.currentExam =
        generateRandomQuestions(
            examType,
            5
        );

    ExamSphere.currentQuestion = 0;

    ExamSphere.selectedAnswers =
        new Array(
            ExamSphere.currentExam.length
        ).fill(null);

    ExamSphere.score = 0;

    startTimer(15 * 60);

    renderQuestion();

    renderQuestionPalette();

}

/* =========================================================
   RENDER QUESTION
========================================================= */

function renderQuestion() {

    const questionData =
        ExamSphere.currentExam[
        ExamSphere.currentQuestion
        ];

    const questionTitle =
        document.getElementById(
            "questionTitle"
        );

    const questionNumber =
        document.getElementById(
            "questionNumber"
        );

    const optionsContainer =
        document.getElementById(
            "optionsContainer"
        );

    if (
        !questionTitle ||
        !optionsContainer
    ) return;

    questionNumber.textContent =
        `Question ${ExamSphere.currentQuestion + 1
        } of ${ExamSphere.currentExam.length
        }`;

    questionTitle.textContent =
        questionData.question;

    optionsContainer.innerHTML = "";

    questionData.options.forEach(
        (option, index) => {

            const optionElement =
                document.createElement("div");

            optionElement.className =
                "option";

            if (
                ExamSphere.selectedAnswers[
                ExamSphere.currentQuestion
                ] === index
            ) {

                optionElement.classList.add(
                    "selected"
                );

            }

            optionElement.innerHTML = `
                <div class="option-index">
                    ${String.fromCharCode(
                65 + index
            )}
                </div>
                <span>${option}</span>
            `;

            optionElement.addEventListener(
                "click",
                () =>
                    selectAnswer(index)
            );

            optionsContainer.appendChild(
                optionElement
            );

        }
    );

    updateProgressBar();

    updatePaletteState();

}

/* =========================================================
   SELECT ANSWER
========================================================= */

function selectAnswer(answerIndex) {

    ExamSphere.selectedAnswers[
        ExamSphere.currentQuestion
    ] = answerIndex;

    renderQuestion();

}

/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuestion() {

    if (
        ExamSphere.currentQuestion <
        ExamSphere.currentExam.length - 1
    ) {

        ExamSphere.currentQuestion++;

        renderQuestion();

    }

}

/* =========================================================
   PREVIOUS QUESTION
========================================================= */

function previousQuestion() {

    if (
        ExamSphere.currentQuestion > 0
    ) {

        ExamSphere.currentQuestion--;

        renderQuestion();

    }

}

/* =========================================================
   QUESTION PALETTE
========================================================= */

function renderQuestionPalette() {

    const palette =
        document.getElementById(
            "questionPalette"
        );

    if (!palette) return;

    palette.innerHTML = "";

    ExamSphere.currentExam.forEach(
        (_, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "palette-btn";

            button.textContent =
                index + 1;

            button.addEventListener(
                "click",
                () => {

                    ExamSphere.currentQuestion =
                        index;

                    renderQuestion();

                }
            );

            palette.appendChild(button);

        }
    );

}

/* =========================================================
   UPDATE PALETTE
========================================================= */

function updatePaletteState() {

    const buttons =
        document.querySelectorAll(
            ".palette-btn"
        );

    buttons.forEach(
        (button, index) => {

            button.classList.remove(
                "active"
            );

            button.classList.remove(
                "answered"
            );

            if (
                index ===
                ExamSphere.currentQuestion
            ) {

                button.classList.add(
                    "active"
                );

            }

            if (
                ExamSphere.selectedAnswers[
                index
                ] !== null
            ) {

                button.classList.add(
                    "answered"
                );

            }

        }
    );

}

/* =========================================================
   PROGRESS BAR
========================================================= */

function updateProgressBar() {

    const progress =
        document.getElementById(
            "progressBar"
        );

    const progressText =
        document.getElementById(
            "progressText"
        );

    if (!progress) return;

    const percentage =
        (
            (
                ExamSphere.currentQuestion + 1
            ) /
            ExamSphere.currentExam.length
        ) * 100;

    progress.style.width =
        `${percentage}%`;

    if (progressText) {

        progressText.textContent =
            `${Math.round(
                percentage
            )}% Completed`;

    }

}

/* =========================================================
   TIMER SYSTEM
========================================================= */

function startTimer(seconds) {

    ExamSphere.timeRemaining =
        seconds;

    updateTimerUI();

    clearInterval(
        ExamSphere.timer
    );

    ExamSphere.timer =
        setInterval(() => {

            ExamSphere.timeRemaining--;

            updateTimerUI();

            if (
                ExamSphere.timeRemaining <= 0
            ) {

                clearInterval(
                    ExamSphere.timer
                );

                showToast(
                    "Time Over! Auto Submitting...",
                    "error"
                );

                submitQuiz();

            }

        }, 1000);

}

/* =========================================================
   TIMER UI
========================================================= */

function updateTimerUI() {

    const timer =
        document.getElementById(
            "timer"
        );

    if (!timer) return;

    const minutes =
        Math.floor(
            ExamSphere.timeRemaining / 60
        );

    const seconds =
        ExamSphere.timeRemaining % 60;

    timer.textContent =
        `${minutes
            .toString()
            .padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`;

    timer.classList.remove(
        "warning",
        "danger"
    );

    if (
        ExamSphere.timeRemaining <= 300
    ) {

        timer.classList.add(
            "warning"
        );

    }

    if (
        ExamSphere.timeRemaining <= 60
    ) {

        timer.classList.add(
            "danger"
        );

    }

}

/* =========================================================
   QUIZ EVENT BINDINGS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeQuiz();

        const nextBtn =
            document.getElementById(
                "nextBtn"
            );

        const prevBtn =
            document.getElementById(
                "prevBtn"
            );

        const submitBtn =
            document.getElementById(
                "submitQuiz"
            );

        if (nextBtn) {

            nextBtn.addEventListener(
                "click",
                nextQuestion
            );

        }

        if (prevBtn) {

            prevBtn.addEventListener(
                "click",
                previousQuestion
            );

        }

        if (submitBtn) {

            submitBtn.addEventListener(
                "click",
                submitQuiz
            );

        }

    }
);

/* =========================================================
   END OF PART 2
   NEXT:
   Score Calculation
   Result Engine
   History Rendering
   Leaderboard Rendering
   Dashboard Widgets
   Exam Cards Logic
   ========================================================= */

/* =========================================================
ExamSphere - Premium EdTech SaaS Platform
File: script.js
Part 3 / Results + History + Leaderboard + Dashboard
========================================================= */

/* =========================================================
   SUBMIT QUIZ
========================================================= */

function submitQuiz() {

    clearInterval(
        ExamSphere.timer
    );

    let correctAnswers = 0;

    ExamSphere.currentExam.forEach(
        (question, index) => {

            if (
                ExamSphere.selectedAnswers[
                index
                ] === question.answer
            ) {

                correctAnswers++;

            }

        }
    );

    const totalQuestions =
        ExamSphere.currentExam.length;

    const wrongAnswers =
        totalQuestions - correctAnswers;

    const percentage =
        Math.round(
            (
                correctAnswers /
                totalQuestions
            ) * 100
        );

    const result = {

        exam:
            localStorage.getItem(
                "selectedExam"
            ) || "Java Fundamentals",

        score: correctAnswers,

        total: totalQuestions,

        wrong: wrongAnswers,

        percentage,

        date:
            new Date().toLocaleDateString(),

        user:
            ExamSphere.currentUser?.name ||
            "Student"
    };

    localStorage.setItem(
        STORAGE_KEYS.RESULT,
        JSON.stringify(result)
    );

    saveExamHistory(result);

    updateLeaderboard(
        result.user,
        result.percentage
    );

    window.location.href =
        "results.html";

}

/* =========================================================
   RESULT PAGE
========================================================= */

function initializeResultsPage() {

    const resultContainer =
        document.getElementById(
            "resultPage"
        );

    if (!resultContainer) return;

    const result =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEYS.RESULT
            )
        );

    if (!result) return;

    renderResult(result);

}

/* =========================================================
   RESULT RENDER
========================================================= */

function renderResult(result) {

    const scoreElement =
        document.getElementById(
            "scorePercentage"
        );

    const scoreValue =
        document.getElementById(
            "scoreValue"
        );

    const correctElement =
        document.getElementById(
            "correctAnswers"
        );

    const wrongElement =
        document.getElementById(
            "wrongAnswers"
        );

    const totalElement =
        document.getElementById(
            "totalQuestions"
        );

    const performance =
        document.getElementById(
            "performanceMessage"
        );

    if (scoreElement) {

        scoreElement.textContent =
            `${result.percentage}%`;

    }

    if (scoreValue) {

        scoreValue.textContent =
            `${result.score}/${result.total}`;

    }

    if (correctElement) {

        correctElement.textContent =
            result.score;

    }

    if (wrongElement) {

        wrongElement.textContent =
            result.wrong;

    }

    if (totalElement) {

        totalElement.textContent =
            result.total;

    }

    if (performance) {

        performance.textContent =
            getPerformanceMessage(
                result.percentage
            );

    }

    updateCircularScore(
        result.percentage
    );

}

/* =========================================================
   PERFORMANCE MESSAGE
========================================================= */

function getPerformanceMessage(
    percentage
) {

    if (percentage >= 90) {

        return "Outstanding Performance! You demonstrated exceptional knowledge and exam readiness.";

    }

    if (percentage >= 75) {

        return "Excellent Work! You have a strong understanding of the subject.";

    }

    if (percentage >= 60) {

        return "Good Job! Keep practicing to improve your mastery.";

    }

    if (percentage >= 40) {

        return "Fair Attempt. More revision and practice are recommended.";

    }

    return "Keep Learning! Consistent practice will help improve your performance.";

}

/* =========================================================
   CIRCULAR SCORE
========================================================= */

function updateCircularScore(
    percentage
) {

    const circle =
        document.querySelector(
            ".score-circle"
        );

    if (!circle) return;

    const degrees =
        (percentage / 100) * 360;

    circle.style.background =
        `conic-gradient(
            #7c3aed 0deg,
            #06b6d4 ${degrees}deg,
            rgba(255,255,255,.08) ${degrees}deg
        )`;

}

/* =========================================================
   RETAKE EXAM
========================================================= */

function retakeExam() {

    window.location.href =
        "quiz.html";

}

/* =========================================================
   EXAM HISTORY TABLE
========================================================= */

function renderExamHistory() {

    const tableBody =
        document.getElementById(
            "historyTableBody"
        );

    if (!tableBody) return;

    const history =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEYS.HISTORY
            )
        ) || [];

    tableBody.innerHTML = "";

    history.forEach(record => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${record.exam}</td>
            <td>${record.score}/${record.total}</td>
            <td>${record.percentage}%</td>
            <td>${record.date}</td>
        `;

        tableBody.appendChild(row);

    });

}

/* =========================================================
   LEADERBOARD RENDER
========================================================= */

function renderLeaderboard() {

    const leaderboardContainer =
        document.getElementById(
            "leaderboardList"
        );

    if (!leaderboardContainer)
        return;

    const board =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEYS.LEADERBOARD
            )
        ) || [];

    leaderboardContainer.innerHTML =
        "";

    board.forEach(
        (player, index) => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "leaderboard-item";

            item.innerHTML = `
                <div class="rank-user">

                    <div class="rank-number">
                        ${index + 1}
                    </div>

                    <div class="rank-avatar">
                        ${player.name
                    .charAt(0)
                    .toUpperCase()}
                    </div>

                    <div>
                        <strong>
                            ${player.name}
                        </strong>
                    </div>

                </div>

                <div class="rank-score">
                    ${player.score}%
                </div>
            `;

            leaderboardContainer.appendChild(
                item
            );

        }
    );

}

/* =========================================================
   EXAM SELECTION
========================================================= */

function selectExam(
    examName
) {

    localStorage.setItem(
        "selectedExam",
        examName
    );

    showToast(
        `${examName} selected`,
        "success"
    );

    setTimeout(() => {

        window.location.href =
            "quiz.html";

    }, 800);

}

/* =========================================================
   DASHBOARD METRICS
========================================================= */

function renderDashboardMetrics() {

    const history =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEYS.HISTORY
            )
        ) || [];

    const totalExams =
        document.getElementById(
            "totalExams"
        );

    const averageScore =
        document.getElementById(
            "averageScore"
        );

    const bestScore =
        document.getElementById(
            "bestScore"
        );

    const certificates =
        document.getElementById(
            "certificatesEarned"
        );

    if (
        !totalExams ||
        !averageScore ||
        !bestScore
    ) {

        return;

    }

    totalExams.textContent =
        history.length;

    if (!history.length) {

        averageScore.textContent =
            "0%";

        bestScore.textContent =
            "0%";

        certificates.textContent =
            "0";

        return;

    }

    const average =
        Math.round(
            history.reduce(
                (sum, item) =>
                    sum +
                    item.percentage,
                0
            ) / history.length
        );

    const highest =
        Math.max(
            ...history.map(
                item =>
                    item.percentage
            )
        );

    totalExams.textContent =
        history.length;

    averageScore.textContent =
        `${average}%`;

    bestScore.textContent =
        `${highest}%`;

    certificates.textContent =
        history.filter(
            item =>
                item.percentage >= 80
        ).length;

}

/* =========================================================
   USER WELCOME
========================================================= */

function renderWelcomeUser() {

    const welcomeText =
        document.getElementById(
            "welcomeUser"
        );

    if (!welcomeText) return;

    const user =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEYS.USER
            )
        );

    if (!user) {

        welcomeText.textContent =
            "Welcome, Learner";

        return;

    }

    welcomeText.textContent =
        `Welcome, ${user.name}`;

}

/* =========================================================
   EXAM FILTER
========================================================= */

function filterExams(
    category
) {

    const cards =
        document.querySelectorAll(
            ".exam-card"
        );

    cards.forEach(card => {

        const type =
            card.dataset.category;

        if (
            category === "all" ||
            category === type
        ) {

            card.style.display =
                "block";

        } else {

            card.style.display =
                "none";

        }

    });

}

/* =========================================================
   CATEGORY BUTTONS
========================================================= */

function initializeCategoryFilters() {

    const buttons =
        document.querySelectorAll(
            ".category-pill"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(btn =>
                    btn.classList.remove(
                        "active"
                    )
                );

                button.classList.add(
                    "active"
                );

                filterExams(
                    button.dataset.category
                );

            }
        );

    });

}

/* =========================================================
   GLOBAL PAGE INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderLeaderboard();

        renderExamHistory();

        renderDashboardMetrics();

        renderWelcomeUser();

        initializeResultsPage();

        initializeCategoryFilters();

        const retakeButton =
            document.getElementById(
                "retakeExamBtn"
            );

        if (retakeButton) {

            retakeButton.addEventListener(
                "click",
                retakeExam
            );

        }

    }
);

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function formatDate() {

    return new Date()
        .toLocaleDateString();

}

function generateID() {

    return (
        Date.now() +
        Math.floor(
            Math.random() * 1000
        )
    );

}

const glow =
    document.getElementById("cursorGlow");

document.addEventListener(
    "mousemove",
    (e) => {

        glow.style.left =
            e.clientX + "px";

        glow.style.top =
            e.clientY + "px";

    });

/* =========================================================
   END OF SCRIPT.JS
   Complete Application Logic
   ========================================================= */

