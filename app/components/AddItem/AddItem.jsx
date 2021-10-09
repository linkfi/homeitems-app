import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createItem } from '../../slices/items';

const AddItem = () => {
  const initialItemState = {
    _id: null,
    name: '',
    manufacturer: '',
    count: 0,
  };

  const [item, setItem] = useState(initialItemState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const saveItem = () => {
    const { name, manufacturer, count } = item;
    dispatch(createItem({ name, manufacturer, count }))
      .unwrap()
      .then((data) => {
        /* eslint-disable no-console */    
        console.log(data);
        setItem({
          _id: data._id,
          name: data.name,
          manufacturer: data.manufacturer,
          count: data.count,
        });

        setSubmitted(true);
      })
      .catch((err) => {
        /* eslint-disable no-console */
        console.log(err);
      });
  };

  const newItem = () => {
    setItem(initialItemState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {
                submitted
                  ? (
                    <div>
                      <h4> You submitted successfully!</h4>
                      <button type="button" className="btn btn-success" onClick={newItem}>
                        Add
                      </button>
                    </div>
                  )

                  : (
                    <div>
                      <div className="form-group">
                        <label  htmlFor="name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          required
                          value={item.name || ''}
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
                          value={item.manufacturer || ''}
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
                          value={item.count || ''}
                          onChange={handleInputChange}
                          name="count"
                        />
                      </div>

                      <button type="submit" onClick={saveItem} className="btn btn-success">
                        Submit
                      </button>

                    </div>
                  )

            }
    </div>
  );
};

export default AddItem;
