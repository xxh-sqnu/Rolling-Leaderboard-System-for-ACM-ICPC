// ACM-ICPC 滚榜系统 - 主服务器入口

const express = require('express');
const http = require('http');
const path = require('path');
const config = require('./config');
const { initStore } = require('./src/services/Store');
const { initWebSocket } = require('./src/websocket');

const app = express();
const server = http.createServer(app);

// 中间件
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 静态文件
app.use(express.static(path.join(__dirname, 'public')));

// API路由
app.use('/api/admin', require('./src/routes/admin'));
app.use('/api', require('./src/routes/public'));
app.use('/api/ceremony', require('./src/routes/ceremony'));

// 各个页面路由
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});
app.get('/scoreboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'scoreboard.html'));
});
app.get('/ceremony', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ceremony.html'));
});

// 首页
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404回退
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 初始化
async function start() {
  try {
    // 初始化数据存储
    await initStore();
    console.log('[Store] 数据存储初始化完成');

    // 初始化WebSocket
    initWebSocket(server);
    console.log('[WebSocket] WebSocket服务初始化完成');

    // 启动服务器
    server.listen(config.port, () => {
      console.log('═══════════════════════════════════════════════');
      console.log('  ACM-ICPC 滚榜系统已启动');
      console.log(`  本地访问: http://localhost:${config.port}`);
      console.log(`  管理面板: http://localhost:${config.port}/admin`);
      console.log(`  实时榜单: http://localhost:${config.port}/scoreboard`);
      console.log(`  滚榜仪式: http://localhost:${config.port}/ceremony`);
      console.log('═══════════════════════════════════════════════');
    });

  } catch (err) {
    console.error('[Fatal] 系统启动失败:', err);
    process.exit(1);
  }
}

start();
