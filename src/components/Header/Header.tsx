import { Link } from 'react-router-dom'
import styles from './styles.module.css'
const Header = () => {

  return (
    <div>
        <nav className={styles.nav}>
            <div className={styles.navContent}>
              <Link to={"/"}>
                <span className={styles.link}>
                 Products
                </span>
              </Link>
                
              <Link to={"/create-product"}>
              <span className={styles.link}>
              CreateProduct
              </span>
              </Link>
                
            </div>
        </nav>
    </div>
  )
}

export default Header