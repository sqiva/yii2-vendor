<?php
namespace sqiva\vendor;
use yii\web\AssetBundle;

class SqivaAsset extends AssetBundle
{
    public $sourcePath = '@vendor/bower';
	public $css = [
        'components-font-awesome/css/font-awesome.min.css',
        'sqiva/dist/fonts/open-sans/opensans.css',
        'bootstrap/dist/css/bootstrap.min.css',
        'bootstrap-table/dist/bootstrap-table.min.css',
        'sqiva/dist/css/freestyle.css'
		// 'css/bootstrap.min.css',
		// 'css/normalize.css',
		// 'css/bootstrap-datetimepicker.min.css',
		// //~ 'css/bootstrap-table.min.css',
		// 'css/bootstrap-select.css',
		// 'css/font-awesome.min.css',
		// 'css/sm-core-css.css',
		// 'css/jquery.smartmenus.bootstrap.css',
		// // CUSTOM
		// 'css/freestyle.css',
		// 'css/theme1.css',
		// //~ 'fonts/open-sans/opensans.css',
	];
	public $js = [
        'bootstrap/dist/js/bootstrap.min.js',
        'bootstrap-table/dist/bootstrap-table.min.js',
        'sqiva/dist/js/freestyle.js'
		// 'js/bootstrap.min.js',
		// 'js/moment.min.js',
		// 'js/bootstrap-datetimepicker.min.js',
		// //~ 'js/bootstrap-table.min.js',
		// 'js/bootstrap-select.min.js',
		// 'js/bootstrap-maxlength.js',
		// 'js/jquery.number.min.js',
		// 'js/Chart.bundle.min.js',
		// 'js/jquery.smartmenus.min.js',
		// 'js/jquery.smartmenus.bootstrap.min.js',
		// // CUSTOM
		// 'js/freescript.js',
		// 'js/list_menu.js',
	];
}
