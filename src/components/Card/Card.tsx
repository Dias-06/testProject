// import React from 'react'
import {Heart, X} from 'lucide-react'
import styles from './styles.module.css'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../app/store'
import { toggleLike, deleteProduct } from '../../features/productsSlice'
export interface Book{
  id: number,
  image: string,
  title: string,
  liked?: boolean
}
const Card = ( {product} : {product: Book}) => {
  const dispatch = useDispatch<AppDispatch>();
  function handleLike(id : number){
    dispatch(toggleLike(id))
  }
  function handleDelete(id:number){
    dispatch(deleteProduct(id));
  }
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.title}
          className={styles.image}
        />
      </div>
      
      <div className={styles.cardContent}>
        <h3 className={styles.productName}>
          {product.title}
        </h3>
        
        <div className={styles.actions}>
          <button onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            handleLike(product.id)}} className={product.liked ? styles.likedButton : styles.likeButton}>
            <Heart size={20} fill='currentColor'/>
          </button>

          <button onClick={(e) =>{
            e.stopPropagation()
            e.preventDefault()
            handleDelete(product.id)
          } } className={styles.deleteButton}>
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card