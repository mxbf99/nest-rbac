/*
 Navicat Premium Data Transfer

 Source Server         : dockermysql
 Source Server Type    : MySQL
 Source Server Version : 50739 (5.7.39)
 Source Host           : localhost:3307
 Source Schema         : dev_test

 Target Server Type    : MySQL
 Target Server Version : 50739 (5.7.39)
 File Encoding         : 65001

 Date: 09/03/2023 22:10:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单名称',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '前端路由',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '前端组件',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `permission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '权限标识',
  `redirect` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '重定向',
  `type` int(11) NOT NULL COMMENT '0:目录 1:菜单 2:按钮 ',
  `link` int(11) NOT NULL DEFAULT 0 COMMENT '是否外链接 0:否 1:是',
  `hidden` int(11) NOT NULL DEFAULT 0 COMMENT '是否隐藏 0:否 1:是',
  `cache` int(11) NOT NULL DEFAULT 0 COMMENT '是否缓存 0:否 1:是',
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '菜单状态 0:禁用 1:启用',
  `sort` int(11) NOT NULL DEFAULT 0 COMMENT '排序',
  `parent_id` int(11) NULL DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  `created_by` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_05ff5072bc89581912fe1d01143`(`created_by`) USING BTREE,
  CONSTRAINT `FK_05ff5072bc89581912fe1d01143` FOREIGN KEY (`created_by`) REFERENCES `sys_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, '首页', 'dashboard', 'dashboard/dashboard', 'HomeFilled', NULL, NULL, 2, 0, 0, 1, 1, 0, NULL, '2023-03-09 10:57:27.914023', '2023-03-09 12:34:53.000000', NULL, NULL);
INSERT INTO `sys_menu` VALUES (2, '系统设置', 'system', NULL, 'Setting', NULL, '/system/user', 1, 0, 0, 0, 1, 0, NULL, '2023-03-09 12:10:59.316247', '2023-03-09 12:11:05.749324', NULL, NULL);
INSERT INTO `sys_menu` VALUES (3, '用户管理', 'user', 'system/user/user', '', 'system:user:list', NULL, 2, 0, 0, 1, 1, 0, 2, '2023-03-09 12:18:25.701953', '2023-03-09 13:22:55.419658', NULL, NULL);
INSERT INTO `sys_menu` VALUES (4, '角色管理', 'role', 'system/role/role', '', 'system:role:list', NULL, 2, 0, 0, 1, 1, 0, 2, '2023-03-09 12:19:10.488786', '2023-03-09 13:23:03.245724', NULL, NULL);
INSERT INTO `sys_menu` VALUES (5, '菜单管理', 'menu', 'system/menu/menu', '', 'system:menu:list', NULL, 2, 0, 0, 1, 1, 0, 2, '2023-03-09 12:20:17.467183', '2023-03-09 13:22:52.789872', NULL, NULL);
INSERT INTO `sys_menu` VALUES (6, '新增用户', NULL, NULL, '', 'system:user:create', NULL, 3, 0, 0, 1, 1, 0, 3, '2023-03-09 12:37:07.424815', '2023-03-09 13:24:41.928857', NULL, NULL);
INSERT INTO `sys_menu` VALUES (7, '删除用户', NULL, NULL, '', 'system:user:delete', NULL, 3, 0, 0, 1, 1, 1, 3, '2023-03-09 12:39:51.995437', '2023-03-09 13:24:43.952400', NULL, NULL);
INSERT INTO `sys_menu` VALUES (8, '修改用户', NULL, NULL, '', 'system:user:update', NULL, 3, 0, 0, 1, 1, 0, 3, '2023-03-09 12:41:21.678993', '2023-03-09 13:24:45.312495', NULL, NULL);
INSERT INTO `sys_menu` VALUES (9, '新增角色', NULL, NULL, '', 'system:role:create', NULL, 3, 0, 0, 1, 1, 0, 4, '2023-03-09 12:42:49.599715', '2023-03-09 13:26:56.630102', NULL, NULL);
INSERT INTO `sys_menu` VALUES (10, '删除角色', NULL, NULL, '', 'system:role:delete', NULL, 3, 0, 0, 1, 1, 1, 4, '2023-03-09 12:43:05.411481', '2023-03-09 13:26:58.221570', NULL, NULL);
INSERT INTO `sys_menu` VALUES (11, '修改角色', NULL, NULL, '', 'system:role:update', NULL, 3, 0, 0, 1, 1, 1, 4, '2023-03-09 12:43:15.311604', '2023-03-09 13:26:59.751089', NULL, NULL);
INSERT INTO `sys_menu` VALUES (12, '新增菜单', NULL, NULL, '', 'system:menu:create', NULL, 3, 0, 0, 1, 1, 0, 5, '2023-03-09 12:43:36.691335', '2023-03-09 13:27:01.559791', NULL, NULL);
INSERT INTO `sys_menu` VALUES (13, '删除菜单', NULL, NULL, '', 'system:menu:delete', NULL, 3, 0, 0, 1, 1, 0, 5, '2023-03-09 12:43:50.650368', '2023-03-09 13:27:03.154131', NULL, NULL);
INSERT INTO `sys_menu` VALUES (14, '修改菜单', NULL, NULL, '', 'system:menu:update', NULL, 3, 0, 0, 1, 1, 0, 5, '2023-03-09 12:44:01.367870', '2023-03-09 13:27:04.231698', NULL, NULL);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名称',
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色标识',
  `sort` int(11) NOT NULL DEFAULT 0 COMMENT '排序',
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '角色状态 0:禁用 1:启用',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_223de54d6badbe43a5490450c3`(`name`) USING BTREE,
  UNIQUE INDEX `IDX_0ab798990feb5e0755b68a8dfe`(`tag`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '普通用户', 'common', 0, 1, '这是普通角色', '2023-03-09 10:58:38.851169', '2023-03-09 10:58:38.851169', NULL);
INSERT INTO `sys_role` VALUES (2, '超级管理员', 'superadmin', 1, 1, '最高权限', '2023-03-09 10:59:10.436413', '2023-03-09 10:59:10.436413', NULL);

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `role_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE,
  INDEX `IDX_b65fa84413c357d7282153b4a8`(`role_id`) USING BTREE,
  INDEX `IDX_543ffcaa38d767909d9022f252`(`menu_id`) USING BTREE,
  CONSTRAINT `FK_543ffcaa38d767909d9022f2522` FOREIGN KEY (`menu_id`) REFERENCES `sys_menu` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_b65fa84413c357d7282153b4a88` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (2, 1);
INSERT INTO `sys_role_menu` VALUES (2, 2);
INSERT INTO `sys_role_menu` VALUES (2, 3);
INSERT INTO `sys_role_menu` VALUES (2, 4);
INSERT INTO `sys_role_menu` VALUES (2, 5);
INSERT INTO `sys_role_menu` VALUES (2, 6);
INSERT INTO `sys_role_menu` VALUES (2, 7);
INSERT INTO `sys_role_menu` VALUES (2, 8);
INSERT INTO `sys_role_menu` VALUES (2, 9);
INSERT INTO `sys_role_menu` VALUES (2, 10);
INSERT INTO `sys_role_menu` VALUES (2, 11);
INSERT INTO `sys_role_menu` VALUES (2, 12);
INSERT INTO `sys_role_menu` VALUES (2, 13);
INSERT INTO `sys_role_menu` VALUES (2, 14);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `salt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_9e7164b2f1ea1348bc0eb0a7da`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 'admin', '7bygrJJuMqtjLKo1pzZnc4fEF4aA/QB1zTzHo6+xtMI=', '5QuQqbxq948yQi0S3mJsAg==', '18888888888', 'rbac@rbac.com', 1, '2023-03-09 11:01:40.235297', '2023-03-09 14:05:35.980725', NULL);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE,
  INDEX `IDX_71b4edf9aedbd3e5707156e80a`(`user_id`) USING BTREE,
  INDEX `IDX_e8300bfcf561ed417f5f02c677`(`role_id`) USING BTREE,
  CONSTRAINT `FK_71b4edf9aedbd3e5707156e80a2` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_e8300bfcf561ed417f5f02c6776` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (1, 2);

SET FOREIGN_KEY_CHECKS = 1;
