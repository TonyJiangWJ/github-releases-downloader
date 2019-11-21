let loadingDialog = null
try {
  importClass(com.tony.DownloaderListener)
} catch (e) {
  toastLog('未载入dex, 请稍等')
  loadingDialog = dialogs.build({
    title: '正在加载dex',
    content: '请稍等...'
  }).show()
  runtime.loadDex('./glb.dex')
  loadingDialog.setContent('加载完成！')
  sleep(1000)
  loadingDialog.dismiss()
  engines.execScriptFile(engines.myEngine().getSource())
  exit()
}

importClass(com.tony.Downloader)
importClass(com.tony.DownloaderListener)

let apiUrl = 'https://api.github.com/repos/TonyJiangWJ/Ant-Forest-autoscript/releases/latest'
// let apiUrl = 'https://api.github.com/repos/SuperMonster003/Auto.js_Projects/releases/latest'
let targetOutputDir = files.cwd()
let downloader = new Downloader()
log('下载并解压文件到目录：' + targetOutputDir)
downloader.setTargetReleasesApiUrl(apiUrl)
downloader.setOutputDir(targetOutputDir)
downloader.setUnzipSkipFiles(['.gitignore'])
downloader.setBackupIgnoreFiles(['glb.dex', 'updateInCurrentPathGui-Dex.js'])

loadingDialog = dialogs.build({
  title: '正在请求网络',
  content: '加载中，请稍等...'
}).show()
let summary = downloader.getUpdateSummary()
if (summary === null) {
  loadingDialog.setContent('无法获取release版本信息')
  sleep(1000)
  loadingDialog.dismiss()
  exit()
}
summary = JSON.parse(summary)
let localVersion = downloader.getLocalVersion()
let content = '线上版本：' + summary.tagName + '\n'
content += '本地版本：' + (localVersion === null ? '无法获取本地版本信息' : localVersion) + '\n'
content += '更新内容：\n' + summary.body

loadingDialog.dismiss()


let downloadDialog = dialogs.build({
  title: '更新中...',
  content: '更新中',
  autoDismiss: false
})
downloader.setListener(new DownloaderListener({
  updateGui: function (string) {
    log(string)
    downloadDialog.setContent(string)
  }
}))
let downloadingExecutor = function (backup) {
  if (backup) {
    downloader.backup()
    sleep(1000)
  }
  downloader.downloadZip()
  downloadDialog.setContent('更新完成')
  sleep(2000)
  downloadDialog.dismiss()
}
dialogs.build({
  title: '是否下载更新',
  content: content,

  neutral: '备份后更新',
  negative: '取消',
  positive: '覆盖更新',

  negativeColor: 'red',
  positiveColor: '#f9a01c',
})
  .on('negative', () => {
    exit()
  })
  .on('neutral', () => {
    downloadDialog.show()
    threads.start(function () { downloadingExecutor(true) })
  })
  .on('positive', () => {
    downloadDialog.show()
    threads.start(function () { downloadingExecutor(false) })
  })
  .show()
