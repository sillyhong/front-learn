'use strict'

var _require = require('@vuepress/shared-utils')
var fs = _require.fs
var path = _require.path

module.exports = function (ctx) {
  return {
    dest: '../../vuepress',
    locales: {
      '/': {
        lang: 'en-US',
        title: '前端进阶',
        description: 'Vue-powered Static Site Generator'
      },
      '/zh/': {
        lang: 'zh-CN',
        title: 'VuePress',
        description: '前端进阶'
      }
    },
    head: [['link', {
      rel: 'icon',
      href: '/logo.png'
    }], ['link', {
      rel: 'manifest',
      href: '/manifest.json'
    }], ['meta', {
      name: 'theme-color',
      content: '#3eaf7c'
    }], ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }], ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }], ['link', {
      rel: 'apple-touch-icon',
      href: '/icons/apple-touch-icon-152x152.png'
    }], ['link', {
      rel: 'mask-icon',
      href: '/icons/safari-pinned-tab.svg',
      color: '#3eaf7c'
    }], ['meta', {
      name: 'msapplication-TileImage',
      content: '/icons/msapplication-icon-144x144.png'
    }], ['meta', {
      name: 'msapplication-TileColor',
      content: '#000000'
    }]],
    markdown: {
      markdown: {
        extractHeaders: ['h2', 'h3', 'h4']
      } // lineNumbers: true,
      // toc: {
      //   includeLevel: [1, 2, 3, 4],
      // },

    },
    theme: '@vuepress/theme-default',
    themeConfig: {
      repo: 'vuejs/vuepress',
      editLinks: true,
      docsDir: 'packages/docs/docs',
      // #697 Provided by the official algolia team.
      algolia: ctx.isProd ? {
        apiKey: '3a539aab83105f01761a137c61004d85',
        indexName: 'vuepress',
        algoliaOptions: {
          facetFilters: ['tags:v1']
        }
      } : null,
      smoothScroll: true,
      // displayAllHeaders: true, // 默认值：false
      locales: {
        '/': {
          label: 'English',
          selectText: 'Languages',
          ariaLabel: 'Select language',
          editLinkText: 'Edit this page on GitHub',
          lastUpdated: 'Last Updated',
          nav: require('./nav/en'),
          sidebar: {
            '/api/': getApiSidebar(),
            '/guide/': getGuideSidebar('Guide', 'Advanced'),
            '/plugin/': getPluginSidebar('Plugin', 'Introduction', 'Official Plugins'),
            '/theme/': getThemeSidebar('Theme', 'Introduction')
          }
        },
        '/zh/': {
          label: '简体中文',
          selectText: '选择语言',
          ariaLabel: '选择语言',
          editLinkText: '在 GitHub 上编辑此页',
          lastUpdated: '上次更新',
          nav: require('./nav/zh'),
          sidebar: {
            '/zh/frontend/': getFrontendSidebar('前端'),
            '/zh/computer/': getComputerSidebar('计算机通识'),
            '/zh/miniprogram/': getMiniProgramSidebar('小程序'),
            '/zh/api/': getApiSidebar(),
            '/zh/guide/': getGuideSidebar('指南', '深入'),
            '/zh/plugin/': getPluginSidebar('插件', '介绍', '官方插件'),
            '/zh/theme/': getThemeSidebar('主题', '介绍')
          }
        }
      }
    },
    plugins: [['@vuepress/back-to-top', true], ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }], ['@vuepress/medium-zoom', true], ['@vuepress/google-analytics', {
      ga: 'UA-128189152-1'
    }], ['container', {
      type: 'vue',
      before: '<pre class="vue-container"><code>',
      after: '</code></pre>'
    }], ['container', {
      type: 'upgrade',
      before: function before (info) {
        return '<UpgradePath title="'.concat(info, '">')
      },
      after: '</UpgradePath>'
    }], ['flowchart']],
    extraWatchFiles: ['.vuepress/nav/en.js', '.vuepress/nav/zh.js']
  }
}

function getApiSidebar () {
  return ['cli', 'node']
}

function getGuideSidebar (groupA, groupB) {
  return [{
    title: groupA,
    collapsable: false,
    children: [// '',
      // 'getting-started',
      // 'directory-structure',
      // 'basic-config',
      // 'assets',
      // 'markdown',
      // 'using-vue',
      // 'i18n',
      // 'deploy'
    ]
  }, {
    title: groupB,
    collapsable: false,
    children: ['frontmatter', 'permalinks', 'markdown-slot', 'global-computed']
  }]
}

function getFrontendSidebar (groupA, groupB) {
  return [{
    title: groupA,
    collapsable: false,
    sidebarDepth: 4,
    children: [{
      collapsable: false,
      sidebarDepth: 4,
      children: [['', 'JS'], 'Browser/browser-ch.md', 'Performance/performance-ch.md', 'Safety/safety-cn.md', 'Framework/framework-zh.md', 'Framework/vue-zh.md', 'Framework/react-zh.md']
    }]
  }]
}

function getComputerSidebar (groupA, groupB) {
  return [{
    title: groupA,
    collapsable: false,
    sidebarDepth: 4,
    children: [{
      collapsable: false,
      sidebarDepth: 4,
      children: ['Network/Network-zh.md', 'DataStruct/dataStruct-zh.md', 'Algorithm/algorithm-ch.md', 'Git/git-zh.md']
    }]
  }]
}

function getMiniProgramSidebar (groupA, groupB) {
  return [{
    title: groupA,
    collapsable: false,
    sidebarDepth: 4,
    children: [{
      collapsable: false,
      sidebarDepth: 4,
      children: ['miniprogram/miniApp-ch.md', 'miniprogram/miniApp-ch.md']
    }]
  }]
}

var officalPlugins = fs.readdirSync(path.resolve(__dirname, '../plugin/official')).map(function (filename) {
  return 'official/' + filename.slice(0, -3)
}).sort()

function getPluginSidebar (pluginTitle, pluginIntro, officialPluginTitle) {
  return [{
    title: pluginTitle,
    collapsable: false,
    children: [['', pluginIntro], // 加载REAMME.md 侧边栏加载md 路径
      'using-a-plugin', 'writing-a-plugin', 'life-cycle', 'option-api', 'context-api']
  }, {
    title: officialPluginTitle,
    collapsable: false,
    children: officalPlugins
  }]
}

function getThemeSidebar (groupA, introductionA) {
  return [{
    title: groupA,
    collapsable: false,
    sidebarDepth: 4,
    children: [['', 'introductionA'], 'using-a-theme', 'writing-a-theme', 'option-api', 'default-theme-config', 'blog-theme', 'inheritance']
  }]
}
