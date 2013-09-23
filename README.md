### Want computed properties for your Backbone models? Look no further!

Wait, I mean... look further. Don't stop looking at this page. Ah, I'm terrible at first impressions. Anyway...

If you've used [EmberJS](http://emberjs.com/guides/object-model/computed-properties/), rails, laravel, or many other frameworks then you've probably messed with computed properties. Or maybe you call them dynamic attributes or something else. 

#### To get started just load [src/backbone.model.computed.js](https://raw.github.com/kdocki/backbone.model.computed/master/src/backbone.model.computed.js) into your page.

But maybe you want to know what this thing does? So basically, I wanted to be able to do this,


```js

  FooModel = Backbone.Model.extend({
  
    getFullName : function() {
      return this.get('first_name') + ' ' + this.get('last_name')
    }
    
  });
  
  var foo = new FooModel({ first_name: 'Bob', last_name: 'Marley' });
  
  foo.get('full_name'); // Bob Marley
  foo.toJSON();         // { first_name: 'Bob', last_name: 'Marley', full_name: 'Bob Marley' }
```

Let's not stop there. You can also set the `full_name` property,


```js

  FooModel = Backbone.Model.extend({
  
    getFullName : function() {
      return this.get('first_name') + ' ' + this.get('last_name')
    },
    
    setFullName : function(value) {
      var names = value.split(' ');
      this.set('first_name', names[0]);
      this.set('last_name', names[1]);
    }
    
  });
  
  var foo = new FooModel({ first_name: 'Bob', last_name: 'Marley' });
  
  foo.set('full_name', 'Chuck Mangione');
  foo.get('full_name')  // Chuck Mangione
  foo.get('first_name') // Chuck

```

So, that's awesome right? But let's not stop there, what if we want to listen for change events for `full_name` when the `first_name` or `last_name` property changes?

```js

  FooModel = Backbone.Model.extend({

    getFullName : function() {
      return this.get('first_name') + ' ' + this.get('last_name')
    }.property('first_name', 'last_name'),
    
    setFullName : function(value) {
      var names = value.split(' ');
      this.set('first_name', names[0]);
      this.set('last_name', names[1]);
    }
  
  });

  var foo = new FooModel({ first_name: 'Bob', last_name: 'Marley' });
  
  foo.on('change:full_name', function() {
    foo.set('first_name', 'Chuck');
  });
  
  foo.set('last_name', 'Mangione');
  foo.get('full_name') // Chuck Mangione

```

Lastly, if you have a function that you want to ignore the computed property on then you can use `ignoreMethods`

```js

  FooModel = Backbone.Model.extend({
    ignoreMethods : [
      'getFullName'
    ],
    
    getFullName : function() {
      return this.get('first_name') + ' ' + this.get('last_name')
    }
  });


  var foo = new FooModel({ first_name: 'Bob', last_name: 'Marley' });
  
  foo.get('full_name') // undefined

```


