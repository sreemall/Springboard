
export default async function fetchCostcoData (categoryName, categoryId, startAt=0) {
    const query = encodeURIComponent(categoryName);
    let start = startAt;
    
    //for Costco Live Data API
    //'https://costco-live-data.p.rapidapi.com/search?q=paper%2Btowels&warehouse_id=240&start=0&category_id=1148&category_path=%2Fgrocery-household.html' 

    //const url = `https://costco-live-data.p.rapidapi.com/search?q=${query}&warehouse_id=240&start=${start}`;
    //const url = `https://real-time-costco-data.p.rapidapi.com/search?q${query}&country=US&language=en-US&start=${start}'`
    
    //for Real-Time Costco Data API
    //'https://real-time-costco-data.p.rapidapi.com/search?query=baby%20products&country=US&language=en-US&start=0'

    const url = `https://real-time-costco-data.p.rapidapi.com/search?query=${query}&country=US&language=en-US&start=${start}&delivery_location=92620`
    console.log ("9999 rapid_api url= ", url);
    const options = {
        method: 'GET',
        headers: {
            //'x-rapidapi-key': '2ec598218emsh5654a18fd46b234p171b8cjsn209967745c4e',
            'x-rapidapi-key': '0239d99c60msh2a8b78bd0bac930p17357cjsn11348ad0d594',
            //'x-rapidapi-host': 'costco-live-data.p.rapidapi.com',
            'x-rapidapi-host': 'real-time-costco-data.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log("9999  costco_rapid_api after fetch....", typeof(result));
        const resultObj = JSON.parse (result);

        //for Costco Live Data API
        //let costcoProducts = resultObj.products || [];
        //const count = resultObj.count;

        //for Real-Time Costco Data API
        let costcoProducts = resultObj.data?.products ?? [];
        const count = resultObj.data?.total_products ?? 0;

        let products = costcoProducts.map (product => ({
                name: product.item_product_name,
                productId: product.item_number,
                productNumber: product.item_number,
                categoryId: categoryId,
                price: product.item_location_pricing_salePrice,
                discount: product.item_product_marketing_statement,
                imageUrl: product.item_product_primary_image,
                // category: product.item_as400_category,
                // categoryPath: product.categoryPath_ss,
                // groupId: product.group_id
            }));
        
        //console.log (resultObj);
        console.log ("9999 Costco_rapidapi after fetch ", typeof(resultObj), typeof(resultObj.products), products.length, count);
        console.log("9999 Costco_rapidapi after fetch -- Products Count: ", count, " products.length=", products.length);
        
        // for (const product of products) {
        //     console.log(
        //         "Name : ", product.name,
        //         "\nId : ", product.productId,
        //         "\nProduct Number: ", product.productId,
        //         "\nPrice: ", product.price,
        //         "\nDiscount: ", product.discount,
        //         "\nImage url:", product.imageUrl,
        //         "\nCategory: ", product.category,
        //         "\nCategory Path: ", product.categoryPath,
        //         "\nGroup Id: ", product.groupId
        //     );
        // };

        // while (start < count) {
        //     const response = await fetchProducts(start);
        
        //     const batch = response.products ?? [];
        
        //     if (batch.length === 0) break;
        
        //     products.push(...batch);
        //     start += batch.length;
        // }

        while(count > (start+24)) {
            console.log ("99999  IN WHILE LOOP........count=", count, " start=", start);
            start += 24;
            const response = await fetch(url, options);
            const result = await response.text();
            //console.log(JSON.stringify(result, null, 2));
            const resultObj = JSON.parse (result);

            //for Costco Live Data API
            //let costcoProducts = resultObj.products || [];

            //for Real-Time Costco Data API
            const data = resultObj.data;
            const costcoProducts = data?.products ?? [];

            let currProducts = costcoProducts.map (product => ({
                    name: product.item_product_name,
                    productId: product.item_number,
                    productNumber: product.item_number,
                    categoryId: categoryId,
                    price: product.item_location_pricing_salePrice,
                    discount: product.item_product_marketing_statement,
                    imageUrl: product.item_product_primary_image,
                    // category: product.item_as400_category,
                    // categoryPath: product.categoryPath_ss,
                    // groupId: product.group_id
                }));
            products = [...products, ...currProducts];
            console.log ("999 while  count= ", resultObj.count, "cur_batch_prods: ", currProducts.length, " total_products: ", products.length);
        }

        return products;
    } catch (error) {
        console.error(error);
    }
}

//fetchCostcoData ("cleaning supplies");
