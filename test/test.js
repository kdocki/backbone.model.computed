function assert(bool)
{
    if (bool !== true) {
        throw 'Assertion not valid!';
    }
}

TestModel1 = Backbone.Model.extend({

    getFoo : function() {
        return '$' + this.get('bar') + this.get('baz');
    }.property('bar', 'baz'),

    setFoo : function(value) {
        this.set('bar', value + 1);
    }

});

TestModel2 = Backbone.Model.extend({
    getFoo : function() {
        return "checked!";
    }.property('bar', 'baz'),
});

TestModel3 = Backbone.Model.extend({
    getFoo : function() {
        return 'pocket full of happiness';
    },
});

TestModel4 = Backbone.Model.extend({
    setFoo : function(value) {
        return 'say what? ' + value
    },
});

TestModel5 = Backbone.Model.extend({
    ignoreMethods : [
        'getFoo'
    ],

    getFoo : function() {
        return 'xyz';
    }
})
// testing event's are called
// when updating properties
// and also checking that properties
// getters/setters are still working
var test1 = new TestModel1;
var fooEventCalled = 0;

test1.on('change:foo', function()
{
    fooEventCalled++;
});

test1.set('bar', 4);
test1.set('baz', 2);

assert (test1.get('foo') === '$42')
assert (fooEventCalled === 2)
assert (test1.get('bar') === 4)
assert (test1.get('baz') === 2)

test1.set('foo', 42);

assert (test1.get('foo') === '$432')
assert (fooEventCalled === 3)
assert (test1.get('bar') == 43)

// just checking we don't need setFoo
var test2 = new TestModel2;
assert (test2.get('foo') === 'checked!')

// what happens if someone sets foo attribute?
var test3 = new TestModel3;
assert (test3.get('foo') === 'pocket full of happiness')
test3.set('foo', 'changed it');
assert (test3.attributes.foo == 'changed it')
test3.get('foo')

// can we use setFoo as a function? yes, I guess so
var test4 = new TestModel4;
assert (test4.set('foo', 'say who?') === 'say what? say who?')


// what if we have a getFoo function but we don't want 
// it to be considered when doing this.getJSON or this.get
// or this.set. We can override which functions are ignored
var test5 = new TestModel5;
test5.set('foo', 'abc');
assert (test5.get('foo') === 'abc')
test5.ignoreMethods = [];
assert (test5.get('foo') === 'xyz')

console.log('looks like we got through a bunch of tests, awesome!')