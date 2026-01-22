/* =========================
   실시간 시계 표시
========================= */
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");

  const clockEl = document.getElementById("clock");
  if (clockEl) clockEl.innerText = `${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);
updateClock();


/* =========================
   시간표 (실제 시계 기준)
========================= */
const schedule = [
  { name: "1교시", start: "10:00", end: "11:00" },
  { name: "쉬는시간", start: "11:00", end: "11:20" },
  { name: "2교시", start: "11:20", end: "12:20" },
  { name: "점심시간", start: "12:20", end: "13:20" },
  { name: "3교시", start: "13:20", end: "14:20" }
];

let lastPeriod = null;


/* =========================
   시간 계산 유틸
========================= */
function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function nowToMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}


/* =========================
   현재 교시 판별
========================= */
function updatePeriod() {
  const nowMin = nowToMinutes();
  let current = "수업 없음";

  for (const p of schedule) {
    if (
      nowMin >= timeToMinutes(p.start) &&
      nowMin < timeToMinutes(p.end)
    ) {
      current = p.name;

      if (lastPeriod !== p.name) {
        playBell();
        lastPeriod = p.name;
      }
      break;
    }
  }

  const periodEl = document.getElementById("period");
  if (periodEl) periodEl.innerText = current;
}

setInterval(updatePeriod, 1000);
updatePeriod();


/* =========================
   종소리
========================= */
function playBell() {
  const audio = new Audio("bell.mp3"); // bell.mp3 같은 폴더
  audio.play().catch(() => {});
}
