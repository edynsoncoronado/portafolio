/* =============================================================
   Sonríe Perú — agendador de citas
   JavaScript vanilla, sin dependencias.

   El flujo tiene tres pasos de entrada y una confirmación:
     1. tratamiento + sede
     2. día + hora (la disponibilidad se calcula localmente)
     3. datos del paciente -> código de reserva + WhatsApp

   La disponibilidad es SIMULADA: se deriva de un hash estable de
   fecha+hora+sede, así la agenda se ve igual entre recargas pero no
   está conectada a ningún sistema real. Para producción, reemplaza
   `estaLibre()` y `reservar()` por llamadas al backend de la clínica.
   ============================================================= */

(function () {
  "use strict";

  /* ---------- Configuración ---------- */

  var WHATSAPP = "51987654321";          // número que recibe las reservas
  var DIAS_A_MOSTRAR = 14;               // días ofrecidos en la tira de fechas
  var ANTICIPACION_MIN = 90;             // minutos mínimos para reservar hoy
  var OCUPACION = 0.42;                  // 0 = todo libre, 1 = todo ocupado

  var TRATAMIENTOS = [
    { id: "consulta",   nombre: "Consulta y diagnóstico",  desc: "Evaluación clínica, radiografía y plan de tratamiento",    min: 30, precio: 60,   desde: false },
    { id: "limpieza",   nombre: "Limpieza y profilaxis",   desc: "Destartraje ultrasónico y pulido",                         min: 45, precio: 120,  desde: false },
    { id: "resina",     nombre: "Curación con resina",     desc: "Restauración estética por pieza",                          min: 45, precio: 150,  desde: true  },
    { id: "urgencia",   nombre: "Urgencia dental",         desc: "Dolor agudo, fractura o absceso — atención el mismo día",  min: 40, precio: 90,   desde: true  },
    { id: "ortodoncia", nombre: "Ortodoncia — evaluación", desc: "Estudio, fotos y presupuesto de brackets o alineadores",   min: 40, precio: 80,   desde: false },
    { id: "blanqueo",   nombre: "Blanqueamiento",          desc: "Sesión en consultorio con férulas de mantenimiento",       min: 75, precio: 450,  desde: false },
    { id: "endodoncia", nombre: "Endodoncia",              desc: "Tratamiento de conducto según pieza",                      min: 90, precio: 380,  desde: true  },
    { id: "implante",   nombre: "Implante dental",         desc: "Implante de titanio con corona de porcelana",              min: 90, precio: 2800, desde: true  },
    { id: "ninos",      nombre: "Odontopediatría",         desc: "Atención para niños de 3 a 12 años",                       min: 40, precio: 90,   desde: false }
  ];

  var DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  var MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "set", "oct", "nov", "dic"];

  /* ---------- Estado ---------- */

  var estado = { trat: null, sede: null, fecha: null, hora: null };
  var reservados = leerReservados();   // horarios que este navegador ya apartó

  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  /* ---------- Utilidades ---------- */

  function pad(n) { return String(n).padStart(2, "0"); }

  function claveFecha(d) {
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function fechaLarga(d) {
    return DIAS[d.getDay()] + " " + d.getDate() + " de " + MESES[d.getMonth()] + ".";
  }

  // Hash FNV-1a -> número estable en [0, 1). Da a la agenda un patrón de
  // ocupación que no cambia entre recargas.
  function hash01(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0) / 4294967296;
  }

  function leerReservados() {
    try {
      var raw = localStorage.getItem("sp-reservados");
      var val = raw ? JSON.parse(raw) : [];
      return Array.isArray(val) ? val : [];
    } catch (e) {
      return [];
    }
  }

  function guardarReservado(clave) {
    reservados.push(clave);
    try {
      localStorage.setItem("sp-reservados", JSON.stringify(reservados));
    } catch (e) {
      /* modo privado o almacenamiento bloqueado: la reserva sigue funcionando */
    }
  }

  /* ---------- Disponibilidad ---------- */

  function proximosDias(cantidad) {
    var salida = [];
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    var guarda = 0;
    while (salida.length < cantidad && guarda++ < 60) {
      if (d.getDay() !== 0) salida.push(new Date(d));   // la clínica cierra domingos
      d.setDate(d.getDate() + 1);
    }
    return salida;
  }

  function horariosDe(fecha) {
    var esSabado = fecha.getDay() === 6;
    var manana = [];
    var tarde = [];
    var h, m;

    for (h = 9; h < 13; h++) for (m = 0; m < 60; m += 30) manana.push(pad(h) + ":" + pad(m));

    if (esSabado) {
      // Sábados: 09:00 a 14:00 corrido, sin turno de tarde.
      for (m = 0; m < 60; m += 30) manana.push("13:" + pad(m));
    } else {
      for (h = 15; h < 20; h++) for (m = 0; m < 60; m += 30) tarde.push(pad(h) + ":" + pad(m));
    }

    return { manana: manana, tarde: tarde };
  }

  function estaLibre(fecha, hora) {
    var clave = claveFecha(fecha) + " " + hora;

    if (reservados.indexOf(clave) !== -1) return false;

    var ahora = new Date();
    if (claveFecha(fecha) === claveFecha(ahora)) {
      var partes = hora.split(":");
      var cuando = new Date(fecha);
      cuando.setHours(Number(partes[0]), Number(partes[1]), 0, 0);
      if (cuando - ahora < ANTICIPACION_MIN * 60 * 1000) return false;
    }

    return hash01(clave + "|" + (estado.sede || "")) > OCUPACION;
  }

  function contarLibres(fecha) {
    var turnos = horariosDe(fecha);
    return turnos.manana.concat(turnos.tarde).filter(function (h) {
      return estaLibre(fecha, h);
    }).length;
  }

  /* ---------- Render: paso 1 ---------- */

  function renderChips() {
    var cont = $("#chips");
    TRATAMIENTOS.forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = t.nombre;
      b.dataset.id = t.id;
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () { elegirTratamiento(t.id); });
      cont.appendChild(b);
    });
  }

  function elegirTratamiento(id) {
    estado.trat = TRATAMIENTOS.filter(function (t) { return t.id === id; })[0] || null;
    $$("#chips .chip").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.id === id));
    });
    $("#go1").disabled = !estado.trat;
  }

  /* ---------- Render: paso 2 ---------- */

  function renderDias() {
    var cont = $("#days");
    cont.innerHTML = "";
    var dias = proximosDias(DIAS_A_MOSTRAR);

    dias.forEach(function (d) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "day";
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("aria-label", DIAS[d.getDay()] + " " + d.getDate() + " de " + MESES[d.getMonth()]);
      b.innerHTML = "<u>" + DIAS[d.getDay()] + "</u><b>" + d.getDate() + "</b><i>" + MESES[d.getMonth()] + "</i>";
      b.addEventListener("click", function () { elegirDia(d, b); });
      cont.appendChild(b);
    });

    // Preselecciona el primer día con horarios libres, no simplemente hoy:
    // avanzada la tarde, hoy suele estar agotado y el panel abriría vacío.
    var i = 0;
    while (i < dias.length - 1 && contarLibres(dias[i]) === 0) i++;
    elegirDia(dias[i], cont.children[i]);

    cont.children[i].scrollIntoView({ block: "nearest", inline: "start" });
  }

  function elegirDia(d, btn) {
    estado.fecha = d;
    estado.hora = null;
    $$("#days .day").forEach(function (x) { x.setAttribute("aria-pressed", String(x === btn)); });
    renderHorarios();
    $("#go2").disabled = true;
  }

  function renderHorarios() {
    var wrap = $("#slotWrap");
    wrap.innerHTML = "";

    var turnos = horariosDe(estado.fecha);
    var libres = 0;

    [["Mañana", turnos.manana], ["Tarde", turnos.tarde]].forEach(function (par) {
      var titulo = par[0];
      var horas = par[1];
      if (!horas.length) return;

      var grupo = document.createElement("div");
      grupo.className = "slot-group";
      grupo.innerHTML = '<div class="slot-head"><span>' + titulo + '</span><hr></div>';

      var grid = document.createElement("div");
      grid.className = "slots";

      horas.forEach(function (h) {
        var ok = estaLibre(estado.fecha, h);
        if (ok) libres++;

        var b = document.createElement("button");
        b.type = "button";
        b.className = "slot";
        b.textContent = h;
        b.disabled = !ok;
        b.setAttribute("aria-pressed", "false");
        if (!ok) b.setAttribute("aria-label", h + " — ocupado");

        b.addEventListener("click", function () {
          estado.hora = h;
          $$(".slot").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
          $("#go2").disabled = false;
        });

        grid.appendChild(b);
      });

      grupo.appendChild(grid);
      wrap.appendChild(grupo);
    });

    $("#freeCount").textContent = libres ? "— quedan " + libres : "";

    if (!libres) {
      wrap.innerHTML = '<p class="note">No quedan horarios ese día. Elige otra fecha o escríbenos al WhatsApp y buscamos un espacio.</p>';
    }
  }

  /* ---------- Render: paso 3 ---------- */

  function renderResumen() {
    var t = estado.trat;
    var precio = "S/ " + t.precio.toLocaleString("es-PE");

    $("#sum").innerHTML =
      '<div><dt>Tratamiento</dt><dd>' + t.nombre + '</dd></div>' +
      '<div><dt>Fecha y hora</dt><dd>' + fechaLarga(estado.fecha) + " " + estado.hora + '</dd></div>' +
      '<div><dt>Duración</dt><dd>' + t.min + ' min</dd></div>' +
      '<div><dt>Sede</dt><dd>' + estado.sede.split("—")[0].trim() + '</dd></div>' +
      '<div><dt>Referencial</dt><dd>' + (t.desde ? "desde " : "") + precio + '</dd></div>';
  }

  function validar() {
    var nombre = $("#nombre").value.trim();
    var tel = $("#tel").value.replace(/\D/g, "");
    if (nombre.length < 3) return "Escribe tu nombre y apellido para reservar el espacio.";
    if (tel.length < 9) return "El celular necesita 9 dígitos — ahí te enviamos la confirmación.";
    return null;
  }

  function generarCodigo(fecha) {
    return "SP-" + pad(fecha.getMonth() + 1) + pad(fecha.getDate()) + "-" +
           String(Math.floor(1000 + Math.random() * 9000));
  }

  function reservar() {
    var problema = validar();
    var err = $("#err");

    if (problema) {
      err.textContent = problema;
      err.hidden = false;
      return;
    }
    err.hidden = true;

    var t = estado.trat;
    var ref = generarCodigo(estado.fecha);
    var nombre = $("#nombre").value.trim();
    var tel = $("#tel").value.trim();
    var notas = $("#notas").value.trim();

    guardarReservado(claveFecha(estado.fecha) + " " + estado.hora);

    $("#doneText").innerHTML =
      "Tu espacio del <strong>" + fechaLarga(estado.fecha) + " a las " + estado.hora +
      "</strong> queda apartado para " + t.nombre.toLowerCase() +
      ". Envíanos el mensaje para que recepción lo confirme.";
    $("#code").textContent = ref;

    var mensaje =
      "Hola Sonríe Perú, quiero confirmar mi cita.\n" +
      "Código: " + ref + "\n" +
      "Nombre: " + nombre + "\n" +
      "Celular: " + tel + "\n" +
      "Tratamiento: " + t.nombre + "\n" +
      "Fecha: " + fechaLarga(estado.fecha) + " " + estado.hora + "\n" +
      "Sede: " + estado.sede +
      (notas ? "\nNota: " + notas : "");

    $("#wa").href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensaje);

    irAPaso(4);
  }

  /* ---------- Navegación entre pasos ---------- */

  function irAPaso(n) {
    [1, 2, 3, 4].forEach(function (i) {
      $("#s" + i).classList.toggle("on", i === n);
    });
    $("#bar").style.width = (n >= 4 ? 100 : n * 33.4) + "%";
    $("#stepLabel").textContent = n >= 4 ? "Listo" : "Paso " + n + " de 3";
  }

  /* ---------- Lista de tratamientos (sección) ---------- */

  function renderTratamientos() {
    var cont = $("#tlist");

    TRATAMIENTOS.forEach(function (t) {
      var row = document.createElement("div");
      row.className = "trow";
      row.innerHTML =
        '<h3>' + t.nombre + '<small>' + t.desc + '</small></h3>' +
        '<span class="tmeta">' + t.min + ' min</span>' +
        '<span class="tprice">S/ ' + t.precio.toLocaleString("es-PE") +
          '<small>' + (t.desde ? "desde" : "precio fijo") + '</small></span>';

      var b = document.createElement("button");
      b.type = "button";
      b.className = "tbook";
      b.textContent = "Agendar →";
      b.setAttribute("aria-label", "Agendar " + t.nombre);
      b.addEventListener("click", function () {
        elegirTratamiento(t.id);
        irAPaso(1);
        $("#agendar").scrollIntoView({ behavior: "smooth", block: "start" });
      });

      row.appendChild(b);
      cont.appendChild(row);
    });
  }

  /* ---------- Arranque ---------- */

  function init() {
    renderChips();
    renderTratamientos();

    estado.sede = $("#sede").value;

    $("#sede").addEventListener("change", function () {
      estado.sede = this.value;
      if (estado.fecha) {
        estado.hora = null;
        renderHorarios();
        $("#go2").disabled = true;
      }
    });

    $("#go1").addEventListener("click", function () {
      estado.sede = $("#sede").value;
      if (!$("#days").children.length) renderDias();
      else renderHorarios();
      irAPaso(2);
    });

    $("#go2").addEventListener("click", function () {
      renderResumen();
      irAPaso(3);
    });

    $("#go3").addEventListener("click", reservar);

    $("#reset").addEventListener("click", function () {
      estado.hora = null;
      $("#nombre").value = "";
      $("#tel").value = "";
      $("#notas").value = "";
      $("#err").hidden = true;
      renderHorarios();
      $("#go2").disabled = true;
      irAPaso(2);
    });

    $$("[data-back]").forEach(function (b) {
      b.addEventListener("click", function () { irAPaso(Number(b.dataset.back)); });
    });

    // Revelado suave de secciones al hacer scroll.
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      }, { rootMargin: "0px 0px -12% 0px" });
      $$(".reveal").forEach(function (el) { io.observe(el); });
    } else {
      $$(".reveal").forEach(function (el) { el.classList.add("in"); });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
