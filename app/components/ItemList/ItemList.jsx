import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveItems, deleteItem } from '../../slices/items';

import ItemRow from './ItemRow';

const ItemList = () => {

    const items = useSelector(state => state.items);

    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(retrieveItems());
    }, [dispatch]);

    useEffect(() => {
        initFetch()
    }, [initFetch]);

    const rmvItem = (_id) =>{
        console.log(`calling delete with id ${_id} `);
        dispatch(deleteItem(_id))
        .unwrap()
        .then(di=>{
            console.log(`deleted item ${di}`);
        })
        .catch(err=>{
            console.log(err);
        })
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>My List</h4>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Manufacturer</th>
                            <th>Count</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(item => {
                                return (
                                    <ItemRow key={item._id}  {...item} rmvItem={rmvItem}  />
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
};

export default ItemList;