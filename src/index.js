import express from 'express'
import router from './endpoints.js';
import pool from './utils.js';
// import { initaliseData } from './utils.js';

//will add cors to the main branch soon
const app = express();
app.use(express.json());
app.use('/api', router);

// test the database connection
async function testConnection() {
    // commented out for tests, use locally if needed
    // await initaliseData(); 

    try {
        const res = await pool.query('SELECT NOW()');
        console.log("✅ Database connected successfully at: ", res.rows[0].now);
    } catch (err) {
        console.error("❌ Database connection failed: ", err.message);
        throw new Error(err.message);    
    }   
} 

// start the server 
const port = 3000;
const server = app.listen(port, async () => {
    console.log(`🚀 Server running on port ${port}.`);
    await testConnection();
});

export { app, server };
