import db from "../../config/db";

export default function handler(req, res) {    
    db.connectDb();
    db.disconnectDb()
    res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({ name: 'Fake Upload Processaaa' });
}
