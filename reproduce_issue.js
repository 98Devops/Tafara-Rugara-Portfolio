const { spawn } = require('child_process');
const http = require('http');

const PORT = 3002;
// Use npm.cmd for Windows, npm for others. 
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

console.log(`Starting dev server on port ${PORT}...`);

const server = spawn(npmCmd, ['run', 'dev', '--', '-p', String(PORT)], {
  cwd: process.cwd(),
  shell: true,
  env: { ...process.env, NODE_ENV: 'development' }
});

let serverOutput = '';

server.stdout.on('data', (data) => {
  const str = data.toString();
  serverOutput += str;
  // console.log('[Server]:', str); // Uncomment to see full log
  if (str.includes('Ready') || str.includes('started server') || str.includes('Listening on')) {
    console.log('Server appears ready.');
    setTimeout(checkPage, 2000); // Wait a bit more to be sure
  }
});

server.stderr.on('data', (data) => {
  const str = data.toString();
  console.error('[Server Error Log]:', str);
});

function checkPage() {
  console.log('Fetching /what-i-do...');
  const req = http.get(`http://localhost:${PORT}/what-i-do`, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log('Body snippet:', body.substring(0, 500));
      cleanup();
    });
  });
  
  req.on('error', (e) => {
    console.error('Request failed:', e);
    cleanup();
  });
}

function cleanup() {
  console.log('Killing server...');
  server.kill();
  process.exit(0);
}

// Timeout safety
setTimeout(() => {
  console.log('Timeout reached. Checking page if not already checked...');
  checkPage();
}, 20000);
