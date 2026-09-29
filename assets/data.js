/* 漢膜車體美研：網站資料
 * 示範版把資料存在瀏覽器（localStorage）。正式版把 Store 換成資料庫即可，頁面程式不用改。
 */
(function (global) {
  "use strict";

  var KEY = "hanmo-demo-v1";
  var CAR = ["轎車／掀背", "中型休旅", "大型休旅／七人座"];

  var CATS = [
    { id: "coat", name: "鍍膜方案", cols: CAR,
      intro: "車殼、玻璃、塑料、輪框、內裝，每個部位用不同的鍍膜。" },
    { id: "care", name: "漆面與內裝", cols: CAR,
      intro: "鍍膜之前先把漆面和內裝處理好，效果才會持久。" }
  ];

  var SEED = {
    notice: "採預約制，建議先加 LINE 詢問時段。可刷卡分期。",
    prices: [
      { id: "p1", cat: "coat", name: "基礎鍍膜", part: "車殼", desc: "入門的漆面保護，適合新車或車況良好的車", prices: [8000, 9500, 11000] },
      { id: "p2", cat: "coat", name: "日本神衣雷煥鍍膜", part: "車殼", desc: "增艷與潑水性都很強，漆面顏色看起來更深更亮", prices: [26000, 30000, 34000] },
      { id: "p3", cat: "coat", name: "日本雷雨鍍膜", part: "玻璃", desc: "全車玻璃撥水，下雨天視線更清楚", prices: [3000, 3500, 4000] },
      { id: "p4", cat: "coat", name: "德國 SF 鍍膜", part: "塑料", desc: "保護外飾塑料件，減少褪色發白", prices: [2000, 2500, 3000] },
      { id: "p5", cat: "coat", name: "英國 Max Protect V3", part: "輪框", desc: "輪框不容易沾黏煞車粉，清洗更輕鬆", prices: [3500, 3500, 4000] },
      { id: "p6", cat: "coat", name: "日本 IG 鍍膜", part: "內裝", desc: "皮革、塑料內裝防污，髒了好擦", prices: [5000, 6000, 7000] },
      { id: "p7", cat: "care", name: "漆面優化除紋", part: "漆面", desc: "去除洗車紋、細微刮痕，鍍膜前的重要步驟", prices: [6000, 7500, 9000] },
      { id: "p8", cat: "care", name: "內裝拆洗", part: "內裝", desc: "座椅、地毯、頂棚深層清潔", prices: [6000, 7000, 8000] },
      { id: "p9", cat: "care", name: "高溫蒸汽殺菌、異味去除", part: "內裝", desc: "菸味、寵物味、霉味處理", prices: [2500, 3000, 3500] },
      { id: "p10", cat: "care", name: "嬰兒椅清潔", part: "內裝", desc: "拆洗布套、蒸汽殺菌", prices: [1200, 1200, 1200] }
    ],
    cases: [
      { id: "c1", date: "2025-08-25", car: "賓士（二手外匯車）", color: "素黑軟漆",
        title: "超敏感的素黑軟漆，先修復再鍍膜",
        items: ["漆面優化除紋", "日本神衣雷煥鍍膜", "日本雷雨鍍膜", "德國 SF 鍍膜"],
        body: "這台賓士是二手外匯車，也是一台素黑軟漆。這種車漆超級敏感，用布擦就會刮傷。\n\n我們認為應該先把前車主不當洗車留下的傷痕修復好，修復完成後再上鍍膜，增加漆面保護。\n\n車殼用日本神衣雷煥、玻璃用日本雷雨、塑料用德國 SF 鍍膜。" },
      { id: "c2", date: "2025-05-06", car: "車主愛車", color: "",
        title: "本來約基礎鍍膜，看完現場直接升級",
        items: ["日本神衣雷煥鍍膜", "日本 IG 內裝鍍膜"],
        body: "車主原本約的是基礎鍍膜。來店裡聊天時，剛好看到老闆在施作神衣鍍膜，就問：「老闆，我可以改這隻鍍膜嗎？」\n\n當然沒問題，立刻升級，再加購內裝鍍膜。裡裡外外都保護住了。" },
      { id: "c3", date: "2025-02-24", car: "第一次來店的車主", color: "",
        title: "依停車環境和用車頻率，選了神衣雷煥",
        items: ["日本神衣雷煥鍍膜"],
        body: "車主第一次來店裡詢問鍍膜，老闆先問停車環境和用車頻率，再推薦適合的鍍膜。\n\n最後車主選擇日本神衣雷煥鍍膜，增艷與潑水性都很強。" }
    ],
    hours: { 0: ["09:00", "20:00"], 1: ["09:00", "20:00"], 2: ["09:00", "20:00"], 3: ["09:00", "20:00"],
             4: ["09:00", "20:00"], 5: ["09:00", "20:00"], 6: ["09:00", "20:00"] },
    closures: [],
    bookings: []
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  var Store = {
    load: function () {
      try { var raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw); } catch (e) {}
      return clone(SEED);
    },
    save: function (data) {
      try { localStorage.setItem(KEY, JSON.stringify(data)); return true; } catch (e) { return false; }
    },
    reset: function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      return clone(SEED);
    }
  };

  var WEEK = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

  // 一律用台北時間
  function taipeiNow() {
    var parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Taipei", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(new Date());
    var o = {};
    parts.forEach(function (p) { o[p.type] = p.value; });
    var date = o.year + "-" + o.month + "-" + o.day;
    return { date: date, time: (o.hour === "24" ? "00" : o.hour) + ":" + o.minute, day: new Date(date + "T00:00:00Z").getUTCDay() };
  }

  function statusFor(data, dateStr) {
    var now = taipeiNow();
    dateStr = dateStr || now.date;
    var day = new Date(dateStr + "T00:00:00Z").getUTCDay();
    var closure = (data.closures || []).filter(function (c) { return c.date === dateStr; })[0];
    if (closure) return { open: false, text: "今天店休" + (closure.reason ? "（" + closure.reason + "）" : ""), closure: closure };
    var h = data.hours[day];
    if (!h) return { open: false, text: WEEK[day] + "店休" };
    if (dateStr === now.date) {
      if (now.time < h[0]) return { open: false, text: "今天 " + h[0] + " 開門" };
      if (now.time >= h[1]) return { open: false, text: "今天已打烊" };
      return { open: true, text: "營業中，今天到 " + h[1] };
    }
    return { open: true, text: h[0] + "～" + h[1] };
  }

  function money(n) { return "NT$" + Number(n).toLocaleString("zh-TW"); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function paras(s) {
    return esc(s).split(/\n{2,}/).map(function (p) { return "<p>" + p.replace(/\n/g, "<br>") + "</p>"; }).join("");
  }
  function sortedCases(data) {
    return data.cases.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  }

  global.HM = { KEY: KEY, CATS: CATS, WEEK: WEEK, Store: Store, taipeiNow: taipeiNow, statusFor: statusFor,
                money: money, esc: esc, paras: paras, sortedCases: sortedCases };
})(window);
