local Pipe() = {
  local NAME = "sync-alicdn-cert",
  local APP_PATH = "/data/docker/" + NAME,
  "kind": "pipeline",
  "type": "docker",
  "name": "deploy"+NAME,
  "trigger": { "branch": ["main"] },
  "steps": [
    {
      "name": "restore-cache",
      "image": "drillster/drone-volume-cache",
      "settings": {
        "restore": true,
        "mount": [
          "./node_modules"
        ]
      },
      "volumes": [
        {
          "name": "cache",
          "path": "/cache"
        }
      ]
    },
    {
      "name": "build & copy",
      "image": "node:18.16.0-alpine",
      "volumes": [
        {
          "name": "app_path",
          "path": APP_PATH
        }
      ],
      "commands": [
        "yarn",
        "yarn build",
        "mkdir -p "+APP_PATH+"/source", # 创建源码目录
        "rm -rf "+APP_PATH+"/source/*", # 删除以前的源码
        // "cp -rf docker-compose.yml "+APP_PATH+"/docker-compose.yml",
        "cp -rf Dockerfile node_modules dist "+APP_PATH+"/source"
      ]
    },
    {
      "name": "rebuild-cache",
      "image": "drillster/drone-volume-cache",
      "settings": {
        "rebuild": true,
        "mount": [
          "./node_modules"
        ]
      },
      "volumes": [
        {
          "name": "cache",
          "path": "/cache"
        }
      ]
    },
    {
      "name": "docker build && up",
      "image": "appleboy/drone-ssh",
      "settings": {
        "host": "2024.bstu.cn",
        "username": "root",
        "key": {
          "from_secret": "drone_id_rsa"
        },
        "port": 22,
        "command_timeout": "10m",
        "script_stop": false,
        "script": [
          "cd "+APP_PATH+"/source",
          "docker build -t "+NAME+" .",
          "cd ..",
          "docker compose up -d"
        ]
      }
    },
    {
      "name": "notify",
      "pull": "if-not-exists",
      "image": "guoxudongdocker/drone-dingtalk:latest",
      "settings": {
        "token": {
          "from_secret": "dingtalk_token"
        },
        "type": "markdown",
        "message_color": true,
        "message_pic": true,
        "sha_link": true
      },
      "when": {
        "status": [
          "failure",
          "success"
        ]
      }
    }
  ],
  "volumes": [
    {
      "name": "app_path",
      "host": {
        "path": APP_PATH
      }
    },
    {
      "name": "cache",
      "host": {
        "path": "/tmp/cache"
      }
    }
  ]
};

[
  Pipe()
]