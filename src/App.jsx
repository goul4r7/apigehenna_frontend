import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Categoria from './componentes/telas/categoria/Categoria'
import Filme from './componentes/telas/filme/Filme'
import Home from './componentes/Home'
import Menu from './componentes/Menu'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path : "/",
    element : <Menu/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "/categorias",
        element : <Categoria/>
      },
      {
        path: "/filmes",
        element : <Filme/>
      }
    ]
  }
])


function App() {
    return (
      <RouterProvider router={router}/>
    );
}

export default App;
