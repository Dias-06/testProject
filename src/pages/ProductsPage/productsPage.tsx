import  { useEffect, useState } from 'react';
import styles from './styles.module.css'
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks } from '../../features/productsSlice';
import type { AppDispatch, RootState } from '../../app/store';
import { Link } from 'react-router-dom';
export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const booksList = useSelector((state: RootState) => state.products)
  useEffect(() =>{
    if(booksList.items.length == 0){
      dispatch(getAllBooks())
    }
  },[])
  const [filter, setFilter] = useState("all")
  const filteredBooks = booksList.items.filter(item => filter == 'all' ? true : item.liked)
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.filterSection}>
        <button onClick={() => setFilter('all')} className={`${styles.filterButton} ${filter == "all" ? styles.active : ""}`}>
          All
        </button>
        <button onClick={() => setFilter('fav')} className={`${styles.filterButton} ${filter == "all" ? "" : styles.active}`}>
          Favorites
        </button>
      </div>
      <div className={styles.productsGrid}>
        {filteredBooks.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <Card product={product} />
          </Link>
          
        ))}
      </div>
    </div>
  );
  
};