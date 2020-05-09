# [NodeNginx](#)
Configure nginx as a web server for node js application.

## Requirements
[nodejs](https://nodejs.org/en/download/)
[npm](https://www.npmjs.com/get-npm)
[nginx](http://nginx.org/en/docs/windows.html)
<br>

## Steps to run on your local machine
<li>Clone the repo
<li>npm i
<li>start nginx
<li>head to <a href="http://localhost:80">localhost</a> and check if your nginx is up and running
<li> Add these contents to the nginx conf file (change the port number, server name in accordance)
```
upstream my_http_servers {
    least_conn;
    server 127.0.0.1:3001;      # httpServer1 listens to port 3001
    server 127.0.0.1:3002;      # httpServer2 listens to port 3002
    server 127.0.0.1:3003;      # httpServer2 listens to port 3003
    server 127.0.0.1:3004;      # httpServer2 listens to port 3004
}

server {
    listen       81;
    server_name  localhost;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass   http://my_http_servers;

        proxy_redirect off;
    }
}
```
Run your node application in different ports
`pm2 start app.js --node-args="app.js 3001" --name firstInstance`
`pm2 start app.js --node-args="app.js 3002" --name secondInstance`
`pm2 start app.js --node-args="app.js 3003" --name thirdInstance`
`pm2 start app.js --node-args="app.js 3004" --name fourthInstance`
<br>
<li>Reload your nginx (nginx -s reload)
<li>Go to browser and navigate to <a href="http://localhost:81">localhost:81</a> to see which port the application runs on
<li>Keep reloading the browser to confirm whether it runs on multiple ports
<li>You can also check the application logs by running pm2 logs.

##Screenshots

<p align="center">
Dashboard
    <img src="screenshots/dashboard.png?raw=true" alt="dashboard">
    <br>
    <br>
    pm2 monitor
    <img src="screenshots/monitor.png?raw=true" alt="monitor">
    <br>
    <br>
    pm2 logs
    <br>
    <br>
    <img src="screenshots/logs.png?raw=true" alt="logs">
    <br>
    <br>
    pm2 list
    <img src="screenshots/list.png?raw=true" alt="list">
</p>