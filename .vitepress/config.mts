/*
 * @Author: Alex
 * @LastEditors: parselife@gmail.com
 * @Date: 2024-11-20
 * @Description:
 */
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "Vintage Java",
  // 这里的 :title 将替换为从页面的第一个 <h1> 标题推断出的文本 eg: Hello - Vintage Java
  titleTemplate: ":title - Vintage Java",
  description: "Vintage Java Library",
  // 站点将部署到的 base URL
  base: "/",
  srcDir: "./src",
  outDir: "./dist",
  lastUpdated: true,
  markdown: {
    image: {
      // 图片懒加载
      lazyLoading: true,
    },
  },
  themeConfig: {
    search: {
      provider: "local",
    },
    logo: "/logo-nav.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "指南", link: "/guide/quickstart", activeMatch: "/guide/" },
      {
        text: "配置",
        link: "/config",
        activeMatch: "/config/",
      },
      {
        text: "API",
        link: "/apidoc",
        activeMatch: "/apidoc/",
      },
      {
        text: "Adminpress",
        link: "/aps",
        activeMatch: "/aps/",
      },
      {
        text: "文章",
        link: "/posts",
        activeMatch: "/posts/",
      },
      {
        text: "生态",
        items: [
          { text: "前端资源", link: "https://sixcrabs.github.io/vfe/" }
        ],
      },
      // {
      //   text: "其他资源",
      //   items: [
      //     { text: "前端组件库", link: "/item-1" },
      //     { text: "Varok使用说明", link: "/item-2" },
      //     { text: "Item C", link: "/item-3" },
      //   ],
      // },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "简介",
          collapsed: false,
          items: [
            { text: "快速开始", link: "/guide/quickstart" },
            { text: "环境要求", link: "/guide/pre-require" },
            { text: "版本说明", link: "/guide/version" },
          ],
        },
        {
          text: "应用 Starter",
          collapsed: false,
          items: [
            { text: "web starter", link: "/guide/starter/app" },
            { text: "undertow", link: "/guide/starter/undertow" },
            { text: "适配东方通", link: "/guide/starter/tongweb" },
            // { text: "微服务应用", link: "/guide/starter/cloud" },
            { text: "其他框架", link: "/guide/starter/next" },
          ],
        },
        {
          text: "数据库 ORM",
          collapsed: false,
          items: [
            { text: "介绍", link: "/guide/sorm/intro" },
            { text: "实体对象", link: "/guide/sorm/entity" },
            { text: "多数据源", link: "/guide/sorm/multi" },
            { text: "空间数据支持", link: "/guide/sorm/postgis" },
          ],
        },
        {
          text: "远程调用",
          collapsed: false,
          items: [
            { text: "介绍", link: "/guide/remote/intro" },
            { text: "RPC", link: "/guide/remote/srpc" },
            { text: "Restful Client", link: "/guide/remote/mrc" },
          ],
        },
        {
          text: "权限控制",
          collapsed: false,
          items: [
            { text: "介绍", link: "/guide/slardar/intro" },
            { text: "扩展", link: "/guide/slardar/spi" },
            { text: "SSO", link: "/guide/slardar/sso" },     
            { text: "防火墙", link: "/guide/slardar/firewall" }, 
            { text: "授权许可", link: "/guide/slardar/license" }
          ],
        },
        {
          text: "其他组件",
          collapsed: false,
          items: [
            { text: "定时器", link: "/guide/misc/timer" },
            { text: "事件管理", link: "/guide/misc/event" },
            { text: "key store", link: "/guide/misc/keystore" }
          ],
        },
      ],
      "/config/": [
        {
          text: "配置参考",
          link: "/config/index",
        },
        {
          text: "Starter",
          collapsed: false,
          items: [
            { text: "app-spring-boot-starter", link: "/config/starter/app" },
            { text: "app-vertx-starter", link: "/config/starter/vertx" },
            { text: "app-javalin-starter", link: "/config/starter/javalin" },
          ],
        },
        {
          text: "Sorm",
          collapsed: false,
          items: [
            { text: "DataSources", link: "/config/sorm/ds" },
            { text: "Settings", link: "/config/sorm/setting" }
          ],
        },
        {
          text: "Slardar",
          collapsed: false,
          items: [
            { text: "Login", link: "/config/slardar/login" },
            { text: "Token", link: "/config/slardar/token" },
            { text: "MFA", link: "/config/slardar/mfa" },
            { text: "Sso", link: "/config/slardar/sso" },
            { text: "Other", link: "/config/slardar/other" },
          ],
        },
        {
          text: "其他",
          collapsed: false,
          items: [
            { text: "Mrc", link: "/config/other/mrc" },
            { text: "Srpc", link: "/config/other/srpc" }
          ],
        }
      ],
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/sixcrabs",
        ariaLabel: "github profile url",
      },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present Alex",
    },
    editLink: {
      pattern:
        "https://github.com/sixcrabs/vjpress/edit/main/src/:path",
      text: "帮助完善此文档",
    },
  },
});
