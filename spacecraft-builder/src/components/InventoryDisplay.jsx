import ItemCard from "./ItemCard";
import ItemAction from "./ItemAction";
import "./SpacecraftBuilder.css";

export default function InventoryDisplay({inventory, deleteItem}) {
    //console.log ("in Inventory display inventory=", inventory)
  return (
    <>
      <h6>Inventory Display</h6>
      
        
        {inventory.map ((item) => (
            <div className="item-container" key={item.id}>
                <ItemCard  item={item} />
                <ItemAction  item={item} deleteItem={deleteItem}/>
            </div>
        ))}
        
        
      
    </>
  );
}
