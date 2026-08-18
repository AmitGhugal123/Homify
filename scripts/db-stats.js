const mongoose = require('mongoose');
(async function(){
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/homify_dev');
    const Listing = require('../models/listing');
    const total = await Listing.countDocuments();
    const agg = await Listing.aggregate([{ $group: { _id: null, minPrice: { $min: '$price' }, maxPrice: { $max: '$price' } } }]);
    console.log('TOTAL', total);
    if(agg.length) console.log('MIN', agg[0].minPrice, 'MAX', agg[0].maxPrice);
    else console.log('NO PRICES');
    await mongoose.disconnect();
  }catch(e){
    console.error(e);
    process.exit(1);
  }
})();