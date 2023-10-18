import mssql from 'mssql';
class Server {
    pool;
    dbConfig = {
        server: 'localhost',
        user: 'sa',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: 1433,
        options: {
            enableArithAbort: true
        }
    };
    connection;
    constructor() {
        this.pool = new mssql.ConnectionPool(this.dbConfig);
        console.log('Server started.');
        this.testDB();
    }
    async testDB() {
        try {
            await this.pool.connect();
            console.log('Connection established');
            let insertQuery = 'Insert into Characters (character_id, character_name, class_id) Values (@id,@name,@classId)';
            let data = [1, 'Admin2', 1];
            const request = this.pool.request();
            Object.keys(data).forEach((key) => {
                request.input(key, mssql.VarChar, data[key]);
            });
            const result = await request.query(insertQuery);
            console.log('Data inserted successfully');
        }
        catch (err) {
            console.error("Error connecting to the DB");
        }
        finally {
            this.pool.close();
            console.log('Connection closed.');
        }
    }
}
const server = new Server();
//# sourceMappingURL=Server.js.map