define({ "api": [
  {
    "type": "post",
    "url": "article",
    "title": "创建单条文章",
    "name": "create",
    "group": "article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "req",
            "description": "<p>请求对象</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "res",
            "description": "<p>返回对象</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "next",
            "description": "<p>next中间件</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "topic",
            "description": "<p>创建成功的文章信息对象</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n id:0,\n title:'title'\n content:'content'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/myBlog/article.js",
    "groupTitle": "文章Api"
  },
  {
    "type": "delete",
    "url": "article/:id",
    "title": "删除单条文章",
    "name": "destroy",
    "group": "article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>文章id</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "req",
            "description": "<p>请求对象</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "res",
            "description": "<p>返回对象</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "next",
            "description": "<p>next中间件</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "result.affectedRows",
            "description": "<p>删除成功条数(一般为1)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n1",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/myBlog/article.js",
    "groupTitle": "文章Api"
  },
  {
    "type": "get",
    "url": "article",
    "title": "获取文章列表",
    "name": "list",
    "group": "article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "req",
            "description": "<p>请求对象</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "res",
            "description": "<p>返回对象</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "next",
            "description": "<p>next中间件</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "articles",
            "description": "<p>文章信息数组</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "articlesCount",
            "description": "<p>文章数量</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n articles:[],\n articlesCount:0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/myBlog/article.js",
    "groupTitle": "文章Api"
  },
  {
    "type": "get",
    "url": "article/:id",
    "title": "获取单条文章",
    "name": "one",
    "group": "article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>文章id</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "req",
            "description": "<p>请求对象</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "res",
            "description": "<p>返回对象</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "next",
            "description": "<p>next中间件</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "currentBaseInfo",
            "description": "<p>文章信息对象</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n id:0,\n title:'title'\n content:'content'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/myBlog/article.js",
    "groupTitle": "文章Api"
  },
  {
    "type": "patch",
    "url": "article/:id",
    "title": "更新单条文章",
    "name": "update",
    "group": "article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>文章id</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "req",
            "description": "<p>请求对象</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "res",
            "description": "<p>返回对象</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "next",
            "description": "<p>next中间件</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "result.affectedRows",
            "description": "<p>更新成功条数(一般为1)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n1",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/myBlog/article.js",
    "groupTitle": "文章Api"
  }
] });
