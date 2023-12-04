import { useState, useEffect } from "react";
import CategoriaContext from "./CategoriaContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Categoria(){

    const [listaObjetos, setListaObjetos] = useState([]);
    const [alerta, setAlerta] = useState({ status : "", message : ""});
    const recuperaCategorias = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/categorias`)
            .then(response => response.json())
            .then(json => setListaObjetos(json))
            .catch(err => console.log('Erro: ' + err))
    }


    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto')){
            try {
                await
                fetch(`${process.env.REACT_APP_ENDERECO_API}/categorias/${objeto.codigo}`, 
                { method: "DELETE" })
                .then(response => response.json())
                .then(json => setAlerta({status : json.status, 
                message : json.message}));
                recuperaCategorias();
            }catch(err) {
                console.log('Erro: ' + err)
            }
        }
    }

    // método que vai ser executado toda vez que o componente é renderizado
    useEffect(() => {
        recuperaCategorias();
    },[]);

    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({codigo : "", nome : ""});

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status : "", message : ""});
        setObjeto({
            codigo : 0,
            nome : ""
        });
    }

    const editarObjeto = async codigo => {
        setEditar(true);
        setAlerta({ status : "", message : "" });
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/categorias/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log(err));
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/categorias`, 
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

        recuperaCategorias();

    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    return (
        <CategoriaContext.Provider value={
            { listaObjetos, alerta, remover, objeto, novoObjeto, 
            acaoCadastrar, handleChange, editarObjeto 
            }
        }>
            <Tabela/>
            <Form/>
        </CategoriaContext.Provider>
    )
}

export default Categoria;