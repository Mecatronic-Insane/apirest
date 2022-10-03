
import {getConnection} from "../database/database";

const getModels = async (req, res) => {

    try{

        const { greater, lower } = req.query;
        const connection= await getConnection();
        var result = null;

        if(greater!= undefined && lower == undefined){
             result = await connection.query("SELECT id, name, average_price FROM Brands WHERE average_price >= ?",greater); 
        }

        if(greater== undefined && lower != undefined){
            result = await connection.query("SELECT id, name, average_price FROM Brands WHERE average_price <= ?",lower); 
        }

        if(greater!= undefined && lower != undefined){
            result = await connection.query("SELECT id, name, average_price FROM Brands WHERE average_price <= ? AND average_price >= ?",[lower,greater]); 
        }else if(greater== undefined && lower == undefined){
            result = await connection.query("SELECT id, name, average_price FROM Brands");
        }

        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}


const updateModel = async (req, res) => {

    try{
        const { id } = req.params;
        const { average_price } = req.body;
        const connection= await getConnection();
        var result = null;

        if(average_price != undefined){
            if(average_price > 100000){
                await connection.query('UPDATE Brands SET average_price = ? WHERE id = ?', [average_price, id]);
                const arrayOutput = { "average_price" : average_price };
                const jsonContent = JSON.stringify(arrayOutput);
                result = jsonContent;
            }else{
                result = JSON.stringify("The Average price must be greater than 100,000.");
            }
        }
        res.end(result);
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}


export const methods = {
    getModels,
    updateModel
}