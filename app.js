const STORAGE_KEY = "livestreamAnalytics.records.v2";
const SYNC_CONFIG_KEY = "livestreamAnalytics.jsonbin.config.v1";
const JSONBIN_API = "https://api.jsonbin.io/v3";

const state = {
  nav: "总览",
  selectedSessionId: "",
  grain: "minute",
  productSort: "gmv",
  heatMetric: "comment",
  entryTab: "manual",
  selectedProductId: "",
  importPreview: [],
  syncPanel: false,
  syncStatus: "idle",
  syncMessage: "未配置云同步",
  syncUpdatedAt: "",
  toast: "",
};

const navItems = [
  ["总览", "home"],
  ["数据录入", "edit"],
  ["素材", "chart"],
  ["数据中心", "database"],
  ["流量", "bar"],
  ["互动", "message"],
  ["商品", "bag"],
  ["复盘", "clipboard"],
];

const secondaryNav = [
  ["监控设置", "bell"],
  ["账号管理", "users"],
  ["帮助中心", "help"],
  ["收起菜单", "collapse"],
];

const sourceFields = [
  ["live", "直播推荐", "#08a79d"],
  ["follow", "关注", "#3975e8"],
  ["short", "短视频", "#8f5bea"],
  ["search", "搜索", "#f5a43c"],
  ["other", "其他", "#cfd6dd"],
];

const csvHeaders = [
  "直播日期",
  "达人账号",
  "直播时长分钟",
  "观看人数",
  "成交金额",
  "转化率",
  "人均停留秒",
  "互动率",
  "退单率",
  "直播推荐占比",
  "关注占比",
  "短视频占比",
  "搜索占比",
  "其他占比",
  "进入直播间人数",
  "商品曝光人数",
  "商品点击人数",
  "下单人数",
  "成交人数",
  "千川消耗金额",
  "千川曝光量",
  "千川点击量",
  "千川成交金额",
  "千川ROI",
  "商品名称",
  "商品价格",
  "商品曝光人数",
  "商品点击人数",
  "商品成交金额",
  "商品成交件数",
  "素材名称",
  "素材消耗",
  "素材曝光",
  "素材点击率",
  "素材成交额",
  "素材ROI",
];

