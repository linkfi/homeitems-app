import React from "react";
import { Link } from "react-router-dom";

const ItemRow = ({ name, manufacturer, count, _id, rmvItem }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{manufacturer}</td>
            <td>{count}</td>
            <td>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=> rmvItem(_id)} >Delete</button>
            </td>
            <td>
                <Link to={`/items/${_id}`} className = "btn btn-outline-info btn-sm">Update</Link>
            </td>
        </tr>
    )
}

export default ItemRow;