import {consul} from "../db.js"

export const getActivos = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM activoFijo')
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}

export const getUbiActivo = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM activoFijo,ubicacion,localiza WHERE activoFijo.id = $1 and idActivo=activoFijo.id and idUbicacion=ubicacion.id',[req.params.id])
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}

export const getGarActivo = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM garantia where garantia.id = $1',[req.params.id])
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}

export const getActivobyID = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM activoFijo where id = $1',[req.params.id])                
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}

export const getActivobySerial = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM activoFijo where serial = $1',[req.params.serial])                
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}


export const createActivo = async (req, res) => {
    try {
        const { id,descripcion, diaCompra, costo, lugarCompra, marca, modelo, serial, foto} = req.body
        consul.query('INSERT INTO activoFijo (id,descripcion, diaCompra, costo, lugarCompra, marca, modelo, serial, foto) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [id,descripcion, diaCompra, costo, lugarCompra, marca, modelo, serial, foto])
        res.send('activo registrado')
    } catch (error) {
        res.send("ERROR")
    }
}


export const deleteActivo = async (req,res) =>{
    try {
        const resp = await consul.query('DELETE FROM activoFijo WHERE id = $1',[req.params.id])
        res.send(`Activo ${req.params.id} Eliminado`)
    } catch (error) {
        res.send("ERROR")
    }
}