function icon(name) {
  const icons = {
    play: '<path d="M8 5v14l11-7-11-7Z"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
    bar: '<path d="M4 20V9"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>',
    message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>',
    bag: '<path d="M6 8h12l-1 13H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
    clipboard: '<path d="M9 4h6l1 2h3v15H5V6h3l1-2Z"/><path d="M9 12h6"/><path d="M9 16h5"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.6 1.2-2.3 1.4-2.6 3"/><path d="M12 17h.01"/>',
    collapse: '<path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    upload: '<path d="M12 21V9"/><path d="m7 14 5-5 5 5"/><path d="M5 3h14"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    money: '<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.7-.6-1.7-1-3-1-1.7 0-3 .8-3 2.1 0 3 6 1.5 6 4.5 0 1.3-1.3 2.4-3.2 2.4-1.3 0-2.4-.4-3.2-1.2"/><path d="M12 6v12"/>',
    percent: '<path d="m19 5-14 14"/><circle cx="7" cy="7" r="2.2"/><circle cx="17" cy="17" r="2.2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9.5 12 1.8 1.8 3.7-4.2"/>',
    alert: '<path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5"/><path d="M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    chart: '<path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 15 4-4 3 2 5-7"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 15H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>',
    file: '<path d="M14 2H6v20h12V8Z"/><path d="M14 2v6h6"/><path d="M9 13h6"/><path d="M9 17h6"/>',
    cloud: '<path d="M17.5 19H7a5 5 0 1 1 1.8-9.7A6.5 6.5 0 0 1 21 12.5 3.5 3.5 0 0 1 17.5 19Z"/>',
    sync: '<path d="M21 12a9 9 0 0 0-15.5-6.2L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 15.5 6.2L21 16"/><path d="M21 21v-5h-5"/>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.info}</svg>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function uid(prefix = "s") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function parseNum(value, fallback = 0) {
  const parsed = Number(String(value ?? "").replaceAll(",", "").replace("%", "").trim());
  return Number.isFinite(parsed) ? parsed : fallback;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatNumber(value) {
  return new Intl.NumberFormat("zh-CN").format(Math.round(Number(value) || 0));
}

function formatMoney(value) {
  return `¥${new Intl.NumberFormat("zh-CN").format(Math.round(Number(value) || 0))}`;
}

function formatDuration(seconds) {
  const safe = Math.max(0, Math.round(Number(seconds) || 0));
  const minute = Math.floor(safe / 60);
  const rest = safe % 60;
  return `${minute}分${String(rest).padStart(2, "0")}秒`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function loadRecords() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.map(normalizeRecord) : [];
  } catch {
    return [];
  }
}

function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function loadSyncConfig() {
  try {
    const config = JSON.parse(localStorage.getItem(SYNC_CONFIG_KEY) || "{}");
    return {
      apiKey: config.apiKey || "",
      binId: config.binId || "",
      keyHeader: config.keyHeader || "X-Master-Key",
    };
  } catch {
    return { apiKey: "", binId: "", keyHeader: "X-Master-Key" };
  }
}

function saveSyncConfig(config) {
  localStorage.setItem(SYNC_CONFIG_KEY, JSON.stringify({
    apiKey: config.apiKey || "",
    binId: config.binId || "",
    keyHeader: config.keyHeader || "X-Master-Key",
  }));
}

function hasSyncConfig(config = loadSyncConfig()) {
  return Boolean(config.apiKey && config.binId);
}

function syncHeaders(config = loadSyncConfig(), json = false) {
  const headers = {
    [config.keyHeader || "X-Master-Key"]: config.apiKey,
  };
  if (json) headers["Content-Type"] = "application/json";
  return headers;
}

function setSyncState(status, message) {
  state.syncStatus = status;
  state.syncMessage = message;
  if (status === "ok") state.syncUpdatedAt = new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
}

function normalizeCloudPayload(payload) {
  const raw = payload?.record ?? payload;
  const records = Array.isArray(raw) ? raw : raw?.records;
  return Array.isArray(records) ? records.map(normalizeRecord) : [];
}

function cloudPayload(records) {
  return {
    app: "livestream-analytics",
    updatedAt: new Date().toISOString(),
    records,
  };
}

async function fetchCloudRecords() {
  const config = loadSyncConfig();
  if (!hasSyncConfig(config)) return [];
  const response = await fetch(`${JSONBIN_API}/b/${encodeURIComponent(config.binId)}/latest`, {
    headers: syncHeaders(config),
  });
  if (!response.ok) throw new Error(`云端读取失败（${response.status}）`);
  return normalizeCloudPayload(await response.json());
}

async function syncFromCloud({ silent = false } = {}) {
  const config = loadSyncConfig();
  if (!hasSyncConfig(config)) {
    setSyncState("idle", "未配置云同步");
    if (!silent) render();
    return [];
  }
  setSyncState("syncing", "正在从云端读取");
  if (!silent) render();
  try {
    const records = await fetchCloudRecords();
    saveRecords(records);
    if (!state.selectedSessionId && records.length) state.selectedSessionId = records[0].id;
    setSyncState("ok", `已同步 ${records.length} 条场次`);
    render();
    return records;
  } catch (error) {
    setSyncState("error", error.message || "云端读取失败");
    render();
    return loadRecords();
  }
}

async function syncToCloud(records, { silent = false } = {}) {
  const config = loadSyncConfig();
  if (!hasSyncConfig(config)) {
    setSyncState("idle", "未配置云同步");
    if (!silent) render();
    return false;
  }
  setSyncState("syncing", "正在写入云端");
  if (!silent) render();
  try {
    const response = await fetch(`${JSONBIN_API}/b/${encodeURIComponent(config.binId)}`, {
      method: "PUT",
      headers: syncHeaders(config, true),
      body: JSON.stringify(cloudPayload(records)),
    });
    if (!response.ok) throw new Error(`云端写入失败（${response.status}）`);
    setSyncState("ok", `已同步 ${records.length} 条场次`);
    render();
    return true;
  } catch (error) {
    setSyncState("error", error.message || "云端写入失败");
    render();
    return false;
  }
}

async function createCloudBin() {
  const config = loadSyncConfig();
  if (!config.apiKey) {
    state.toast = "请先填写 JSONBin API Key";
    render();
    clearToast();
    return;
  }
  setSyncState("syncing", "正在创建共享 Bin");
  render();
  try {
    const response = await fetch(`${JSONBIN_API}/b`, {
      method: "POST",
      headers: {
        ...syncHeaders(config, true),
        "X-Bin-Name": "livestream-analytics",
        "X-Bin-Private": "true",
      },
      body: JSON.stringify(cloudPayload(loadRecords())),
    });
    if (!response.ok) throw new Error(`创建 Bin 失败（${response.status}）`);
    const json = await response.json();
    const binId = json?.metadata?.id;
    if (!binId) throw new Error("创建成功但没有返回 Bin ID");
    saveSyncConfig({ ...config, binId });
    setSyncState("ok", "共享 Bin 已创建并同步");
    state.toast = "共享 Bin 已创建，团队成员可复用同一个 Bin ID";
    render();
    clearToast();
  } catch (error) {
    setSyncState("error", error.message || "创建 Bin 失败");
    render();
  }
}

function normalizeRecord(record) {
  const basics = record.basics || {};
  const funnel = record.funnel || {};
  const qianchuan = record.qianchuan || {};
  const products = Array.isArray(record.products) ? record.products : [];
  const materials = Array.isArray(record.materials) ? record.materials : [];
  return {
    id: record.id || uid("s"),
    createdAt: record.createdAt || new Date().toISOString(),
    basics: {
      date: basics.date || today(),
      account: basics.account || "未命名达人",
      durationMinutes: parseNum(basics.durationMinutes),
      viewers: parseNum(basics.viewers),
      gmv: parseNum(basics.gmv),
      conversionRate: parseNum(basics.conversionRate),
      dwellSeconds: parseNum(basics.dwellSeconds),
      engagementRate: parseNum(basics.engagementRate),
      refundRate: parseNum(basics.refundRate),
      sources: {
        live: parseNum(basics.sources?.live),
        follow: parseNum(basics.sources?.follow),
        short: parseNum(basics.sources?.short),
        search: parseNum(basics.sources?.search),
        other: parseNum(basics.sources?.other),
      },
    },
    funnel: {
      enter: parseNum(funnel.enter),
      exposure: parseNum(funnel.exposure),
      click: parseNum(funnel.click),
      order: parseNum(funnel.order),
      deal: parseNum(funnel.deal),
    },
    products: products.map((item) => ({
      id: item.id || uid("p"),
      name: item.name || "未命名商品",
      price: parseNum(item.price),
      exposure: parseNum(item.exposure),
      clicks: parseNum(item.clicks),
      gmv: parseNum(item.gmv),
      orders: parseNum(item.orders),
    })),
    qianchuan: {
      spend: parseNum(qianchuan.spend),
      impressions: parseNum(qianchuan.impressions),
      clicks: parseNum(qianchuan.clicks),
      gmv: parseNum(qianchuan.gmv),
      roi: parseNum(qianchuan.roi) || (parseNum(qianchuan.spend) ? parseNum(qianchuan.gmv) / parseNum(qianchuan.spend) : 0),
    },
    materials: materials.map((item) => ({
      id: item.id || uid("m"),
      name: item.name || "未命名素材",
      spend: parseNum(item.spend),
      impressions: parseNum(item.impressions),
      ctr: parseNum(item.ctr),
      gmv: parseNum(item.gmv),
      roi: parseNum(item.roi) || (parseNum(item.spend) ? parseNum(item.gmv) / parseNum(item.spend) : 0),
    })),
  };
}

function getRecords() {
  const records = loadRecords().sort((a, b) => String(b.basics.date).localeCompare(String(a.basics.date)) || String(b.createdAt).localeCompare(String(a.createdAt)));
  if (!state.selectedSessionId && records.length) state.selectedSessionId = records[0].id;
  if (state.selectedSessionId && !records.some((item) => item.id === state.selectedSessionId)) {
    state.selectedSessionId = records[0]?.id || "";
  }
  return records;
}

function getSelectedSession() {
  return getRecords().find((item) => item.id === state.selectedSessionId) || null;
}

function sessionLabel(session) {
  if (!session) return "暂无场次";
  return `${session.basics.date} · ${session.basics.account}`;
}

function accountOptions(records) {
  return [...new Set(records.map((item) => item.basics.account).filter(Boolean))];
}

function productMetrics(product) {
  return {
    ...product,
    ctr: product.exposure ? (product.clicks / product.exposure) * 100 : 0,
    conversion: product.clicks ? (product.orders / product.clicks) * 100 : 0,
  };
}

function selectedProducts(session) {
  const products = (session?.products || []).map(productMetrics);
  const sortMap = {
    gmv: (a, b) => b.gmv - a.gmv,
    sales: (a, b) => b.orders - a.orders,
    click: (a, b) => b.ctr - a.ctr,
  };
  return products.sort(sortMap[state.productSort]);
}

function getMetrics(session) {
  if (!session) return null;
  const products = session.products || [];
  const productGmv = products.reduce((total, item) => total + item.gmv, 0);
  const orders = products.reduce((total, item) => total + item.orders, 0);
  const clicks = products.reduce((total, item) => total + item.clicks, 0);
  return {
    viewers: session.basics.viewers,
    gmv: session.basics.gmv || productGmv,
    conversion: session.basics.conversionRate,
    dwell: session.basics.dwellSeconds,
    engagement: session.basics.engagementRate,
    refundRisk: session.basics.refundRate,
    orders: session.funnel.deal || orders,
    clicks: session.funnel.click || clicks,
    roi: session.qianchuan.roi,
  };
}

function sourceSum(sources) {
  return sourceFields.reduce((total, item) => total + parseNum(sources?.[item[0]]), 0);
}

function healthScore(session) {
  if (!session) return null;
  const basics = session.basics;
  const roi = session.qianchuan.roi || 0;
  const naturalTraffic = basics.sources.live + basics.sources.follow + basics.sources.short + basics.sources.search;
  const parts = {
    dwell: clamp((basics.dwellSeconds / 300) * 25, 0, 25),
    conversion: clamp((basics.conversionRate / 8) * 25, 0, 25),
    engagement: clamp((basics.engagementRate / 12) * 20, 0, 20),
    roi: clamp((roi / 3) * 20, 0, 20),
    natural: clamp((naturalTraffic / 75) * 10, 0, 10),
  };
  const score = Math.round(Object.values(parts).reduce((total, item) => total + item, 0));
  const suggestions = [];
  if (parts.dwell < 18) suggestions.push("开场 3 分钟增加福利预告和商品利益点，提升停留。");
  if (parts.conversion < 18) suggestions.push("重点商品讲解后补充限时机制和明确下单路径。");
  if (parts.engagement < 14) suggestions.push("每 8-10 分钟设置互动口令或抽奖，拉升评论/点赞。");
  if (parts.roi < 14) suggestions.push("千川优先保留 ROI>3 素材，低 ROI 素材降预算重剪首帧。");
  if (parts.natural < 7) suggestions.push("直播前增加短视频预热视频和关注页召回，优化自然流量占比。");
  if (!suggestions.length) suggestions.push("整体健康度较好，可以围绕明星素材放大预算并复用高转化话术。");
  return {
    score,
    parts,
    naturalTraffic,
    level: score >= 85 ? "优秀" : score >= 70 ? "稳健" : score >= 55 ? "待优化" : "高风险",
    tone: score >= 85 ? "good" : score >= 70 ? "ok" : score >= 55 ? "warn" : "bad",
    suggestions,
  };
}

function diagnostics(session) {
  if (!session) return [];
  const result = [];
  const metrics = getMetrics(session);
  if (metrics.refundRisk >= 3) result.push({ tone: "danger", title: "退单风险偏高", text: `当前退单率 ${metrics.refundRisk.toFixed(2)}%，建议复核承诺话术和售后预期。`, time: "实时" });
  if (metrics.conversion < 3) result.push({ tone: "warn", title: "成交转化偏低", text: `当前转化率 ${metrics.conversion.toFixed(2)}%，商品点击后承接需要加强。`, time: "实时" });
  if (metrics.engagement < 8) result.push({ tone: "warn", title: "互动率不足", text: `当前互动率 ${metrics.engagement.toFixed(2)}%，建议增加口令、投票或限时福利。`, time: "实时" });
  if (session.qianchuan.spend > 0 && session.qianchuan.roi < 1.5) result.push({ tone: "danger", title: "千川 ROI 偏低", text: `当前 ROI ${session.qianchuan.roi.toFixed(2)}，建议暂停低效素材并重分配预算。`, time: "实时" });
  if (session.basics.sources.live < 35) result.push({ tone: "info", title: "推荐流量占比偏低", text: `直播推荐占比 ${session.basics.sources.live.toFixed(2)}%，可优化封面、标题和开播节奏。`, time: "实时" });
  const weakMaterials = session.materials.filter((item) => item.roi < 1).length;
  if (weakMaterials) result.push({ tone: "warn", title: "问题素材需要处理", text: `${weakMaterials} 条素材 ROI 低于 1，建议降预算或替换首帧卖点。`, time: "实时" });
  if (!result.length) result.push({ tone: "info", title: "暂无显著异常", text: "当前场次核心指标处于可控范围，建议继续观察高峰时段转化。", time: "实时" });
  return result.slice(0, 5);
}

function buildSeries(session) {
  const metrics = getMetrics(session);
  if (!metrics) return [];
  const count = state.grain === "minute" ? 30 : 15;
  return Array.from({ length: count }, (_, index) => {
    const progress = index / Math.max(count - 1, 1);
    const wave = Math.sin(index * 0.74) * 0.16 + Math.cos(index * 0.31) * 0.1;
    const spike = Math.exp(-Math.pow(progress - 0.58, 2) / 0.006) * 0.72;
    const lift = clamp(0.25 + progress * 0.75 + wave + spike, 0.08, 1.7);
    const viewers = Math.max(1, Math.round((metrics.viewers / count) * lift * 1.05));
    const gmv = Math.max(0, Math.round((metrics.gmv / count) * lift * 1.12));
    const hour = state.grain === "minute" ? Math.floor(index / 2) : index;
    const minute = state.grain === "minute" && index % 2 ? "30" : "00";
    return { time: `${String(hour).padStart(2, "0")}:${minute}`, viewers, gmv };
  });
}

function sparkline(values, color) {
  const width = 146;
  const height = 28;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / Math.max(max - min, 1)) * (height - 5) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return `<svg class="sparkline" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
    <polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>`;
}

