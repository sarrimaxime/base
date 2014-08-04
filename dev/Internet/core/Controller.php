<?php
class Controller
{

	protected $vars = array();
	protected $model;
	protected $app;


    function __construct($app)
    {
        $this->app = $app;
    }

	public function set_data($data)
	{
		$this->vars = array_merge($this->vars, $data);
	}

	public function loadModel($model)
	{
		$model .= 'Model';
		require_once(ROOT.'Internet/models/'.$model.'.php');
		$this->model = new $model();
	}

	public function render($name)
	{
        $this->app->render($name.".php", $this->vars);
	}

    public function defaultRedirect()
    {
        $this->app->redirect("/".Model::$language."/home");
    }

    protected function toArray($xml)
    {
        $json = json_encode($xml);
        $array = json_decode($json, TRUE);
        return $array;
    }
}
