function updateSong() {
fetch('http://127.0.0.1:8080/cgi-bin/get_ladio.py', { headers: { 'Content-Type': 'application/json; charset=shift-jis' } })
.then(response => response.arrayBuffer())
.then(data => {
// shift-jisでエンコードされた文字列をutf-8に変換する
const utf8Data = new TextDecoder('shift_jis').decode(data);
// utf-8の文字列をパースする
const jsonData = JSON.parse(utf8Data);
// MNTがscfmになっている要素を探す
const scfmElement = jsonData.find(element => element.MNT === '/scfm');
// SONG要素を取得する
const song = scfmElement.SONG;
document.querySelector('.nowplaying-title>p').innerHTML ="【放送中】"+ song;
});
}

updateSong();
setInterval(updateSong, 10000);