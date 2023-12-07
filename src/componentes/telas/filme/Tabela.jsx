import { useContext } from "react";
import FilmeContext from "./FilmeContext";
import Alerta from "../../Alerta";

function Tabela(){

    // importo do contexto o que preciso usar
    const { listaObjetos, alerta, remover, novoObjeto, editarObjeto } = useContext(FilmeContext);

    return (
        <div style={ { padding : '20px' } }>
            <h1>Filmes</h1>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
            onClick={ () => novoObjeto() }>
                Novo
            </button>
            <Alerta alerta={alerta}/>
            { listaObjetos.length === 0 && <h1>Nenhum registro encontrado</h1> }
            { listaObjetos.length > 0 && (
                <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={ {textAlign : 'center'}}>Ações</th>
                            <th scope="col">Código</th>
                            <th scope="col">Título</th>
                            <th scope="col">Sinopse</th>
                            <th scope="col">Data de Estréia</th>
                            <th scope="col">Gênero</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listaObjetos.map(objeto => (
                                <tr key={objeto.codigo}>
                                    <td align="center">
                                        <button className="btn btn-info" 
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalEdicao"
                                        onClick={() => editarObjeto(objeto.codigo)}>
                                            <i class="bi bi-pencil"></i>
                                        </button>
                                        <button className="btn btn-danger" onClick={()=> remover(objeto)}>
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                    <th scope="row">{objeto.codigo}</th>
                                    <td>{objeto.titulo}</td>
                                    <td>{objeto.sinopse}</td>
                                    <td>{objeto.data_estreia}</td>
                                    <td>{objeto.categoria_nome}</td>
                                </tr>
                            ))
                        }   
                    </tbody>
                    </table>
                    </div>
            )}
            
        </div>
    )
}

export default Tabela;