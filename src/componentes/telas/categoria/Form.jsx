import { useContext } from "react";
import Alerta from "../../Alerta";
import CategoriaContext from "./CategoriaContext";




function Form(){
    
    const { objeto, alerta, acaoCadastrar, handleChange } = useContext(CategoriaContext);

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
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edição de Gêneros</h1>
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
                                    <label htmlFor="txtNome" className="form-label">Nome</label>
                                    <input type="text" className="form-control" id="txtName" name="nome" value={objeto.nome} 
                                    onChange={handleChange} required/>
                                    <div className="valid-feedback">Nome OK</div>
                                    <div className="invalid-feedback">Informe o nome</div>
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