/* ==========================================================================
   Siembras del Valle — armador de pedido
   Todo corre en el cliente. No hay backend: el pedido se entrega por WhatsApp.
   Para producción, reemplazar enviarPedido() por una llamada real al servidor.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     Catálogo. Precios referenciales en soles, IGV incluido.
     Fuente única: de acá salen la calculadora, el selector y la lista de precios.
     --------------------------------------------------------------------- */
  var CATALOGO = [
    { id: "cemento",     nom: "Cemento Sol tipo I",            uni: "bolsa 42.5 kg", precio: 32.50, dec: 0, stock: "si" },
    { id: "arenagruesa", nom: "Arena gruesa",                  uni: "m³",            precio: 78.00, dec: 2, stock: "si" },
    { id: "arenafina",   nom: "Arena fina",                    uni: "m³",            precio: 85.00, dec: 2, stock: "si" },
    { id: "piedra",      nom: "Piedra chancada 1/2\"",         uni: "m³",            precio: 95.00, dec: 2, stock: "si" },
    { id: "kk",          nom: "Ladrillo King Kong 18 huecos",  uni: "unidad",        precio:  1.15, dec: 0, stock: "si" },
    { id: "pandereta",   nom: "Ladrillo pandereta",            uni: "unidad",        precio:  1.05, dec: 0, stock: "si" },
    { id: "techo15",     nom: "Ladrillo de techo 15 cm",       uni: "unidad",        precio:  3.20, dec: 0, stock: "poco" },
    { id: "fierro12",    nom: "Fierro corrugado 1/2\" × 9 m",  uni: "varilla",       precio: 42.00, dec: 0, stock: "si" },
    { id: "fierro38",    nom: "Fierro corrugado 3/8\" × 9 m",  uni: "varilla",       precio: 24.50, dec: 0, stock: "si" },
    { id: "alambre16",   nom: "Alambre negro #16",             uni: "kg",            precio:  6.50, dec: 0, stock: "si" },
    { id: "clavos",      nom: "Clavos de 3\"",                 uni: "kg",            precio:  6.20, dec: 0, stock: "si" },
    { id: "triplay",     nom: "Triplay fenólico 18 mm",        uni: "plancha",       precio: 145.00, dec: 0, stock: "poco" },
    { id: "porcelanato", nom: "Porcelanato 60 × 60 cm",        uni: "m²",            precio: 46.90, dec: 2, stock: "si" },
    { id: "fragua",      nom: "Fragua para porcelanato",       uni: "bolsa 1 kg",    precio:  9.50, dec: 0, stock: "si" },
    { id: "yeso",        nom: "Yeso cerámico",                 uni: "bolsa 18 kg",   precio: 14.80, dec: 0, stock: "si" }
  ];

  /* Rendimientos por m². Estimados de obra usados en Lima Sur, no metrado de plano. */
  var RECETAS = {
    cimentacion: {
      hint: "de área techada en planta",
      items: { cemento: 0.90, arenagruesa: 0.06, piedra: 0.07, fierro12: 1.80, fierro38: 1.20, alambre16: 0.30, clavos: 0.20 }
    },
    muros: {
      hint: "de muro a levantar",
      items: { kk: 39, cemento: 0.22, arenafina: 0.03 }
    },
    techo: {
      hint: "de losa a vaciar",
      items: { cemento: 0.85, arenagruesa: 0.05, piedra: 0.06, techo15: 8.5, fierro12: 2.20, fierro38: 1.40, alambre16: 0.25, triplay: 0.12 }
    },
    acabados: {
      hint: "de piso y pared a terminar",
      items: { cemento: 0.35, arenafina: 0.04, porcelanato: 1.05, fragua: 0.25, yeso: 0.60 }
    }
  };

  var DISTRITOS = [
    { id: "ves",     nom: "Villa El Salvador",      flete:  60 },
    { id: "lurin",   nom: "Lurín",                  flete:  60 },
    { id: "vmt",     nom: "Villa María del Triunfo", flete: 70 },
    { id: "sjm",     nom: "San Juan de Miraflores", flete:  80 },
    { id: "pacha",   nom: "Pachacámac",             flete:  90 },
    { id: "chorri",  nom: "Chorrillos",             flete:  95 },
    { id: "surco",   nom: "Santiago de Surco",      flete: 110 },
    { id: "ate",     nom: "Ate",                    flete: 150 },
    { id: "sjl",     nom: "San Juan de Lurigancho", flete: 160 },
    { id: "otro",    nom: "Otro distrito de Lima",  flete: 180 }
  ];

  var TURNOS = [
    { id: "am", nom: "Mañana", hor: "7:00 a.m. – 12:00 m.", corte: 10 },
    { id: "pm", nom: "Tarde",  hor: "1:00 p.m. – 5:00 p.m.", corte: 15 }
  ];

  var WHATSAPP = "51987654321";
  var LS_KEY = "sdv-pedido-v1";
  var DOW = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  var MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "set", "oct", "nov", "dic"];

  /* ---------------------------------------------------------------------
     Utilidades
     --------------------------------------------------------------------- */
  function $(sel, raiz) { return (raiz || document).querySelector(sel); }

  function soles(n) {
    return "S/ " + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function prod(id) {
    for (var i = 0; i < CATALOGO.length; i++) {
      if (CATALOGO[i].id === id) return CATALOGO[i];
    }
    return null;
  }

  function techo(n, dec) {
    var f = Math.pow(10, dec);
    return Math.ceil(n * f) / f;
  }

  /* FNV-1a: ocupación estable entre recargas, para que la agenda no baile. */
  function fnv(txt) {
    var h = 0x811c9dc5;
    for (var i = 0; i < txt.length; i++) {
      h ^= txt.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h >>> 0;
  }

  function iso(d) {
    var m = String(d.getMonth() + 1);
    var dd = String(d.getDate());
    return d.getFullYear() + "-" + (m.length < 2 ? "0" + m : m) + "-" + (dd.length < 2 ? "0" + dd : dd);
  }

  function deIso(s) {
    var p = s.split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  /* ---------------------------------------------------------------------
     Estado
     --------------------------------------------------------------------- */
  var estado = {
    paso: 1,
    etapa: "cimentacion",
    m2: 60,
    items: [],
    modo: "despacho",
    distrito: "",
    direccion: "",
    fecha: "",
    turno: "",
    cliente: "familia",
    nombre: "",
    celular: "",
    factura: false,
    ruc: "",
    nota: ""
  };

  function guardar() {
    try {
      window.localStorage.setItem(LS_KEY, JSON.stringify(estado));
    } catch (e) {
      /* Modo privado o almacenamiento lleno: el pedido sigue funcionando en memoria. */
    }
  }

  function restaurar() {
    try {
      var crudo = window.localStorage.getItem(LS_KEY);
      if (!crudo) return;
      var v = JSON.parse(crudo);
      if (!v || typeof v !== "object") return;
      Object.keys(estado).forEach(function (k) {
        if (Object.prototype.hasOwnProperty.call(v, k) && v[k] !== null && typeof v[k] !== "undefined") {
          estado[k] = v[k];
        }
      });
      estado.paso = 1;
      if (!Array.isArray(estado.items)) estado.items = [];
      estado.items = estado.items.filter(function (it) { return prod(it.id); });
    } catch (e) {
      /* Dato corrupto o storage bloqueado: arrancamos limpio. */
    }
  }

  function limpiarStorage() {
    try { window.localStorage.removeItem(LS_KEY); } catch (e) { /* sin storage, nada que limpiar */ }
  }

  /* ---------------------------------------------------------------------
     Cálculo
     --------------------------------------------------------------------- */
  function calcularDesdeEtapa() {
    var receta = RECETAS[estado.etapa];
    var m2 = estado.m2;
    var nuevos = [];
    Object.keys(receta.items).forEach(function (id) {
      var p = prod(id);
      if (!p) return;
      var cant = techo(receta.items[id] * m2, p.dec);
      if (cant > 0) nuevos.push({ id: id, cant: cant });
    });
    estado.items = nuevos;
  }

  function totalMateriales() {
    return estado.items.reduce(function (acc, it) {
      var p = prod(it.id);
      return acc + (p ? p.precio * it.cant : 0);
    }, 0);
  }

  function costoFlete() {
    if (estado.modo !== "despacho") return 0;
    for (var i = 0; i < DISTRITOS.length; i++) {
      if (DISTRITOS[i].id === estado.distrito) return DISTRITOS[i].flete;
    }
    return 0;
  }

  function totalPedido() { return totalMateriales() + costoFlete(); }

  /* ---------------------------------------------------------------------
     Agenda de entrega
     --------------------------------------------------------------------- */
  function turnoOcupado(isoFecha, turnoId) {
    return fnv(isoFecha + "|" + turnoId) % 100 < 32;
  }

  /* Un turno está disponible si el almacén abre, no está copado y todavía da tiempo. */
  function turnoLibre(isoFecha, turnoId) {
    var d = deIso(isoFecha);
    var dow = d.getDay();
    if (dow === 0) return false;                       // domingo cerrado
    if (dow === 6 && turnoId === "pm") return false;   // sábado solo mañana
    if (turnoOcupado(isoFecha, turnoId)) return false;

    var ahora = new Date();
    if (iso(ahora) === isoFecha) {
      var t = null;
      for (var i = 0; i < TURNOS.length; i++) { if (TURNOS[i].id === turnoId) t = TURNOS[i]; }
      if (!t) return false;
      var corte = dow === 6 ? 11 : t.corte;            // sábado se corta a las 11
      if (ahora.getHours() >= corte) return false;     // ya no da tiempo de despachar
    }
    return true;
  }

  function diaTieneCupo(isoFecha) {
    return TURNOS.some(function (t) { return turnoLibre(isoFecha, t.id); });
  }

  /* Días visibles: los próximos hábiles con al menos un turno libre. Nunca "hoy" a secas. */
  function diasDisponibles() {
    var salida = [];
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    for (var i = 0; i < 21 && salida.length < 10; i++) {
      var f = new Date(d.getTime());
      f.setDate(d.getDate() + i);
      var s = iso(f);
      if (f.getDay() !== 0 && diaTieneCupo(s)) salida.push(s);
    }
    return salida;
  }

  /* ---------------------------------------------------------------------
     Pintado
     --------------------------------------------------------------------- */
  var el = {};

  function pintarListaPrecios() {
    var cuerpo = el.preciosBody;
    if (!cuerpo) return;
    cuerpo.innerHTML = "";
    CATALOGO.forEach(function (p) {
      var tr = document.createElement("tr");

      var th = document.createElement("th");
      th.setAttribute("scope", "row");
      th.textContent = p.nom;

      var tdU = document.createElement("td");
      tdU.className = "pres";
      tdU.textContent = p.uni;

      var tdP = document.createElement("td");
      tdP.className = "num";
      tdP.textContent = soles(p.precio);

      var tdS = document.createElement("td");
      var tag = document.createElement("span");
      tag.className = "stock " + (p.stock === "si" ? "stock-si" : "stock-poco");
      tag.textContent = p.stock === "si" ? "En piso" : "Poco stock";
      tdS.appendChild(tag);

      tr.appendChild(th);
      tr.appendChild(tdU);
      tr.appendChild(tdP);
      tr.appendChild(tdS);
      cuerpo.appendChild(tr);
    });
  }

  function pintarFlete() {
    if (!el.fleteBody) return;
    el.fleteBody.innerHTML = "";
    DISTRITOS.forEach(function (d) {
      var tr = document.createElement("tr");
      var th = document.createElement("th");
      th.setAttribute("scope", "row");
      th.textContent = d.nom;
      var td = document.createElement("td");
      td.className = "num";
      td.textContent = soles(d.flete);
      tr.appendChild(th);
      tr.appendChild(td);
      el.fleteBody.appendChild(tr);
    });
  }

  function pintarSelectores() {
    el.addSel.innerHTML = "";
    var vacio = document.createElement("option");
    vacio.value = "";
    vacio.textContent = "Elige un producto…";
    el.addSel.appendChild(vacio);
    CATALOGO.forEach(function (p) {
      var o = document.createElement("option");
      o.value = p.id;
      o.textContent = p.nom + " · " + soles(p.precio) + " / " + p.uni;
      el.addSel.appendChild(o);
    });

    el.distrito.innerHTML = "";
    var v2 = document.createElement("option");
    v2.value = "";
    v2.textContent = "Elige el distrito…";
    el.distrito.appendChild(v2);
    DISTRITOS.forEach(function (d) {
      var o = document.createElement("option");
      o.value = d.id;
      o.textContent = d.nom + " — flete " + soles(d.flete);
      el.distrito.appendChild(o);
    });
    el.distrito.value = estado.distrito;
  }

  function pintarLista() {
    el.listaBody.innerHTML = "";

    if (!estado.items.length) {
      var tr0 = document.createElement("tr");
      var td0 = document.createElement("td");
      td0.colSpan = 5;
      td0.className = "lista-vacia";
      td0.textContent = "Tu lista está vacía. Elige una etapa y pon los metros, o agrega productos uno por uno.";
      tr0.appendChild(td0);
      el.listaBody.appendChild(tr0);
    }

    estado.items.forEach(function (it, idx) {
      var p = prod(it.id);
      if (!p) return;
      var tr = document.createElement("tr");
      tr.setAttribute("data-fila", p.id);

      var tdN = document.createElement("td");
      var nom = document.createElement("span");
      nom.className = "it-nom";
      nom.textContent = p.nom;
      var uni = document.createElement("span");
      uni.className = "it-uni";
      uni.textContent = p.uni;
      tdN.appendChild(nom);
      tdN.appendChild(uni);

      var tdC = document.createElement("td");
      tdC.className = "num";
      var inp = document.createElement("input");
      inp.type = "number";
      inp.className = "cant";
      inp.min = "0";
      inp.step = p.dec === 0 ? "1" : "0.01";
      inp.value = String(it.cant);
      inp.setAttribute("aria-label", "Cantidad de " + p.nom + " en " + p.uni);
      inp.setAttribute("data-idx", String(idx));
      tdC.appendChild(inp);

      var tdP = document.createElement("td");
      tdP.className = "num pu";
      tdP.textContent = soles(p.precio);

      var tdS = document.createElement("td");
      tdS.className = "num sub";
      tdS.textContent = soles(p.precio * it.cant);

      var tdX = document.createElement("td");
      tdX.className = "num";
      var bx = document.createElement("button");
      bx.type = "button";
      bx.className = "quitar";
      bx.textContent = "×";
      bx.setAttribute("aria-label", "Quitar " + p.nom + " del pedido");
      bx.setAttribute("data-quitar", String(idx));
      tdX.appendChild(bx);

      tr.appendChild(tdN);
      tr.appendChild(tdC);
      tr.appendChild(tdP);
      tr.appendChild(tdS);
      tr.appendChild(tdX);
      el.listaBody.appendChild(tr);
    });

    pintarTotales();
  }

  function pintarTotales() {
    var mat = totalMateriales();
    var fl = costoFlete();
    el.total1.textContent = soles(mat);
    el.totalMat.textContent = soles(mat);
    el.totalFlete.textContent = estado.modo === "despacho"
      ? (estado.distrito ? soles(fl) : "Falta el distrito")
      : "Sin flete";
    el.total2.textContent = soles(mat + fl);
    el.total3.textContent = soles(mat + fl);
    if (el.bmTxt) {
      el.bmTxt.textContent = mat > 0 ? "Tu lista: " + soles(mat + fl) : "Calcula tu material";
    }
  }

  function pintarDias() {
    var dias = diasDisponibles();
    el.dias.innerHTML = "";

    if (estado.fecha && dias.indexOf(estado.fecha) === -1) {
      estado.fecha = "";
      estado.turno = "";
    }
    if (!estado.fecha && dias.length) estado.fecha = dias[0];

    dias.forEach(function (s) {
      var d = deIso(s);
      var b = document.createElement("button");
      b.type = "button";
      b.className = "dia";
      b.setAttribute("data-iso", s);
      b.setAttribute("aria-pressed", estado.fecha === s ? "true" : "false");

      var dow = document.createElement("span");
      dow.className = "d-dow";
      dow.textContent = DOW[d.getDay()];
      var num = document.createElement("span");
      num.className = "d-num";
      num.textContent = String(d.getDate());
      var mes = document.createElement("span");
      mes.className = "d-mes";
      mes.textContent = MES[d.getMonth()];

      b.appendChild(dow);
      b.appendChild(num);
      b.appendChild(mes);
      el.dias.appendChild(b);
    });

    pintarTurnos();
  }

  function pintarTurnos() {
    el.turnos.innerHTML = "";
    if (!estado.fecha) return;

    var libres = TURNOS.filter(function (t) { return turnoLibre(estado.fecha, t.id); });
    if (estado.turno && libres.map(function (t) { return t.id; }).indexOf(estado.turno) === -1) {
      estado.turno = "";
    }
    if (!estado.turno && libres.length) estado.turno = libres[0].id;

    TURNOS.forEach(function (t) {
      var d = deIso(estado.fecha);
      var cerrado = d.getDay() === 6 && t.id === "pm";
      var libre = turnoLibre(estado.fecha, t.id);

      var b = document.createElement("button");
      b.type = "button";
      b.className = "turno";
      b.setAttribute("data-turno", t.id);
      b.setAttribute("aria-pressed", estado.turno === t.id ? "true" : "false");
      if (!libre) b.disabled = true;

      var nom = document.createElement("span");
      nom.className = "t-nom";
      nom.textContent = t.nom;
      var hor = document.createElement("span");
      hor.className = "t-hor";
      hor.textContent = libre ? t.hor : (cerrado ? "Sábado no hay tarde" : "Copado");

      b.appendChild(nom);
      b.appendChild(hor);
      el.turnos.appendChild(b);
    });
  }

  function pintarPaso() {
    [1, 2, 3].forEach(function (n) {
      el["paso" + n].hidden = estado.paso !== n;
    });
    el.conf.hidden = estado.paso !== 4;
    el.form.hidden = estado.paso === 4;

    if (estado.paso <= 3) {
      el.pasoLabel.textContent = "Paso " + estado.paso + " de 3";
      el.barFill.style.width = (estado.paso * 33.33) + "%";
    } else {
      el.pasoLabel.textContent = "Pedido listo";
      el.barFill.style.width = "100%";
    }
  }

  function pintarEntrega() {
    var esDespacho = estado.modo === "despacho";
    el.despachoCampos.hidden = !esDespacho;
    el.recojoAviso.hidden = esDespacho;
    pintarTotales();
  }

  /* ---------------------------------------------------------------------
     Validación
     --------------------------------------------------------------------- */
  function marcar(campoId, errId, mensaje) {
    var err = document.getElementById(errId);
    if (err) err.textContent = mensaje || "";
    var campo = campoId ? document.getElementById(campoId) : null;
    if (campo && campo.parentNode) {
      if (mensaje) campo.parentNode.classList.add("campo-mal");
      else campo.parentNode.classList.remove("campo-mal");
    }
  }

  function validarPaso1() {
    marcar("m2", "err-m2", "");
    marcar(null, "err-lista", "");
    if (!estado.items.length) {
      marcar(null, "err-lista", "Tu lista está vacía. Pon los metros y recalcula, o agrega un producto.");
      return false;
    }
    if (totalMateriales() <= 0) {
      marcar(null, "err-lista", "Todas las cantidades están en cero. Pon cuánto necesitas de al menos un material.");
      return false;
    }
    return true;
  }

  function validarPaso2() {
    var ok = true;
    marcar("distrito", "err-distrito", "");
    marcar("direccion", "err-direccion", "");
    marcar(null, "err-fecha", "");

    if (estado.modo === "despacho") {
      if (!estado.distrito) {
        marcar("distrito", "err-distrito", "Elige el distrito de la obra para calcular el flete.");
        ok = false;
      }
      if (estado.direccion.trim().length < 6) {
        marcar("direccion", "err-direccion", "Escribe la dirección o una referencia: el chofer necesita saber dónde parar.");
        ok = false;
      }
    }
    if (!estado.fecha || !estado.turno) {
      marcar(null, "err-fecha", "Elige el día y el turno de entrega.");
      ok = false;
    }
    return ok;
  }

  function validarPaso3() {
    var ok = true;
    marcar("nombre", "err-nombre", "");
    marcar("celular", "err-celular", "");
    marcar("ruc", "err-ruc", "");

    if (estado.nombre.trim().length < 3) {
      marcar("nombre", "err-nombre", "Pon tu nombre para saber a quién entregamos.");
      ok = false;
    }
    var cel = estado.celular.replace(/\D/g, "");
    if (cel.length !== 9) {
      marcar("celular", "err-celular", "El celular necesita 9 dígitos. Van " + cel.length + ".");
      ok = false;
    } else if (cel.charAt(0) !== "9") {
      marcar("celular", "err-celular", "Los celulares en Perú empiezan con 9.");
      ok = false;
    }
    if (estado.factura) {
      var ruc = estado.ruc.replace(/\D/g, "");
      if (ruc.length !== 11) {
        marcar("ruc", "err-ruc", "El RUC necesita 11 dígitos. Van " + ruc.length + ".");
        ok = false;
      } else if (ruc.charAt(0) !== "1" && ruc.charAt(0) !== "2") {
        marcar("ruc", "err-ruc", "Un RUC peruano empieza con 10, 15, 17 o 20.");
        ok = false;
      }
    }
    return ok;
  }

  /* ---------------------------------------------------------------------
     Confirmación
     --------------------------------------------------------------------- */
  function codigoPedido() {
    var base = estado.nombre + estado.celular + estado.fecha + estado.turno + String(totalPedido());
    var h = fnv(base).toString(36).toUpperCase();
    var h2 = fnv(base + "|sdv").toString(36).toUpperCase();
    return "SV-" + (h + "0000").slice(0, 4) + "-" + (h2 + "0000").slice(0, 4);
  }

  function fechaLarga(s) {
    var d = deIso(s);
    return DOW[d.getDay()] + " " + d.getDate() + " de " + MES[d.getMonth()];
  }

  function nombreTurno(id) {
    for (var i = 0; i < TURNOS.length; i++) { if (TURNOS[i].id === id) return TURNOS[i].nom + " (" + TURNOS[i].hor + ")"; }
    return "";
  }

  function nombreDistrito(id) {
    for (var i = 0; i < DISTRITOS.length; i++) { if (DISTRITOS[i].id === id) return DISTRITOS[i].nom; }
    return "";
  }

  function lineasPedido() {
    return estado.items.map(function (it) {
      var p = prod(it.id);
      return "• " + p.nom + " — " + it.cant + " " + p.uni + " = " + soles(p.precio * it.cant);
    });
  }

  function mensajeWhatsApp(cod) {
    var l = [];
    l.push("Hola Siembras del Valle, quiero hacer este pedido.");
    l.push("Código: " + cod);
    l.push("");
    l.push(lineasPedido().join("\n"));
    l.push("");
    if (estado.modo === "despacho") {
      l.push("Entrega: despacho a obra en " + nombreDistrito(estado.distrito));
      l.push("Dirección: " + estado.direccion);
      l.push("Flete: " + soles(costoFlete()));
    } else {
      l.push("Entrega: recojo en almacén Villa El Salvador");
    }
    l.push("Fecha: " + fechaLarga(estado.fecha) + ", " + nombreTurno(estado.turno));
    l.push("Total: " + soles(totalPedido()));
    l.push("");
    l.push("A nombre de: " + estado.nombre + " (" + estado.celular + ")");
    l.push(estado.cliente === "maestro" ? "Soy maestro/contratista." : "Compra para mi casa.");
    if (estado.factura) l.push("Con factura, RUC " + estado.ruc + ".");
    if (estado.nota.trim()) l.push("Nota: " + estado.nota.trim());
    return l.join("\n");
  }

  function filaResumen(dt, dd) {
    var div = document.createElement("div");
    var a = document.createElement("dt");
    a.textContent = dt;
    var b = document.createElement("dd");
    b.textContent = dd;
    div.appendChild(a);
    div.appendChild(b);
    return div;
  }

  /* MAQUETA: no hay servidor. Reemplazar esta función por un POST real al backend
     y dejar el enlace de WhatsApp solo como respaldo. */
  function enviarPedido() {
    var cod = codigoPedido();
    el.confNombre.textContent = estado.nombre.trim().split(/\s+/)[0] || "vecino";
    el.confCod.textContent = cod;

    el.confResumen.innerHTML = "";
    el.confResumen.appendChild(filaResumen("Materiales", String(estado.items.length) + " ítems · " + soles(totalMateriales())));
    if (estado.modo === "despacho") {
      el.confResumen.appendChild(filaResumen("Despacho a", nombreDistrito(estado.distrito)));
      el.confResumen.appendChild(filaResumen("Flete", soles(costoFlete())));
    } else {
      el.confResumen.appendChild(filaResumen("Recojo en", "Almacén Villa El Salvador"));
    }
    el.confResumen.appendChild(filaResumen("Entrega", fechaLarga(estado.fecha) + " · " + nombreTurno(estado.turno)));
    if (estado.factura) el.confResumen.appendChild(filaResumen("Factura", "RUC " + estado.ruc));
    el.confResumen.appendChild(filaResumen("Total", soles(totalPedido())));

    el.waLink.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensajeWhatsApp(cod));

    estado.paso = 4;
    pintarPaso();
    guardar();
  }

  function reiniciar() {
    estado.paso = 1;
    estado.items = [];
    estado.direccion = "";
    estado.nombre = "";
    estado.celular = "";
    estado.factura = false;
    estado.ruc = "";
    estado.nota = "";
    estado.fecha = "";
    estado.turno = "";
    limpiarStorage();

    el.nombre.value = "";
    el.celular.value = "";
    el.ruc.value = "";
    el.nota.value = "";
    el.direccion.value = "";
    el.factura.checked = false;
    el.rucCampo.hidden = true;

    calcularDesdeEtapa();
    pintarLista();
    pintarDias();
    pintarPaso();
  }

  /* ---------------------------------------------------------------------
     Tema
     --------------------------------------------------------------------- */
  function aplicarTema(modo) {
    var raiz = document.documentElement;
    if (modo === "dark" || modo === "light") raiz.setAttribute("data-theme", modo);
    else raiz.removeAttribute("data-theme");

    var oscuro = modo === "dark" ||
      (modo !== "light" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    el.themeBtn.setAttribute("aria-pressed", oscuro ? "true" : "false");
    el.themeTxt.textContent = oscuro ? "Modo claro" : "Modo oscuro";
  }

  function temaGuardado() {
    try { return window.localStorage.getItem("sdv-tema"); } catch (e) { return null; }
  }

  /* ---------------------------------------------------------------------
     Arranque
     --------------------------------------------------------------------- */
  function iniciar() {
    el = {
      form: $("#pedido"),
      paso1: $("#paso-1"),
      paso2: $("#paso-2"),
      paso3: $("#paso-3"),
      conf: $("#conf"),
      pasoLabel: $("#paso-label"),
      barFill: $("#bar-fill"),
      m2: $("#m2"),
      m2Hint: $("#m2-hint"),
      recalc: $("#recalc"),
      listaBody: $("#lista-body"),
      addSel: $("#add-sel"),
      addBtn: $("#add-btn"),
      total1: $("#total-1"),
      total2: $("#total-2"),
      total3: $("#total-3"),
      totalMat: $("#total-mat"),
      totalFlete: $("#total-flete"),
      despachoCampos: $("#despacho-campos"),
      recojoAviso: $("#recojo-aviso"),
      distrito: $("#distrito"),
      direccion: $("#direccion"),
      dias: $("#dias"),
      turnos: $("#turnos"),
      nombre: $("#nombre"),
      celular: $("#celular"),
      factura: $("#factura"),
      rucCampo: $("#ruc-campo"),
      ruc: $("#ruc"),
      nota: $("#nota"),
      confNombre: $("#conf-nombre"),
      confCod: $("#conf-cod"),
      confResumen: $("#conf-resumen"),
      waLink: $("#wa-link"),
      otro: $("#otro"),
      preciosBody: $("#precios-body"),
      fleteBody: $("#flete-body"),
      themeBtn: $("#theme-btn"),
      themeTxt: $("#theme-txt"),
      bmTxt: $("#bm-txt")
    };

    if (!el.form) return;

    restaurar();

    pintarListaPrecios();
    pintarFlete();
    pintarSelectores();

    /* Reflejar el estado restaurado en los controles. */
    el.m2.value = String(estado.m2);
    el.m2Hint.textContent = RECETAS[estado.etapa].hint;
    var radioEtapa = $('input[name="etapa"][value="' + estado.etapa + '"]');
    if (radioEtapa) radioEtapa.checked = true;
    var radioModo = $('input[name="modo"][value="' + estado.modo + '"]');
    if (radioModo) radioModo.checked = true;
    var radioCli = $('input[name="cliente"][value="' + estado.cliente + '"]');
    if (radioCli) radioCli.checked = true;
    el.direccion.value = estado.direccion;
    el.nombre.value = estado.nombre;
    el.celular.value = estado.celular;
    el.factura.checked = !!estado.factura;
    el.ruc.value = estado.ruc;
    el.nota.value = estado.nota;
    el.rucCampo.hidden = !estado.factura;

    if (!estado.items.length) calcularDesdeEtapa();

    pintarLista();
    pintarEntrega();
    pintarDias();
    pintarPaso();

    /* ---- Paso 1 ---- */
    Array.prototype.forEach.call(document.querySelectorAll('input[name="etapa"]'), function (r) {
      r.addEventListener("change", function () {
        estado.etapa = r.value;
        el.m2Hint.textContent = RECETAS[estado.etapa].hint;
        calcularDesdeEtapa();
        pintarLista();
        guardar();
      });
    });

    el.recalc.addEventListener("click", function () {
      var v = Number(el.m2.value);
      if (!el.m2.value || isNaN(v) || v <= 0) {
        marcar("m2", "err-m2", "Pon cuántos metros cuadrados vas a trabajar. Un número mayor que cero.");
        return;
      }
      if (v > 2000) {
        marcar("m2", "err-m2", "Para más de 2000 m² conviene una cotización por etapas: escríbenos por WhatsApp.");
        return;
      }
      marcar("m2", "err-m2", "");
      estado.m2 = v;
      calcularDesdeEtapa();
      pintarLista();
      guardar();
    });

    el.listaBody.addEventListener("input", function (ev) {
      var t = ev.target;
      if (!t || !t.classList || !t.classList.contains("cant")) return;
      var idx = Number(t.getAttribute("data-idx"));
      var it = estado.items[idx];
      if (!it) return;
      var v = Number(t.value);
      it.cant = isNaN(v) || v < 0 ? 0 : v;
      var fila = t.parentNode.parentNode;
      var sub = fila.querySelector(".sub");
      var p = prod(it.id);
      if (sub && p) sub.textContent = soles(p.precio * it.cant);
      pintarTotales();
      guardar();
    });

    el.listaBody.addEventListener("click", function (ev) {
      var t = ev.target;
      if (!t || !t.getAttribute || t.getAttribute("data-quitar") === null) return;
      estado.items.splice(Number(t.getAttribute("data-quitar")), 1);
      pintarLista();
      guardar();
    });

    el.addBtn.addEventListener("click", function () {
      var id = el.addSel.value;
      if (!id) return;
      var ya = false;
      estado.items.forEach(function (it) { if (it.id === id) ya = true; });
      if (!ya) {
        var p = prod(id);
        estado.items.push({ id: id, cant: p.dec === 0 ? 1 : 1 });
      }
      el.addSel.value = "";
      marcar(null, "err-lista", "");
      pintarLista();
      guardar();
    });

    $("#a-paso-2").addEventListener("click", function () {
      if (!validarPaso1()) return;
      estado.paso = 2;
      pintarDias();
      pintarPaso();
      guardar();
      irAlPad();
    });

    /* ---- Paso 2 ---- */
    Array.prototype.forEach.call(document.querySelectorAll('input[name="modo"]'), function (r) {
      r.addEventListener("change", function () {
        estado.modo = r.value;
        pintarEntrega();
        guardar();
      });
    });

    el.distrito.addEventListener("change", function () {
      estado.distrito = el.distrito.value;
      marcar("distrito", "err-distrito", "");
      pintarTotales();
      guardar();
    });

    el.direccion.addEventListener("input", function () {
      estado.direccion = el.direccion.value;
      guardar();
    });

    el.dias.addEventListener("click", function (ev) {
      var b = ev.target.closest ? ev.target.closest(".dia") : null;
      if (!b) return;
      estado.fecha = b.getAttribute("data-iso");
      estado.turno = "";
      marcar(null, "err-fecha", "");
      pintarDias();
      guardar();
    });

    el.turnos.addEventListener("click", function (ev) {
      var b = ev.target.closest ? ev.target.closest(".turno") : null;
      if (!b || b.disabled) return;
      estado.turno = b.getAttribute("data-turno");
      marcar(null, "err-fecha", "");
      pintarTurnos();
      guardar();
    });

    $("#b-paso-1").addEventListener("click", function () {
      estado.paso = 1;
      pintarPaso();
      guardar();
      irAlPad();
    });

    $("#a-paso-3").addEventListener("click", function () {
      if (!validarPaso2()) return;
      estado.paso = 3;
      pintarPaso();
      guardar();
      irAlPad();
    });

    /* ---- Paso 3 ---- */
    Array.prototype.forEach.call(document.querySelectorAll('input[name="cliente"]'), function (r) {
      r.addEventListener("change", function () {
        estado.cliente = r.value;
        guardar();
      });
    });

    el.nombre.addEventListener("input", function () { estado.nombre = el.nombre.value; guardar(); });
    el.celular.addEventListener("input", function () { estado.celular = el.celular.value; guardar(); });
    el.nota.addEventListener("input", function () { estado.nota = el.nota.value; guardar(); });
    el.ruc.addEventListener("input", function () { estado.ruc = el.ruc.value; guardar(); });

    el.factura.addEventListener("change", function () {
      estado.factura = el.factura.checked;
      el.rucCampo.hidden = !estado.factura;
      if (!estado.factura) marcar("ruc", "err-ruc", "");
      guardar();
    });

    $("#b-paso-2").addEventListener("click", function () {
      estado.paso = 2;
      pintarDias();
      pintarPaso();
      guardar();
      irAlPad();
    });

    el.form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!validarPaso3()) return;
      enviarPedido();
      irAlPad();
    });

    el.otro.addEventListener("click", function () {
      reiniciar();
      irAlPad();
    });

    /* ---- Tema ---- */
    aplicarTema(temaGuardado());
    el.themeBtn.addEventListener("click", function () {
      var oscuroAhora = el.themeBtn.getAttribute("aria-pressed") === "true";
      var nuevo = oscuroAhora ? "light" : "dark";
      try { window.localStorage.setItem("sdv-tema", nuevo); } catch (e) { /* sin storage: dura la sesión */ }
      aplicarTema(nuevo);
    });

    /* ---- Aparición progresiva, solo si el navegador la soporta ---- */
    if ("IntersectionObserver" in window) {
      var obs = new window.IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visto");
            obs.unobserve(e.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px" });

      Array.prototype.forEach.call(document.querySelectorAll(".band .shell > *"), function (n) {
        n.classList.add("js-rev");
        obs.observe(n);
      });
    }
  }

  function irAlPad() {
    var pad = document.getElementById("armador");
    if (pad && typeof pad.scrollIntoView === "function") {
      pad.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
