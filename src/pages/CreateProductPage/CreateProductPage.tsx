import { useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { addProduct } from '../../features/productsSlice';
const CreateProductPage = () => {
    const [image, setImage] = useState("");
    const [productName, setProductName] = useState("")

    const [error, setError] = useState<{image?: string, productName?: string}>({});
    const dispatch = useDispatch<AppDispatch>();
    function handleSubmit(e : React.FormEvent){
        e.preventDefault();
        const newError : typeof error = {};
        if(!image.trim()){
            newError.productName = 'Input the product name'
        }
        if(!productName.trim()){
            newError.image = "Input the url for product";
        }
        setError(newError);
        if(Object.keys(newError).length > 0) return;
        
        dispatch(addProduct({id: 0, title: productName, image: image}))
    }
  return (
    <>
        <Header />
        <div className={styles.formContainer}>
        <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Create new product</h2>
            
            <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="productName" className={styles.label}>
                Name of product
                </label>
                <input onChange={(e) => {
                    setProductName(e.target.value)
                    setError({})
                }}
                    
                type="text"
                id="productName"
                className={`${styles.input} ${error.productName && styles.inputError}`}
                value={productName}
                placeholder="Введите название продукта"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="imageUrl" className={styles.label}>
                Ссылка на изображение
                </label>
                <input onChange={(e) => {
                    setImage(e.target.value)
                    setError({})
                }}
                type="url"
                id="imageUrl"
                value={image}
                className={`${styles.input} ${error.image && styles.inputError}`}
                placeholder="https://example.com/image.jpg"
                />
            </div>

            <button type="submit" className={styles.submitButton}>
                Create product
            </button>
            </form>
        </div>
        </div>
    </>
  )
}

export default CreateProductPage