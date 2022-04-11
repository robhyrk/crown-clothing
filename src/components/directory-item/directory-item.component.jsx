
import {Link} from 'react-router-dom'
import './directory-item.styles.scss'

const DirectoryItem = ({category}) => {
    const {imageUrl, id, title} = category
    return(
        <div key={id} className='directory-item-container'>
        {/* <img /> */}
        <div className='background-image' style={{
          backgroundImage: `url(${imageUrl})`
        }}/>
        <div className='direcotry-item-body'>
          <h2>{title}</h2>
          <Link to={`/shop/${title}`}>
            <p>Shop Now</p>
          </Link>
        </div>
      </div>
    )
}

export default DirectoryItem