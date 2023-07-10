/* MI CAROUSEL, versión modificada de una bajada de internet corregida y mejorada */
/* con posibiidad de programar los parametros y opciones de playback              */
// BODY
const miBody            = document.querySelector("body");
// Datos del slider
const   carouEncabezado = document.querySelector("#encabezado");
// Label Nro de slides
const   levCantSlides   = document.querySelector("#cant-slides");
// Input Nro de slides
const   inNumSlides     = document.querySelector("#nro-slides");

// Label Nro de slides en Ventana
const   levSlidesVent   = document.querySelector("#sld-vent");
// Input Nro de slides en ventana
const   inSldVent       = document.querySelector("#nro-en-vent");

// Label Ancho de Ventana
const   levAnchoVent    = document.querySelector("#ancho-vent");
const   inAnchoVent     = document.querySelector("#ancho-de-vent"); 

// Boton Genera slides
const   botGenera       = document.querySelector("#bot-genera");
// Contenedores del Slider
const   carouselCont    = document.querySelector('.carousel-contenedor');
const   carouselSlds    = document.querySelector('.carousel-slides');

//
// IMAGENES
// Fondo Cuerpo
const IMG_BODY  = "https://dnimages.com.au/wp-content/gallery/landscapes/2005005.jpg";
// Fondo configuración 
const   IMG_1   =   "https://cdn.autoproyecto.com/wp-content/uploads/2021/08/2023-Nissan-Z-31.jpg";
const   IMG_2   =   "https://cdn.autoproyecto.com/wp-content/uploads/2022/08/Nissan-Z-2023-1600-01.jpg";
const   IMG_3   =   "https://cdn.autoproyecto.com/wp-content/uploads/2022/08/Nissan-Z-2023-1280-56.jpg";
const   IMG_4   =   "https://cdn.autoproyecto.com/wp-content/uploads/2023/07/Nissan-GT-R-2024-1600-02.jpg";
const   IMG_5   =   "https://cdn.autoproyecto.com/wp-content/uploads/2021/08/2023-Nissan-Z-28.jpg";
const   IMG_6   =   "https://cdn.autoproyecto.com/wp-content/uploads/2022/08/Nissan-Z-2023-1600-01.jpg";
const   IMG_7   =   "https://cdn.autoproyecto.com/wp-content/uploads/2022/08/Nissan-Z-2023-1280-56.jpg";
const   IMG_8   =   "https://cdn.autoproyecto.com/wp-content/uploads/2023/07/Nissan-GT-R-2024-1600-02.jpg";
const   IMG_9   =   "https://cdn.autoproyecto.com/wp-content/uploads/2021/08/2023-Nissan-Z-31.jpg";
const   IMG_10  =   "https://cdn.autoproyecto.com/wp-content/uploads/2021/08/2023-Nissan-Z-28.jpg";

const   IMGS    =   [IMG_1, IMG_2, IMG_3, IMG_4, IMG_5, IMG_6, IMG_7, IMG_8, IMG_9, IMG_10];

const   MIN_SLIDES      = 2;
const   MAX_SLIDES      = 100;
const   MIN_SLIDES_VEN  = 1;
const   MAX_SLIDES_VEN  = 10;
const   MIN_ANCHO_VEN   = 400;
const   MAX_ANCHO_VEN   = 2000;

let nroTotalSlides      = 0;
let nroSlidesVent       = 0;
let anchoDeVentana      = 1200;

miBody.style.backgroundImage = "url("+IMG_BODY+")";

carouselSlds.innerHTML = "";

let contCarou   = 0;


/**
 * Lee los inputs de cantidad de slides, slides por ventana  ancho de ventana.
 */
function leeInputs() {
  nroTotalSlides = inNumSlides.value;
  nroSlidesVent  = inSldVent.value;
  if (inAnchoVent.value == "") {anchoDeVentana = 1200;}
  else {(anchoDeVentana = inAnchoVent.value);}
}

/**
 * Inicializa el Carousel antes de cargar todos los slides
 */
function inicializaCarousel() {
  carouselSlds.innerHTML    = "";
  carouselCont.style.width  = anchoDeVentana + "px";
  carouEncabezado.style.width = anchoDeVentana + "px";
  levCantSlides.textContent = "Cant. total de Slides a Mostrar";
  levSlidesVent.textContent = "Cant. de Slides en la Ventana";
  levAnchoVent.textContent  = "Ancho de Ventana (dflt 1200px)";
}

/**
 * Carga los slides en función de los parámetros ya verificados
 */
function cargaSlides() {
  let porcentaje = 100.0/nroSlidesVent;
  let valorFlex = "flex: 0 0 "+porcentaje+"%;";
  console.log(valorFlex);
  for (let i=0; i<nroTotalSlides;i++) {
      let img = IMGS [(i%10)];
      carouselSlds.innerHTML += `
      <div class="carousel-elem" style="${valorFlex}">
          <img src="${img}" alt="Imagen ${i+1}">
          <h5>Slide ${i+1}</h5>
      </div>  
      `;
  }
}

