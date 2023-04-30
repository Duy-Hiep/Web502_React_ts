import { useState, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import { AddProduct, DeleteProduct, GetAll , EditProduct} from './api/products';
import ProductDetailPage from './pages/ProductDetail';
import ProductList from './pages/admin/ProductList';
import ProductAdd from './pages/admin/ProductAdd';
import { IProduct } from './types/product';
import ProductEdit from './pages/admin/ProductEdit';
import LayOutAdmin from './components/layouts/LayoutAdmin';
import SigNinAdmin from './pages/admin/SigninAdmin';
import LayOutClient from './components/layouts/LayoutClient';
import Dashboard from './pages/admin/Dashboard';
import SigNupAdmin from './pages/admin/SignupAdmin';
import CategoryList from './pages/admin/CategoriList';
import { AddCategory, DeleteCategory, EditCategory, GetAllCategory } from './api/categori';
import { ICategory } from './types/category';
import CategoryAdd from './pages/admin/CategoriAdd';
import CategoryEdit from './pages/admin/CategoriEdit';






function App() {
  const [products, setProduct] = useState<IProduct[] > ([])
  useEffect(() => {
    GetAll()
    .then(({data}) => setProduct(data.products))
  }, [])

  const onHandleRemove = async(id: string) => {
    console.log(id);
    try {
      await DeleteProduct(id)
      .then(() => setProduct(products.filter((item) => item._id !== id)))
    } catch (error) {
      console.log(error);
      
    }
    
  }

  const onHandleAdd = async(product:any) => {
    // console.log(product);
    // return
    try {
      await AddProduct(product)
      .then(() => setProduct([...products, product]))
    } catch (error) {
      console.log(error);
      
    }
    
  }
  const onHandleEdit = async(product:IProduct) => {
    await EditProduct(product)
    setProduct(products.map((item) => item._id == product._id?product : item))
  }
  

  //Categories
  const [categories, setCategories] = useState<ICategory[]>([])

  useEffect(() => {
    GetAllCategory()
    .then(({data}) => setCategories(data.categories)
    )
  },[])
  
  const onHandleRemoveCate = async(id: string) => {
    try {
      await DeleteCategory(id)
      .then(() => setCategories(categories.filter((item) => item._id !== id)))
    } catch (error) {
      console.log(error);
      
    }
  }

  const onHandleAddCate = async(category:any) => {
    await AddCategory(category)
    .then(() => setCategories([...categories, category]))
  }

  const onHandleEditCate = async(category: any) => {
    await EditCategory(category)
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/'>

          <Route index element={<SigNinAdmin />} />
          <Route path='signup' element={<SigNupAdmin />} />

          // Client
          <Route path='products' element={<LayOutClient />}>  
            <Route index element={<ProductPage products={products}  />} />
            <Route path=':id' element={<ProductDetailPage products={products} />} />
          </Route>

          //Admin

          <Route path='admin' element={<LayOutAdmin />}>  

            <Route index element={<Dashboard/>}/>
            //products
            <Route path='products' element={<ProductList products={products} categories={categories} onRemove={onHandleRemove}/>} />
              <Route path='add' element={<ProductAdd  onAdd={onHandleAdd} categories={categories}/>} />
              <Route path='edit/:id' element={<ProductEdit onEdit={onHandleEdit} categories={categories} products={products}/>}/>

            //categories
            <Route path='categories' element={<CategoryList categories={categories} onRemove={onHandleRemoveCate}/>} />
            <Route path='cateAdd' element={<CategoryAdd  onAdd={onHandleAddCate}/>}/>
            <Route path='cateEdit/:id' element={<CategoryEdit categories={categories}  onEdit={onHandleEditCate}/>}/>

            
            
            {/* <Route path='categories' element={<CategoryList categories={categories}/>}/> */}
          </Route>
      
        </Route>
      </Routes>
    </div>
  )
}

export default App
