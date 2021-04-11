var MongoClient = require('mongodb').MongoClient;

const mongoURL = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@gm-inv-mongo:27017`;

exports.updateOrInsert = (collection, whereModel, objectModel, callback) => {
    MongoClient.connect(mongoURL, { useUnifiedTopology: true }, async function (err, client) {
        if (err) {
            console.log(err);
            return callback(err, undefined);
        }

        var dbo = client.db('gmInvDB');

        try {
            let updated = await dbo.collection(collection).updateOne(whereModel, { $set: objectModel }, { upsert: true });
            
            return callback(err, updated);
        } catch (mediaByIdErr) {
            return callback(mediaByIdErr, undefined);
        }
        finally {
            client.close();
        }
    });
}
