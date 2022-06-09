import mongoose from 'mongoose';
export const PORT = process.env.PORT;
export const DATABASE = {
    // host: process.env.MONGODB_HOST_2,
    host: process.env.mongodb_host_TEST,
    // name: process.env.MONGODB_DB
    name: process.env.MONGODB_DB_TEST

};
console.log('Database', DATABASE);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const DB = `${DATABASE.host}/${DATABASE.name}`;
console.log('db', DB);
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }, (err: any) => {
    if (err) return console.log(err);
    console.log('Mongodb connected :)');
});
