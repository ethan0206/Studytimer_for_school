// ===== 시간표 (네가 준 그대로) =====
const schedule = [
  { name: "1교시", duration: 80 * 60 },
  { name: "쉬는시간", duration: 20 * 60 },
  { name: "2교시", duration: 70 * 60 },
  { name: "점심", duration: 60 * 60 },
  { name: "3교시", duration: 70 * 60 },
  { name: "쉬는시간", duration: 20 * 60 },
  { name: "4교시", duration: 70 * 60 },
  { name: "쉬는시간", duration: 20 * 60 },
  { name: "5교시", duration: 60 * 60 }
];

// ===== 상태 =====
let index = 0;
let timeLeft = schedule[0].duration;
let timer = null;
let soundEnabled = false;

// ===== 요소 =====
const timeEl = document.getElementById("time");
const currentEl = document.getElementById("current");
const timetableEl = document.getElementById("timetable");

// ===== 종소리 =====
const bell = new Audio("sounds/bell.mp3");

// ===== 시간표 표시 =====
schedule.forEach((item, i) => {
  const li = document.createElement("li");
  li.textContent = item.name;
  if (i === 0) li.classList.add("active");
  timetableEl.appendChild(li);
});

// ===== 표시 업데이트 =====
function updateDisplay() {
  const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const sec = String(timeLeft % 60).padStart(2, "0");
  timeEl.textContent = `${min}:${sec}`;
  currentEl.textContent = schedule[index].name;

  [...timetableEl.children].forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

updateDisplay();

// ===== 타이머 =====
function startTimer() {
  if (timer) return;

  if (soundEnabled) {
    bell.currentTime = 0;
    bell.play();
  }

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;

      if (soundEnabled) {
        bell.currentTime = 0;
        bell.play();
      }

      index++;
      if (index >= schedule.length) return;

      timeLeft = schedule[index].duration;
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  pauseTimer();
  index = 0;
  timeLeft = schedule[0].duration;
  updateDisplay();
}

// ===== 버튼 =====
document.getElementById("start").onclick = startTimer;
document.getElementById("pause").onclick = pauseTimer;
document.getElementById("reset").onclick = resetTimer;

document.getElementById("soundToggle").onclick = function () {
  soundEnabled = !soundEnabled;
  this.textContent = soundEnabled ? "🔔 종소리 ON" : "🔕 종소리 OFF";
};

document.getElementById("testBell").onclick = () => {
  bell.currentTime = 0;
  bell.play();
};
