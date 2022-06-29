async function main () {
    const buttonStart = document.querySelector('#buttonStart') // HTMLページの要素を取得
    const buttonEnd = document.querySelector('#buttonEnd')
    const player = document.querySelector('#player')
  
    const stream = await navigator.mediaDevices.getUserMedia({ // マイクから音声を取り込むためのメディアストリームを取得
      video: false,
      audio: true,
    })
  
    if (!MediaRecorder.isTypeSupported('audio/webm')) { // audio/webm形式での録音が可能かどうかを確認
      console.warn('audio/webm is not supported')
    }
  
    const mediaRecorder = new MediaRecorder(stream, { // メディアレコーダーを作成
      mimeType: 'audio/webm',
    })
  
    buttonStart.addEventListener('click', () => { // ユーザーが記録を開始するボタンをクリックした時のイベントハンドラを設定 ハンドラとは？
      mediaRecorder.start()
      buttonStart.setAttribute('disabled', '')
      buttonEnd.removeAttribute('disabled')
    })
  
    buttonEnd.addEventListener('click', () => { // ユーザーが記録を終了するボタンをクリックした時のイベントハンドラを設定
      mediaRecorder.stop()
      buttonStart.removeAttribute('disabled')
      buttonEnd.setAttribute('disabled', '')
    })
  
    mediaRecorder.addEventListener('dataavailable', event => { // メディアレコーダーのデータ利用可能になった時のイベントハンドラを設定
      player.src = URL.createObjectURL(event.data)
    })
  }
  
  main()

  // open index.html