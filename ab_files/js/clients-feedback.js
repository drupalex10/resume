(function(){
	const feedbacks = [
		{ name: 'Alex Nguyen', avatar: 'ab_files/khoapham-144.png', quote: 'Khoa delivered exactly what we needed, on time and with great communication.' },
		{ name: 'Minh Tran', avatar: 'ab_files/khoapham-192.png', quote: 'Solid engineering, clean architecture. Our performance improved noticeably.' },
		{ name: 'Sarah Lee', avatar: 'ab_files/KP-avatar.jpg', quote: 'Easy to work with and highly reliable. We will collaborate again.' }
	];

	const track = document.getElementById('cfTrack');
	if(!track) return;

	function createCard(item){
		const card = document.createElement('div');
		card.className = 'cf-card';
		card.setAttribute('role','listitem');

		const inner = document.createElement('div');
		inner.className = 'cf-inner';

		const img = document.createElement('img');
		img.className = 'cf-avatar';
		img.src = item.avatar;
		img.alt = item.name;

		const textWrap = document.createElement('div');
		const quote = document.createElement('p');
		quote.className = 'cf-quote';
		quote.textContent = `“${item.quote}”`;
		const name = document.createElement('p');
		name.className = 'cf-name';
		name.textContent = `— ${item.name}`;

		textWrap.appendChild(quote);
		textWrap.appendChild(name);
		inner.appendChild(img);
		inner.appendChild(textWrap);
		card.appendChild(inner);
		return card;
	}

	feedbacks.forEach(f => track.appendChild(createCard(f)));

	let index = 0;
	function goTo(i){
		index = (i + feedbacks.length) % feedbacks.length;
		track.style.transform = `translateX(-${index * 100}%)`;
	}

	let timer = setInterval(()=>{ goTo(index + 1); }, 10000);
	function resetTimer(){ clearInterval(timer); timer = setInterval(()=>{ goTo(index + 1); }, 10000); }

	const prevBtn = document.querySelector('#clientsFeedback .cf-prev');
	const nextBtn = document.querySelector('#clientsFeedback .cf-next');
	if(prevBtn) prevBtn.addEventListener('click', ()=>{ goTo(index - 1); resetTimer(); });
	if(nextBtn) nextBtn.addEventListener('click', ()=>{ goTo(index + 1); resetTimer(); });
})();
