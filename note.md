mongod --directoryperdb --dbpath <path> --logpath <path> --logappend --rest --intall
intall means run as a service
net start MongoDB

> db
test
> show dbs
admin   0.000GB
foobar  0.000GB
local   0.000GB
> use customers
switched to db customers
> db
customers
> show dbs
admin   0.000GB
foobar  0.000GB
local   0.000GB
> db.createCollection('customers');
{ "ok" : 1 }
> show dbs
admin      0.000GB
customers  0.000GB
foobar     0.000GB
local      0.000GB


> db.users.insert({name: 'Brad Traversy', email: 'tech@gmail.com', username: 'brad', password: '1234'});
WriteResult({ "nInserted" : 1 })
> db.users.find()
{ "_id" : ObjectId("59e072c0cb7f0480220de895"), "name" : "Brad Traversy", "email" : "tech@gmail.com", "username" : "brad", "password" : "1234" }
> db.users.insert({name: 'John', email: 'john@gmail.com', username: 'john', password: '1234'});
WriteResult({ "nInserted" : 1 })
> db.users.find()
{ "_id" : ObjectId("59e072c0cb7f0480220de895"), "name" : "Brad Traversy", "email" : "tech@gmail.com", "username" : "brad", "password" : "1234" }
{ "_id" : ObjectId("59e072eecb7f0480220de896"), "name" : "John", "email" : "john@gmail.com", "username" : "john", "password" : "1234" }
> db.users.update({username: 'john'}, {$set:{email: 'jdoe@gmail.com'}});
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.users.find()
{ "_id" : ObjectId("59e072c0cb7f0480220de895"), "name" : "Brad Traversy", "email" : "tech@gmail.com", "username" : "brad", "password" : "1234" }
{ "_id" : ObjectId("59e072eecb7f0480220de896"), "name" : "John", "email" : "jdoe@gmail.com", "username" : "john", "password" : "1234" }
> db.users.insert({name: 'Mike', email: 'mike@gmail.com', username: 'mike', password: '1234'});
WriteResult({ "nInserted" : 1 })
> db.users.find()
{ "_id" : ObjectId("59e072c0cb7f0480220de895"), "name" : "Brad Traversy", "email" : "tech@gmail.com", "username" : "brad", "password" : "1234" }
{ "_id" : ObjectId("59e072eecb7f0480220de896"), "name" : "John", "email" : "jdoe@gmail.com", "username" : "john", "password" : "1234" }
{ "_id" : ObjectId("59e07377cb7f0480220de897"), "name" : "Mike", "email" : "mike@gmail.com", "username" : "mike", "password" : "1234" }
> db.users.remove({username: 'mike'});
WriteResult({ "nRemoved" : 1 })
> db.users.find()
{ "_id" : ObjectId("59e072c0cb7f0480220de895"), "name" : "Brad Traversy", "email" : "tech@gmail.com", "username" : "brad", "password" : "1234" }
{ "_id" : ObjectId("59e072eecb7f0480220de896"), "name" : "John", "email" : "jdoe@gmail.com", "username" : "john", "password" : "1234" }
> db.users.find().pretty()
{
        "_id" : ObjectId("59e072c0cb7f0480220de895"),
        "name" : "Brad Traversy",
        "email" : "tech@gmail.com",
        "username" : "brad",
        "password" : "1234"
}
{
        "_id" : ObjectId("59e072eecb7f0480220de896"),
        "name" : "John",
        "email" : "jdoe@gmail.com",
        "username" : "john",
        "password" : "1234"
}


https://github.com/ctavan/express-validator