function kpiCards(metrics, session) {
  const mini = buildSeries(session).slice(0, 16);
  const cards = [
    { label: "观看人数", value: formatNumber(metrics.viewers), iconName: "users", color: "#08a79d", bg: "var(--teal-soft)", trend: `${formatNumber(session.funnel.enter || metrics.viewers)} 进入`, up: true, values: mini.map((item) => item.viewers) },
    { label: "成交金额", value: formatMoney(metrics.gmv), iconName: "money", color: "#0baf72", bg: "#e9f8ef", trend: `ROI ${metrics.roi.toFixed(2)}`, up: metrics.roi >= 2, values: mini.map((item) => item.gmv) },
    { label: "转化率", value: `${metrics.conversion.toFixed(2)}%`, iconName: "percent", color: "#3975e8", bg: "var(--indigo-soft)", trend: `${formatNumber(metrics.orders)} 成交`, up: metrics.conversion >= 5, values: mini.map((item, index) => item.viewers * (0.8 + index / 40)) },
    { label: "人均停留", value: formatDuration(metrics.dwell), iconName: "clock", color: "#f79009", bg: "var(--amber-soft)", trend: `${session.basics.durationMinutes || 0} 分钟直播`, up: metrics.dwell >= 180, values: mini.map((item, index) => metrics.dwell + Math.sin(index) * 12) },
    { label: "互动率", value: `${metrics.engagement.toFixed(2)}%`, iconName: "message", color: "#8f5bea", bg: "#f3ebff", trend: metrics.engagement >= 10 ? "互动健康" : "需拉互动", up: metrics.engagement >= 10, values: mini.map((_, index) => metrics.engagement + Math.cos(index) * 2) },
    { label: "退单风险", value: `${metrics.refundRisk.toFixed(2)}%`, iconName: "shield", color: "#f0525f", bg: "var(--coral-soft)", trend: metrics.refundRisk <= 2 ? "风险较低" : "需关注", up: metrics.refundRisk <= 2, values: mini.map((_, index) => metrics.refundRisk + Math.sin(index * 0.8) * 0.6) },
  ];

  return cards
    .map(
      (card) => `<article class="kpi-card">
        <div class="kpi-head">
          <span class="kpi-icon" style="color:${card.color}; background:${card.bg}">${icon(card.iconName)}</span>
          <span class="kpi-label">${card.label}</span>
        </div>
        <p class="kpi-value">${card.value}</p>
        <div class="kpi-meta"><span>${escapeHtml(session.basics.date)}</span><span class="${card.up ? "trend-up" : "trend-down"}">${escapeHtml(card.trend)}</span></div>
        ${sparkline(card.values.length ? card.values : [1, 2, 1], card.color)}
      </article>`
    )
    .join("");
}

