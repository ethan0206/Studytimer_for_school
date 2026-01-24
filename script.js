document.addEventListener("DOMContentLoaded", () => {

  // ===== 종소리 =====
  const bell = new Audio("Bell.mp3");
  bell.volume = 0.8;
  let bellEnabled = false;

  const timetable = [
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

  function toMinutes(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }

  let currentIndex = -1;

  function updateTimer() {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();

    for (let i = 0; i < timetable.length; i++) {
      const start = toMinutes(timetable[i].start);
      const end = toMinutes(timetable[i].end);

      if (nowMin >= start && nowMin < end) {
        if (currentIndex !== i) {
          currentIndex = i;
          if (bellEnabled) {
            bell.currentTime = 0;
            bell.play();
          }
        }

        document.getElementById("period").innerText = timetable[i].name;
        document.getElementById("time").innerText =
          String(end - nowMin).padStart(2, "0") + ":" +
          String(60 - now.getSeconds()).padStart(2, "0");
        return;
      }
    }

    // 시간표 밖 → 현재 시각
    document.getElementById("period").innerText = "수업 없음";
    document.getElementById("time").innerText =
      String(now.getHours()).padStart(2, "0") + ":" +
      String(now.getMinutes()).padStart(2, "0") + ":" +
      String(now.getSeconds()).padStart(2, "0");

    currentIndex = -1;
  }

  document.getElementById("bellToggle").onclick = () => {
    bellEnabled = !bellEnabled;
    document.getElementById("bellToggle").innerText =
      bellEnabled ? "종소리 ON" : "종소리 OFF";
  };

  document.getElementById("bellTest").onclick = () => {
    bell.currentTime = 0;
    bell.play();
  };

  updateTimer();
  setInterval(updateTimer, 1000);

});
