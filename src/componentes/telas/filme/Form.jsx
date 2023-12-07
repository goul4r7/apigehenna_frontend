import { useContext } from "react";
import Alerta from "../../Alerta";
import FilmeContext from "./FilmeContext";




function Form(){
    
    const { objeto, alerta, acaoCadastrar, handleChange, listaCategorias } = useContext(FilmeContext);

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (
        <>
            <div className="modal fade" id="modalEdicao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edição de Filmes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="formulario" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta}/>
                                <div className="mb-3">
                                    <label htmlFor="txtCodigo" className="form-label">Código</label>
                                    <input type="number" className="form-control" id="txtCodigo" name="codigo" value={objeto.codigo} 
                                    onChange={handleChange} readOnly/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="txtTitulo" className="form-label">Título</label>
                                    <input type="text" className="form-control" id="txtTitulo" name="titulo" value={objeto.titulo} 
                                    onChange={handleChange} required/>
                                    <div className="valid-feedback">Titulo OK</div>
                                    <div className="invalid-feedback">Informe o titulo</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="txtSinopse" className="form-label">Sinopse</label>
                                    <textarea className="form-control" placeholder="Sinopse aqui" id="txtSinopse" name="sinopse" value={objeto.sinopse} onChange={handleChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Date" className="form-label">Data de Estréia</label>
                                    <input type="date" className="form-control" id="Date" name="data_estreia" value={objeto.data_estreia} 
                                    onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="selectCategoria"
                                        className="form-label">Gênero</label>
                                    <select
                                        required
                                        className="form-control"
                                        id="selectCategoria"
                                        value={objeto.categoria}
                                        name="categoria"
                                        onChange={handleChange}>
                                        <option disable="true" value="">(Selecione a categoria)</option>
                                        {listaCategorias.map((cat) => (
                                            <option key={cat.codigo} value={cat.codigo}>
                                                {cat.nome}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="valid-feedback">Categoria OK</div>
                                    <div className="invalid-feedback">Informe a categoria</div>
                                </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success">Salvar mudanças</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Form;