function trendChart(series) {
  const width = 760;
  const height = 248;
  const left = 46;
  const right = 50;
  const top = 12;
  const bottom = 34;
  const chartW = width - left - right;
  const chartH = height - top - bottom;
  const maxViewers = Math.max(1, Math.max(...series.map((item) => item.viewers)) * 1.12);
  const maxGmv = Math.max(1, Math.max(...series.map((item) => item.gmv)) * 1.12);
  const barW = chartW / Math.max(series.length, 1) - 6;
  const points = series
    .map((item, index) => {
      const x = left + (index / Math.max(series.length - 1, 1)) * chartW;
      const y = top + chartH - (item.gmv / maxGmv) * chartH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const grid = [0, 0.25, 0.5, 0.75, 1]
    .map((tick) => {
      const y = top + chartH * tick;
      const label = Math.round(maxViewers * (1 - tick));
      return `<line x1="${left}" x2="${width - right}" y1="${y}" y2="${y}" stroke="#e8eef2" />
        <text x="${left - 9}" y="${y + 4}" text-anchor="end" fill="#667085" font-size="11">${formatNumber(label)}</text>`;
    })
    .join("");
  const bars = series
    .map((item, index) => {
      const x = left + (index / series.length) * chartW + 3;
      const barH = (item.viewers / maxViewers) * chartH;
      const y = top + chartH - barH;
      return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${Math.max(barW, 3).toFixed(1)}" height="${barH.toFixed(1)}" rx="2" fill="#35c2c6" opacity="0.88" />`;
    })
    .join("");
  const xLabels = series
    .filter((_, index) => index % Math.max(Math.round(series.length / 7), 1) === 0)
    .map((item, index, filtered) => {
      const originalIndex = series.indexOf(item);
      const x = left + (originalIndex / Math.max(series.length - 1, 1)) * chartW;
      return `<text x="${x}" y="${height - 10}" text-anchor="${index === 0 ? "start" : index === filtered.length - 1 ? "end" : "middle"}" fill="#667085" font-size="11">${item.time}</text>`;
    })
    .join("");
  const focusIndex = Math.min(series.length - 1, Math.max(0, Math.round(series.length * 0.58)));
  const focus = series[focusIndex] || { time: "00:00", viewers: 0, gmv: 0 };
  const focusX = left + (focusIndex / Math.max(series.length - 1, 1)) * chartW;
  const focusY = top + chartH - (focus.gmv / maxGmv) * chartH;

  return `<div class="trend-chart-wrap">
    <svg class="trend-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
      <text x="${left}" y="10" fill="#667085" font-size="11">观看人数</text>
      <text x="${width - right}" y="10" text-anchor="end" fill="#667085" font-size="11">成交金额（元）</text>
      ${grid}
      ${bars}
      <polyline points="${points}" fill="none" stroke="#3975e8" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
      <line x1="${focusX}" x2="${focusX}" y1="${top}" y2="${top + chartH}" stroke="#3975e8" stroke-dasharray="3 4" opacity="0.55"/>
      <circle cx="${focusX}" cy="${focusY}" r="4.2" fill="#3975e8" stroke="#fff" stroke-width="2"/>
      ${xLabels}
    </svg>
    <div class="chart-tooltip">
      <strong>${focus.time}</strong>
      <div class="tooltip-row"><span><i class="dot" style="background:#35c2c6"></i>观看人数</span><b>${formatNumber(focus.viewers)}</b></div>
      <div class="tooltip-row"><span><i class="dot" style="background:#3975e8"></i>成交金额（元）</span><b>${formatNumber(focus.gmv)}</b></div>
    </div>
  </div>`;
}

function funnel(session) {
  const steps = [
    ["进入直播间", session.funnel.enter || session.basics.viewers, "#08a79d"],
    ["商品曝光人数", session.funnel.exposure, "#42b7ec"],
    ["商品点击人数", session.funnel.click, "#3975e8"],
    ["下单人数", session.funnel.order, "#f5a43c"],
    ["成交人数", session.funnel.deal, "#f0525f"],
  ];
  const max = Math.max(steps[0][1], 1);
  return `<div class="funnel">
    <div class="funnel-shapes">
      ${steps
        .map((item) => `<span class="funnel-slice" style="width:${Math.max((item[1] / max) * 100, 14)}%; background:${item[2]}"></span>`)
        .join("")}
    </div>
    <div class="funnel-list">
      ${steps
        .map((item, index) => {
          const rate = index === 0 ? "场次入口" : `转化率 ${steps[index - 1][1] ? ((item[1] / steps[index - 1][1]) * 100).toFixed(2) : "0.00"}%`;
          return `<div class="funnel-row">
            <div><div class="funnel-name">${item[0]}</div><div class="funnel-rate">${rate}</div></div>
            <div class="funnel-value">${formatNumber(item[1])}</div>
          </div>`;
        })
        .join("")}
    </div>
  </div>`;
}

function trafficSource(session) {
  const sources = session.basics.sources;
  let cursor = 0;
  const stops = sourceFields.map(([key]) => {
    cursor += sources[key] || 0;
    return cursor;
  });
  const style = `--s1:${stops[0]}%; --s2:${stops[1]}%; --s3:${stops[2]}%; --s4:${stops[3]}%`;
  return `<div class="source-wrap">
    <div class="donut" style="${style}">
      <div class="donut-center"><strong>${formatNumber(session.basics.viewers)}</strong><span>观看人数</span></div>
    </div>
    <div class="source-list">
      ${sourceFields
        .map(([key, label, color]) => `<div class="source-item"><span><i class="dot" style="background:${color}"></i>${label}</span><strong>${(sources[key] || 0).toFixed(2)}%</strong></div>`)
        .join("")}
    </div>
  </div>
  <button class="panel-link" data-nav-jump="流量">查看详情 ›</button>`;
}

function productTable(session) {
  const products = selectedProducts(session);
  if (!products.length) return `<div class="empty-inline">暂无商品数据，请到「数据录入」添加商品行。</div>`;
  const rows = products
    .map(
      (item, index) => `<tr class="${item.id === state.selectedProductId ? "selected" : ""}" data-product="${item.id}">
      <td><span class="rank ${index < 3 ? "top" : ""}">${index + 1}</span></td>
      <td>
        <div class="product-cell">
          <span class="product-thumb">${escapeHtml(item.name.slice(0, 1))}</span>
          <div class="product-copy"><div class="product-name">${escapeHtml(item.name)}</div><div class="product-price">¥${item.price.toFixed(2)}</div></div>
        </div>
      </td>
      <td>${formatNumber(item.exposure)}</td>
      <td>${formatNumber(item.clicks)}</td>
      <td>${item.ctr.toFixed(1)}%</td>
      <td class="money">${formatMoney(item.gmv)}</td>
      <td>${formatNumber(item.orders)}</td>
      <td>${item.conversion.toFixed(1)}%</td>
      <td class="mini-chart-icon">${icon("chart")}</td>
    </tr>`
    )
    .join("");
  return `<div class="panel-title-row">
    <div class="panel-title-wrap">
      <h2 class="panel-title">商品表现</h2>
      <div class="tabs">
        ${[
          ["gmv", "成交额TOP"],
          ["sales", "销量TOP"],
          ["click", "点击率TOP"],
        ]
          .map((item) => `<button data-sort="${item[0]}" class="${state.productSort === item[0] ? "active" : ""}">${item[1]}</button>`)
          .join("")}
      </div>
    </div>
  </div>
  <div class="table-scroll">
    <table class="product-table">
      <colgroup><col style="width:5%"><col style="width:27%"><col style="width:10%"><col style="width:9%"><col style="width:8%"><col style="width:15%"><col style="width:8%"><col style="width:13%"><col style="width:5%"></colgroup>
      <thead><tr><th>排名</th><th>商品信息</th><th>曝光</th><th>点击</th><th>点击率</th><th>成交额</th><th>件数</th><th>转化率</th><th>操作</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>
  <button class="panel-link" data-nav-jump="商品">查看全部商品 ›</button>`;
}

function heatValue(session, row, col, metric) {
  const baseRate = metric === "gift" ? session.qianchuan.roi : metric === "like" ? session.basics.engagementRate : session.basics.conversionRate;
  const base = Math.sin((row + 1) * 0.68) + Math.cos((col + 1) * 0.38);
  const peak = Math.exp(-Math.pow(row - 9, 2) / 12) + Math.exp(-Math.pow(col - 13, 2) / 38);
  return clamp((base + 2.2) / 5 + peak * 0.28 + baseRate / 80, 0, 1);
}

function heatColor(value) {
  if (value < 0.32) return "#edf2f7";
  if (value < 0.52) return "#bde8ff";
  if (value < 0.68) return "#58b8f5";
  if (value < 0.82) return "#ffd16b";
  return "#ff9f40";
}

function heatmap(session) {
  const cells = [];
  for (let row = 0; row < 16; row += 1) {
    for (let col = 0; col < 24; col += 1) {
      cells.push(`<span class="heat-cell" style="--cell:${heatColor(heatValue(session, row, col, state.heatMetric))}"></span>`);
    }
  }
  return `<div class="panel-title-row">
    <h2 class="panel-title">互动节奏</h2>
    <div class="segmented">
      ${[
        ["comment", "弹幕数"],
        ["like", "点赞数"],
        ["gift", "礼物金额"],
      ]
        .map((item) => `<button data-heat="${item[0]}" class="${state.heatMetric === item[0] ? "active" : ""}">${item[1]}</button>`)
        .join("")}
    </div>
  </div>
  <div class="heatmap-wrap">
    <div class="heatmap">
      <div class="heat-axis"><span>00:00</span><span>02:00</span><span>04:00</span><span>06:00</span><span>08:00</span><span>10:00</span><span>12:00</span><span>14:00</span></div>
      <div class="heat-grid">${cells.join("")}</div>
    </div>
    <div class="heat-legend"><span>低</span><span class="heat-ramp"></span><span>高</span></div>
  </div>`;
}

function alerts(session) {
  const toneMap = {
    danger: ["alert", "#f0525f", "var(--coral-soft)"],
    warn: ["alert", "#f79009", "var(--amber-soft)"],
    info: ["info", "#3975e8", "var(--indigo-soft)"],
  };
  return `<div class="panel-title-row"><h2 class="panel-title">异常提醒</h2><button class="panel-link" data-nav-jump="复盘">更多 ›</button></div>
  <div class="alerts">
    ${diagnostics(session)
      .map((item) => {
        const tone = toneMap[item.tone] || toneMap.info;
        return `<article class="alert-item">
          <span class="alert-icon" style="color:${tone[1]}; background:${tone[2]}">${icon(tone[0])}</span>
          <div><p class="alert-title">${escapeHtml(item.title)}</p><p class="alert-text">${escapeHtml(item.text)}</p></div>
          <span class="alert-time">${escapeHtml(item.time)}</span>
        </article>`;
      })
      .join("")}
  </div>`;
}

function healthPanel(session) {
  const health = healthScore(session);
  return `<section class="panel health-panel">
    <div class="health-ring" style="--score:${health.score * 3.6}deg">
      <div><strong>${health.score}</strong><span>健康评分</span></div>
    </div>
    <div class="health-copy">
      <div class="panel-title-row compact"><h2 class="panel-title">直播间健康评分</h2><span class="health-badge ${health.tone}">${health.level}</span></div>
      <div class="score-breakdown">
        <span>停留 ${health.parts.dwell.toFixed(1)}/25</span>
        <span>转化 ${health.parts.conversion.toFixed(1)}/25</span>
        <span>互动 ${health.parts.engagement.toFixed(1)}/20</span>
        <span>ROI ${health.parts.roi.toFixed(1)}/20</span>
        <span>自然流量 ${health.parts.natural.toFixed(1)}/10</span>
      </div>
      <p class="health-diagnosis">自然流量占比 ${health.naturalTraffic.toFixed(2)}%，千川 ROI ${session.qianchuan.roi.toFixed(2)}。${health.level === "优秀" ? "整体表现优秀，可以进入放量阶段。" : "建议优先处理短板指标，再做预算放大。"}</p>
      <ul class="suggestion-list">${health.suggestions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
  </section>`;
}

function noDataView() {
  return `<section class="empty-tab">
    <div>
      <h2>还没有可分析的直播场次</h2>
      <p>先进入「数据录入」手动填写或批量导入 CSV。保存后，总览页、素材页、数据中心和导出报告都会自动使用真实数据。</p>
      <button class="export-button empty-action" data-nav-jump="数据录入">${icon("edit")}去录入数据</button>
    </div>
  </section>`;
}

function renderOverview(session) {
  if (!session) return noDataView();
  const metrics = getMetrics(session);
  return `<section class="kpi-grid">${kpiCards(metrics, session)}</section>
    <section class="dashboard-grid">
      <article class="panel panel-large trend-panel">
        <div class="panel-title-row">
          <div class="panel-title-wrap"><h2 class="panel-title">实时趋势</h2><span class="info-icon">i</span></div>
          <div class="segmented"><button data-grain="minute" class="${state.grain === "minute" ? "active" : ""}">按分钟</button><button data-grain="hour" class="${state.grain === "hour" ? "active" : ""}">按小时</button></div>
        </div>
        <div class="chart-legend"><span><i class="dot" style="background:#35c2c6"></i>观看人数</span><span><i class="dot" style="background:#3975e8"></i>成交金额（元）</span></div>
        ${trendChart(buildSeries(session))}
        <div class="timeline-control"><button class="play-button" data-action="toast" data-message="已回放直播关键节点">${icon("play")}</button><div class="scrubber" style="--progress:86%"></div><span class="live-time">${session.basics.durationMinutes || 0} 分钟</span></div>
      </article>
      <article class="panel funnel-panel"><div class="panel-title-row"><h2 class="panel-title">成交漏斗</h2></div>${funnel(session)}</article>
      <article class="panel source-panel"><div class="panel-title-row"><h2 class="panel-title">流量来源</h2></div>${trafficSource(session)}</article>
      <article class="panel products-panel">${productTable(session)}</article>
      <article class="panel heat-panel">${heatmap(session)}</article>
      <article class="panel alerts-panel">${alerts(session)}</article>
    </section>
    ${healthPanel(session)}`;
}

function numberField(label, name, value = "", attrs = "") {
  return `<label class="form-field"><span>${label}</span><input type="number" step="0.01" name="${name}" value="${escapeHtml(value)}" ${attrs}></label>`;
}

function textField(label, name, value = "", attrs = "") {
  return `<label class="form-field"><span>${label}</span><input type="text" name="${name}" value="${escapeHtml(value)}" ${attrs}></label>`;
}

function productInputRow(data = {}) {
  return `<tr class="product-entry-row">
    <td><input class="mini-input product-name-input" type="text" placeholder="商品名称" value="${escapeHtml(data.name || "")}"></td>
    <td><input class="mini-input product-price-input" type="number" step="0.01" placeholder="价格" value="${escapeHtml(data.price || "")}"></td>
    <td><input class="mini-input product-exposure-input" type="number" placeholder="曝光" value="${escapeHtml(data.exposure || "")}"></td>
    <td><input class="mini-input product-clicks-input" type="number" placeholder="点击" value="${escapeHtml(data.clicks || "")}"></td>
    <td><input class="mini-input product-gmv-input" type="number" step="0.01" placeholder="成交额" value="${escapeHtml(data.gmv || "")}"></td>
    <td><input class="mini-input product-orders-input" type="number" placeholder="件数" value="${escapeHtml(data.orders || "")}"></td>
    <td><button type="button" class="table-action danger" data-remove-row>${icon("trash")}</button></td>
  </tr>`;
}

function materialInputRow(data = {}) {
  return `<tr class="material-entry-row">
    <td><input class="mini-input material-name-input" type="text" placeholder="素材名称" value="${escapeHtml(data.name || "")}"></td>
    <td><input class="mini-input material-spend-input" type="number" step="0.01" placeholder="消耗" value="${escapeHtml(data.spend || "")}"></td>
    <td><input class="mini-input material-impressions-input" type="number" placeholder="曝光" value="${escapeHtml(data.impressions || "")}"></td>
    <td><input class="mini-input material-ctr-input" type="number" step="0.01" placeholder="点击率%" value="${escapeHtml(data.ctr || "")}"></td>
    <td><input class="mini-input material-gmv-input" type="number" step="0.01" placeholder="成交额" value="${escapeHtml(data.gmv || "")}"></td>
    <td><input class="mini-input material-roi-input" type="number" step="0.01" placeholder="ROI" value="${escapeHtml(data.roi || "")}"></td>
    <td><button type="button" class="table-action danger" data-remove-row>${icon("trash")}</button></td>
  </tr>`;
}

function renderManualEntry(records) {
  const accounts = accountOptions(records);
  return `<form class="entry-form" data-entry-form>
    <section class="form-section">
      <div class="panel-title-row"><h2 class="panel-title">直播基础数据</h2><span class="form-hint">流量来源合计必须等于 100%</span></div>
      <div class="form-grid">
        <label class="form-field"><span>直播日期</span><input type="date" name="date" value="${today()}" required></label>
        <label class="form-field"><span>达人账号</span><input type="text" name="account" list="account-options" placeholder="输入或选择达人" required></label>
        <datalist id="account-options">${accounts.map((item) => `<option value="${escapeHtml(item)}"></option>`).join("")}</datalist>
        ${numberField("直播时长（分钟）", "durationMinutes", "", "required")}
        ${numberField("观看人数", "viewers", "", "required")}
        ${numberField("成交金额", "gmv", "", "required")}
        ${numberField("转化率（%）", "conversionRate", "", "required")}
        ${numberField("人均停留时长（秒）", "dwellSeconds", "", "required")}
        ${numberField("互动率（%）", "engagementRate", "", "required")}
        ${numberField("退单率（%）", "refundRate", "", "required")}
      </div>
      <div class="source-input-grid">
        ${sourceFields.map(([key, label]) => numberField(`${label}占比`, `source_${key}`, "", "required")).join("")}
      </div>
    </section>

    <section class="form-section">
      <h2 class="panel-title">成交漏斗数据</h2>
      <div class="form-grid">
        ${numberField("进入直播间人数", "funnelEnter", "", "required")}
        ${numberField("商品曝光人数", "funnelExposure", "", "required")}
        ${numberField("商品点击人数", "funnelClick", "", "required")}
        ${numberField("下单人数", "funnelOrder", "", "required")}
        ${numberField("成交人数", "funnelDeal", "", "required")}
      </div>
    </section>

    <section class="form-section">
      <div class="panel-title-row"><h2 class="panel-title">商品数据</h2><button type="button" class="small-button" data-add-product>${icon("plus")}新增商品</button></div>
      <div class="table-scroll">
        <table class="entry-table"><thead><tr><th>商品名称</th><th>价格</th><th>曝光人数</th><th>点击人数</th><th>成交金额</th><th>成交件数</th><th></th></tr></thead><tbody id="product-rows">${productInputRow()}</tbody></table>
      </div>
    </section>

    <section class="form-section">
      <h2 class="panel-title">千川投放数据</h2>
      <div class="form-grid">
        ${numberField("消耗金额", "qcSpend", "", "required")}
        ${numberField("曝光量", "qcImpressions", "", "required")}
        ${numberField("点击量", "qcClicks", "", "required")}
        ${numberField("成交金额", "qcGmv", "", "required")}
        ${numberField("ROI", "qcRoi", "")}
      </div>
      <div class="panel-title-row sub-row"><h3>素材明细</h3><button type="button" class="small-button" data-add-material>${icon("plus")}新增素材</button></div>
      <div class="table-scroll">
        <table class="entry-table"><thead><tr><th>素材名称</th><th>消耗</th><th>曝光</th><th>点击率</th><th>成交额</th><th>ROI</th><th></th></tr></thead><tbody id="material-rows">${materialInputRow()}</tbody></table>
      </div>
    </section>
    <div class="form-actions"><button type="submit" class="export-button">${icon("check")}提交并保存场次</button></div>
  </form>`;
}

function renderImportTab() {
  const preview = state.importPreview;
  return `<section class="form-section import-panel">
    <div class="panel-title-row">
      <div><h2 class="panel-title">批量导入 CSV</h2><p class="form-subtitle">一行可同时包含一个商品和一个素材；相同直播日期 + 达人账号会自动合并为同一场次。</p></div>
      <button type="button" class="small-button" data-download-template>${icon("download")}下载 CSV 模板</button>
    </div>
    <label class="upload-box">
      ${icon("upload")}
      <span>上传 CSV 文件</span>
      <input type="file" accept=".csv,text/csv" data-csv-file>
    </label>
    ${
      preview.length
        ? `<div class="import-preview">
            <div class="panel-title-row"><h3>导入预览</h3><button type="button" class="export-button" data-confirm-import>${icon("check")}确认保存 ${preview.length} 条场次</button></div>
            <div class="table-scroll">
              <table class="data-table"><thead><tr><th>直播日期</th><th>达人账号</th><th>观看人数</th><th>成交金额</th><th>商品数</th><th>素材数</th></tr></thead>
              <tbody>${preview
                .map((item) => `<tr><td>${escapeHtml(item.basics.date)}</td><td>${escapeHtml(item.basics.account)}</td><td>${formatNumber(item.basics.viewers)}</td><td>${formatMoney(item.basics.gmv)}</td><td>${item.products.length}</td><td>${item.materials.length}</td></tr>`)
                .join("")}</tbody></table>
            </div>
          </div>`
        : ""
    }
  </section>`;
}

function renderDataEntry(records) {
  return `<section class="panel page-panel">
    <div class="panel-title-row">
      <div><h2 class="panel-title">数据录入</h2><p class="form-subtitle">保存后会生成独立场次记录，并自动刷新总览、素材分析和报告。</p></div>
      <div class="tabs"><button data-entry-tab="manual" class="${state.entryTab === "manual" ? "active" : ""}">手动填写</button><button data-entry-tab="import" class="${state.entryTab === "import" ? "active" : ""}">批量导入</button></div>
    </div>
    ${state.entryTab === "manual" ? renderManualEntry(records) : renderImportTab()}
  </section>`;
}

function materialDiagnosis(material) {
  if (material.roi >= 3 && material.ctr >= 2) return { tag: "明星素材", tone: "good", suggestion: "保留原始结构，加预算放量，并复制首帧卖点做变体测试。" };
  if (material.roi >= 3) return { tag: "潜力素材", tone: "ok", suggestion: "ROI 健康但点击率偏低，建议重剪前 3 秒钩子和标题。" };
  if (material.ctr >= 2 && material.roi < 1) return { tag: "引流不成交", tone: "warn", suggestion: "点击足够但成交弱，落地商品或直播承接话术需要调整。" };
  if (material.roi < 1) return { tag: "问题素材", tone: "bad", suggestion: "暂停放量，替换首帧、卖点或定向后再小预算验证。" };
  return { tag: "稳定素材", tone: "ok", suggestion: "保持小预算观察，优先测试高客单商品承接。" };
}

function materialQuadrant(material, avgCtr, avgRoi) {
  if (material.ctr >= avgCtr && material.roi >= avgRoi) return "rightTop";
  if (material.ctr < avgCtr && material.roi >= avgRoi) return "leftTop";
  if (material.ctr >= avgCtr && material.roi < avgRoi) return "rightBottom";
  return "leftBottom";
}

function renderMaterialPage(session) {
  if (!session) return noDataView();
  const materials = [...session.materials].sort((a, b) => b.roi - a.roi);
  if (!materials.length) return `<section class="panel page-panel"><h2 class="panel-title">千川素材分析</h2><div class="empty-inline">当前场次没有素材数据，请到「数据录入」添加千川素材明细。</div></section>`;
  const avgCtr = materials.reduce((total, item) => total + item.ctr, 0) / materials.length;
  const avgRoi = materials.reduce((total, item) => total + item.roi, 0) / materials.length;
  const maxSpend = Math.max(...materials.map((item) => item.spend), 1);
  const maxRoi = Math.max(...materials.map((item) => item.roi), 3);
  const maxCtr = Math.max(...materials.map((item) => item.ctr), 3);
  return `<section class="material-grid">
    <article class="panel page-panel">
      <div class="panel-title-row"><h2 class="panel-title">素材 ROI 排行榜</h2><span class="form-hint">${escapeHtml(sessionLabel(session))}</span></div>
      <div class="table-scroll">
        <table class="data-table"><thead><tr><th>排名</th><th>素材名称</th><th>消耗</th><th>曝光</th><th>点击率</th><th>成交额</th><th>ROI</th><th>诊断</th></tr></thead>
        <tbody>${materials
          .map((item, index) => {
            const diagnosis = materialDiagnosis(item);
            return `<tr><td><span class="rank ${index < 3 ? "top" : ""}">${index + 1}</span></td><td>${escapeHtml(item.name)}</td><td>${formatMoney(item.spend)}</td><td>${formatNumber(item.impressions)}</td><td>${item.ctr.toFixed(2)}%</td><td>${formatMoney(item.gmv)}</td><td><span class="roi-pill ${item.roi > 3 ? "good" : item.roi >= 1 ? "warn" : "bad"}">${item.roi.toFixed(2)}</span></td><td><span class="diagnosis-tag ${diagnosis.tone}">${diagnosis.tag}</span></td></tr>`;
          })
          .join("")}</tbody></table>
      </div>
    </article>
    <article class="panel page-panel">
      <div class="panel-title-row"><h2 class="panel-title">素材四象限气泡图</h2><span class="form-hint">X=点击率，Y=ROI，大小=消耗</span></div>
      <div class="bubble-chart">
        <div class="axis-label x">点击率</div><div class="axis-label y">ROI</div>
        <div class="quadrant q1">🔥 明星素材</div><div class="quadrant q2">⚡ 潜力素材</div><div class="quadrant q3">❌ 问题素材</div><div class="quadrant q4">⚠️ 引流素材</div>
        <span class="axis-line vertical" style="left:${clamp((avgCtr / maxCtr) * 100, 20, 80)}%"></span>
        <span class="axis-line horizontal" style="bottom:${clamp((avgRoi / maxRoi) * 100, 20, 80)}%"></span>
        ${materials
          .map((item) => {
            const left = clamp((item.ctr / maxCtr) * 88 + 6, 6, 92);
            const bottom = clamp((item.roi / maxRoi) * 82 + 8, 8, 90);
            const size = clamp((item.spend / maxSpend) * 34 + 14, 14, 48);
            const quad = materialQuadrant(item, avgCtr, avgRoi);
            return `<button class="bubble ${quad}" style="left:${left}%; bottom:${bottom}%; width:${size}px; height:${size}px" title="${escapeHtml(item.name)} ROI ${item.roi.toFixed(2)}">${escapeHtml(item.name.slice(0, 2))}</button>`;
          })
          .join("")}
      </div>
    </article>
    <article class="panel page-panel material-advice">
      <h2 class="panel-title">自动诊断与优化建议</h2>
      <div class="advice-list">
        ${materials
          .map((item) => {
            const diagnosis = materialDiagnosis(item);
            return `<article class="advice-item"><span class="diagnosis-tag ${diagnosis.tone}">${diagnosis.tag}</span><div><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(diagnosis.suggestion)}</p></div></article>`;
          })
          .join("")}
      </div>
    </article>
  </section>`;
}

function renderDataCenter(records) {
  return `<section class="panel page-panel">
    <div class="panel-title-row"><div><h2 class="panel-title">数据中心</h2><p class="form-subtitle">所有手动提交和 CSV 导入都会保存为独立场次记录。</p></div><button class="small-button" data-nav-jump="数据录入">${icon("plus")}新增场次</button></div>
    ${
      records.length
        ? `<div class="table-scroll"><table class="data-table"><thead><tr><th>直播日期</th><th>达人账号</th><th>观看人数</th><th>成交金额</th><th>转化率</th><th>千川 ROI</th><th>商品</th><th>素材</th><th>操作</th></tr></thead><tbody>${records
            .map((item) => `<tr><td>${escapeHtml(item.basics.date)}</td><td>${escapeHtml(item.basics.account)}</td><td>${formatNumber(item.basics.viewers)}</td><td>${formatMoney(item.basics.gmv)}</td><td>${item.basics.conversionRate.toFixed(2)}%</td><td>${item.qianchuan.roi.toFixed(2)}</td><td>${item.products.length}</td><td>${item.materials.length}</td><td><button class="table-action" data-open-session="${item.id}">查看</button><button class="table-action danger" data-delete-session="${item.id}">${icon("trash")}</button></td></tr>`)
            .join("")}</tbody></table></div>`
        : `<div class="empty-inline">暂无历史场次。请先新增或导入数据。</div>`
    }
  </section>`;
}

function syncStatusLabel() {
  const config = loadSyncConfig();
  if (!hasSyncConfig(config)) return { text: "未配置", cls: "idle" };
  if (state.syncStatus === "ok") return { text: state.syncUpdatedAt ? `已同步 ${state.syncUpdatedAt}` : "已同步", cls: "ok" };
  if (state.syncStatus === "syncing") return { text: "同步中", cls: "syncing" };
  if (state.syncStatus === "error") return { text: "同步失败", cls: "error" };
  return { text: "待同步", cls: "idle" };
}

function renderSyncPanel() {
  const config = loadSyncConfig();
  return `<div class="modal-backdrop" data-close-sync>
    <section class="sync-panel" data-sync-panel>
      <div class="panel-title-row">
        <div>
          <h2 class="panel-title">JSONBin 云同步设置</h2>
          <p class="form-subtitle">填写同一个 API Key 和 Bin ID 后，团队成员会读写同一份直播数据。</p>
        </div>
        <button class="table-action" data-close-sync type="button">关闭</button>
      </div>
      <form class="sync-form" data-sync-form>
        <label class="form-field">
          <span>Key 类型</span>
          <select name="keyHeader">
            <option value="X-Master-Key" ${config.keyHeader === "X-Master-Key" ? "selected" : ""}>X-Master-Key</option>
            <option value="X-Access-Key" ${config.keyHeader === "X-Access-Key" ? "selected" : ""}>X-Access-Key</option>
          </select>
        </label>
        <label class="form-field">
          <span>JSONBin API Key</span>
          <input type="password" name="apiKey" value="${escapeHtml(config.apiKey)}" placeholder="$2a$10$...">
        </label>
        <label class="form-field">
          <span>Bin ID</span>
          <input type="text" name="binId" value="${escapeHtml(config.binId)}" placeholder="例如 6650f...">
        </label>
        <div class="sync-actions">
          <button class="small-button" type="submit">${icon("check")}保存配置</button>
          <button class="small-button" type="button" data-create-bin>${icon("plus")}创建共享 Bin</button>
          <button class="small-button" type="button" data-pull-cloud>${icon("download")}从云端读取</button>
          <button class="small-button" type="button" data-push-cloud>${icon("upload")}推送本地数据</button>
        </div>
      </form>
      <div class="sync-note">
        <strong>安全提醒：</strong>纯前端静态网站会把 API Key 保存在浏览器本地，并在请求中使用。适合小团队内部工具；不要把 Master Key 提交到 GitHub。
      </div>
      <p class="form-subtitle">当前状态：${escapeHtml(state.syncMessage)}</p>
    </section>
  </div>`;
}

function renderSimpleDataPage(title, description, content) {
  return `<section class="panel page-panel"><div class="panel-title-row"><div><h2 class="panel-title">${title}</h2><p class="form-subtitle">${description}</p></div></div>${content}</section>`;
}

function renderCurrentPage(records, session) {
  if (state.nav === "总览") return renderOverview(session);
  if (state.nav === "数据录入") return renderDataEntry(records);
  if (state.nav === "素材") return renderMaterialPage(session);
  if (state.nav === "数据中心") return renderDataCenter(records);
  if (!session) return noDataView();
  if (state.nav === "商品") return renderSimpleDataPage("商品分析", "基于当前场次的真实商品明细。", productTable(session));
  if (state.nav === "流量") return renderSimpleDataPage("流量拆解", "基于录入的流量来源占比。", trafficSource(session));
  if (state.nav === "互动") return renderSimpleDataPage("互动分析", "基于录入指标推导互动节奏热力图。", heatmap(session));
  if (state.nav === "复盘") return renderSimpleDataPage("直播复盘", "自动汇总异常提醒和优化建议。", `${alerts(session)}${healthPanel(session)}`);
  return renderOverview(session);
}

function selectSession(records, session) {
  return `<select data-select="session">
    ${records.length ? "" : `<option value="">暂无场次</option>`}
    ${records.map((item) => `<option value="${item.id}" ${session?.id === item.id ? "selected" : ""}>${escapeHtml(sessionLabel(item))}</option>`).join("")}
  </select>`;
}

function render() {
  const records = getRecords();
  const session = getSelectedSession();
  const sync = syncStatusLabel();
  document.getElementById("app").innerHTML = `<div class="app-shell">
    <aside class="sidebar">
      <div class="brand"><span class="brand-mark">${icon("play")}</span><span>直播数据</span></div>
      <nav class="nav-group">
        ${navItems.map((item) => `<button class="nav-item ${state.nav === item[0] ? "active" : ""}" data-nav="${item[0]}">${icon(item[1])}<span>${item[0]}</span></button>`).join("")}
      </nav>
      <div class="nav-spacer"></div>
      <nav class="nav-group secondary">
        ${secondaryNav.map((item) => `<button class="nav-item" data-action="toast" data-message="${item[0]}模块待接入">${icon(item[1])}<span>${item[0]}</span></button>`).join("")}
      </nav>
    </aside>
    <main class="main">
      <header class="topbar">
        <div>
          <h1 class="page-title">直播间数据分析</h1>
          <div class="filters">
            <label class="control">${icon("calendar")}<span class="select-label">今日直播</span>${selectSession(records, session)}</label>
            <label class="control readonly-control">${icon("user")}<span class="select-label">达人账号</span><span class="readonly-value">${escapeHtml(session?.basics.account || "未选择")}</span></label>
            <label class="control readonly-control">${icon("clock")}<span class="select-label">直播时长</span><span class="readonly-value">${session ? `${session.basics.durationMinutes || 0} 分钟` : "未选择"}</span></label>
          </div>
        </div>
        <div class="top-actions">
          <button class="sync-button ${sync.cls}" data-sync-settings type="button">${icon("cloud")}<span>${escapeHtml(sync.text)}</span></button>
          <button class="icon-button" aria-label="通知">${icon("bell")}<span class="notification-dot">${diagnostics(session).length || 0}</span></button>
          <div class="operator"><span class="avatar">李</span><span>运营小李</span></div>
          <button class="export-button" data-export>${icon("download")}导出报告</button>
        </div>
      </header>
      ${renderCurrentPage(records, session)}
    </main>
    ${state.toast ? `<div class="toast">${icon("check")}<span>${escapeHtml(state.toast)}</span></div>` : ""}
    ${state.syncPanel ? renderSyncPanel() : ""}
  </div>`;
  bindEvents();
}

function bindEvents() {
  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      state.nav = button.dataset.nav;
      render();
    });
  });
  document.querySelectorAll("[data-nav-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      state.nav = button.dataset.navJump;
      render();
    });
  });
  document.querySelectorAll("[data-select='session']").forEach((selectEl) => {
    selectEl.addEventListener("change", () => {
      state.selectedSessionId = selectEl.value;
      state.toast = "已切换场次，图表与诊断已更新";
      render();
      clearToast();
    });
  });
  document.querySelectorAll("[data-grain]").forEach((button) => button.addEventListener("click", () => { state.grain = button.dataset.grain; render(); }));
  document.querySelectorAll("[data-sort]").forEach((button) => button.addEventListener("click", () => { state.productSort = button.dataset.sort; render(); }));
  document.querySelectorAll("[data-heat]").forEach((button) => button.addEventListener("click", () => { state.heatMetric = button.dataset.heat; render(); }));
  document.querySelectorAll("[data-entry-tab]").forEach((button) => button.addEventListener("click", () => { state.entryTab = button.dataset.entryTab; render(); }));
  document.querySelectorAll("[data-product]").forEach((row) => {
    row.addEventListener("click", () => {
      state.selectedProductId = row.dataset.product;
      state.toast = "已选中商品行";
      render();
      clearToast();
    });
  });
  document.querySelectorAll("[data-action='toast']").forEach((button) => {
    button.addEventListener("click", () => {
      state.toast = button.dataset.message;
      render();
      clearToast();
    });
  });
  const form = document.querySelector("[data-entry-form]");
  if (form) form.addEventListener("submit", handleManualSubmit);
  document.querySelector("[data-add-product]")?.addEventListener("click", () => document.getElementById("product-rows").insertAdjacentHTML("beforeend", productInputRow()));
  document.querySelector("[data-add-material]")?.addEventListener("click", () => document.getElementById("material-rows").insertAdjacentHTML("beforeend", materialInputRow()));
  document.querySelectorAll("[data-remove-row]").forEach((button) => button.addEventListener("click", () => button.closest("tr")?.remove()));
  document.querySelector("[data-download-template]")?.addEventListener("click", downloadCsvTemplate);
  document.querySelector("[data-csv-file]")?.addEventListener("change", handleCsvUpload);
  document.querySelector("[data-confirm-import]")?.addEventListener("click", confirmImport);
  document.querySelectorAll("[data-delete-session]").forEach((button) => button.addEventListener("click", () => deleteSession(button.dataset.deleteSession)));
  document.querySelectorAll("[data-open-session]").forEach((button) => button.addEventListener("click", () => {
    state.selectedSessionId = button.dataset.openSession;
    state.nav = "总览";
    render();
  }));
  document.querySelector("[data-sync-settings]")?.addEventListener("click", () => {
    state.syncPanel = true;
    render();
  });
  document.querySelectorAll("[data-close-sync]").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (event.target.closest("[data-sync-panel]") && !event.target.matches("[data-close-sync]")) return;
      state.syncPanel = false;
      render();
    });
  });
  document.querySelector("[data-sync-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    saveSyncConfig({
      keyHeader: data.get("keyHeader"),
      apiKey: String(data.get("apiKey") || "").trim(),
      binId: String(data.get("binId") || "").trim(),
    });
    setSyncState(hasSyncConfig() ? "idle" : "idle", hasSyncConfig() ? "同步配置已保存" : "请继续填写 API Key 和 Bin ID");
    state.toast = "同步配置已保存";
    render();
    clearToast();
  });
  document.querySelector("[data-create-bin]")?.addEventListener("click", createCloudBin);
  document.querySelector("[data-pull-cloud]")?.addEventListener("click", () => syncFromCloud());
  document.querySelector("[data-push-cloud]")?.addEventListener("click", () => syncToCloud(loadRecords()));
  document.querySelector("[data-export]")?.addEventListener("click", exportReport);
}

function handleManualSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const sources = {
    live: parseNum(data.get("source_live")),
    follow: parseNum(data.get("source_follow")),
    short: parseNum(data.get("source_short")),
    search: parseNum(data.get("source_search")),
    other: parseNum(data.get("source_other")),
  };
  const totalSource = sourceSum(sources);
  if (Math.abs(totalSource - 100) > 0.01) {
    state.toast = `流量来源占比当前合计 ${totalSource.toFixed(2)}%，请调整为 100%`;
    render();
    clearToast();
    return;
  }
  const products = [...form.querySelectorAll(".product-entry-row")]
    .map((row) => ({
      id: uid("p"),
      name: row.querySelector(".product-name-input").value.trim(),
      price: parseNum(row.querySelector(".product-price-input").value),
      exposure: parseNum(row.querySelector(".product-exposure-input").value),
      clicks: parseNum(row.querySelector(".product-clicks-input").value),
      gmv: parseNum(row.querySelector(".product-gmv-input").value),
      orders: parseNum(row.querySelector(".product-orders-input").value),
    }))
    .filter((item) => item.name);
  const materials = [...form.querySelectorAll(".material-entry-row")]
    .map((row) => {
      const spend = parseNum(row.querySelector(".material-spend-input").value);
      const gmv = parseNum(row.querySelector(".material-gmv-input").value);
      return {
        id: uid("m"),
        name: row.querySelector(".material-name-input").value.trim(),
        spend,
        impressions: parseNum(row.querySelector(".material-impressions-input").value),
        ctr: parseNum(row.querySelector(".material-ctr-input").value),
        gmv,
        roi: parseNum(row.querySelector(".material-roi-input").value) || (spend ? gmv / spend : 0),
      };
    })
    .filter((item) => item.name);
  const qcSpend = parseNum(data.get("qcSpend"));
  const qcGmv = parseNum(data.get("qcGmv"));
  const record = normalizeRecord({
    id: uid("s"),
    createdAt: new Date().toISOString(),
    basics: {
      date: data.get("date"),
      account: data.get("account"),
      durationMinutes: parseNum(data.get("durationMinutes")),
      viewers: parseNum(data.get("viewers")),
      gmv: parseNum(data.get("gmv")),
      conversionRate: parseNum(data.get("conversionRate")),
      dwellSeconds: parseNum(data.get("dwellSeconds")),
      engagementRate: parseNum(data.get("engagementRate")),
      refundRate: parseNum(data.get("refundRate")),
      sources,
    },
    funnel: {
      enter: parseNum(data.get("funnelEnter")),
      exposure: parseNum(data.get("funnelExposure")),
      click: parseNum(data.get("funnelClick")),
      order: parseNum(data.get("funnelOrder")),
      deal: parseNum(data.get("funnelDeal")),
    },
    products,
    qianchuan: {
      spend: qcSpend,
      impressions: parseNum(data.get("qcImpressions")),
      clicks: parseNum(data.get("qcClicks")),
      gmv: qcGmv,
      roi: parseNum(data.get("qcRoi")) || (qcSpend ? qcGmv / qcSpend : 0),
    },
    materials,
  });
  const records = loadRecords();
  const nextRecords = [record, ...records];
  saveRecords(nextRecords);
  state.selectedSessionId = record.id;
  state.nav = "总览";
  state.toast = "场次已保存，总览已切换到真实录入数据";
  render();
  clearToast();
  syncToCloud(nextRecords, { silent: true });
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some((item) => item.trim())) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  row.push(cell);
  if (row.some((item) => item.trim())) rows.push(row);
  return rows;
}

