const randomItems=[
 {tag:'مقالة',title:'أشهر الأكلات الإيرانية التي تستحق التجربة',text:'من الكباب والفسنجان إلى قورمه سبزي والدیزی والحلويات التقليدية، تعرّف على الأطباق التي تجعل الرحلة إلى إيران تجربة تذوق حقيقية.',link:'foods.html'},
 {tag:'رحلة',title:'كلاردشت ورامسر وشمال إيران',text:'برنامج مناسب للعائلات ومحبي الطبيعة، مع تنقل خاص وإقامة يتم اختيارها حسب احتياجاتكم.',link:'kelardasht.html'},
 {tag:'علاج',title:'كيف نرتب الرحلة العلاجية من البداية إلى العودة؟',text:'نساعد في تنسيق المواعيد والمواصلات والإقامة والترجمة والمتابعة اللوجستية، بحسب احتياجات كل مسافر.',link:'treatment.html'},
 {tag:'إقامة',title:'أفضل الفنادق في أهم المدن الإيرانية',text:'دليل مختصر للفنادق المميزة في طهران وشيراز وأصفهان ومشهد ويزد وتبريز ورشت ورامسر، مع إمكانية طلب الحجز.',link:'hotels.html'},
 {tag:'صرافی',title:'خدمة تنسيق الصرافة للمسافر العربي',text:'نساعدكم في ترتيب الوصول إلى صرافة مرخصة والاستفسار عن سعر الصرف قبل التنفيذ، مع توضيح أن الأسعار تتغير باستمرار.',link:'exchange.html'},
 {tag:'وجهة',title:'شيراز: تاريخ وثقافة وأجواء مختلفة',text:'مدينة الحدائق والشعر والتاريخ، ويمكن دمجها مع أصفهان أو طهران في برنامج واحد.',link:'shiraz.html'},
 {tag:'طعام',title:'دليل الأكل الحلال والمطاعم الإيرانية للمسافر العربي',text:'نصائح لاختيار المطاعم والأطباق المناسبة، وما الذي يمكن طلبه بسهولة عند السفر مع العائلة.',link:'foods.html'}
];
function showRandom(){const el=document.getElementById('randomContent');if(!el)return;const x=randomItems[Math.floor(Math.random()*randomItems.length)];el.innerHTML=`<span class="tag">${x.tag}</span><h3>${x.title}</h3><p>${x.text}</p><a href="${x.link}">اكتشف المزيد ←</a>`}
function toggleMenu(){const m=document.getElementById('menu');if(m)m.classList.toggle('open')}
document.addEventListener('DOMContentLoaded',showRandom);
