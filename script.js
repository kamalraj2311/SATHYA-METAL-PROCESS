const loader=document.getElementById("loader");
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),500));

const header=document.getElementById("header");
const toTop=document.getElementById("toTop");
window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",window.scrollY>30);
  toTop.classList.toggle("show",window.scrollY>500);
  const sections=[...document.querySelectorAll("main section[id]")];
  const navLinks=[...document.querySelectorAll(".nav a")];
  let current="home";
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-180) current=s.id});
  navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});
toTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

const toggle=document.getElementById("menuToggle"), nav=document.getElementById("nav");
toggle.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const counters=document.querySelectorAll(".counter");
const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target, target=Number(el.dataset.target);
    let start=0, duration=1300, startTime=null;
    function tick(t){
      if(!startTime)startTime=t;
      const progress=Math.min((t-startTime)/duration,1);
      el.textContent=Math.floor(progress*target);
      if(progress<1)requestAnimationFrame(tick); else el.textContent=target;
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
},{threshold:.8});
counters.forEach(c=>counterObserver.observe(c));

document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const form=e.currentTarget;
  const data=new FormData(form);
  const phone=data.get("phone").trim();
  const message=`Hello Sathya Metal Process,%0A%0AName: ${encodeURIComponent(data.get("name"))}%0ACompany: ${encodeURIComponent(data.get("company")||"N/A")}%0APhone: ${encodeURIComponent(phone)}%0AEmail: ${encodeURIComponent(data.get("email")||"N/A")}%0ARequirement: ${encodeURIComponent(data.get("message"))}`;
  const note=document.getElementById("formNote");
  note.textContent="Opening WhatsApp with your enquiry...";
  window.open(`https://wa.me/914424896261?text=${message}`,"_blank");
  form.reset();
});

document.querySelectorAll(".gallery-item").forEach(item=>{
  item.addEventListener("click",()=>{
    const overlay=document.createElement("div");
    overlay.style.cssText="position:fixed;inset:0;background:#000e;z-index:3000;display:grid;place-items:center;padding:30px;cursor:zoom-out";
    const img=document.createElement("div");
    img.style.cssText=`width:min(1000px,95vw);height:min(700px,85vh);background:${getComputedStyle(item).backgroundImage} center/contain no-repeat`;
    overlay.appendChild(img);document.body.appendChild(overlay);
    overlay.addEventListener("click",()=>overlay.remove());
  });
});

document.getElementById("year").textContent=new Date().getFullYear();