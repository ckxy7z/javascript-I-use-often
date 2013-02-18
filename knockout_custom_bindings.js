// source: http://www.scottlogic.co.uk/blog/colin/2012/10/integrating-knockout-and-jquerymobile/

// listview binding to enable automatic refresh after data update
ko.bindingHandlers.updateListviewOnChange = {

    update: function (element, valueAccessor) {
	ko.utils.unwrapObservable(valueAccessor());  //grab dependency
	// locate the listview
	var listview = $(element).parents()
            .andSelf()
            .filter("[data-role='listview']");
	if (listview) {
	    try {
		$(listview).listview('refresh');
	    } catch (e) {
		// if the listview is not initialised, the above call with throw an exception
		// there doe snot appear to be any way to easily test for this state, so
		// we just swallow the exception here.
	    }
	}
    }
};


// source: http://stackoverflow.com/questions/9373982/knockout-and-jquery-mobile-binding-data-to-select-lists
// select binding to enable automatic refresh after data update
ko.bindingHandlers.updateSelectOnChange = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        if (typeof ko.bindingHandlers.options.init !== 'undefined') {
            ko.bindingHandlers.options.init(element, valueAccessor, allBindingsAccessor, viewModel);
        }
    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        if (typeof ko.bindingHandlers.options.update !== 'undefined') {
            ko.bindingHandlers.options.update(element, valueAccessor, allBindingsAccessor, viewModel);
        }
        var instance = $.data(element, 'selectmenu');
        if (instance) {
            $(element).selectmenu('refresh', true);
        }
    }
};


ko.bindingHandlers.tabKeyDown = {
    init: function(element, valueAccessor, allBindings, vm) {
        ko.utils.registerEventHandler(element, "keydown", function(event) {
	    if (event.keyCode === 9) {
                valueAccessor().call(vm, vm); //set "this" to the data and also pass it as first arg, in case function has "this" bound
		event.preventDefault();
	    }
	    return true;
        });
    }
};

ko.bindingHandlers.tabKeyUp = {
    init: function(element, valueAccessor, allBindings, vm) {
        ko.utils.registerEventHandler(element, "keyup", function(event) {
	    if (event.keyCode === 9) {
                valueAccessor().call(vm, vm); //set "this" to the data and also pass it as first arg, in case function has "this" bound
		event.preventDefault();
	    }
	    return true;
        });
    }
};

ko.bindingHandlers.shiftEnterKeyDown = {
    init: function(element, valueAccessor, allBindings, vm) {
        ko.utils.registerEventHandler(element, "keydown", function(event) {
	    if (event.keyCode === 13 && event.shiftKey) {
                valueAccessor().call(vm, vm);
		event.preventDefault();
	    }
	    return true;
        });
    }
};

ko.bindingHandlers.editableText_ShiftEnterDown = {
    init: function(element, valueAccessor) {
        ko.utils.registerEventHandler(element, "keydown", function(event) {
	    if (event.keyCode === 13 && event.shiftKey) {
		var observable = valueAccessor();
		observable($(this).val());
		event.preventDefault();
	    }
	})
    },
    update: function(element, valueAccessor) {
	var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).val(value);
    }
};
