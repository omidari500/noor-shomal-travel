
document.querySelector('.menu')?.addEventListener('click',()=>{
 const n=document.querySelector('.links');
 if(!n)return;
 n.style.display=n.style.display==='flex'?'':'flex';
 if(n.style.display==='flex'){n.style.position='absolute';n.style.top='76px';n.style.left='4%';n.style.right='4%';n.style.background='#f6f1e7';n.style.padding='18px';n.style.borderRadius='18px';n.style.flexDirection='column';n.style.border='1px solid #e6dfd1';}
});
