(function() {

	$.fn.bootstrapTable.defaults.classes = 'table';
	$.fn.bootstrapTable.defaults.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
	$.fn.bootstrapTable.defaults.method = 'POST';
	$.fn.bootstrapTable.defaults.sidePagination = 'server';
	$.fn.bootstrapTable.defaults.pagination = true;
	$.fn.bootstrapTable.defaults.buttonsClass = 'default btn-sm';
	$.fn.bootstrapTable.defaults.pageSize = 50;
	$.fn.bootstrapTable.defaults.pageList = [10, 50, 100];

	var _temp;

	function _makeOverlay()
	{
		if (!$('#__overlay__').length)
		{
			var _temp = '\
				<div class="overlay" id="__overlay__"></div>\
			';
			$('body').append(_temp);
		}
	}

	function _clear(that)
	{
		$(that).remove();

		if ($('.__panel__').length == 0)
		{
			$('#__overlay__').remove();
		}
	}

	$.confirm = function(param)
	{
		_makeOverlay();
		var opts = $.extend({
			heading: 'Please Confirm',
			text: 'Are you sure ?',
			buttonAlignClass: 'text-right',
			onYes: function() {return undefined;} ,
			onNo: function() {return undefined;}
		}, param || {});

		_temp = '';
		_temp += '\
			<div class="__confirm__ __panel__ panel">\
				<div class="panel-heading">'+ opts.heading +'</div>\
					<div class="panel-body">'+ opts.text +'</div>\
					<div class="panel-footer text-right">\
						<button class="btn btn-default __no__" type="button">No</button>\
						<button class="btn btn-primary __yes__" type="button">Yes</button>\
					</div>\
				</div>\
			</div>\
		';

		$('body').append(_temp);

		var activePanel = $('.__confirm__').last();
		var noButton = $(activePanel).find('.__no__');
		var yesButton = $(activePanel).find('.__yes__');
		$(yesButton).focus();

		$(noButton).click(function()
		{
			_clear(activePanel);
			opts.onNo();
		});
		$(yesButton).click(function()
		{
			_clear(activePanel);
			opts.onYes();
		});
	};

	$.alert = function(param)
	{
		_makeOverlay();
		var opts = $.extend({
			heading: 'Alert',
			text: '',
			buttonAlignClass: 'text-right',
			closeOnEscape: true,
			onClose: function() {}
		}, param || {});

		_temp = '\
			<div class="__alert__ __panel__ panel panel-default">\
				<div class="panel-heading">'+ opts.heading +'</div>\
					<div class="panel-body">'+ opts.text +'</div>\
					<div class="panel-footer text-right">\
						<button class="btn btn-default __close__">Close</button>\
					</div>\
				</div>\
			</div>\
		';

		$('body').append(_temp);

		var activePanel = $('.__alert__').last();
		var closeButton = $(activePanel).find('.__close__');
		$(closeButton).focus();

		$(closeButton).click(function()
		{
			_clear(activePanel);
			opts.onClose();
		});

		if (opts.closeOnEscape == true)
		{
			$(document).keypress(function(e) {
				if (e.keyCode == 27)
				{
					closeButton.click();
				}
			});
		}
	}

	$.loading = function(param)
	{
		var opts = $.extend({
			text: 'Loading'
		}, param || {});

		_temp = '<div class="overlay" id="__overlay_load__"></div>';
		_temp += '\
			<div id="__loader__">\
				<div class="progress">\
					<div class="progress-bar progress-bar-striped active" style="width:100%">\
						'+ opts.text +'\
					</div>\
				</div>\
			</div>\
		';
		$('body').append(_temp);
	}

	$.unloading = function()
	{
		$('#__loader__, #__overlay_load__').remove();
	}

	$.makePagination = function(tableId)
	{
		var $div = $(tableId).parents('.bootstrap-table');
		var options;

		_temp = '\
			<div class="bootstrap-table-pagination" hidden style="float: right;margin: 10px 0 10px 3px;">\
				<div style="line-height: 29px;float: left;margin-right: 3px">\
					<b class="displayFirst font-12"></b> - <b class="displayLast font-12"></b> of <b class="displayAll font-12"></b>\
				</div>\
				<div class="btn-group btn-pager">\
					<button class="btn btn-default btn-sm prev-page"  title="Previous Page"><i class="fa fa-chevron-left"></i></button>\
					<button class="btn btn-default btn-sm next-page"  title="Next Page"><i class="fa fa-chevron-right"></i></button>\
				</div>\
				<div class="btn-group pagination-size"></div>\
			</div>\
		';
		$div.prepend(_temp);

		$(tableId).on('post-body.bs.table', function(data)
		{
			options = $(tableId).bootstrapTable('getOptions');
			var pageSizeHtml = $div.find('.page-list').children('.btn-group').clone(true);
			var pageSize = $div.find('.pagination-size');
			var divDisplayFirst = $($div).find('.displayFirst');
			var divDisplayLast = $($div).find('.displayLast');
			var divDisplayAll = $($div).find('.displayAll');

			$(divDisplayFirst).html((options.pageNumber - 1) * options.pageSize + 1);

			if (options.pageNumber * options.pageSize > options.totalRows)
			{
				$(divDisplayLast).html(options.totalRows);
			}
			else
			{
				$(divDisplayLast).html(options.pageNumber * options.pageSize);
			}

			$(divDisplayAll).html(options.totalRows);

			if (options.totalRows > options.pageSize)
			{
				$(pageSizeHtml).removeClass('dropup');
				$(pageSizeHtml).find('.dropdown-toggle').addClass('btn-sm');
				$(pageSizeHtml).find('.dropdown-menu').addClass('dropdown-menu-right');
				$(pageSize).html(pageSizeHtml);
			}
			else
			{
				// $div.find('.btn-pager').hide();
			}

			$div.find('.bootstrap-table-pagination').show();
		});

		$div.find('.prev-page').click(function()
		{
			$(tableId).bootstrapTable('prevPage');
		});
		$div.find('.next-page').click(function()
		{
			$(tableId).bootstrapTable('nextPage');
		});
	}

	$.globalSearch = function(param)
	{
		var opts = $.extend(true, {
			disabled: false,
			placeholder: 'Search',
			searchOnEnter: true,
			useDropdown: false,
			useButton: true,
			dropdownHtml: '',
			title: 'Advance Search',
			globalTextId: '__txtGlobalSearch__',
			modalOptions: {
				backdrop: 'static',
				show: false
			},
			buttonHtml: null,
			searchFunction: function() {return undefined;},
		}, param || {});

		var temp = '';

		temp += '\
			<input type="text" class="form-control" placeholder="'+ opts.placeholder +'" id="'+ opts.globalTextId +'">\
		';

		if (opts.useDropdown == true || opts.useButton == true)
		{
			$('#__divGlobalSearch__').addClass('input-group');

			temp += '<div class="input-group-btn">';

			if (opts.useDropdown == true)
			{
				if (!opts.buttonHtml)
				{
					opts.buttonHtml = '\
						<div>\
							<button type="button" class="btn btn-default" id="_btnLayoutModalReset">Reset</button>\
							<button type="button" class="btn btn-primary" id="_btnLayoutModalSearch">Search</button>\
						</div>\
					';
				}

				$('body').append('\
					<div class="modal" id="_modalLayoutSearch">\
						<div class="modal-dialog">\
							<div class="modal-content">\
								<div class="modal-header">\
									<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
									<h4 class="modal-title" id="">'+ opts.title +'</h4>\
								</div>\
								<div class="modal-body">\
									\
								</div>\
								<div class="modal-footer">\
									'+ $(opts.buttonHtml).remove().html() +'\
								</div>\
							</div>\
						</div>\
					</div>\
				');

				$('#_modalLayoutSearch').modal(opts.modalOptions);

				temp += '\
					<button class="btn btn-default" id="_btnGlobalSearch_">\
						<span class="caret"></span>\
					</button>\
				';

				var body = $(opts.dropdownHtml).html();
				$(opts.dropdownHtml).remove();

				$('#_modalLayoutSearch').find('.modal-body').html(body);
			}

			if (opts.useButton)
			{
				temp += '\
					<button class="btn btn-primary" id="__btnSearch__">\
						<i class="fa fa-search"></i>\
					</button>\
				';
			}

			temp += '</div>';
		}

		$('#__divGlobalSearch__').html(temp);
		$('#'+opts.globalTextId).prop('disabled', opts.disabled);

		$('#_btnGlobalSearch_').click(function() {
			$('#_modalLayoutSearch').modal('show');
		});

		if (opts.searchOnEnter == true)
		{
			$(opts.globalTextId).keypress(function(e)
			{
				if (e.keyCode == 13)
				{
					opts.searchFunction();
				}
			});
		}

		if (opts.useButton == true)
		{
			$('#__btnSearch__').click(opts.searchFunction);
		}
	}

	$.inputError = function(param)
	{
		var opts = $.extend({
			inputId: '',
			message: ''
		}, param || {});

		var inputElement = $(opts.inputId);
		var temp = '';

		$(inputElement).parents('.form-group').addClass('has-error');

		if ($(inputElement).next('.help-block').length == 0)
		{
			temp += '\
				<small class="help-block">'+ opts.message +'</small>\
			';

			$(temp).insertAfter(inputElement);
		}

		// $(inputElement).focus();
	}

	$.showError = function(error)
	{
		if(typeof(error) == 'object')
		{
			var output = '';
			for (var property in error)
			{
				if($('#input'+(property.charAt(0).toUpperCase() + property.slice(1))).length)
				{
					$.inputError({
						inputId: '#input'+(property.charAt(0).toUpperCase() + property.slice(1)),
						message: error[property]
					});
				}
				else
				{
					output += (output == '') ? error[property] : '<br>' + error[property];
				}
			}
			if(output != '')
			{
				$.alert({
					text: output
				});
			}
		}
		else
		{
			$.alert({
				text: error
			});
		}
	}

})(jQuery);

$(function() {

})

window.onerror = function (msg, url, lineNo, columnNo, error)
{

    var string = msg.toLowerCase();
    var substring = "script error";

    if (string.indexOf(substring) > -1)
	{
        alert('Script Error: See Browser Console for Detail');
    }
	else
	{
        var message = [
            'Message: ' + msg,
            'URL: ' + url,
            'Line: ' + lineNo,
            'Column: ' + columnNo,
            'Error object: ' + JSON.stringify(error)
        ].join(' - ');

        $.alert({
			text: message
		});
    }

	return false;
};

$(document).ajaxStart(function()
{
	$.loading();
	$('.has-error').find('.help-block').remove();
	$('.has-error').removeClass('has-error');
});
$(document).ajaxStop(function()
{
	$.unloading();
});
$(document).ajaxComplete(function(event,xhr,options)
{
	try
	{
		$('#__serverTime__').html(xhr.responseJSON.processtime);
	} catch (e)
	{

	} finally
	{

	}
});
$(document).ajaxError(function(event,xhr,options,exc)
{
	if (xhr.status != 0)
	{
		$.alert({
			heading: xhr.status + ' - ' + xhr.statusText,
			text: xhr.responseText
		});
	}
});
$(document).on('hidden.bs.modal', '.modal', function ()
{
    $('.modal:visible').length && $(document.body).addClass('modal-open');
});

$(function()
{
	// automatic create cd top
	__makeCdTop__();

	// auto tooltip
	$('[data-toggle="popover"]').popover();
	$('[data-toggle="tooltip"], [data-hover="tooltip"]').tooltip();

	// all ajax will be post and json type by default
	$.ajaxSetup({
		type: 'POST',
		dataType: 'JSON',
	});
});

function __makeCdTop__()
{
	$('body').append('\
		<a class="cd-top text-info" title="go to top">\
			<i class="fa fa-2x fa-arrow-up"></i>\
		</a>\
	');

	var offset = 40,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 300,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function()
	{
		// console.log($(this).scrollTop());
		if ($(this).scrollTop() > offset)
		{
			$back_to_top.fadeIn();
		}
		else
		{
			$back_to_top.fadeOut();
		}

		if ($(this).scrollTop() > offset_opacity )
		{
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		}, scroll_top_duration);
	});
}

function setDateRangeDefaultToday(date1, date2)
{
	// date1 < date2
	$(date1).datetimepicker({
		format : 'DD/MM/YYYY',
		useCurrent: false,
		minDate: moment(),
		ignoreReadonly: true,
		showTodayButton: true
	});

	$(date2).datetimepicker({
		format : 'DD/MM/YYYY',
		useCurrent: false,
		minDate: moment(),
		ignoreReadonly: true,
		showTodayButton: true,
	});

	$(date1).on("dp.change", function(e)
	{
		$(date2).data("DateTimePicker").minDate(e.date);
	});

	$(date2).on("dp.change", function(e)
	{
		$(date1).data("DateTimePicker").maxDate(e.date);
	});
}