function rowsToRecords(rows) {
  const [headers, ...body] = rows;
  const index = Object.fromEntries(headers.map((item, idx) => [item.trim(), idx]));
  const get = (row, name) => row[index[name]] ?? "";
  const grouped = new Map();
  body.forEach((row) => {
    const key = `${get(row, "直播日期")}__${get(row, "达人账号")}__${get(row, "直播时长分钟")}`;
    if (!grouped.has(key)) {
      const sources = {
        live: parseNum(get(row, "直播推荐占比")),
        follow: parseNum(get(row, "关注占比")),
        short: parseNum(get(row, "短视频占比")),
        search: parseNum(get(row, "搜索占比")),
        other: parseNum(get(row, "其他占比")),
      };
      grouped.set(key, normalizeRecord({
        id: uid("s"),
        createdAt: new Date().toISOString(),
        basics: {
          date: get(row, "直播日期") || today(),
          account: get(row, "达人账号") || "CSV导入达人",
          durationMinutes: parseNum(get(row, "直播时长分钟")),
          viewers: parseNum(get(row, "观看人数")),
          gmv: parseNum(get(row, "成交金额")),
          conversionRate: parseNum(get(row, "转化率")),
          dwellSeconds: parseNum(get(row, "人均停留秒")),
          engagementRate: parseNum(get(row, "互动率")),
          refundRate: parseNum(get(row, "退单率")),
          sources,
        },
        funnel: {
          enter: parseNum(get(row, "进入直播间人数")),
          exposure: parseNum(get(row, "商品曝光人数")),
          click: parseNum(get(row, "商品点击人数")),
          order: parseNum(get(row, "下单人数")),
          deal: parseNum(get(row, "成交人数")),
        },
        products: [],
        qianchuan: {
          spend: parseNum(get(row, "千川消耗金额")),
          impressions: parseNum(get(row, "千川曝光量")),
          clicks: parseNum(get(row, "千川点击量")),
          gmv: parseNum(get(row, "千川成交金额")),
          roi: parseNum(get(row, "千川ROI")),
        },
        materials: [],
      }));
    }
    const record = grouped.get(key);
    if (get(row, "商品名称")) {
      record.products.push({
        id: uid("p"),
        name: get(row, "商品名称"),
        price: parseNum(get(row, "商品价格")),
        exposure: parseNum(get(row, "商品曝光人数")),
        clicks: parseNum(get(row, "商品点击人数")),
        gmv: parseNum(get(row, "商品成交金额")),
        orders: parseNum(get(row, "商品成交件数")),
      });
    }
    if (get(row, "素材名称")) {
      const spend = parseNum(get(row, "素材消耗"));
      const gmv = parseNum(get(row, "素材成交额"));
      record.materials.push({
        id: uid("m"),
        name: get(row, "素材名称"),
        spend,
        impressions: parseNum(get(row, "素材曝光")),
        ctr: parseNum(get(row, "素材点击率")),
        gmv,
        roi: parseNum(get(row, "素材ROI")) || (spend ? gmv / spend : 0),
      });
    }
  });
  return [...grouped.values()].map(normalizeRecord);
}

