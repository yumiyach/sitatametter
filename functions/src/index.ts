import * as functions from "firebase-functions"
import * as admin from "firebase-admin"


//サービスアカウントで初期化
admin.initializeApp()

// 画像をstorageに保存して、そのIDを返す
export const saveImage = functions.https.onCall(async (data, context) => {
  const { image, thumb } = data
  // base64のpngデータをstorageに保存
  const bucket = admin.storage().bucket()
  // 名前はランダムな文字列にする
  const id = Math.random().toString(32).substring(2)
  const imageFile = bucket.file('image/' + id)
  await imageFile.save(Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"), {
    metadata: {
      contentType: "image/png",
      cacheControl: "public, max-age=604800"
    }
  })
  // サムネイルを作成する
  const thumbFile = bucket.file('thumb/' + id)
  await thumbFile.save(Buffer.from(
    thumb.replace(/^data:image\/\w+;base64,/, ""),
    "base64"), {
    metadata: {
      contentType: "image/png",
      cacheControl: "public, max-age=604800"
    }
  })
  return id
})

//OGP表示用のリダイレクトWebページを返す
export const redirect = functions.https.onRequest(async (req, res) => {
  const { id } = req.query as { id?: string }
  if (!id) {
    res.redirect("//sitatametter.utabami.com")
    return
  }
  // storageから画像を取得
  const url = `https://firebasestorage.googleapis.com/v0/b/${admin.storage().bucket().name}/o/${encodeURIComponent('thumb/' + id)}?alt=media`

  res.send(`<!DOCTYPE html><head>
  <title>したためったー</title>
  <meta property="og:title" content="したためったー">
  <meta property="og:image" content="${url}">
  <meta property="og:image:width" content="600">
  <meta property="og:image:height" content="600">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="したためったー">
  <meta name="twitter:image" content="${url}">
  </head><body>
  <script>window.location="//sitatametter.utabami.com/complete.html?id=${id}";</script>
  </body></html>`)
})