(function(){
	const projects = [
		{ id:1, title:"E-commerce Platform", description:"Scalable multi-tenant ecommerce platform with payment integration.", image:"https://images.unsplash.com/photo-1526378728312-2901a5c06c0a?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=4d84b2b3c8e6dfc7f7db0d4a53b4f2b9", date:"2024-09", problems:"Slow conversion, monolithic codebase, duplicated admin UIs.", solutions:"Rebuilt as micro-services for checkout, optimized product queries, unified admin.", achievements:"+35% conversion, 50% faster page loads, reduced infra cost 20%.", features:["Multi-store", "Stripe + local payments", "Admin RBAC", "Search & filters"], tech:["Node.js", "React", "Postgres", "Redis", "Kubernetes"], links:[ {label:"Live site", url:"https://example.com"}, {label:"Case study", url:"#"} ] },
		{ id:2, title:"SaaS Analytics Dashboard", description:"Real-time insights and customizable dashboards for product teams.", image:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=03b2c3dff2c8c287f6b0a9e909ed9f85", date:"2023-12", problems:"Hard to track user funnels; slow ETL and stale metrics.", solutions:"Implemented event pipeline, near real-time processing with streaming, and dashboard builder.", achievements:"Real-time metrics (sub-minute), 10k daily active users supported.", features:["Drag-drop dashboards","Alerts & thresholds","Export & sharing"], tech:["Python", "Kafka", "ClickHouse", "Vue.js"], links:[ {label:"Demo", url:"#"} ] },
		{ id:3, title:"Local Business Website Suite", description:"Fast, SEO-optimized static sites for local businesses with CMS integration.", image:"https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=5a4f33d6c0e7cf2f8b734a4d7b6c25b9", date:"2022-06", problems:"Clients needed low-cost, high-performance sites with simple editing.", solutions:"Static site generator + headless CMS, CDN hosting and build automation.", achievements:"Reduced build time & maintenance, improved SEO & conversion.", features:["Fast SEO pages", "CMS for content editing", "Contact forms"], tech:["Gatsby", "Headless CMS", "Netlify", "Tailwind"], links:[ {label:"Portfolio", url:"#"} ] },
		{ id:4, title:"Inventory & Logistics System", description:"Optimized warehouse operations and order routing for logistics partners.", image:"https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=5a6f0e7c2e7c57a5b4a6d6a1f6a8f7bd", date:"2021-11", problems:"Inventory mismatches and routing delays causing late shipments.", solutions:"Real-time sync with barcode scanners, route optimization algorithm.", achievements:"Cut delivery delays by 40%, reduced stock errors by 70%.", features:["Real-time sync","Route optimization","Reporting"], tech:["Laravel", "MySQL", "Redis", "Docker"], links:[ {label:"Case study", url:"#"} ] },
		{ id:5, title:"Education Platform", description:"Interactive learning platform with assessments and progress tracking.", image:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=7a5c3b1e2c9f9d1e4b1f2b8b3a2c8f7e", date:"2020-05", problems:"Low student engagement and lack of progress monitoring.", solutions:"Gamified modules, progress analytics, and easy content creator tools.", achievements:"Increased course completion by 28%.", features:["Quizzes","Progress analytics","Gamification"], tech:["Django", "Postgres", "React"], links:[ {label:"Docs", url:"#"} ] }
	];

	const grid = document.getElementById('projectsGrid');
	const modalBackdrop = document.getElementById('kpModalBackdrop');
	const closeModalBtn = document.getElementById('kpCloseModalBtn');

	function createCard(p){
		const el = document.createElement('div');
		el.className = 'kp-card';
		el.tabIndex = 0;
		el.setAttribute('role','button');
		el.setAttribute('aria-pressed','false');
		el.dataset.id = p.id;

		const bg = document.createElement('div');
		bg.className = 'kp-bg';
		bg.style.backgroundImage = `url("${p.image}")`;

		const overlay = document.createElement('div');
		overlay.className = 'kp-overlay';

		const title = document.createElement('div');
		title.className = 'kp-title';
		title.textContent = p.title;

		const desc = document.createElement('div');
		desc.className = 'kp-desc';
		desc.textContent = p.description;

		const tagRow = document.createElement('div');
		tagRow.className = 'kp-tag-row';
		const tag = document.createElement('div');
		tag.className = 'kp-tag';
		tag.textContent = p.tech ? p.tech.slice(0,2).join(' • ') : '—';
		tagRow.appendChild(tag);

		overlay.appendChild(title);
		overlay.appendChild(desc);
		overlay.appendChild(tagRow);

		el.appendChild(bg);
		el.appendChild(overlay);

		el.addEventListener('click', ()=> openModal(p.id));
		el.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(p.id); } });

		return el;
	}

	function renderGrid(){
		projects.forEach(p => { grid.appendChild(createCard(p)); });
	}

	function openModal(id){
		const p = projects.find(x => x.id === id);
		if(!p) return;
		document.getElementById('kpModalTitle').textContent = p.title;
		document.getElementById('kpModalHero').style.backgroundImage = `url("${p.image}")`;
		document.getElementById('kpProblemsText').textContent = p.problems;
		document.getElementById('kpSolutionsText').textContent = p.solutions;
		document.getElementById('kpAchievementsText').textContent = p.achievements;

		const featuresList = document.getElementById('kpFeaturesList');
		featuresList.innerHTML = '';
		p.features.forEach(f => { const li = document.createElement('li'); li.textContent = f; featuresList.appendChild(li); });

		const techList = document.getElementById('kpTechList');
		techList.innerHTML = '';
		p.tech.forEach(t => { const li = document.createElement('li'); li.textContent = t; techList.appendChild(li); });

		document.getElementById('kpProjectDate').textContent = p.date ? `• ${p.date}` : '';

		const linksArea = document.getElementById('kpLinksArea');
		linksArea.innerHTML = '';
		if(p.links && p.links.length){
			p.links.forEach(l => {
				const a = document.createElement('a'); a.href = l.url; a.target='_blank'; a.rel='noopener noreferrer';
				a.textContent = l.label; a.style.display = 'block'; a.style.marginBottom='6px';
				linksArea.appendChild(a);
			});
		} else {
			linksArea.textContent = '—';
		}

		modalBackdrop.classList.add('show');
		modalBackdrop.setAttribute('aria-hidden','false');
		document.body.style.overflow = 'hidden';
		closeModalBtn.focus();
	}

	function closeModal(){
		modalBackdrop.classList.remove('show');
		modalBackdrop.setAttribute('aria-hidden','true');
		document.body.style.overflow = '';
	}

	modalBackdrop.addEventListener('click', (e)=>{ if(e.target === modalBackdrop) closeModal(); });
	closeModalBtn.addEventListener('click', closeModal);
	document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeModal(); });

	renderGrid();
})();