function downloadBlob(filename, content, type) {
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

function downloadCsvTemplate() {
  downloadBlob("直播间数据导入模板.csv", `\ufeff${csvHeaders.join(",")}\n`, "text/csv;charset=utf-8");
  state.toast = "CSV 模板已下载";
  render();
  clearToast();
}

function handleCsvUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const rows = parseCsv(String(reader.result || ""));
      const missing = csvHeaders.filter((header) => !rows[0]?.includes(header));
      if (missing.length) throw new Error(`CSV 缺少字段：${missing.join("、")}`);
      state.importPreview = rowsToRecords(rows);
      state.toast = `已解析 ${state.importPreview.length} 条场次，请确认保存`;
      render();
      clearToast();
    } catch (error) {
      state.toast = error.message || "CSV 解析失败，请检查模板字段";
      render();
      clearToast();
    }
  };
  reader.readAsText(file, "utf-8");
}

function confirmImport() {
  if (!state.importPreview.length) return;
  const records = loadRecords();
  const nextRecords = [...state.importPreview, ...records];
  saveRecords(nextRecords);
  state.selectedSessionId = state.importPreview[0].id;
  state.importPreview = [];
  state.nav = "总览";
  state.toast = "CSV 数据已保存，总览已更新";
  render();
  clearToast();
  syncToCloud(nextRecords, { silent: true });
}

