import { useState, useEffect } from "react";
import FilmeContext from "./FilmeContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Filme(){

    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaCategorias, setListaCategorias] = useState([])
    const [alerta, setAlerta] = useState({ status : "", message : ""});
    
    
    const recuperaFilmes = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/filmes`)
            .then(response => response.json())
            .then(json => setListaObjetos(json))
            .catch(err => console.log('Erro: ' + err))
    }

    const recuperaCategorias = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/categorias`)
            .then(response => response.json())
            .then(json => setListaCategorias(json))
            .catch(err => console.log('Erro: ' + err))
    }


    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto')){
            try {
                await
                fetch(`${process.env.REACT_APP_ENDERECO_API}/filmes/${objeto.codigo}`, 
                { method: "DELETE" })
                .then(response => response.json())
                .then(json => setAlerta({status : json.status, 
                message : json.message}));
                recuperaFilmes();
            }catch(err) {
                console.log('Erro: ' + err)
            }
        }
    }

    // método que vai ser executado toda vez que o componente é renderizado
    useEffect(() => {
        recuperaFilmes();
        recuperaCategorias();
    },[]);

    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "",
        titulo: "",
        sinopse: "",
        data_estreia: new Date().toISOString().slice(0, 10),
        categoria: ""
    });

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status : "", message : ""});
        setObjeto({
            codigo : 0,
            titulo : "",
            sinopse : "",
            data_estreia : new Date().toISOString().slice(0, 10),
            categoria : ""
        });
    }

    const editarObjeto = async codigo => {
        setEditar(true);
        setAlerta({ status : "", message : "" });
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/filmes/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log(err));
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/filmes`, 
            {
                method : metodo,
                headers : { "Content-Type" : "application/json"},
                body : JSON.stringify(objeto)
            }).then(response => response.json())
              .then(json => {
                setAlerta({status : json.status, message : json.message});
                setObjeto(json.objeto);
                if (!editar){
                    setEditar(true);
                }
              })  
        } catch (err){
            console.log(err);
        }

        recuperaFilmes();

    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    return (
        <FilmeContext.Provider value={
            { listaObjetos, alerta, remover, objeto, novoObjeto, 
            acaoCadastrar, handleChange, editarObjeto, listaCategorias }
        }>
            <Tabela/>
            <Form/>
        </FilmeContext.Provider>
    )
}

export default Filme;