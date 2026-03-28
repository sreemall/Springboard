
export default function ItemCard ({item}) {

    return (
        <div className="item-card">
            <h6>{item.name}</h6>
            <p>Quantity: {item.qty}</p>
            <p>Purpose: {item.purpose}</p>
        </div>
    )
}