function deleteSession(id) {
  if (!window.confirm("确认删除这条场次记录？")) return;
  const records = loadRecords().filter((item) => item.id !== id);
  saveRecords(records);
  if (state.selectedSessionId === id) state.selectedSessionId = records[0]?.id || "";
  state.toast = "场次记录已删除";
  render();
  clearToast();
  syncToCloud(records, { silent: true });
}

function exportReport() {
  const session = getSelectedSession();
  if (!session) {
    state.toast = "请先录入或导入一场直播数据";
    render();
    clearToast();
    return;
  }
  const metrics = getMetrics(session);
  const health = healthScore(session);
  const alertItems = diagnostics(session);
  const productRows = selectedProducts(session)
    .slice(0, 8)
    .map((item) => `<tr><td>${escapeHtml(item.name)}</td><td>${formatMoney(item.gmv)}</td><td>${formatNumber(item.orders)}</td><td>${item.ctr.toFixed(2)}%</td><td>${item.conversion.toFixed(2)}%</td></tr>`)
    .join("");
  const materialRows = session.materials
    .slice()
    .sort((a, b) => b.roi - a.roi)
    .slice(0, 8)
    .map((item) => {
      const diagnosis = materialDiagnosis(item);
      return `<tr><td>${escapeHtml(item.name)}</td><td>${formatMoney(item.spend)}</td><td>${item.ctr.toFixed(2)}%</td><td>${item.roi.toFixed(2)}</td><td>${escapeHtml(diagnosis.tag)}</td><td>${escapeHtml(diagnosis.suggestion)}</td></tr>`;
    })
    .join("");
  const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>直播诊断报告-${escapeHtml(sessionLabel(session))}</title><style>
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;margin:0;background:#f6f8fb;color:#111827}
    main{max-width:980px;margin:0 auto;padding:32px}section{background:#fff;border:1px solid #dce5ea;border-radius:8px;margin:16px 0;padding:20px}
    h1{margin:0 0 8px;font-size:28px}h2{font-size:18px;margin:0 0 12px}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.kpi{background:#f7fafb;border:1px solid #edf2f5;border-radius:8px;padding:14px}.kpi strong{font-size:22px;display:block;margin-top:6px}
    table{width:100%;border-collapse:collapse;font-size:13px}th,td{border-bottom:1px solid #edf2f5;padding:10px;text-align:left}th{color:#667085;background:#f8fafb}.score{font-size:42px;color:#08a79d;font-weight:800}.tag{display:inline-block;padding:4px 8px;border-radius:999px;background:#e7f8f6;color:#087f78;font-weight:700}.alert{margin:8px 0;padding:10px 12px;border-radius:6px;background:#fff8eb}.suggest li{margin:6px 0}
    @media print{body{background:#fff}main{padding:0}section{break-inside:avoid}}
  </style></head><body><main>
    <h1>直播间数据诊断报告</h1><p>${escapeHtml(sessionLabel(session))} · ${session.basics.durationMinutes || 0} 分钟</p>
    <section><h2>当场数据摘要</h2><div class="grid">
      <div class="kpi">观看人数<strong>${formatNumber(metrics.viewers)}</strong></div><div class="kpi">成交金额<strong>${formatMoney(metrics.gmv)}</strong></div>
      <div class="kpi">转化率<strong>${metrics.conversion.toFixed(2)}%</strong></div><div class="kpi">千川 ROI<strong>${session.qianchuan.roi.toFixed(2)}</strong></div>
    </div></section>
    <section><h2>健康评分</h2><div class="score">${health.score}/100 <span class="tag">${health.level}</span></div><ul class="suggest">${health.suggestions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
    <section><h2>异常提醒</h2>${alertItems.map((item) => `<div class="alert"><strong>${escapeHtml(item.title)}</strong><br>${escapeHtml(item.text)}</div>`).join("")}</section>
    <section><h2>商品表现</h2><table><thead><tr><th>商品</th><th>成交额</th><th>成交件数</th><th>点击率</th><th>成交转化率</th></tr></thead><tbody>${productRows}</tbody></table></section>
    <section><h2>千川素材建议</h2><table><thead><tr><th>素材</th><th>消耗</th><th>点击率</th><th>ROI</th><th>诊断</th><th>优化建议</th></tr></thead><tbody>${materialRows}</tbody></table></section>
  </main></body></html>`;
  downloadBlob(`直播诊断报告-${session.basics.date}-${session.basics.account}.html`, html, "text/html;charset=utf-8");
  state.toast = "HTML 诊断报告已导出";
  render();
  clearToast();
}

function clearToast() {
  window.clearTimeout(window.__toastTimer);
  window.__toastTimer = window.setTimeout(() => {
    state.toast = "";
    render();
  }, 2400);
}

window.livestreamAnalytics = {
  parseCsv,
  rowsToRecords,
  healthScore,
};

function initApp() {
  if (hasSyncConfig()) setSyncState("idle", "同步配置已加载");
  render();
  if (hasSyncConfig()) syncFromCloud({ silent: true });
}

initApp();
