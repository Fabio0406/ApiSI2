import { Router } from "express";
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import multer from 'multer'
import { exec } from 'child_process'
import {createActivo,createGarantia,createReserva,deleteActivo,deletegarantia,getActivobyID,getActivobySerial,getActivos,getActivosF,getGarActivo,getImagen,getMantenimiento,getReservas,getUbiActivo, getcantidadM, updateActivo, updateReserva}from "../controllers/activo.CO.cjs"

const activo = Router();


const __dirname = dirname(fileURLToPath(import.meta.url));
export const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, join(__dirname,'../public/img'))
    },
    filename: (req,file,cb) =>{
        const ext = file.originalname.split('.').pop()
        cb(null,`${Date.now()}.${ext}`)
    }
})

const upload = multer({storage})

activo.post('/api/acti',upload.single('img'), createActivo)

activo.post('/api/actim', createActivom)


activo.get('/api/acti', getActivos)

activo.get('/api/actiI/:id', getImagen)

activo.get('/api/acti/:Inicio/:Fin', getActivosF)

activo.get('/api/acti/:id', getActivobyID)

activo.get('/api/Gacti/:id',getGarActivo)

activo.get('/api/Gactivo/:id',getUbiActivo)

activo.get('/api/GM/:id',getMantenimiento)

activo.get('/api/acti/:serial', getActivobySerial)

activo.get('/pg_dump_version', (req, res) => {
    exec('pg_dump --version', (error, stdout, stderr) => {
      if (error) {
        res.send(`Error: ${error.message}`);
      } else if (stderr) {
        res.send(`Stderr: ${stderr}`);
      } else {
        res.send(`Stdout: ${stdout}`);
      }
    });
  });



activo.put('/api/acti/:id', updateActivo)

activo.delete('/api/acti/:id', deleteActivo)

activo.post('/api/acti/res', createReserva)

activo.post('/api/acti/gar', createGarantia)

activo.delete('/api/acti/gar/:id', deletegarantia)

activo.get('/api/res', getReservas)

activo.get('/api/actiCM',getcantidadM)

activo.put('/api/res/:id', updateReserva)

export default activo;