"use strict";

// Cursor interactivo
// Cursor interactivo perfectamente sincronizado
document.addEventListener('DOMContentLoaded', function() {
  // Crear elementos del cursor
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  document.body.appendChild(cursorDot);
  
  // Variables para la posición
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  // Evento para seguir el mouse
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Actualizar posición del punto del cursor inmediatamente
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    
    // Actualizar posición del círculo principal inmediatamente
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });
  
  // Efecto hover sobre elementos interactivos
  const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, .svc summary');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
  
  // Ocultar cursor cuando sale de la ventana
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });
  
  // Ocultar cursor personalizado en dispositivos táctiles
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
    document.body.style.cursor = 'auto';
  }
});

// Scroll suave
document.addEventListener('DOMContentLoaded', function() {
  // Verificar si el navegador soporta scroll-behavior
  if (!('scrollBehavior' in document.documentElement.style)) {
    // Si no lo soporta, agregar polyfill
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const startPosition = window.pageYOffset;
          const targetPosition = targetElement.offsetTop - 100;
          const distance = targetPosition - startPosition;
          const duration = 800;
          let start = null;
          
          window.requestAnimationFrame(function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const windowY = window.pageYOffset;
            
            if (windowY < targetPosition) {
              window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
              requestAnimationFrame(step);
            } else {
              window.scrollTo(0, targetPosition);
            }
          });
          
          function easeInOutQuad(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2*(t*(t-2) - 1) + b;
          }
        }
      });
    });
  }
});



/*==================================================
  SAGOCA - SCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================
    LOADER
    ==================================*/

    window.addEventListener("load", () => {

        setTimeout(() => {

            const loader = document.getElementById("loader");

            if (loader) {
                loader.classList.add("hide");
            }

        }, 800);

    });


    /*==================================
    BOTÓN VOLVER ARRIBA
    ==================================*/

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /*==================================
    MENÚ MÓVIL
    ==================================*/
const menuToggle = document.getElementById("menuBtn");
    const mainNav = document.getElementById("mobileMenu");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            mainNav.classList.toggle("active");
            menuToggle.classList.toggle("active");

        });

        document.querySelectorAll("#mobileMenu a").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");
                menuToggle.classList.remove("active");

            });

        });

    }


    /*==================================
    ACORDEÓN SERVICIOS
    ==================================*/

    document.querySelectorAll("details.svc").forEach(item => {

        item.addEventListener("toggle", () => {

            if (!item.open) return;

            document.querySelectorAll("details.svc").forEach(other => {

                if (other !== item) {

                    other.open = false;

                }

            });

        });

    });


    /*==================================
    ANIMACIONES
    ==================================*/

    const reveals = document.querySelectorAll(".reveal");

    if (reveals.length > 0) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("in");
                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.15
        });

        reveals.forEach(el => observer.observe(el));

    }


    /*==================================
    SOMBRA HEADER
    ==================================*/

    const header = document.getElementById("siteHeader");

    if (header) {

        window.addEventListener("scroll", () => {

            header.style.boxShadow =
                window.scrollY > 40
                    ? "0 4px 20px rgba(0,0,0,.08)"
                    : "none";

        });

    }


    /*==================================
    VALIDAR TELÉFONO
    ==================================*/

    const phone = document.getElementById("phone");

    if (phone) {

        phone.addEventListener("input", function () {

            this.value = this.value.replace(/[^0-9]/g, "");

            if (this.value.length > 10) {

                this.value = this.value.substring(0, 10);

            }

        });

    }


    /*==================================
    FORMULARIO
    ==================================*/

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        const submitBtn = document.getElementById("submitBtn");
        const confirmBox = document.getElementById("confirm");
        const confirmTag = document.getElementById("confirmTag");
        const confirmText = document.getElementById("confirmText");

        contactForm.addEventListener("submit", async function (e) {

            e.preventDefault();

            submitBtn.disabled = true;
            submitBtn.innerHTML = "⌛ Enviando...";

            try {

                const response = await fetch("https://api.web3forms.com/submit", {

                    method: "POST",
                    headers: {
                        Accept: "application/json"
                    },
                    body: new FormData(contactForm)

                });

                if (!response.ok) {

                    throw new Error("Error HTTP");

                }

                const result = await response.json();

                if (!result.success) {

                    throw new Error(result.message);

                }

                confirmTag.textContent = "✔ Mensaje enviado";

                confirmText.textContent =
                    "Gracias " +
                    document.getElementById("name").value +
                    ". Su solicitud fue enviada correctamente.";

                confirmBox.classList.add("show");

                contactForm.reset();

            } catch (err) {

                console.error(err);

                confirmTag.textContent = "Error";

                confirmText.textContent =
                    "No fue posible enviar el formulario. Intente nuevamente.";

                confirmBox.classList.add("show");

            } finally {

                submitBtn.disabled = false;
                submitBtn.innerHTML = "Enviar mensaje";

            }

        });

    }


    /*==================================
    CAMBIAR TÍTULO DE LA PESTAÑA
    ==================================*/

    const originalTitle = document.title;

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            document.title = "Regresa a SAGOCA!";

        } else {

            document.title = originalTitle;

        }

    });

/*==================================
BARRA DE PROGRESO
==================================*/

const progressBar = document.getElementById("scrollProgress");

if(progressBar){

    window.addEventListener("scroll",()=>{

        const totalHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            (window.scrollY / totalHeight) * 100;

        progressBar.style.width = progress + "%";

    });

}

/*==================================
PARTÍCULAS HERO
==================================*/

const canvas = document.getElementById("heroParticles");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let particles = [];

    function resizeCanvas() {

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

    }

    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();

    class Particle {

        constructor() {

            this.reset();

            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

        }

        reset() {

            this.size = Math.random() * 3 + 2;

            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;

        }

        update() {

            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;

            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;

        }

        draw() {

            ctx.beginPath();

            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

            ctx.fillStyle = "rgba(255,255,255,.35)";

            ctx.fill();

        }

    }

    const amount = Math.floor(window.innerWidth / 18);

    for (let i = 0; i < amount; i++) {

        particles.push(new Particle());

    }

    function connect() {

        for (let a = 0; a < particles.length; a++) {

            for (let b = a + 1; b < particles.length; b++) {

                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;

                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {

                    ctx.beginPath();

                    ctx.strokeStyle = "rgba(255,255,255,.05)";

                    ctx.lineWidth = 1;

                    ctx.moveTo(particles[a].x, particles[a].y);

                    ctx.lineTo(particles[b].x, particles[b].y);

                    ctx.stroke();

                }

            }

        }

    }

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {

            p.update();

            p.draw();

        });

        connect();

        requestAnimationFrame(animate);

    }

    animate();

}



/*==================================
GLOW HERO
==================================*/

const hero=document.querySelector(".hero");
const glow=document.querySelector(".heroGlow");

if(hero && glow){

hero.addEventListener("mousemove",(e)=>{

const rect=hero.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

glow.style.left=x+"px";

glow.style.top=y+"px";

});

}






});