/**
 * Genera el Carousel basado en los datos ingresados
 */
function generaCarousel() {
    leeInputs();
    if((nroTotalSlides < MIN_SLIDES) || (nroTotalSlides > MAX_SLIDES)) {
        levCantSlides.textContent = "Cant. Total Slides Mostrar - ERROR! min: $"+MIN_SLIDES+" max: "+MAX_SLIDES;
    }
    else if((nroSlidesVent < MIN_SLIDES_VEN) || (nroSlidesVent > MAX_SLIDES_VEN)) {
        levSlidesVent.textContent = "Cant. Slides en Ventana - ERROR! min: $"+MIN_SLIDES_VEN+" max: "+MAX_SLIDES_VEN;
    }
    else if((anchoDeVentana < MIN_ANCHO_VEN) || (anchoDeVentana > MAX_ANCHO_VEN)) {
        levAnchoVent.textContent = "Ancho de Ventana [px] - ERROR! min: $"+MIN_ANCHO_VEN+" max: "+MAX_ANCHO_VEN;
        inAnchoVent.value = 1200;
    }  
    else {
        inicializaCarousel();
        cargaSlides();
        contCarou   = 0;
        carouselDesliza(-2);
    }   
}

/**
 * Realiza el deslizamiento de a un slide o al fina o ppio, según la dirección.
 * -1 izquierda, +1 derecha, -2 vuleve a inicio, +2 va al final y 0, desliza en forma continua
 * @param {number} direccion 
 */
function carouselDesliza(direccion) {
    const carouselElem = document.querySelectorAll('.carousel-elem');
    const itemWidth = anchoDeVentana / nroSlidesVent; //const itemWidth = carouselElem[0].offsetWidth; // No usado
    console.log("itWi:"+itemWidth);
    const containerWidth = carouselSlds.offsetWidth;
    console.log("coWi:"+containerWidth);
    const visibleItems = Math.floor(containerWidth / itemWidth);
    console.log("viIt:"+visibleItems);
    const totalItems = carouselElem.length;
    console.log("toIt:"+totalItems);
    const slidesToShow = Math.min(visibleItems, totalItems); // Calcula la cantidad de slides que se deben mostrar
    console.log("slTS:"+slidesToShow);
    const slideWidth = itemWidth * slidesToShow; // Calcular el desplazamiento en píxeles
    console.log("slWi:"+slideWidth);
    const slideOffset = direccion * slideWidth;
    console.log("slOf:"+slideOffset);
    const maxPosition = (totalItems - slidesToShow) * itemWidth;
    const minPosition = 0;
    console.log("mxPo:"+maxPosition);
    // USO ESTE ALGORITMO EN SU LUGAR , CON AGREGADO DE BOTON PARA IR AL FINAL O PPIO EN UN TOQUE.
    if ((direccion == 1)||(direccion == -1)){ 
      contCarou += direccion;
      console.log("coCa:"+contCarou);
      let contMax = (nroTotalSlides - nroSlidesVent) + 1;
      console.log("copru:"+contMax);
      if (contCarou == contMax) {contCarou--}
      else if (contCarou < 0){contCarou++};
      adjustedPosition = (itemWidth*contCarou);
      carouselSlds.style.transition = "transform 0.5s ease-in-out";
    }
    else if (direccion !=0) {
      if (direccion > 0) {
          adjustedPosition = (maxPosition);
          contCarou = (maxPosition/itemWidth);
        }
      else {
        adjustedPosition = (minPosition);
        contCarou = 0;
      }
      carouselSlds.style.transition = "transform 0.3s linear";
    }
    else {
      if ((adjustedPosition += itemWidth) > maxPosition) {
        adjustedPosition = (minPosition);
        carouselSlds.style.transition = "transform 0.0s linear";
      } 
      carouselSlds.style.transition = "transform 0.5s ease-in-out";
    }
    console.log("adPo2:"+adjustedPosition);
    carouselSlds.style.transform = `translateX(-${adjustedPosition}px)`; // Aplica transformación CSS para mover el carrusel
  }

/**
 * Llama al la función Deslizamiento con parametro = 0 >> "Deslizamiento Continuo"
 */
function mostrarSiguienteSlide() {
  carouselDesliza(0);
}
/**
 * Inicia el modo deslizamiento Continuo
 */
function carouselContinuo() {
    intervalo = setInterval(mostrarSiguienteSlide, 2000); // Mostrar siguiente Slide x 3 segundos
  }

/**
 * Detiene el deslizamiento Continuo
 */  
function carouselStop() {
  clearInterval(intervalo);
}


