document.getElementById('year').textContent = new Date().getFullYear();

/* Dark Mode Toggle */
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const current = document.body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('ctps-theme', next);
});

/* Hamburger menu */
const hambtn = document.getElementById('hambtn');
const navLinks = document.getElementById('navLinks');
hambtn.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

/* Simulasi 20 detik */
const simBtn=document.getElementById('simBtn'),simBar=document.getElementById('simProgress'),simTime=document.getElementById('simTime');
simBtn.addEventListener('click',()=>{
  let t=20;simBtn.disabled=true;simBtn.textContent="⏱️ Simulasi...";
  const interval=setInterval(()=>{
    t--;simBar.style.width=`${((20-t)/20)*100}%`;simTime.textContent=t>0?t+"s":"Selesai";
    if(t<=0){clearInterval(interval);alert("✅ Simulasi selesai!");simBtn.textContent="Mulai Simulasi 20s";simBtn.disabled=false;simBar.style.width="0%";}
  },1000);
});

/* Quiz */
const qEl=document.getElementById('question'),optEl=document.getElementById('options'),startBtn=document.getElementById('startQuizBtn'),restartBtn=document.getElementById('restartQuizBtn'),timer=document.getElementById('timerNum');
const quiz=[{q:"Apa kepanjangan CTPS?",opts:["Cuci Tangan Pakai Sabun","Cuci Tubuh Pakai Sabun"],a:0},{q:"Berapa lama mencuci tangan efektif?",opts:["10 detik","20 detik"],a:1},{q:"Kapan waktu penting mencuci tangan?",opts:["Sebelum makan dan setelah toilet","Setelah tidur"],a:0}];
let cur=0,score=0,quizTimer=null,time=20;
function renderQuiz(){
  if(cur>=quiz.length){qEl.textContent=`Selesai! Skor ${score}/${quiz.length}`;optEl.innerHTML="";startBtn.style.display="none";restartBtn.style.display="inline";return;}
  const q=quiz[cur];qEl.textContent=q.q;optEl.innerHTML="";q.opts.forEach((o,i)=>{const b=document.createElement('button');b.textContent=o;b.onclick=()=>ans(i,b);optEl.appendChild(b);});
  clearInterval(quizTimer);time=20;timer.textContent=time;quizTimer=setInterval(()=>{time--;timer.textContent=time;if(time<=0){clearInterval(quizTimer);cur++;renderQuiz();}},1000);
}
function ans(i,b){clearInterval(quizTimer);const cor=quiz[cur].a;const all=optEl.querySelectorAll('button');all.forEach(btn=>btn.disabled=true);if(i===cor){b.classList.add('correct');score++;}else{b.classList.add('wrong');all[cor].classList.add('correct');}cur++;setTimeout(renderQuiz,700);}
startBtn.onclick=()=>{cur=0;score=0;startBtn.style.display="inline";restartBtn.style.display="none";renderQuiz();};
restartBtn.onclick=()=>{cur=0;score=0;startBtn.style.display="inline";restartBtn.style.display="none";renderQuiz();};

/* Navigasi antar menu */
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll(".section");

  function showSection(id) {
    sections.forEach(sec => {
      if (sec.id === id) {
        sec.classList.add("active");
        sec.classList.remove("hidden");
      } else {
        sec.classList.remove("active");
        sec.classList.add("hidden");
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.dataset.section;
      showSection(target);
    });
  });

  document.getElementById("openQuizBtn").addEventListener("click", () => {
    showSection("quiz");
  });

  showSection("home");
});
