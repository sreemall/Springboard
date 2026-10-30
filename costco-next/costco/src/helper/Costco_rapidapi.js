
export default async function fetchCostcoData (categoryName, categoryId, startAt=0) {
    
    const query = encodeURIComponent(categoryName);
    let start = startAt;

    //To save number of fetches using Rapid API
    let count = 96;

    let products = [];

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
            //'x-rapidapi-host': 'costco-live-data.p.rapidapi.com',
            'x-rapidapi-host': 'real-time-costco-data.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    };

    try {

        while(start < count) {
            //console.log ("99999  IN WHILE LOOP........count=", count, " start=", start);

            //for Costco Live Data API
            //const url = `https://costco-live-data.p.rapidapi.com/search?q=${query}&warehouse_id=240&start=${start}`;
            
            //for Real-Time Costco Data API
            const url = `https://real-time-costco-data.p.rapidapi.com/search?query=${query}&country=US&language=en-US&start=${start}&delivery_location=92620`
            //console.log ("9999 rapid_api url= ", url);
            
            const response = await fetch(url, options);
            const result = await response.text();
            //console.log(JSON.stringify(result, null, 2));

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${result}`);
            }

            const resultObj = JSON.parse (result);

            //for Costco Live Data API
            //let costcoProducts = resultObj.products || [];

            //for Real-Time Costco Data API
            const data = resultObj.data;
            const costcoProducts = data?.products ?? [];
            count = data?.total_products ?? 0;

            //To save number of fetches using Rapid API
            if (count > 96)
                count = 96;

            let currProducts = costcoProducts.map (product => ({
                    name: product.item_product_name,
                    productId: product.item_number,
                    productNumber: product.item_number,
                    categoryId: categoryId,
                    price: product.item_location_pricing_salePrice,
                    discount: `$${(
                                        Number(product.item_location_pricing_listPrice) -
                                        Number(product.item_location_pricing_salePrice)
                                    ).toFixed(2)} OFF`,
                    imageUrl: product.item_product_primary_image,
                    // category: product.item_as400_category,
                    // categoryPath: product.categoryPath_ss,
                    // groupId: product.group_id
                }));
            products = [...products, ...currProducts];
            // console.log(
            //     "Total available:", count,
            //     "Fetched this batch:", currProducts.length,
            //     "Total fetched:", products.length
            //   );
            //console.log ("999 while  count= ", resultObj.count, "cur_batch_prods: ", currProducts.length, " total_products: ", products.length);
            
            // Prevent an infinite loop if the API returns no results
            if (costcoProducts.length === 0) break;

            start += costcoProducts.length;
        }

        return products;
    } catch (error) {
        console.log ("Error while fetching Costco Data using Rapid API: ", error.message);
        console.error(error);
    }
}

//fetchCostcoData ("cleaning supplies");
