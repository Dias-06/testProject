
import { Route, Routes } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage/productsPage'
import CreateProductPage from './pages/CreateProductPage/CreateProductPage'
import DetailedProductPage from './pages/DetailetProductPage/DetailedProductPage'

function App() {
  return (
    <Routes>
      <Route path="/" element = {<ProductsPage />} />
      <Route path="/create-product" element = {<CreateProductPage />} />
      <Route path="/products/:id" element = {<DetailedProductPage />} />
    </Routes>
  )
}

export default App
