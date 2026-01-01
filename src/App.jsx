import { useState } from 'react'
import './App.css'
import ProductTable from './components/ProductTable';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container py-4">
      <ProductTable />
    </div>
  )
}

export default App
