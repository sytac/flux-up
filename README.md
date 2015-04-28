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
$ npm install --save flux-up
```

## Quick start

####Prepare your folder struct
```
flux-up-project
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
var fluxUp = require('flux-up');

// Init your flux library
var flux = new Fluxxor.Flux();

// Init app with callback for adding stores and actions
fluxUp.init(
    flux.addStores.bind(flux), 
    flux.addActions.bind(flux)
);

// Register modules 
fluxUp.modules.register('app', require('./app.module'));
fluxUp.modules.register('foo', require('modules/foo/foo.module'));
fluxUp.modules.register('bar', require('modules/bar/bar.module'));

// register additional services
fluxUp.services.register('translationService', require('./translation.service'));

```
In the register operation, stores and actions are directly added to flux instance.
You can access it using the methots provided by the flux library:

```
/* Eg. */
this.getFlux().store('foo');

this.getFlux().actions.foo.someAction();
```
 
 The services are added directly to the flux-up module and could be retrieved everywere:
 
 ```
 var fluxUp = require('flux-up');
 ...
 var translationService =  fluxUp.services.get('translationService');
 
 ```
  


 


