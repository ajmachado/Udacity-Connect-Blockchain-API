//Defines Controller Class

//Require the Crpto-js library
const SHA256 = require('crypto-js/sha256');

//Require the Block and Blockchain classes
const BlockClass = require('./Block.js');
const BlockChainClass = require('./Blockchain.js');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} server 
     */
    constructor(server) {
        this.server = server;
        this.blockchain = new BlockChainClass.Blockchain();
        this.initializeMockData();
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by height, url: "/block/:height"
     */
    getBlockByIndex() {
        let bc = this.blockchain;
        let message;
        this.server.route({
            method: 'GET',
            path: '/block/{height}',
            handler: async (request, h) => {
                let height = encodeURIComponent(request.params.height);
                
                //Use getBlock method of Blockchain class
                await bc.getBlock(height).then(curBlock => {
                    let block = JSON.parse(curBlock); 
                        message = {
                            success: "true",
                            message: "Block successfully retrieved.",
                            block
                            }
                    }).catch(err => {
                            message = {
                                success: "false",
                                message: "Error retrieving block. ",
                                err
                            }
                        });    
                            
                return (message);   
                   
            }
        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/block"
     */
    postNewBlock() {
        let bc = this.blockchain;
        let message;
        this.server.route({
            method: 'POST',
            path: '/block',
            handler: async (request, h) => {             
                //IF payload is empty
                if(request.payload === null){
                    message = {
                        success: 'false',
                        message: 'Data is required to create a block'
                    };
                }else{
                    //If no data specified in payload.
                    if(!request.payload.data) {
                        message = {
                            success: 'false',
                            message: 'Data is required to create a block'
                        };
                    }else{
                        let block = new BlockClass.Block(request.payload.data);
                        //Use addBlock method of Blockchain class
                        await bc.addBlock(block).then((result) => {
                            if(result){
                                message = {
                                    success: 'true',
                                    message: 'Block added successfully.',
                                    block
                                };
                            }else{
                                message = {
                                    success: 'false',
                                    message: 'Block could not be added.'
                                };
                            }
                        }).catch(err => {
                            message = {
                                success: 'false',
                                message: 'Block could not be added.',
                                err
                            };
                        });  
                    }   
                }
                return(message);           
            }
        });
    }

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array. Genesis block is created when the blockchain is instantiated.
     */
    initializeMockData() {
        let bc = this.blockchain;
        
        (function theLoop (i) {
            setTimeout(function () {
                let blockTest = new BlockClass.Block("Test Block - " + (i + 1));
                bc.addBlock(blockTest).then((result) => {
                    //console.log(result);
                    i++;
                    if (i < 10) theLoop(i);
                });
            }, 200);
          })(0);
    }


}

/**
 * Exporting the BlockController class
 * @param {*} server 
 */
module.exports = (server) => { return new BlockController(server);}