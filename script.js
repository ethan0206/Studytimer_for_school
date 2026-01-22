// ===== 시간표 (고정, 실제 시계 기준) =====
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
const bell = new Audio("sounds/Bell.mp3");
let soundEnabled = false;
let lastIndex = -1;

// ===== 시간표 UI 생성 =====
schedule.forEach(item => {
  const li = document.createElement("li");
  li.textContent = `${item.name} ${item.start} ~ ${item.end}`;
  timetableEl.appendChild(li);
});

// ===== HH:MM → Date =====
function toDate(t) {
  const [h, m] = t.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

// ===== 실제 시계 기준 업데이트 =====
function update() {
  const now = new Date();
  let active = -1;

  schedule.forEach((item, i) => {
    const s = toDate(item.start);
    const e = toDate(item.end);

    if (now >= s && now < e) {
      active = i;
      const diff = Math.floor((e - now) / 1000);
      const min = String(Math.floor(diff / 60)).padStart(2, "0");
      const sec = String(diff % 60).padStart(2, "0");

      timeEl.textContent = `${min}:${sec}`;
      currentEl.textContent = item.name;
    }
  });

  if (active === -1) {
    timeEl.textContent = "--:--";
    currentEl.textContent = "시간표 외 시간";
  }

  [...timetableEl.children].forEach((li, i) => {
    li.classList.toggle("active", i === active);
  });

  if (soundEnabled && active !== lastIndex && active !== -1) {
    bell.currentTime = 0;
    bell.play();
  }

  lastIndex = active;
}

// ===== 버튼 =====
document.getElementById("soundToggle").onclick = function () {
  soundEnabled = !soundEnabled;
  this.textContent = soundEnabled ? "🔔 종소리 ON" : "🔕 종소리 OFF";
};

document.getElementById("testBell").onclick = () => {
  bell.currentTime = 0;
  bell.play();
};

// ===== 실행 =====
update();
setInterval(update, 1000);
