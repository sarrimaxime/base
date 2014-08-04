<?php
//-----------------------------------------------------------------o  imports

require 'Slim/Slim.php';
require 'Slim/AbstView.php';

require 'Internet/config.php';
require 'Internet/utils.php';
require 'Internet/Manager.php';
require 'Internet/core/Controller.php';
require 'Internet/core/Model.php';
require 'Internet/core/Partial.php';

require 'Internet/Mobile_detect.php';

//-----------------------------------------------------------------o  IE<=7


//-----------------------------------------------------------------o  Layout view definition

$view = new AbstView();
$view->set_layout("/_Layout.php");

//-----------------------------------------------------------------o  app instantiation

$app = new Slim(array(
	'templates.path' => 'Internet/views/',
	'view' => $view,
    'mode' => MODE
));


$app->configureMode('prod', function () use ($app) {
    $app->config(array(
        'log.enable' => true,
        'debug' => false,
		'log.level' => Slim_Log::DEBUG,
    ));
});

$app->configureMode('dev', function () use ($app) {
    $app->config(array(
        'log.enable' => false,
        'debug' => true
    ));
});

$manager = new Manager();


function getBaseUrl() {
	$baseUrl = '/'.basename($_SERVER["DOCUMENT_ROOT"]);
	return $baseUrl;
}

//-----------------------------------------------------------------o routes definition


//
$app->get('/404', function () use ($app, $view){
	require_once("Internet/views/404.php");
});


// dynamic controller/action/params route
$app->get('(/)(/:parts+)', function ($parts = array()) use ($app, $view, $manager){

	if (NOLANG == false){
		if (count($parts) == 0){
			$app->redirect('/' . DEFAULT_LANGUAGE);
		}
		$dataFolder = $parts[0];
		array_splice($parts, 0, 1);
		$language = $dataFolder;
		$page = $parts[1] ? $parts[1] : 'home';
	}
	else {
		$dataFolder = 'content';
		$page = $parts[0] ? $parts[0] : 'home';
	}
	
	// GET GOOD CONTROLLER & ACTION
	$data = $manager->loadContent($parts, $page);

	$action = 'Index';

	// DETECT DEVICE
	$detect = new Mobile_Detect;
	$device = 'desktop';
	if ($detect->isMobile() && !$detect->isTablet()){
		$device = 'mobile';
	}
	else if ($detect->isTablet()){
		$device = 'tablet';
	}

	// SET DATA
	$viewData = array();
	if ($language) $viewData['language'] = $language;

	$params = array();
	$viewData['params'] = $params;
	$viewData['data'] = $data;
	$viewData['device'] = $device;
	$view->set_data($viewData);

	$controller = ucfirst(strtolower($page)).'Controller';

	if (file_exists('Internet/controllers/'.$controller.'.php')){

		require('Internet/controllers/'.$controller.'.php');
		$controller = new $controller($app);

		if (method_exists($controller, $action))
		{
			$controller->set_data(array(
				"language" => $language,
				"data" => $data,
				"device" => $device,
				"env" => $app->getMode()
			));
			call_user_func_array(array(
				$controller,
				$action
			), $params);
			return;
		}
	}


	//$app->redirect('/404');
	//$app->redirect('/'.$language);
});

// 404
$app->notFound(function () use ($app){
	$app->redirect(getBaseUrl().'/404');
});

// error
$app->error(function ($err) use ($app){
	//$app->redirect('/error');
	$app->redirect(getBaseUrl().'/');
});

$app->run();
