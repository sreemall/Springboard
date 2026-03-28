
export default function ItemAction ({item, deleteItem}) {

    function handleClick (event) {
        deleteItem (item);
    }
    return (
        <>
            <button className="delete-btn" onClick={handleClick}>Delete</button>
        </>
    )
}