import React , {useEffect , useState} from 'react';
import "./NewCollections.css";
import new_collections from '../assests/new_collections';
import Item from '../item/item.jsx';

const Newcollections = (props) => {
  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    fetch("https://ecommerce-website-trial-backend.onrender.com/newcollections")
      .then((response) => response.json())
      .then((data) => setNew_collection(data));
  }, []);

  return (
    <div className='new-collections'>
      <h1 className='autoshow'>New Collections</h1>
      <hr className='autoshow'/>
      <div className="collections imagereveal">
        {new_collection.map((item, i) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            style={{ color: 'white'}}
          />
        ))}
      </div>
    </div>
  );
};


export default Newcollections;
