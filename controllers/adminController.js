let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const quotaDBHelper = require('../services/quotaDBHelper');
const stationDBHelper = require('../services/stationDBHelper');
const vehicleDBHelper = require('../services/vehicleDBHelper');
const personalDBHelper = require('../services/personalDBHelper');
const orgDBHelper = require('../services/orgDBHelper');

const nodemailer = require("nodemailer");
const generator = require('generate-password');

const admin_username = process.env.ADMIN_USERNAME
const admin_psw = process.env.ADMIN_PASSWORD

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');


//get admin dashboard info (Quota info)
const get_dashboard = async (req, res) => {

    let fuelType = req.params.fueltype;

    try{

        let quota = await quotaDBHelper.findQuotaByFuelType(fuelType);
        console.log(quota)
        if(quota !== null){
            res.json({
                status: 'ok',
                quota: quota,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid Quota!'
            });
        }  
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//Update the fuel quota
const update_fuel_quota = async (req, res) => {
    let vehicleType = req.body.vehicleType;
    let fuelType = req.body.fuelType;
    let newAmount = parseFloat(req.body.newAmount); 
  
    try {
      //handle any possible errors
      let result = await quotaDBHelper.updateQuota(
        vehicleType,
        fuelType,
        newAmount
      );
      //return necessary data
      res.json({
        status: "ok",
        newAmount: result,
      });
    } catch(err){
          console.log(err);
          res.status(500).json({
              status: 'error',
              error: 'Internal server error!'
          });
      }
  };

//get all registered stations info 
const get_registered_station = async (req, res) => {


    try{

        let station = await stationDBHelper.findAllRegisteredStations();
        console.log(station)
        if(station !== null){
            res.json({
                status: 'ok',
                station: station,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid Station!'
            });
        }  
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

// register as newly registered station
const register_station = async (req, res) => {
let regNo = req.body.registrationNo;

try {
    //handle any possible errors
    let result = await stationDBHelper.registerStation(regNo);

    //return necessary data
    res.json({
    status: "ok",
    registeredStation: result,
    });
} catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
};

// register all as newly registered stations
const register_all_station = async (req, res) => {
    
    try {
        //handle any possible errors
        let result = await stationDBHelper.registerAllStation();
    
        //return necessary data
        res.json({
        status: "ok",
        registeredStations: result,
        });
    } catch(err){
            console.log(err);
            res.status(500).json({
                status: 'error',
                error: 'Internal server error!'
            });
        }
    };
  
// update the station as ongoing station
const update_station_state = async (req, res) => {
let regNo = req.body.registrationNo;

try {
    //handle any possible errors
    let result = await stationDBHelper.updateStationState(regNo);

    //return necessary data
    res.json({
    status: "ok",
    registeredStation: result,
    });
} catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
};

//get count of registered stations
const get_count_registered_station = async (req, res) => {

    let stationType = req.params.stationType;

    try{

        let stationCount = await stationDBHelper.countRegisteredStations(stationType);
        console.log(stationCount)
        if(stationCount !== null){
            res.json({
                status: 'ok',
                stationCount: stationCount,
            }); 
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid Output!'
            });
        }  
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//get all unregistered stations info 
const get_unregistered_station = async (req, res) => {

    try{

        let station = await stationDBHelper.findAllUnregisteredStations();
        console.log(station)
        if(station !== null){
            res.json({
                status: 'ok',
                station: station,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid Station!'
            });
        }  
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//get all newly registered stations info 
const get_newlyregistered_station = async (req, res) => {

    try{

        let station = await stationDBHelper.findAllNewlyregisteredStations();
        console.log(station)
        if(station !== null){
            res.json({
                status: 'ok',
                station: station,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid Station!'
            });
        }  
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//find all personal clients
const get_clients = async (req, res) => {

    try{

        let clients = await personalDBHelper.findAllClient();
        console.log(clients)
        if(clients !== null){
            res.json({
                status: 'ok',
                clients: clients,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid Vehicle!'
            });
        }  
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//find all personal client vehicles
const get_personal_vehicles = async (req, res) => {

    const vehicleList = [];

    try{

        let clients = await personalDBHelper.findAllClient();

        for (let i = 0; i < clients.length; i++ ) {
            let client = clients[i]
            let vehicles = await vehicleDBHelper.findAllByNic(client.nic);
            //console.log(vehicles)
            vehicles.forEach(async veh => {
                vehicleList.push(veh)
            })
        }
        if(vehicleList !== null){
                
            res.json({
                status: 'ok',
                vehicleList: vehicleList,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid Vehicle!'
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//find the personal registered vehicles of a given vehicle type
const get_type_personal_vehicles = async (req, res) => {
    
    //let type = req.params.type;
    const vehicleType = ["A-Bicycle", "B-Car", "C-Lorry", "D-Bus", "G-Agricultural", "J-Special Purpose"];
    let vehicleCount = [];

    try{

        let clients = await personalDBHelper.findAllClient();

        for (let n = 0; n < vehicleType.length; n++ ) {
            let type = vehicleType[n];
            let vehicleList = [];

            for (let i = 0; i < clients.length; i++ ) {
                let client = clients[i]
                let vehicles = await vehicleDBHelper.findTypeAllByNic(client.nic,type);
                for (let j = 0; j < vehicles.length; j++ ) {
                    vehicleList.push(vehicles[j])
                }
            }

            vehicleCount.push(vehicleList.length);
        };

        
        if(vehicleCount !== null){
                
            res.json({
                status: 'ok',
                vehicleCount: vehicleCount,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid Vehicle!'
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//find all org client vehicles
const get_org_vehicles = async (req, res) => {

    const vehicleList = [];

    try{

        let clients = await orgDBHelper.findAllClient();

        for (let i = 0; i < clients.length; i++ ) {
            let client = clients[i]
            let vehicles = await vehicleDBHelper.findAllByregistrationNoArray(client.vehicles);
            //console.log(vehicles)
            vehicles.forEach(async veh => {
                vehicleList.push(veh)
            })
        }
        if(vehicleList !== null){
                
            res.json({
                status: 'ok',
                vehicleList: vehicleList,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid Vehicle!'
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//find one type vehicles of an organization using the registration No. array
const get_type_org_vehicles = async (req, res) => {
    //let type = req.params.type;
    const vehicleType = ["A-Bicycle", "B-Car", "C-Lorry", "D-Bus", "G-Agricultural", "J-Special Purpose"];
    let vehicleCount = [];

    try{

        let clients = await orgDBHelper.findAllClient();

        // for (let i = 0; i < clients.length; i++ ) {
        //     let client = clients[i]
        //     let vehicles = await vehicleDBHelper.findTypeAllByregistrationNoArray(client.vehicles,type);
        //     //console.log(vehicles)
        //     vehicles.forEach(async veh => {
        //         vehicleList.push(veh)
        //     })
        // }
        // if(vehicleList !== null){
                
        //     res.json({
        //         status: 'ok',
        //         vehicleCount: vehicleList,
        //         //...................................................
        //     });
        // }

        for (let n = 0; n < vehicleType.length; n++ ) {
            let type = vehicleType[n];
            let vehicleList = [];

            for (let i = 0; i < clients.length; i++ ) {
                let client = clients[i]
                let vehicles = await vehicleDBHelper.findTypeAllByregistrationNoArray(client.vehicles,type);
                for (let j = 0; j < vehicles.length; j++ ) {
                    vehicleList.push(vehicles[j])
                }
            }

            vehicleCount.push(vehicleList.length);
        };

        
        if(vehicleCount !== null){
                
            res.json({
                status: 'ok',
                vehicleCount: vehicleCount,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid Vehicle!'
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//send email to station
const send_email = async (req, res) => {
    let regNo = req.body.regNo;

    let password = generator.generate({
        length: 10,
        numbers: true
    });

    const msg = {
        from: "fastfueler001@gmail.com",
        to: req.body.email,
        subject: "Welcome to Fast Fueler",
        text: "Now you can go to this link (http://localhost:3000/fuelstationgetstands/"+regNo+") and login to our system using this temporary password \nTemp password: " + password
    };

    try{

        password = await encHandler.encryptCredential(password);
        await stationDBHelper.saveTempPass(regNo,password);
        nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "fastfueler001@gmail.com",
                pass: "sjwrigiqzxjtawrh"
            },
        })
        .sendMail(msg , (err) => {
            if (err) {
                return console.log('Error', err)
            }else{
                return console.log("Email sent")
        
            }
        })
        res.json({
            status: "ok",
            msg: "Email sent",
          });
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//send email to many station
const send_email_to_all = async (req, res) => {
    
    let rows = req.body.rows;

    try{

        rows.forEach(async station => {

            let regNo = station.registrationNo;
            let password = generator.generate({
                length: 10,
                numbers: true
            });

            let enpassword = await encHandler.encryptCredential(password);
            await stationDBHelper.saveTempPass(regNo,enpassword);

            const msg = {
                from: "fastfueler001@gmail.com",
                to: station.email,
                subject: "Welcome to Fast Fueler",
                text: "Now you can go to this link (http://localhost:3000/fuelstationgetstands/"+regNo+") and login to our system using this temporary password \nTemp password: " + password
            };
    
            nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "fastfueler001@gmail.com",
                    pass: "sjwrigiqzxjtawrh"
                },
            })
            .sendMail(msg , (err) => {
                if (err) {
                    return console.log('Error', err)
                }else{
                    return console.log("Email sent")
            
                }
            })
        })
        res.json({
            status: "ok",
            msg: "Email sent",
          });
        
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}


module.exports = {
    get_dashboard,
    get_registered_station,
    get_unregistered_station,
    get_clients,
    get_count_registered_station,
    update_fuel_quota,
    register_station,
    update_station_state,
    get_newlyregistered_station,
    register_all_station,
    send_email,
    send_email_to_all,
    get_personal_vehicles,
    get_type_personal_vehicles,
    get_org_vehicles,
    get_type_org_vehicles,
}