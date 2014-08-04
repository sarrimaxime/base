<?php
class Partial
{
	
	public $model;
	
	
	function __construct($name, $model=null)
	{
		if(isset($model))
		{
			$model .= 'Model';
			require('Internet/models/'.$model.'.php');
			$this->model = new $model();
		}
		
		$this->render($name);
	}
	
	public function render($name)
	{
		require(ROOT.'Internet/views/'.$name.'.php');
	}
	
}
?>