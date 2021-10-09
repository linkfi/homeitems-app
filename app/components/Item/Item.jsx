import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateItem } from '../../slices/items'
import ItemService from "../../services/ItemService";

const Item = (props) => {

    const initialItem = {
        _id: null,
        name: "",
        manufacturer: "",
        count: 0
    };

    const [currentItem, setCurrentItem] = useState(initialItem);   
    const dispatch = useDispatch();

    const getItem = (id) => {
        ItemService.get(id)
            .then(res => {
                setCurrentItem(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    };

    useEffect(() => {
        getItem(props.match.params.id)
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentItem({ ...currentItem, [name]: value })
    }

    const saveItem = (event) => {

        const data = {
            name: currentItem.name,
            manufacturer: currentItem.manufacturer,
            count: currentItem.count,
        };        

        dispatch(updateItem({ _id: currentItem._id, data }))
            .unwrap()
            .then(dt => {
                console.log('Item was updated successfully!');
                setCurrentItem({
                    _id: dt._id,
                    name: dt.name,
                    manufacturer: dt.manufacturer,
                    count: dt.count,
                  });           
            })
            .catch(err => {
                console.log(err);
            });

            event.preventDefault();
    };

    return (
        <div>
            <h2>View/Update Item Details</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={currentItem.name || ''}
                        onChange={handleInputChange}
                        name="name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="manufacturer">Manufacturer</label>
                    <input
                        type="text"
                        className="form-control"
                        id="manufacturer"
                        value={currentItem.manufacturer || ''}
                        onChange={handleInputChange}
                        name="manufacturer"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="count">Count</label>
                    <input
                        type="text"
                        className="form-control"
                        id="count"
                        value={currentItem.count || ''}
                        onChange={handleInputChange}
                        name="count"
                    />
                </div>

                <button type="submit" onClick={saveItem} className="btn btn-success">
                    Update
                </button>            
            </form>
        </div>
    );
}

export default Item;