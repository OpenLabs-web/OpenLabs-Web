document.addEventListener("DOMContentLoaded",()=>{
 const menu=document.querySelector("[data-menu]"),nav=document.querySelector("[data-nav]");
 if(menu&&nav){menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Close navigation":"Open navigation");});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");}));}
 document.querySelectorAll("[data-year]").forEach(n=>n.textContent=new Date().getFullYear());
 const form=document.querySelector("[data-demo-form]");
 if(form)form.addEventListener("submit",e=>{e.preventDefault();const msg=form.querySelector("[data-form-message]");msg.textContent="This form is a front-end preview and is not connected to a backend yet. Please use the GitHub issue link on this page for now.";msg.hidden=false;});
});