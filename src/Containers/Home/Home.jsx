
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {

    const [personajes, setPersonajes] = useState([]);
    const [pagina, setPagina] = useState([]);
    const [actual, setActual] = useState(0);

    useEffect(()=>{
        traePersonajes();
    },[]);

    useEffect(()=>{
        //Observable al hook de personajes... sólo se ejecutará una vez.
        
        if(personajes[1]){
            
            rellenar(actual);
        }
    },[personajes]);

    useEffect(()=>{
        console.log("en la primera página tenemos...",pagina);
    },[pagina])


    const rellenar = (posicion) => {

        let arrayPersonajes = [];
        
        for(let i = posicion; i < posicion+5; i++){
            arrayPersonajes.push(personajes[i]);
        }

        setPagina(arrayPersonajes);
        
        setActual(posicion);

    }

    const traePersonajes = async() => {

        try {
            
            let res = await axios.get("https://rickandmortyapi.com/api/character");
          
            setPersonajes(res.data.results);


        }catch (error) {
            console.log(error);
        }
    };

    if(pagina[1]?.image !== ""){
        return(
            <div>
                {
                    actual === 0 ? null : <div onClick={()=>rellenar(actual-5)}>ANTERIOR</div> 
                }
                
                {
                    pagina.map((caracter) => {
                        return (
                            <div key={caracter.id}>
                                <img className="foto" alt={caracter.name} src={caracter.image}/>
                            </div>
                        )
                    })
                }
                {
                    actual === personajes.length - 5 ? null : <div onClick={()=>rellenar(actual+5)}>SIGUIENTE</div>
                }
            </div>

        )

    } else {
        return (
            <div>
                hola soy home y estoy cargando datos
            </div>
        )
    }

    
};

export default Home;