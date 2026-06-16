express = require ("express");

app = express ();

app.get ("/", (req, res) => {
    console.log ("9999 In Home Page...  params=", req.params, req.query);

    res.send("In Home Page");
})

app.get ("/mean", (req, res) => {   // Mean
    
    const nums = req.query.nums.split(',');

    const isGood = nums.every ((num) => Number.isFinite(+num));
    console.log ("isGood =", isGood);
    if (!isGood)
        res.status(400).send ("<h2>Bad Request</h2>");
    else {
    const mean = nums.reduce((sum, cur) => sum+(+cur), 0)/nums.length;
    res.send ("<h2> Mean of " + nums + " = " + mean + "</h2>");
    console.log( "mean = ", mean);
    }
});

app.get ("/median", (req, res) => {   // Median

    const nums = req.query.nums.split(',');

    const isGood = nums.every ((num) => Number.isFinite(+num));
    if (!isGood)
        res.status(400).send ("<h2>Bad Request</h2>");
    else {
        nums.sort((a,b) => (a-b));
        let median = 0;
        if (nums.length%2 === 0)
            median = (+nums[nums.length/2 -1] + (+nums[nums.length/2]))/2;
        else
            median = (+nums[(nums.length-1)/2]);

        res.send ("<h2> Median of " + nums + " = " + median + "</h2>");
    }
});

app.get ("/mode", (req, res) => {  // Mode

    const nums = req.query.nums.split(',');

    const isGood = nums.every ((num) => Number.isFinite(+num));
    if (!isGood)
        res.status(400).send ("<h2>Bad Request</h2>");
    else {
        const numsMap = {};
        let max = 0;
        for (let i=0; i<nums.length; i++) {
            //console.log ("before numsMap[nums[i]=", i, nums[i], numsMap[nums[i]], numsMap)
            numsMap[nums[i]] = (numsMap[nums[i]] ?? 0) + 1;
            //console.log ("after numsMap[nums[i]=", numsMap[nums[i]], numsMap)
            max = Math.max(max, numsMap[nums[i]]);
        }
        let mode = [];
        console.log ("max =", nums, max, numsMap);
        for (let key in numsMap) {
            if (numsMap[key] === max) {
                mode.push (key);
            }
        }
        console.log ("mode =", mode);
        res.send ("<h2> Mode of " + nums + " = " + mode + "</h2>");
    }
})

app.listen (3000, () => {
    console.log ("Server is listening at port 3000 on localhost");
});