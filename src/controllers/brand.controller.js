
import {getConnection} from "./../database/database";

const getBrands = async (req, res) => {

    try{
        const connection= await getConnection();
        const result = await connection.query("SELECT id, brand_name as name, average_price FROM Brands");
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const getBrand = async (req, res) => {

    try{
        const { id } = req.params;
        const connection= await getConnection();
        const result = await connection.query("SELECT id, name, average_price, brand_name FROM Brands WHERE id = ?",id);
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const getModelFromBrand = async (req, res) => {

    try{
        const { id } = req.params;
        const connection= await getConnection();
        const brandName = await connection.query("SELECT brand_name FROM Brands WHERE id = ?",id);

        if(brandName!=undefined && brandName.length > 0){
            const brand = await brandName[0]["brand_name"];
            const result = await connection.query("SELECT id, name, average_price FROM Brands WHERE brand_name = ?",brand);
            res.json(result);
        }else{
            res.json(brandName);
        }

    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const addBrands = async (req, res) => {

    try{
        const {average_price,brand_name} = req.body;

        if(average_price==undefined || brand_name==undefined){
            res.status(400).json({message: "Bad Request. Please fill all fields."});
        }

        const brandObject = {average_price,brand_name};
        const connection= await getConnection();
        const exist = await connection.query('SELECT brand_name FROM brands WHERE brand_name = ?',brand_name);

        if(exist==undefined || exist.length == 0){
            await connection.query('INSERT INTO brands SET ?', brandObject);
            const arrayOutput = { "name" : brandObject.brand_name };
            const jsonContent = JSON.stringify(arrayOutput);
            res.end(jsonContent);
        }else{
            const existBrand = await exist[0]["brand_name"];
            if(existBrand == brand_name){
                res.json("Brand already exists!");
            }
        }
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const addModelFromBrand = async (req, res) => {

    try{

        const { id } = req.params;
        var { name, average_price } = req.body;

        if(average_price === null || average_price === undefined){
            average_price = 0;
        }

        if( average_price == 0 || average_price > 100000){

            const connection= await getConnection();
            const brandName = await connection.query("SELECT brand_name FROM Brands WHERE id = ?",id);
    
            if(brandName!=undefined && brandName.length > 0){
                const brand_name = await brandName[0]["brand_name"];
                const brandObject = {name,average_price,brand_name};
                const exist = await connection.query('SELECT name FROM brands WHERE name = ?',name);
    
                if(exist==undefined || exist.length == 0){
                    await connection.query('INSERT INTO brands SET ?', brandObject);
                    const arrayOutput = { "name" : brandObject.name, "average_price" :  brandObject.average_price  };
                    const jsonContent = JSON.stringify(arrayOutput);
                    res.end(jsonContent);
                }else{
                    const existModel = await exist[0]["name"];
                    if(existModel == name){
                        res.json("Model already exists!");
                    }
                }

            }else{
                res.json("The Brand id doesn't exist!");
            }

        }else{
            res.json("The Average price must be greater than 100,000.");
        }

    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const updateBrand = async (req, res) => {

    try{
        const { id } = req.params;
        const {average_price,brand_name} = req.body;
        const connection= await getConnection();
        var result = null;

        if(brand_name != undefined && average_price == undefined){
            result = await connection.query('UPDATE Brands SET brand_name = ? WHERE id = ?', [brand_name, id]);
        }
        if(brand_name != undefined && average_price != undefined){
            if(average_price > 100000){
                const brandObject = {average_price,brand_name};
                result = await connection.query('UPDATE Brands SET ? WHERE id = ?', [brandObject, id]);
            }else{
                result = "The Average price must be greater than 100,000.";
            }
        }
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const deleteBrand = async (req, res) => {

    try{
        const { id } = req.params;
        const connection= await getConnection();
        const result = await connection.query("DELETE FROM Brands WHERE id = ?",id);
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    getBrands,
    getBrand,
    getModelFromBrand,
    addBrands,
    addModelFromBrand,
    deleteBrand,
    updateBrand
}