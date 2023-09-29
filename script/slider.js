function run_slider(programs_json){
	let html="";
	for (const program of programs_json) {
		html+='<li><img src="'+program.image_url+'"><div class="slider-details"><h2>'+program.title+'</h2><p>'+program.details+'</p></div></li>'
	}
	document.querySelector('.slider').innerHTML=html;

	let slider = document.querySelector('.slider');
	let slides = slider.querySelectorAll('li');
	let currentSlide = 0;
	slides[0].style.display = 'block';
	document.querySelector('.slider').style.backgroundImage = 'url("' + programs_json[0].image_url + '")';
	setInterval(() => {
		slides[currentSlide].style.display = 'none';
		currentSlide = (currentSlide + 1) % slides.length;
		slides[currentSlide].style.display = 'block';
		document.querySelector('.slider').style.backgroundImage = 'url("' + programs_json[currentSlide].image_url + '")';
	}, 20000);
}

fetch('/files/api/program_list.json')
	.then(response => response.json())
	.then(programs_json => {
		// jsonが取得できたら、run_slider()関数を実行する
		run_slider(programs_json);
	})
.catch(error => console.error(error));