var fs = require('fs');
var equipoA = fs. readFileSync("./equipo-A.txt", 'utf-8');
equipoA = equipoA.split('\n')
var equipoB = fs. readFileSync("./equipo-B.txt", 'utf-8');
equipoB = equipoB.split('\n')
var partidos= fs.readFileSync("./partido.log", 'utf-8')
partidos= partidos.split('\n')

class JugadoraCompleta {
    constructor (nombre, equipo){
        this.nombre=nombre;
        this.equipo=equipo;
        this.puntos=0;
    }
}
var jugadorasCompletas=[]

jugadorasCompletas=agregarJugadoras(jugadorasCompletas, equipoA, "A");
jugadorasCompletas=agregarJugadoras(jugadorasCompletas, equipoB, "B");
partidos=reemplazarResultado(partidos, "DOBLE", 2);
partidos=reemplazarResultado(partidos, "TRIPLE", 3);
asignarPuntos(partidos, jugadorasCompletas); //FALTA
imprimirJugadoras(jugadorasCompletas);
var tirosDobles= contarTipoDeAnotacion(partidos, 2);
var tirosTriples= contarTipoDeAnotacion(partidos, 3);
informarEstadisticasTiros(tirosDobles, tirosTriples);
calcularEquipoGanador(jugadorasCompletas);
calcularJugadoraConMasPuntos(jugadorasCompletas);



function agregarJugadoras(listaJugadoras, jugadorasEquipo, equipo){
    var lista=listaJugadoras;
    jugadorasEquipo.forEach((jugadora) =>{
        lista.push(new JugadoraCompleta(jugadora, equipo));

    });
    return lista;
}

function imprimirJugadoras(lista){
    lista.forEach((jugadora) => {
        console.log(jugadora);
    })
}

function reemplazarResultado(lista, resultado, numero){
      var listaPartidos=lista;
      listaPartidos=listaPartidos.map(function(val){
          return val.replace(resultado, numero);
      })
      return listaPartidos;
    }


function asignarPuntos(puntos, jugadoras){

    puntos.forEach((punto) =>{
        var personaEncontrada=false;
        var k=0;
        while (k<jugadoras.length && personaEncontrada==false){
            if (jugadoras[k].nombre.includes(punto.substr(0, punto.indexOf(",")))){
                jugadoras[k].puntos= parseInt(jugadoras[k].puntos)+parseInt(punto.substr(punto.indexOf(",")+1));
                personaEncontrada=true;
            }
            else {k++;}
    }})
}

function contarTipoDeAnotacion (lista, tipo){
    var contador=0;
    lista.forEach((punto) =>{
        if (punto.includes(tipo)){
            contador++;
        }
    })
    return contador;
}

function calcularProporcion(num1, num2){
    return Math.round(num1*100/(num1+num2));
}

function calcularEquipoGanador(lista){
    var puntosA=0;
    var puntosB=0;

    lista.forEach((jugadora) =>{
        if (jugadora.equipo=="A"){
            puntosA=puntosA+jugadora.puntos;
        }
        if (jugadora.equipo=="B"){
            puntosB=puntosB+jugadora.puntos;
        }
    })

    console.log("El partido A vs. B salió "+puntosA+" a "+puntosB);
}

function calcularJugadoraConMasPuntos(lista){
    var maxJugadora=lista[0]; 

    for (let i=1; i<lista.length;i++){
        if (lista[i].puntos>maxJugadora.puntos){
            maxJugadora=lista[i];
        }
    }

    console.log("La jugadora con más puntos es "+maxJugadora.nombre+" con "+maxJugadora.puntos+" puntos.")
}

function informarEstadisticasTiros(dobles, triples){
    console.log("Se realizaron "+dobles+" tiros dobles y "+triples+" tiros triples. Es decir, un "+calcularProporcion(dobles, triples)+"% de tiros dobles y un "+calcularProporcion(triples, dobles)+"% de tiros triples.")
}