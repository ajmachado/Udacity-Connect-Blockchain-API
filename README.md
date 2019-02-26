# Blockchain Data and RESTFul API

Blockchain has the potential to change the way that the world approaches data. Develop Blockchain skills by understanding the data model behind Blockchain by developing your own simplified private blockchain.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].

### Configuring your project

- Use NPM to initialize your project and create package.json to store project dependencies.
```
npm init
```
- Install crypto-js with --save flag to save dependency to our package.json file
```
npm install crypto-js --save
```
- Install level with --save flag
```
npm install level --save
```
- Install hapi with --save flag
```
npm install hapi --save
```

## Testing

To test code:

1: Open a command prompt or shell terminal after install node.js.
2: Start the server
```
 node app.js
 
```

## Test endpoints
3: Open the Postman App.
## Testing the GET  endpoint using url '/block/:height'
4: Select the GET method, enter "http://localhost:8000/block/0" in the next textbox and hit the SEND button. Change the '0' in the URL to any number from 0 to 10 to get other blocks.
5: You should see a response similar to this
    {
    "success": "true",
    "message": "Block successfully retrieved.",
    "block": {
        "hash": "18a21f932b6c0f53c53e4ef87bf516332715c2d5588956f347d9b8b14f5a3e65",
        "height": 0,
        "body": "First block in the chain - Genesis block",
        "time": "1548102953",
        "previousBlockHash": ""
    }
  }
## Testing the POST endpoint using url '/block'
6: Select the POST method, enter "http://localhost:8000/block" in the next textbox and hit the SEND button.
7: In the section below, select the 'Body' tab, choose the 'raw' option and in the text editor add 
            {
            "data":"Testing block with test string data"
            }

 8: You should see a response similar to this. The block "block" is retrieved after being added.
    {
      "success": "true",
      "message": "Block added successfully.",
      "block": {
          "hash": "423493eb8b1e025ffc6203ee1cb8bfb1bcbb934abfed2a5010b066b88fea7e3c",
          "height": 11,
          "body": "Testing block with test string data",
          "time": "1548102435",
          "previousBlockHash": "fad9ffb7f78fc0aa96c962668050b68ae5f8232513eabefe04c81d0fd48e479a"
      }
    }

