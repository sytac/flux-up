#Flex App
*Keep clean your code building huge flux/react apps.*

##Why?
- Building TodoMVC app is fancy but useless in daily work. 
- Huge apps need to be modularized.
- Huge apps need services.
- Flex does not provide patterns to modularize apps and to manage services.

## Installation

Install using npm

```bash
$ npm install --save flux-app
```

## Quick start

####Prepare your folder struct
```
flux-app-project
│  README.md
│  ...    
|
└──src
   │  app.js
   │  app.module.js
   |  translation.service.js
   │
   ├──modules
   │  ├--foo
   |  |   foo.js 
   │  │   foo.module.js
   |  |   foo.stores.js
   |  |   foo.actions.js
   |  |   foo.services.js
   │  │   ...
   |  ├--bar
   |  |   bar.js 
   │  │   bar.module.js
   |  |   bar.stores.js
   |  |   bar.actions.js
   |  |   bar.services.js
   │  │   ...
...
```

####Add a module description file
Each module require a *.module.js file containing the description of the module. No fields are required. Add an "actions" field for actions, a "stores" fields for stores. This fields are passed directly to the addStores and addActions callbacks set in the ```init``` method. Check your flux library docs for the right format. Examples are provided using [Fluxxor](http://fluxxor.com/).  

```javascript
/* foo.module.js */
var FooStore = require('./foo.store');
var fooActions = require('./foo.actions'); 
var fooService = require('./foo.service');

module.exports = {
  actions : {
    'foo' : fooActions
  },
  stores : {
    // Fluxxor require store instance, other library could work differently
    // Check the flux lib documentation  
    'foo' : new FooStore()
  },
  services : {
    'fooService' : fooService
  }
};

```

####Init the app

```javascript
/* app.js */
var fluxApp = require('flux-app');

// Init your flux library
var flux = new Fluxxor.Flux();

// Init app with callback for adding stores and actions
fluxApp.init(
    flux.addStores.bind(flux), 
    flux.addActions.bind(flux)
);

// Register modules 
fluxApp.modules.register('app', require('./app.module'));
fluxApp.modules.register('foo', require('modules/foo/foo.module'));
fluxApp.modules.register('bar', require('modules/bar/bar.module'));

// register additional services
fluxApp.services.register('translationService', require('./translation.service'));

```
In the register operation, stores and actions are directly added to flux instance.
You can access it using the methots provided by the flux library:

```
/* Eg. */
this.getFlux().store('foo');

this.getFlux().actions.foo.someAction();
```
 
 The services are added directly to the flux-app module and could be retrieved everywere:
 
 ```
 var fluxApp = require('flux-app');
 ...
 var translationService =  fluxApp.services.get('translationService');
 
 ```
  


 


