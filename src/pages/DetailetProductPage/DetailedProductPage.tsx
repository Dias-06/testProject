
import { Heart, ArrowLeft } from 'lucide-react';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { useEffect } from 'react';
import { getBookById, toggleLike } from '../../features/productsSlice';
import { Link, useParams } from 'react-router-dom';
const DetailedProductPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch<AppDispatch>();
    
    const bookExtended = useSelector((state : RootState) => state.products.selected)

    const bookList = useSelector((state : RootState) => state.products.items)
    const currentBook = bookList.find(item => item.id == Number(id));
    const isLiked = currentBook?.liked == true;

    useEffect(() => {
        if(!currentBook?.isLocal){
            dispatch(getBookById(Number(id)))
        }
    },[])
    function handleLike(id : number){
        dispatch(toggleLike(id))
      }
  return (
    <div className="detail-container">
      <div className="back-button">
        <Link to={'/'} className="back-link">
          <ArrowLeft size={20} />
          <span>Back to products</span>
        </Link>
      </div>

      <div className="detail-card">
        <div className="detail-image-section">
          <div className="detail-image-container">
            <img 
              src={bookExtended?.image || currentBook?.image} 
              className="detail-image"
            />
          </div>
          <button onClick={() => handleLike(Number(id))} className="detail-like-button">
            <Heart size={24} />
            <span>{isLiked ? "Added to favorites" : "Add to favorites"}</span>
          </button>
        </div>

        <div className="detail-info-section">
          <h1 className="detail-title">{bookExtended?.title || currentBook?.title}</h1>
          
          <div className="detail-description">
            <h2 className="section-title">Description</h2>
            <p className="description-text">Celebrate 20 years of Harry Potter magic! \r\n\r\nThe Triwizard Tournament is to be held at Hogwarts. Only wizards who are over seventeen are allowed to enter – but that doesn't stop Harry dreaming that he will win the competition. Then at Hallowe'en, when the Goblet of Fire makes its selection, Harry is amazed to find his name is one of those that the magical cup picks out. He will face death-defying tasks, dragons and Dark wizards, but with the help of his best friends, Ron and Hermione, he might just make it through – alive!\r\n\r\nThese new editions of the classic and internationally bestselling, multi-award-winning series feature instantly pick-up-able new jackets by Jonny Duddle, with huge child appeal, to bring Harry Potter to the next generation of readers. It's time to PASS THE MAGIC ON</p>
          </div>
          {
            bookExtended && (
                <div className="detail-specs">
                    <div className="spec-item">
                        <span className="spec-label">Author</span>
                        <span className="spec-value">{bookExtended?.authors[0].name}</span>
                    </div>
                

                    <div className="spec-item">
                        <span className="spec-label">Pages</span>
                        <span className="spec-value">{bookExtended?.number_of_pages}</span>
                    </div>

                    <div className="spec-item">
                        <span className="spec-label">Year</span>
                        <span className="spec-value">{bookExtended?.publish_date}</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Rating</span>
                        <span className="spec-value">{0.6}</span>
                    </div>
                </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default DetailedProductPage
// const product = {
//     name: 'Война и мир',
//     image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=800&fit=crop',
//     description: 'Роман-эпопея Льва Николаевича Толстого, описывающий русское общество в эпоху войн против Наполеона в 1805—1812 годах. Это величайшее произведение мировой литературы, которое охватывает жизнь нескольких аристократических семей на фоне исторических событий.',
//     author: 'Лев Толстой',
//     pages: 1274,
//     year: 1869
//   };