let token = '';

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        token = data.token;
        document.getElementById('login').style.display = 'none';
        document.getElementById('query-interface').style.display = 'block';
    } else {
        alert('Login failed: ' + response.statusText);
    }
}

async function queryLogs() {
    const level = document.getElementById('level').value;
    const logString = document.getElementById('log_string').value;
    const startTimestamp = document.getElementById('start_timestamp').value;
    const endTimestamp = document.getElementById('end_timestamp').value;
    const source = document.getElementById('source').value;

    const queryParams = new URLSearchParams({
        level,
        log_string: logString,
        start_timestamp: startTimestamp,
        end_timestamp: endTimestamp,
        source
    });

    const response = await fetch(`/query?${queryParams.toString()}`, {
        headers: {
            'Authorization': token
        }
    });
    const results = await response.json();
    document.getElementById('results').textContent = JSON.stringify(results, null, 2);
}

const socket = io();
socket.on('new_log', (log) => {
    console.log('New log received:', log);
    // Optionally update the UI in real-time with new log data
});
