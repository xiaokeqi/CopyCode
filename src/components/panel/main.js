
const vscode = acquireVsCodeApi()

window.addEventListener('message', event => {
  const message = event.data
  switch (message.cmd) {
    case 'send':
      console.log(message.data)
      renderTable(message.data, '#js-table')
      // eventsBind()
      break
    default: break
  }
})

function renderTable (list = [], dom) {
  const tpl = list.reduce((prev, current) => {
    return prev + `<tr>
    <td>${current.name}</td>
    <td>${current.type || ''}</td>
    <td>${current.path || ''}</td>
    <td>${current.relate || ''}</td>
    <td></td>
    <td>
      <a>删除</a>
      <a>移动</a>
      <a>关联</a>
    </td>
    </tr>`
  }, '')
  console.log(tpl)
  $(dom).html(tpl)
}

function eventsBind () {
  $('#js-common-icons li img').on('click', function () {
    vscode.postMessage({
      src: $(this).attr('data-src')
    })
  })
  $('#js-other-icons li img').on('click', function () {
    vscode.postMessage({
      src: $(this).attr('data-src')
    })
  })
}
