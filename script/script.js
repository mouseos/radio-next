//podcastのpubDateを読み込む
function dateParser(dateString){
	//const dateString = 'Fri, 23 Oct 2020 16:00:00 GMT';
	const date = new Date(dateString);

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false,
		timeZone: 'Asia/Tokyo',
	};
	const japaneseDateString = date.toLocaleString('ja-JP', options);

	return(japaneseDateString);
}

//css 変数を取得する
function get_css_var(name){
	return(getComputedStyle(document.documentElement).getPropertyValue(name));
}

//menu表示非表示
function show_hide_menu(){
	const menu = document.querySelector(".slide-menu-contents");//.slide-menu-contentsを取得
	const menu_icon = document.querySelector(".nav-menu-button>.material-icons");//.slide-menu-contentsを取得
	if(menu.style.display==""||menu.style.display=="none"){
		menu.style.display = 'block'
		menu_icon.innerText='close'//閉じるアイコンにする
	}else{
		menu.style.display = 'none'
		menu_icon.innerText='menu'//menu iconに戻す
	}
}





async function get_podcasts () {
 const res = await fetch("cgi-bin/get_podcasts.py");
 const json = await res.json();
 console.log(json);
 let html='';
 const programs_area=document.querySelector(".program-list");
 for (programs of json){
	for (program of programs.item){
		let more_info='';
		//brが含まれている文章なら何もしない。含まれていなければ改行コードをbrに置き換え
		if(program.description.includes("<br>")){
			more_info=program.description;
		}else{
			more_info=program.description.replace(/\n/g,'<br>');
		}
		
		html+=`
		<div class="card">
			<div>
				<div class="program-image">
					<img src="`+program['itunes:image']['@href']+`" loading="lazy">
				</div>
				<div class="program-desc">
					<div class="program-title">
						<p>`+program.title+`</p>
					</div>
					<div class="program_date">
						<p><i class="material-icons">calendar_month</i>`+dateParser(program.pubDate)+`</p>
					</div>
					<div class="program-more">
						<p>`+more_info+`</p>
					</div>
				</div>
			</div>
			<audio src=`+program.enclosure["@url"]+` controls></audio>
		</div>`;
	}
	programs_area.innerHTML=html;
 }
}



//htmlを取得して指定されたセレクタに貼り付ける
async function setHTML(path,selector) {
  try {
    const response = await fetch(path);
    const navHtml = await response.text();
    document.querySelector(selector).innerHTML = navHtml;
  } catch (error) {
    console.error(error);
  }
}

setHTML('/radio-next/files/elements/nav.html','nav');
setHTML('/radio-next/files/elements/footer.html','footer');
//ストリーミングプレイヤー
function stream_start_stop(){
	let play_btn = document.querySelector('.play-radio>i');
	let audio = document.querySelector('#streaming');
	if(!audio.paused){
		play_btn.innerHTML ="play_arrow";
		audio.pause();
	}else{
		play_btn.innerHTML = "pause";
		audio.play();
	}
}

/*現在時刻を日本時間で表示*/
	function updateClock() {
		// 現在の日時を取得
		var currentTime = new Date();
		// 時間を取得
		var hours = currentTime.getHours();
			if(hours>=12){
				hours-=12;
			}
	
	
	  // 分を取得
	  var minutes = currentTime.getMinutes();
	  if (minutes < 10) {
		minutes = "0" + minutes;
	  }
	
	
	  let hours_elem=document.getElementById("hours");
	  let minutes_elem=document.getElementById("minutes");
			if (hours < 10) {
		hours_elem.style.textIndent = "0.5em";
	  }else{
		hours_elem.style.textIndent = "0em";
	  }
			hours_elem.innerHTML = hours;
			minutes_elem.innerHTML = minutes;
	
	}
	
	// 1秒ごとに時計を更新
	setInterval(updateClock, 1000);
	
