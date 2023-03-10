<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">NestAdmin v0.0.1</h1>
<h4 align="center">一套基于 NestJs 和 Vue3 的简单 RBAC 访问控制实现</h4>

## 平台简介

若依是一套全部开源的快速开发平台，毫无保留给个人及企业免费使用。

- 前端采用 [Vue3](https://v3.cn.vuejs.org) [Element Plus](https://element-plus.org/zh-CN) [Vite](https://cn.vitejs.dev)。
- 后端采用 [NestJs](https://nestjs.com)、[Typeorm](https://typeorm.io/Typeorm)、Redis & Jwt。
- 权限认证使用 Jwt，支持多终端认证系统。
- Token 自动延期。
- 支持加载动态权限菜单，多方式轻松权限控制。
- 访问控制细粒度到按钮
- 前后端项目均采用 TypeScript

## 内置功能

1.  用户管理：用户是系统操作者，该功能主要完成系统用户配置。
2.  菜单管理：配置系统菜单，操作权限，按钮权限标识等。
3.  角色管理：角色菜单权限分配。

- 其他功能正在开发，目前只做了一个简单的 RBAC

## 在线体验

- admin/123456
  演示地址：http://nestadmin.ooyie.com
