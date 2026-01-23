function InventoryItem ({name, type, quantity=5, price=50})
{
	return (
		<div>
			<h2> {name} ({type}) </h2>
			<Message>
				<p>{quantity < 5 && <span>⚠️ Low Stock! {quantity} remained</span>}</p>
				<p>{quantity*price > 500 && <span>💰 High Value - consider extra protection </span>}</p>
			</Message>
		</div>
	);
}
