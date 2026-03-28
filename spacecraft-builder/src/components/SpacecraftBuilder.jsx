
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import ItemForm from "./ItemForm";
import InventoryDisplay from "./InventoryDisplay";
import "./spacecraftBuilder.css";


export default function SpacecraftBuilder () {

    const [inventory, setInventory] = useState ([]);

    function addToInventory (item) {
        //console.log ("addToInventory before add inventory=", inventory, item);
        setInventory ((prev_inventory) => [...prev_inventory, {...item, id: uuid()}]);
        //console.log ("addToInventory after add inventory=", inventory, [...inventory, item]);
    }

    function deleteItem (deleteItem) {
        //console.log ("deleting item =", deleteItem, inventory);
        setInventory ((prev_inventory) => prev_inventory.filter ((item) => item.id != deleteItem.id));
        
    }

    // useEffect (() => {
    //     console.log ("after delete item inventory=", inventory)
    // }, [inventory]);

    return (
        <div className="spacecraft-builder">
            <h4>Spacecraft Builder</h4>
            <h6>Add an Item to the Inventory</h6>

            <div>
                <ItemForm addToInventory={addToInventory}/>
            </div>
            <div className="inventory-container">
                    <InventoryDisplay inventory={inventory} deleteItem={deleteItem}/>
            </div>
        </div>
    )
}