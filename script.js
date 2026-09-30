"use strict";

/* =========================
   TIMER SETTINGS
========================= */

const timerSettings = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};


/* =========================
   CURRENT STATE
========================= */

let currentMode = "focus";

let timeRemaining =
    timerSettings.focus;

let timer = null;

let isRunning = false;

let completedSessions = 0;

let focusMinutes = 0;


/* =========================
   DOM ELEMENTS
========================= */

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");

const sessionText =
    document.getElementById("sessionText");

const startBtn =
    document.getElementById("startBtn");

const pauseBtn =
    document.getElementById("pauseBtn");

const resetBtn =
    document.getElementById("resetBtn");

const focusBtn =
    document.getElementById("focusBtn");

const shortBreakBtn =
    document.getElementById("shortBreakBtn");

const longBreakBtn =
    document.getElementById("longBreakBtn");

const taskInput =
    document.getElementById("taskInput");

const completedSessionsElement =
    document.getElementById("completedSessions");

const focusMinutesElement =
    document.getElementById("focusMinutes");

const currentTaskElement =
    document.getElementById("currentTask");


/* =========================
   UPDATE TIMER DISPLAY
========================= */

function updateDisplay() {

    const minutes =
        Math.floor(
            timeRemaining / 60
        );

    const seconds =
        timeRemaining % 60;


    minutesElement.textContent =
        String(minutes).padStart(2, "0");


    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}


/* =========================
   START TIMER
========================= */

function startTimer() {

    if (isRunning) {
        return;
    }


    isRunning = true;


    timer = setInterval(
        () => {

            if (timeRemaining > 0) {

                timeRemaining--;

                updateDisplay();

            } else {

                completeSession();

            }

        },
        1000
    );

}


/* =========================
   PAUSE TIMER
========================= */

function pauseTimer() {

    if (!isRunning) {
        return;
    }


    clearInterval(timer);

    timer = null;

    isRunning = false;

}


/* =========================
   RESET TIMER
========================= */

function resetTimer() {

    clearInterval(timer);

    timer = null;

    isRunning = false;

    timeRemaining =
        timerSettings[currentMode];

    updateDisplay();

}


/* =========================
   COMPLETE SESSION
========================= */

function completeSession() {

    clearInterval(timer);

    timer = null;

    isRunning = false;


    if (currentMode === "focus") {

        completedSessions++;

        focusMinutes += 25;


        updateStatistics();


        alert(
            "Focus session completed! Time for a break."
        );


        changeMode("shortBreak");

    } else {

        alert(
            "Break completed! Ready to focus?"
        );


        changeMode("focus");

    }

}


/* =========================
   CHANGE MODE
========================= */

function changeMode(mode) {

    clearInterval(timer);

    timer = null;

    isRunning = false;

    currentMode = mode;


    timeRemaining =
        timerSettings[mode];


    updateModeButtons();

    updateSessionText();

    updateDisplay();

}


/* =========================
   UPDATE MODE BUTTONS
========================= */

function updateModeButtons() {

    focusBtn.classList.remove(
        "active"
    );

    shortBreakBtn.classList.remove(
        "active"
    );

    longBreakBtn.classList.remove(
        "active"
    );


    if (currentMode === "focus") {

        focusBtn.classList.add(
            "active"
        );

    }


    if (currentMode === "shortBreak") {

        shortBreakBtn.classList.add(
            "active"
        );

    }


    if (currentMode === "longBreak") {

        longBreakBtn.classList.add(
            "active"
        );

    }

}


/* =========================
   SESSION MESSAGE
========================= */

function updateSessionText() {

    if (currentMode === "focus") {

        sessionText.textContent =
            "Time to focus!";

    }


    if (currentMode === "shortBreak") {

        sessionText.textContent =
            "Take a short break.";

    }


    if (currentMode === "longBreak") {

        sessionText.textContent =
            "Enjoy your long break.";

    }

}


/* =========================
   UPDATE STATISTICS
========================= */

function updateStatistics() {

    completedSessionsElement.textContent =
        completedSessions;


    focusMinutesElement.textContent =
        focusMinutes;

}


/* =========================
   TASK INPUT
========================= */

taskInput.addEventListener(
    "input",
    () => {

        const task =
            taskInput.value.trim();


        if (task) {

            currentTaskElement.textContent =
                task;

        } else {

            currentTaskElement.textContent =
                "No Task";

        }

    }
);


/* =========================
   BUTTON EVENTS
========================= */

startBtn.addEventListener(
    "click",
    startTimer
);


pauseBtn.addEventListener(
    "click",
    pauseTimer
);


resetBtn.addEventListener(
    "click",
    resetTimer
);


focusBtn.addEventListener(
    "click",
    () => {
        changeMode("focus");
    }
);


shortBreakBtn.addEventListener(
    "click",
    () => {
        changeMode("shortBreak");
    }
);


longBreakBtn.addEventListener(
    "click",
    () => {
        changeMode("longBreak");
    }
);


/* =========================
   INITIAL DISPLAY
========================= */

updateDisplay();

updateModeButtons();

updateSessionText();

updateStatistics();
