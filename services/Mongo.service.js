var MongoClient = require('mongodb').MongoClient;

const mongoURL = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@gm-inv-mongo:27017`;
const dbName = 'gmInvDB';

exports.updateOrInsert = (collection, whereModel, objectModel, callback) => {
    MongoClient.connect(mongoURL, { useUnifiedTopology: true }, async (err, client) => {
        if (err) {
            console.log(err);
            return callback(err, undefined);
        }

        var dbo = client.db(dbName);

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

exports.listCollections = callback => {
    MongoClient.connect(mongoURL, { useUnifiedTopology: true }, async (err, client) => {
        if (err) {
            console.log(err);
            return callback(err, undefined);
        }

        client.db(dbName).listCollections().toArray((err, collections) => {
            return callback(err, collections?.map(collection => {
                return { date: collection?.name }
            }));
        });
    });
}

exports.queryProjection = (collection, whereModel, projectionModel, callback) => {
    MongoClient.connect(mongoURL, { useUnifiedTopology: true }, async (err, client) => {
        if (err) {
            console.log(err);
            return callback(err, undefined);
        }

        var dbo = client.db(dbName);

        let projection = dbo.collection(collection).find(whereModel).project(projectionModel);

        try {
            let projectionArray = await projection.toArray();
            
            return callback(err, projectionArray);
        } catch (mediaByIdErr) {
            return callback(mediaByIdErr, undefined);
        }
        finally {
            client.close();
        }
    });
}
