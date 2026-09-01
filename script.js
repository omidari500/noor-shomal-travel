const WA_NUMBER='989397162609';
const WA=`https://wa.me/${WA_NUMBER}`;

const randomItems=[
 {tag:'مقالة',title:'أشهر الأكلات الإيرانية التي تستحق التجربة',text:'من الكباب والفسنجان إلى قورمه سبزي والدیزی والحلويات التقليدية، تعرّف على الأطباق التي تجعل الرحلة إلى إيران تجربة تذوق حقيقية.',link:'foods.html'},
 {tag:'رحلة',title:'كلاردشت ورامسر وشمال إيران',text:'برنامج مناسب للعائلات ومحبي الطبيعة، مع تنقل خاص وإقامة يتم اختيارها حسب احتياجاتكم.',link:'kelardasht.html'},
 {tag:'علاج',title:'كيف نرتب الرحلة العلاجية من البداية إلى العودة؟',text:'نساعد في تنسيق المواعيد والمواصلات والإقامة والترجمة والمتابعة اللوجستية، بحسب احتياجات كل مسافر.',link:'treatment.html'},
 {tag:'إقامة',title:'أفضل الفنادق في أهم المدن الإيرانية',text:'دليل للفنادق المميزة في طهران وشيراز وأصفهان ومشهد وتبريز ورشت ورامسر ويزد، مع إمكانية طلب الحجز عبر واتساب.',link:'hotels.html'},
 {tag:'صرافة',title:'خدمة تنسيق الصرافة للمسافر العربي',text:'تواصل معنا قبل التنفيذ لمعرفة المبلغ والعملة والعمولة المتوقعة وترتيب الخدمة مع جهة مرخصة حسب التوفر.',link:'exchange.html'},
 {tag:'محافظات',title:'اكتشف 31 محافظة في إيران',text:'اختر المحافظة ثم تعرّف على المعالم الحقيقية، الفنادق، وخدمة السيارة مع سائق داخل المدينة.',link:'provinces.html'},
 {tag:'وجهة',title:'شيراز: تاريخ وثقافة وأجواء مختلفة',text:'مدينة الحدائق والشعر والتاريخ، ويمكن دمجها مع أصفهان أو طهران في برنامج واحد.',link:'shiraz.html'},
 {tag:'طعام',title:'دليل الأكل الإيراني للمسافر العربي',text:'نصائح لاختيار المطاعم والأطباق المناسبة، وما الذي يمكن طلبه بسهولة عند السفر مع العائلة.',link:'foods.html'}
];

function showRandom(){const el=document.getElementById('randomContent');if(!el)return;const x=randomItems[Math.floor(Math.random()*randomItems.length)];el.innerHTML=`<span class="tag">${x.tag}</span><h3>${x.title}</h3><p>${x.text}</p><a href="${x.link}">اكتشف المزيد ←</a>`}
function toggleMenu(){const m=document.getElementById('menu');if(m)m.classList.toggle('open')}

function waLink(message){return `${WA}?text=${encodeURIComponent(message)}`}

function placeholder(label){
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="#183d30"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" fill="#e4c58e" font-size="46" font-family="Arial">${String(label).replace(/[<>&]/g,'')}</text><text x="50%" y="57%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="22" font-family="Arial">Wikimedia Commons</text></svg>`;
  return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg);
}

async function commonsSearch(query,width=1200){
  const endpoint='https://commons.wikimedia.org/w/api.php';
  const params=new URLSearchParams({action:'query',generator:'search',gsrsearch:query,gsrnamespace:'6',gsrlimit:'5',prop:'imageinfo',iiprop:'url|extmetadata',iiurlwidth:String(width),format:'json',origin:'*'});
  try{
    const res=await fetch(`${endpoint}?${params.toString()}`);
    if(!res.ok)throw new Error('commons http');
    const data=await res.json();
    const pages=Object.values(data.query?.pages||{});
    const good=pages.find(p=>p.imageinfo?.[0]?.thumburl && !/\.svg$/i.test(p.title||'')) || pages.find(p=>p.imageinfo?.[0]?.thumburl);
    if(!good)return null;
    const info=good.imageinfo[0];
    return {url:info.thumburl||info.url,title:(good.title||'').replace(/^File:/,''),source:info.descriptionurl||`https://commons.wikimedia.org/wiki/${encodeURIComponent(good.title||'')}`};
  }catch(e){return null}
}

function loadImage(img,query,label){
  img.src=placeholder(label); img.loading='lazy'; img.decoding='async';
  commonsSearch(query,1200).then(item=>{
    if(!item)return;
    img.src=item.url; img.dataset.source=item.source; img.dataset.sourceTitle=item.title;
    const credit=img.closest('.media-wrap')?.querySelector('.photo-credit');
    if(credit)credit.innerHTML=`الصورة: <a href="${item.source}" target="_blank" rel="noopener">Wikimedia Commons</a>`;
  });
}

