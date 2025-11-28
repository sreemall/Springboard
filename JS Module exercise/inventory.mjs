const items = [];

export function addItem (item) {
    items.push (item);
    console.log (`Item ${item} added`);
}

export const removeItem  = (item) => {
    //check if item exists
    const index = items.indexOf (item);
    if (index !== -1) {
        items.splice (index, 1);
        console.log (`${item} removed`)
    }
    else {
        console.log (`${item} doesn't exist`)
    }
}

export const listItems = () => {
    console.log ("Items in inveotry are : ")
    for (const item of items) {
        console.log (item);
    }
}