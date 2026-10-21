// Utilidades compartidas
const $ = id => document.getElementById(id);

// Escapa texto antes de meterlo en innerHTML (evita XSS)
const esc = s => String(s ?? "").replace(/[&<>"']/g,
  c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Solo permite http(s); bloquea javascript:, data:, etc.
function safeUrl(u) {
  try {
    const x = new URL(String(u || "").trim());
    return ["http:", "https:"].includes(x.protocol) ? x.href : "";
  } catch { return ""; }
}

let toastTimer;
function toast(msg, error = false) {
  let t = $("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.className = "toast show" + (error ? " err" : "");
  t.textContent = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

// Fondo Matrix (pausa si la pestaña no está visible o si el usuario reduce animaciones)
function startMatrix() {
  const canvas = $("matrix");
  if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  const chars = "01アイウエオETHOS▓▒░█◆◇";
  let drops = [];
  function resize() {
    canvas.width = innerWidth; canvas.height = innerHeight;
    drops = Array(Math.floor(canvas.width / 18)).fill(1);
  }
  resize(); addEventListener("resize", resize);
  setInterval(() => {
    if (document.hidden) return;
    ctx.fillStyle = "rgba(10,12,20,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff9d"; ctx.font = "15px monospace";
    drops.forEach((y, i) => {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 18, y * 18);
      if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, 50);
}
startMatrix();
