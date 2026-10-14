document.addEventListener("DOMContentLoaded",()=>{
 const menu=document.querySelector("[data-menu]"),nav=document.querySelector("[data-nav]");
 if(nav){
  const mobile=window.matchMedia("(max-width: 650px)");
  const syncNavVisibility=()=>nav.setAttribute("aria-hidden",String(mobile.matches&&!nav.classList.contains("open")));
  syncNavVisibility();
  if(mobile.addEventListener)mobile.addEventListener("change",syncNavVisibility);
  else if(mobile.addListener)mobile.addListener(syncNavVisibility);
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

 const root=document.documentElement;
 const settings=document.querySelector(".settings");
 const themeToggle=document.querySelector("[data-theme-toggle]");
 const themeLabel=document.querySelector("[data-theme-label]");
 const themeIcon=document.querySelector("[data-theme-icon]");
 let storedTheme="";
 try{storedTheme=localStorage.getItem("openlabs-theme")||"";}catch(error){storedTheme="";}
 const applyTheme=theme=>{
  root.dataset.theme=theme;
  const light=theme==="light";
  if(themeToggle){
   themeToggle.setAttribute("aria-label",light?"Switch to dark theme":"Switch to light theme");
   themeToggle.setAttribute("aria-pressed",String(light));
  }
  if(themeIcon)themeIcon.textContent=light?"Dark mode":"Light mode";
  if(themeLabel)themeLabel.textContent=light?"Use dark theme":"Use light theme";
 };
 applyTheme(storedTheme==="light"?"light":"dark");
 if(settings){
  const summary=settings.querySelector("summary");
  document.addEventListener("click",event=>{if(!settings.contains(event.target))settings.open=false;});
  document.addEventListener("keydown",event=>{if(event.key==="Escape"&&settings.open){settings.open=false;summary.focus();}});
 }
 if(themeToggle)themeToggle.addEventListener("click",()=>{
  const theme=root.dataset.theme==="light"?"dark":"light";
  applyTheme(theme);
  try{localStorage.setItem("openlabs-theme",theme);}catch(error){}
 });
 document.querySelectorAll("[data-year]").forEach(node=>node.textContent=new Date().getFullYear());

 const form=document.querySelector("[data-demo-form]");
 if(form)form.addEventListener("submit",event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const name=form.elements.name.value.trim();
  const email=form.elements.email.value.trim();
  const body=form.elements.message.value.trim();
  const subject=encodeURIComponent("Openlabs website message");
  const content=encodeURIComponent(`From: ${name}\nReply to: ${email}\n\n${body}`);
  window.location.href=`mailto:nikethsreeraj2010@gmail.com?subject=${subject}&body=${content}`;
 });
});