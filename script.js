const randomItems=[
 {tag:"مقالة",title:"لماذا تعتبر إيران وجهة متنوعة للمسافر العربي؟",text:"من الشمال الأخضر إلى المدن التاريخية والجبال والأسواق التقليدية، تستطيع أن تجمع أكثر من تجربة في رحلة واحدة.",link:"articles.html"},
 {tag:"رحلة",title:"كلاردشت ورامسر وشمال إيران",text:"برنامج مناسب للعائلات ومحبي الطبيعة، مع تنقل خاص وإقامة يتم اختيارها حسب احتياجاتكم.",link:"kelardasht.html"},
 {tag:"علاج",title:"رحلة علاجية منظمة في طهران",text:"نساعد في تنسيق الرحلة والإقامة والتنقل والمرافقة اللوجستية للمسافر القادم للعلاج.",link:"treatment.html"},
 {tag:"إقامة",title:"فيلا خاصة أم فندق؟",text:"نختار خيارات الإقامة حسب عدد المسافرين والخصوصية والموقع والميزانية.",link:"stays.html"},
 {tag:"خدمة",title:"سائق يتحدث العربية",text:"التواصل السهل يجعل الرحلة أكثر راحة، مع إمكانية توفير سائق ومتابعة للمسافر طوال البرنامج.",link:"cars.html"},
 {tag:"وجهة",title:"شيراز: تاريخ وثقافة وأجواء مختلفة",text:"مدينة الحدائق والشعر والتاريخ، ويمكن دمجها مع أصفهان في برنامج واحد.",link:"shiraz.html"}
];
function showRandom(){
 const x=randomItems[Math.floor(Math.random()*randomItems.length)];
 document.getElementById("randomContent").innerHTML=`<span class="tag">${x.tag}</span><h3>${x.title}</h3><p>${x.text}</p><a href="${x.link}">اكتشف المزيد ←</a>`;
}
function toggleMenu(){document.getElementById("menu").classList.toggle("open")}
document.addEventListener("DOMContentLoaded",showRandom);