function renderProvinceCards(){
  const grid=document.getElementById('provinceGrid');
  if(!grid || typeof PROVINCES==='undefined')return;
  grid.innerHTML=PROVINCES.map(p=>`<a class="province-card" href="province.html?province=${p.slug}"><div class="media-wrap"><img class="province-photo" alt="${p.name} - ${p.capital}"><small class="photo-credit">جاري اختيار صورة موثقة…</small></div><div><span>المحافظة</span><h3>${p.name}</h3><p>العاصمة: ${p.capital}</p><b>اكتشف المعالم والفنادق والسيارة ←</b></div></a>`).join('');
  grid.querySelectorAll('.province-card').forEach((card,i)=>{
    const p=PROVINCES[i];
    loadImage(card.querySelector('img'),`${p.enCapital}, Iran ${p.name}`,p.capital);
  });
}

function renderProvincePage(){
  const title=document.getElementById('provinceTitle');
  if(!title || typeof PROVINCES==='undefined')return;
  const slug=new URLSearchParams(location.search).get('province');
  const p=PROVINCES.find(x=>x.slug===slug)||PROVINCES.find(x=>x.slug==='tehran')||PROVINCES[0];
  document.title=`${p.name} | نور شمال`;
  document.getElementById('provinceCapital').textContent=`العاصمة: ${p.capital}`;
  title.textContent=p.name;
  document.getElementById('provinceDesc').textContent=p.desc;
  document.getElementById('carCity').textContent=p.capital; const hotelCity=document.getElementById('hotelCity'); if(hotelCity)hotelCity.textContent=p.capital;
  const hero=document.getElementById('provinceHero');
  const heroImg=new Image();
  commonsSearch(`${p.enCapital}, ${p.name}, Iran`,1600).then(item=>{
    if(item) hero.style.backgroundImage=`linear-gradient(90deg,rgba(8,18,13,.82),rgba(8,18,13,.18)),url("${item.url}")`;
  });
  const attractions=document.getElementById('attractions');
  attractions.innerHTML=p.attractions.map((a,i)=>`<article class="attraction-card"><div class="media-wrap"><img class="attraction-photo" alt="${a[0]} - ${p.capital}"><small class="photo-credit">جاري اختيار صورة للموقع…</small></div><div><span>المعلم ${i+1}</span><h3>${a[0]}</h3><p>صورة ومعلومة عن المكان نفسه، مع البحث باسم المعلم والمدينة لتقليل أخطاء الصور العامة.</p><a class="small-wa" target="_blank" href="${waLink(`السلام عليكم، أريد برنامج زيارة ${a[0]} في ${p.capital}.`)}">واتساب — اطلب برنامج الزيارة</a></div></article>`).join('');
  attractions.querySelectorAll('.attraction-card').forEach((card,i)=>loadImage(card.querySelector('img'),`${p.attractions[i][1]}, ${p.capital}, Iran`,p.attractions[i][0]));

  const hotels=document.getElementById('hotels');
  hotels.innerHTML=p.hotels.map(h=>`<article class="hotel-card photo-hotel"><div class="media-wrap"><img class="hotel-photo" alt="${h} - ${p.capital}"><small class="photo-credit">جاري اختيار صورة الفندق…</small></div><div class="hotel-body"><div class="stars">★★★★★</div><h3>${h}</h3><p>فندق مقترح في ${p.capital}. التوفر والسعر والتصنيف النهائي يتم التأكد منها قبل تأكيد الحجز.</p><div class="hotel-meta"><span>${p.capital}</span><span>طلب حجز بالعربية</span></div><a class="book-btn" target="_blank" href="${waLink(`السلام عليكم، أريد حجز فندق ${h} في ${p.capital}. أرجو إرسال السعر والتوفر.`)}"><span class="wa-icon">◉</span> احجز الآن عبر واتساب</a></div></article>`).join('');
  hotels.querySelectorAll('.hotel-card').forEach((card,i)=>loadImage(card.querySelector('img'),`${p.hotels[i]}, ${p.capital}, Iran`,p.hotels[i]));

  document.getElementById('carLink').href=waLink(`السلام عليكم، أريد سيارة مع سائق في ${p.capital}. عدد الأشخاص: __. التاريخ: __. مدة الخدمة: __.`);
}

function initExchangeWhatsApp(){
  const el=document.getElementById('exchangeWhatsApp');
  if(el)el.href=waLink('السلام عليكم، أريد الاستفسار عن خدمة الصرافة وسعر الصرف في إيران.');
}

document.addEventListener('DOMContentLoaded',()=>{
  showRandom();
  renderProvinceCards();
  renderProvincePage();
  initExchangeWhatsApp();
});
