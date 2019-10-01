# codinging-challange-mercavus
[![Build Status](https://travis-ci.com/B-Stefan/codinging-challange-mercavus.svg?token=VfTpUUSPLMrEEjUCGcg2&branch=master)](https://travis-ci.com/B-Stefan/codinging-challange-mercavus)

Project for a Senior Backend Engineer (Nodejs, Mongo DB) position at mercavus

## Getting Started 

### Development 

* Clone repository 
* Execute `yarn`
* Execute `yarn start`
* Open http://localhost:3000
* Open http://localhost:3000/swagger for swagger

### Testing 

This project is unit tested (around 25 tests) and integration tested. 
You find all unit tests co located in the src folder and all integration tests in the __testintegation_ folder

* Execute `yarn test` to execute all tests

**This project uses only an in memory mongodb**

## Learnings 
The following things I noticed during the impl. phase. 

* 💡Project setup took to long (2,5h)
* 🤔 Project structure is over engineered for the project scope
* 🤔 Hapi.js - error handling is not intuitive
* ❓Project description could be more clear about what should be done. 
    * Questions I ask myself: Is the FE task only for FE positions? 
    * Questions I ask myself: Is CRUD a Restfull like API necessary (all CRUD methods?) 
* 🤔Find a better solution to generate swagger docs from Typescript types
* 💡 Typegoose is not necessary for this project but I'd like test the lib. 
* 👍👍 Integration tests are always useful! 
  

## Tasks 

The focus for this project is the backend part. 
The frontend (FE) is a prototype only. 

### Time Planing 
* 1h - Setup 
* 1-2h - Implementation Backend 
* 1h - Implementation FE 

### Backend 

* [x] Define Routes
* [x] Setup deployment / CI
* [x] Setup Project structure 
* [x] Getting started with HAPI Framework 
* [x] Implement Controller / Services / Entities


### Frontend 

* [x] Setup Propject 
* [ ] Implement Mockup
