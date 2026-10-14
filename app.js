document.addEventListener("DOMContentLoaded",()=>{
 const menu=document.querySelector("[data-menu]"),nav=document.querySelector("[data-nav]");
 if(nav){
  const mobile=window.matchMedia("(max-width: 650px)");
  const syncNavVisibility=()=>nav.setAttribute("aria-hidden",String(mobile.matches&&!nav.classList.contains("open")));
  syncNavVisibility();
  mobile.addEventListener("change",syncNavVisibility);
 }


 if(menu&&nav){
  const closeMenu=()=>{
   nav.classList.remove("open");
   nav.setAttribute("aria-hidden",String(window.matchMedia("(max-width: 650px)").matches));
   menu.setAttribute("aria-expanded","false");
   menu.setAttribute("aria-label","Open navigation");
  };

  menu.addEventListener("click",()=>{
   const open=nav.classList.toggle("open");
   nav.setAttribute("aria-hidden",String(!open));
   menu.setAttribute("aria-expanded",String(open));
   menu.setAttribute("aria-label",open?"Close navigation":"Open navigation");
  });
  nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenu));
  document.addEventListener("keydown",event=>{
   if(event.key==="Escape"&&nav.classList.contains("open")){
    closeMenu();
    menu.focus();
   }
  });
 }

 document.querySelectorAll("[data-year]").forEach(node=>node.textContent=new Date().getFullYear());

 const form=document.querySelector("[data-demo-form]");
 if(form)form.addEventListener("submit",event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const message=form.querySelector("[data-form-message]");
  message.textContent="This form is a front-end preview and cannot send or save messages yet. Please use the GitHub issue link on this page instead.";
  message.hidden=false;
 });
});
