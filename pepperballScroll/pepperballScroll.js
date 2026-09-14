(function () {
    var root = document.getElementById("iap-pepperball-scroll");
    if (!root || root.dataset.ready) return;
    root.dataset.ready = "1";

    function parseCSV(text) {
        var rows = [], row = [], field = "", quoted = false, i = 0;
        text = text.replace(/^\uFEFF/, "");
        while (i < text.length) {
            var c = text[i];
            if (quoted) {
                if (c === '"') {
                    if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
                    quoted = false; i++; continue;
                }
                field += c; i++; continue;
            }
            if (c === '"') { quoted = true; i++; continue; }
            if (c === ",") { row.push(field); field = ""; i++; continue; }
            if (c === "\r") { i++; continue; }
            if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; i++; continue; }
            field += c; i++;
        }
        if (field.length || row.length) { row.push(field); rows.push(row); }
        if (!rows.length) return [];
        var head = rows.shift().map(function (h) { return h.trim(); });
        return rows.filter(function (r) {
            return r.some(function (v) { return String(v).trim() !== ""; });
        }).map(function (r) {
            var o = {};
            head.forEach(function (h, n) { o[h] = (r[n] == null ? "" : String(r[n]).trim()); });
            return o;
        });
    }

    function parseDate(s) {
        var m = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/.exec(String(s).trim());
        if (!m) return null;
        var y = +m[3];
        if (y < 100) y += 2000;
        return new Date(y, +m[1] - 1, +m[2]);
    }

    var status = root.querySelector("#tl-status");
    if (status) status.parentNode.removeChild(status);

    function fail(msg) {
        var p = document.createElement("p");
        p.className = "tl-status";
        p.textContent = msg;
        root.insertBefore(p, root.firstChild);
    }

    var rail = root.querySelector(".tl-rail");
    var line = root.querySelector(".tl-line");
    var svg = root.querySelector(".tl-links");
    var cardsEl = root.querySelector(".tl-cards");
    var tl = root.querySelector(".tl");
    var entries = [];

    fetch(root.dataset.csv).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.text();
    }).then(function (text) {
        var rows = parseCSV(text);
        rows.forEach(function (r) {
            var copy = r["card"] || r["card "] || "";
            if (!copy) return;
            var free = String(r["remove line"] || "").trim() !== "";
            entries.push({ date: parseDate(r.date), copy: copy, free: free });
        });
        build();
        layout();
        window.addEventListener("resize", layout);
        if (window.ResizeObserver) new ResizeObserver(layout).observe(cardsEl);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
        window.addEventListener("load", layout);
        setTimeout(layout, 400);
        setTimeout(layout, 1200);
        bindFade();
    }).catch(function (err) {
        fail("Timeline data could not be loaded (" + (err && err.message ? err.message : "network error") +
             "). The embed reached its script but could not fetch the CSV.");
    });

    function build() {
        entries.forEach(function (e) {
            var card = document.createElement("div");
            card.className = "tl-card tl-row" + (e.free ? " tl-aside" : "");
            var p = document.createElement("p");
            p.className = "tl-copy";
            p.textContent = e.copy;
            card.appendChild(p);
            cardsEl.appendChild(card);
            e.card = card;
        });
    }

    function layout() {
        if (!entries.length) return;
        var dated = entries.filter(function (e) { return e.date && !e.free; });
        if (dated.length < 2) return;

        rail.querySelectorAll(".tl-dot, .tl-year, .tl-tick").forEach(function (n) { n.remove(); });
        while (svg.firstChild) svg.removeChild(svg.firstChild);

        var tlBox = tl.getBoundingClientRect();
        var railW = rail.getBoundingClientRect().width;
        var height = cardsEl.getBoundingClientRect().height;

        function centerOf(e) {
            var b = e.card.getBoundingClientRect();
            return b.top - tlBox.top + b.height / 2;
        }

        var firstY = centerOf(dated[0]);
        var lastY = centerOf(dated[dated.length - 1]);
        var t0 = dated[0].date.getTime();
        var t1 = dated[dated.length - 1].date.getTime();

        function yFor(d) {
            if (t1 === t0) return firstY;
            return firstY + (d.getTime() - t0) / (t1 - t0) * (lastY - firstY);
        }

        line.style.top = (firstY - 14) + "px";
        line.style.height = (lastY - firstY + 28) + "px";

        var y0 = new Date(t0).getFullYear();
        var y1 = new Date(t1).getFullYear();
        var years = [{ label: y0, y: firstY }];
        for (var y = y0 + 1; y <= y1; y++) {
            years.push({ label: y, y: yFor(new Date(y, 0, 1)) });
        }
        years.forEach(function (yr) {
            var tick = document.createElement("div");
            tick.className = "tl-tick";
            tick.style.top = yr.y + "px";
            rail.appendChild(tick);
            var lab = document.createElement("div");
            lab.className = "tl-year";
            lab.style.top = yr.y + "px";
            lab.textContent = yr.label;
            rail.appendChild(lab);
        });

        svg.setAttribute("width", tlBox.width);
        svg.setAttribute("height", height);
        svg.setAttribute("viewBox", "0 0 " + tlBox.width + " " + height);

        dated.forEach(function (e) {
            var my = yFor(e.date);
            var dot = document.createElement("div");
            dot.className = "tl-dot tl-row";
            dot.style.top = my + "px";
            rail.appendChild(dot);
            e.dot = dot;

            var cy = centerOf(e);
            var gutter = parseFloat(getComputedStyle(cardsEl).paddingLeft) || 34;
            var x0 = railW + 1;
            var x1 = railW + gutter - 2;
            var link = document.createElementNS("http://www.w3.org/2000/svg", "path");
            var xm = x0 + (x1 - x0) * 0.42;
            link.setAttribute("d", "M" + x0 + "," + my
                + " L" + xm + "," + my
                + " L" + xm + "," + cy
                + " L" + x1 + "," + cy);
            link.setAttribute("fill", "none");
            link.setAttribute("stroke", "currentColor");
            link.setAttribute("stroke-width", "1.3");
            link.setAttribute("class", "tl-row");
            svg.appendChild(link);
            e.link = link;
        });

        svg.style.color = getComputedStyle(root).getPropertyValue("--accent").trim();
        fade();
    }

    function fade() {
        var vh = window.innerHeight || document.documentElement.clientHeight;
        entries.forEach(function (e) {
            var b = e.card.getBoundingClientRect();
            var cy = b.top + b.height / 2;
            var d = Math.abs(cy - vh / 2) / (vh / 2);
            var o = 1 - Math.max(0, d - 0.3) / 0.62;
            o = Math.max(0.12, Math.min(1, o));
            e.card.style.opacity = o.toFixed(3);
            if (e.dot) e.dot.style.opacity = o.toFixed(3);
            if (e.link) e.link.setAttribute("opacity", o.toFixed(3));
        });
    }

    function bindFade() {
        var pending = false;
        function run() { pending = false; fade(); }
        function onScroll() {
            if (pending) return;
            pending = true;
            if (window.requestAnimationFrame) window.requestAnimationFrame(run);
            else setTimeout(run, 16);
            setTimeout(function () { if (pending) run(); }, 250);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        document.addEventListener("scroll", onScroll, true);
        window.addEventListener("resize", onScroll);
        fade();
    }
})();
