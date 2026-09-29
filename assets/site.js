/* 前台共用：頁首、公告列、頁尾、手機底部按鈕 */
(function () {
  "use strict";

  var SHOP = {
    tel: "02-2901-6188",
    telHref: "tel:0229016188",
    line: "https://lin.ee/c2ENfzs",
    address: "新北市新莊區中正路 887 之 5 號",
    ig: "https://www.instagram.com/hanmo0902/",
    threads: "https://www.threads.com/@hanmo0902"
  };
  window.SHOP = SHOP;

  var NAV = [
    ["index.html", "首頁"],
    ["prices.html", "方案價目"],
    ["cases.html", "施工案例"],
    ["care.html", "鍍膜後保養"]
  ];
  var LINE_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.5s5.9-3.5 8.1-6C21.4 14.2 22 12.7 22 11c0-4.4-4.5-8-10-8z"/></svg>';
  window.LINE_ICON = LINE_ICON;

  var page = document.body.getAttribute("data-page");
  var data = HM.Store.load();

  var head = document.getElementById("site-head");
  if (head) {
    head.className = "site-head";
    head.innerHTML =
      '<div class="wrap">' +
        '<a class="brand" href="index.html"><b>漢膜</b><span>車體美研</span></a>' +
        '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="main-nav">選單</button>' +
        '<nav class="nav" id="main-nav" aria-label="主選單">' +
          NAV.map(function (n) {
            return '<a href="' + n[0] + '"' + (n[0] === page ? ' aria-current="page"' : "") + ">" + n[1] + "</a>";
          }).join("") +
          '<a class="nav-cta" href="visit.html"' + (page === "visit.html" ? ' aria-current="page"' : "") + ">預約諮詢</a>" +
        "</nav>" +
      "</div>";
    var btn = head.querySelector(".menu-btn"), nav = head.querySelector(".nav");
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "關閉" : "選單";
    });

    var notice = document.createElement("p");
    notice.className = "notice";
    notice.textContent = data.notice || "";
    head.parentNode.insertBefore(notice, head);
  }

  var bar = document.createElement("div");
  bar.className = "demo-bar";
  bar.setAttribute("role", "note");
  bar.innerHTML = '這是 <strong>Ninth 九號</strong> 為漢膜車體美研製作的網站提案示範，並非官方網站。　<a href="admin/index.html">試用商家後台</a>';
  document.body.insertBefore(bar, document.body.firstChild);

  var foot = document.getElementById("site-foot");
  if (foot) {
    var hours = [1, 2, 3, 4, 5, 6, 0].map(function (d) {
      var h = data.hours[d];
      return "<li>" + HM.WEEK[d] + "　" + (h ? h[0] + "～" + h[1] : "店休") + "</li>";
    }).join("");
    foot.className = "site-foot";
    foot.innerHTML =
      '<div class="wrap"><div class="foot-grid">' +
        "<div><h2>漢膜車體美研</h2><p>新莊的汽車鍍膜與漆面、內裝美容。<br>我們不便宜，但是技術本位。</p>" +
          '<ul style="margin-top:14px"><li><a href="' + SHOP.telHref + '">' + SHOP.tel + "</a></li><li>" + SHOP.address + "</li>" +
          '<li><a href="' + SHOP.line + '" target="_blank" rel="noopener">LINE 官方帳號</a></li>' +
          '<li><a href="' + SHOP.threads + '" target="_blank" rel="noopener">Threads @hanmo0902</a></li></ul></div>' +
        "<div><h3>營業時間（採預約制）</h3><ul>" + hours + "</ul></div>" +
        "<div><h3>網站導覽</h3><ul>" + NAV.concat([["visit.html", "預約諮詢"]]).map(function (n) { return '<li><a href="' + n[0] + '">' + n[1] + "</a></li>"; }).join("") + "</ul></div>" +
      "</div>" +
      '<div class="foot-legal"><span>價格與部分內容為示範，實際請以店家報價為準。</span>' +
      '<span>網站提案示範，由 <a href="https://ninthlab.com.tw/" target="_blank" rel="noopener">Ninth 九號</a> 設計製作，未經授權請勿轉載使用</span></div></div>';
  }

  var dock = document.createElement("div");
  dock.className = "dock";
  dock.innerHTML = '<a class="btn btn-ink" href="' + SHOP.telHref + '">打電話</a><a class="btn btn-line" href="' + SHOP.line + '" target="_blank" rel="noopener">' + LINE_ICON + "LINE 預約</a>";
  document.body.appendChild(dock);
})();
