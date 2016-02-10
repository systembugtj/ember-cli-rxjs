import Ember from 'ember';
import { observable } from 'ember-cli-rx/helpers';


module('helpers/observable');

test('it should always supply an observable', function(assert){
	var FooClass = Ember.Object.extend({
		input: observable()
	});

	var foo = FooClass.create();

	assert.ok(foo.get('input') instanceof Rx.Observable);
});

test('it should always give the latest supplied observable and only require one subscription', function(assert){
	stop();

	var FooClass = Ember.Object.extend({
		input: observable()
	});

	var i = 0;
	var expectedResults = [23, 42, 'banana', 'stand'];

	var foo = FooClass.create({
		input: Rx.Observable.fromArray([23, 42]),
	});

	foo.get('input').forEach(function(x) {
		assert.deepEqual(x, expectedResults[i++]);

		if(i === expectedResults.length) {
			start();
		}
	});

	foo.set('input', Rx.Observable.fromArray(['banana', 'stand']));
});