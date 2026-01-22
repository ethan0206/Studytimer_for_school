// ===== 시간표 (실제 시계 기준) =====
const schedule = [
  { name: "1교시", start: "08:40", end: "10:00" },
  { name: "쉬는시간", start: "10:00", end: "10:20" },
  { name: "2교시", start: "10:20", end: "11:30" },
  { name: "점심", start: "11:30", end: "12:30" },
  { name: "3교시", start: "12:30", end: "13:40" },
  { name: "쉬는시간", start: "13:40", end: "14:00" },
  { name: "4교시", start: "14:00", end: "15:10" },
  { name: "쉬는시간", start: "15:10", end: "15:30" },
  { name: "5교시", start: "15:30", end: "16:30" }
];

// ===== 요소 =====
const timeEl = document.getElementById("time");
const currentEl = document.getElementById("current");
const timetableEl = document.getElementById("timetable");

// ===== 종소리 =====
const bell = new Audio("sounds/bell.mp3");
let soundEnabled = false;
let lastIndex = -1;

// ===== 시간 문자열 → Date =====
function toDate(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  const now = new Date();
  now.setHours(h, m, 0, 0);
  return now;
}

// ===== 시간표 UI 생성 =====
schedule.forEach(item => {
  const li = document.createElement("li");
  li.textContent = `${item.name} ${item.start} ~ ${item.end}`;
  timetableEl.appendChild(li);
});

// ===== 메인 업데이트 =====
function updateByRealTime() {
  const now = new Date();
  let activeIndex = -1;

  schedule.forEach((item, i) => {
    const start = toDate(item.start);
    const end = toDate(item.end);

    if (now >= start && now < end) {
      activeIndex = i;

      const diff = Math.floor((end - now) / 1000);
      const min = String(Math.floor(diff / 60)).padStart(2, "0");
      const sec = String(diff % 60).padStart(2, "0");

      timeEl.textContent = `${min}:${sec}`;
      currentEl.textContent = item.name;
    }
  });

  // 시간표 외 시간
  if (activeIndex === -1) {
    timeEl.textContent = "--:--";
    currentEl.textContent = "시간표 외 시간";
  }

  // 강조 표시
  [...timetableEl.children].forEach((li, i) => {
    li.classList.toggle("active", i === activeIndex);
  });

  // 구간 변경 시 종소리
  if (soundEnabled && activeIndex !== lastIndex && activeIndex !== -1) {
    bell.currentTime = 0;
    bell.play();
  }

  lastIndex = activeIndex;
}

// ===== 종소리 토글 =====
document.getElementById("soundToggle").onclick = function () {
  soundEnabled = !soundEnabled;
  this.textContent = soundEnabled ? "🔔 종소리 ON" : "🔕 종소리 OFF";
};

// ===== 테스트 =====
document.getElementById("testBell").onclick = () => {
  bell.currentTime = 0;
  bell.play();
};

// ===== 1초마다 실제 시계 체크 =====
updateByRealTime();
setInterval(updateByRealTime, 1000);
