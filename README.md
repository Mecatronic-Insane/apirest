# Node.js, Express & MySQL: Brands and Models (CRUD)

### Requirements

- Visual Studio Code
- GIT
- Node. Js
- DATABASE (MYSQL) provided from XAMPP
- Postman

### Download project
```
Clone this repo
```


## Installation
> *Run Xampp Control Panel : Start Apache and Mysql Services. 

	Go to the http://localhost:XXXX
> *port maybe to be different, check the control panel to configure it.


	Once time on Xampp homepage ( "http://localhost:8080/dashboard/" ).
	go to the "phpMyAdmin".

> *now create a Database named "restapi_nexu"  and import "brands.sql" included in the root folder.


### Configuration (.ENV)

You need create .env file on root folder. 

		DB_NAME=restapi_nexu
		DB_HOST= localhost
        	DB_USER= root
	    	DB_PASS =
		DB_PORT = 3306, //port mysql

> *port is default in this case, if you have the running service on another port, configure it. 


### Project setup
```
npm install
```

## Run
```
npm run dev
```

### Available Endpoints



```
                        GET    /brands
                        GET    /brands/:id/models
                        POST   /brands
                        POST   /brands/:id/models
			PUT	 /brands/:id
			DELETE / brands/id
                        PUT    /models/:id
                        GET    /models
```

## Test
```
npm run test
```
- Customization
> Open "Brand.test.js" on "__test__" folder.
remove ".skip" from to test cases.
remove "--silent" on test script from "package.json" for watch console.logs

```
Test Sample:

//Skipped
describe.skip('GET /api/brands', () => {
    test("should respond with a 200 status code'", async () =>{
		...
    });
});

//Ready
describe('GET /api/brands', () => {
    test("should respond with a 200 status code'", async () =>{
			...
    });
});
```

## Open your Browser
And type: localhost:4000/api/brands
