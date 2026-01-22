// ===== 설정 =====
const PERIOD_TIME = 50 * 60; // 50분
let currentPeriod = 1;

// ===== 상태 =====
let timeLeft = PERIOD_TIME;
let timer = null;
let soundEnabled = false;

// ===== 요소 =====
const timeEl = document.getElementById("time");
const periodEl = document.getElementById("period");

// ===== 음원 =====
const bellStart = new Audio("sounds/bell_start.mp3");
const bellEnd = new Audio("sounds/bell_end.mp3");

// ===== 시간 표시 =====
function updateDisplay() {
  const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const sec = String(timeLeft % 60).padStart(2, "0");
  timeEl.textContent = `${min}:${sec}`;
  periodEl.textContent = `${currentPeriod}교시`;
}

updateDisplay();

// ===== 타이머 =====
function startTimer() {
  if (timer) return;

  if (soundEnabled) {
    bellStart.currentTime = 0;
    bellStart.play();
  }

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;

      if (soundEnabled) {
        bellEnd.currentTime = 0;
        bellEnd.play();
      }

      currentPeriod++;
      timeLeft = PERIOD_TIME;
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
  timeLeft = PERIOD_TIME;
  updateDisplay();
}

// ===== 버튼 연결 =====
document.getElementById("startBtn").onclick = startTimer;
document.getElementById("pauseBtn").onclick = pauseTimer;
document.getElementById("resetBtn").onclick = resetTimer;

// ===== 종소리 토글 =====
document.getElementById("soundToggle").onclick = function () {
  soundEnabled = !soundEnabled;
  this.textContent = soundEnabled ? "🔔 종소리 ON" : "🔔 종소리 OFF";
};

// ===== 종소리 테스트 =====
document.getElementById("testBell").onclick = () => {
  bellStart.currentTime = 0;
  bellStart.play();
};
