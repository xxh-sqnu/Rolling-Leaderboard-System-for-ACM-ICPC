// ACM-ICPC 滚榜系统配置文件

module.exports = {
  // 服务器配置
  port: process.env.PORT || 3000,

  // 数据存储路径
  dataDir: process.env.DATA_DIR || './data',

  // 管理员密码 (production时应修改)
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',

  // 默认比赛配置
  defaultContest: {
    title: 'ACM-ICPC 2026 区域赛',
    status: 'pending',           // pending | running | frozen | ended | ceremony | finished
    startTime: null,
    endTime: null,
    freezeTime: null,
    duration: 300,              // 比赛总时长（分钟），默认5小时
    freezeDuration: 60,         // 封榜时长（分钟），默认1小时
    penaltyMinutes: 20,        // 每次错误提交罚时（分钟）
    currentTime: null
  },

  // 提交状态枚举
  submissionStatuses: ['AC', 'WA', 'TLE', 'RE', 'MLE', 'PE', 'CE', 'OLE', 'SE'],

  // 视为"错误但计入罚时"的状态（CE不计入罚时）
  penaltyStatuses: ['WA', 'TLE', 'RE', 'MLE', 'PE', 'OLE', 'SE'],

  // 滚榜速度配置 (毫秒)
  ceremonyTimings: {
    1: { highlight: 500, drama: 2000, reveal: 1000, gap: 1500 },    // 1x: ~5s/step
    2: { highlight: 300, drama: 1000, reveal: 500, gap: 800 },      // 2x: ~2.6s/step
    3: { highlight: 200, drama: 500,  reveal: 300, gap: 500 },      // 3x: ~1.5s/step
    5: { highlight: 100, drama: 300,  reveal: 200, gap: 300 }       // 5x: ~0.9s/step
  },

  // WebSocket广播节流 (ms)
  broadcastThrottle: 200
};
