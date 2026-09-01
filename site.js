
document.querySelectorAll('[data-menu]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const nav=document.querySelector('.links');
    nav.style.display = nav.style.display==='flex' ? '' : 'flex';
    if(nav.style.display==='flex'){nav.style.position='absolute';nav.style.top='74px';nav.style.right='4%';nav.style.left='4%';nav.style.background='#f8f5ed';nav.style.padding='18px';nav.style.border='1px solid #e8e3d7';nav.style.borderRadius='18px';nav.style.flexDirection='column';}
  })
});
