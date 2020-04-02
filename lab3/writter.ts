const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/db", {useNewUrlParser: true});

const counterSchema = new Schema({
    count: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
});

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

const counter = mongoose.model("Counter", counterSchema);

counter.create({count: 0}, function (err, doc) {
    mongoose.disconnect();

    if (err) return console.log(err);

    console.log("Сохранен объект user", doc);
});


while (true) {
    try {
        let count = counter.find().count;
        counter.updateOne({count: count}, {count: count + 1});
        (async () => {
            await delay(2000);
        })();
    }
    catch (e) {
        console.error(e);
        (async () => {
            await delay(2000);
        })();
    }
}
