while (true) {
    try {
        let count = counter.find().count;
        console.log(count);
        (async () => {
            await delay(1000);
        })();
    }
    catch (e) {
        console.error(e);
        (async () => {
            await delay(1000);
        })();
    }
}
