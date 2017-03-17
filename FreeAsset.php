<?php
namespace sqiva\free;
use yii\web\AssetBundle;

class FreeAsset extends AssetBundle
{
    public $sourcePath = '@vendor/sqiva/free/dist';
	public $css = [
		'css/bootstrap.min.css',
		'css/normalize.css',
		'css/bootstrap-datetimepicker.min.css',
		//~ 'css/bootstrap-table.min.css',
		'css/bootstrap-select.css',
		'css/font-awesome.min.css',
		'css/sm-core-css.css',
		'css/jquery.smartmenus.bootstrap.css',
		// CUSTOM
		'css/freestyle.css',
		'css/theme1.css',
		//~ 'fonts/open-sans/opensans.css',
	];
	public $js = [
		'js/bootstrap.min.js',
		'js/moment.min.js',
		'js/bootstrap-datetimepicker.min.js',
		//~ 'js/bootstrap-table.min.js',
		'js/bootstrap-select.min.js',
		'js/bootstrap-maxlength.js',
		'js/jquery.number.min.js',
		'js/Chart.bundle.min.js',
		'js/jquery.smartmenus.min.js',
		'js/jquery.smartmenus.bootstrap.min.js',
		// CUSTOM
		'js/freescript.js',
		'js/list_menu.js',
	];
	public $depends = [
		'sqiva\free\BootstrapTableAsset',
	];
}
