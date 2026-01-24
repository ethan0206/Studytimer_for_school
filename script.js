const clockEl = document.getElementById("clock");
const periodEl = document.getElementById("period");
const timetableItems = document.querySelectorAll("#timetable li");
const bell = document.getElementById("bell");

let lastBellTime = "";

// HH:MM → 분 단위 변환
function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");

  clockEl.textContent = `${h}:${m}:${s}`;

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  let currentPeriod = "현재 교시 없음";

  timetableItems.forEach(li => {
    li.classList.remove("active");

    const start = li.dataset.start;
    const end = li.dataset.end;
    if (!start || !end) return;

    const startMin = toMinutes(start);
    const endMin = toMinutes(end);

    // 현재 교시
    if (nowMinutes >= startMin && nowMinutes < endMin) {
      li.classList.add("active");
      currentPeriod = li.textContent;
    }

    // 종 울리기 (시작 시간 정확히)
    if (`${h}:${m}` === start && lastBellTime !== start) {
      bell.play();
      lastBellTime = start;
    }
  });

  periodEl.textContent = currentPeriod;
}

setInterval(updateClock, 1000);
updateClock();
