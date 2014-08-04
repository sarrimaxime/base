<?php
class AbstView extends Slim_View
{
	protected $_layout = NULL;
	protected $_data   = NULL;
	public $device = 'desktop';

	public function set_layout($layout = NULL, $data = array())
	{
		$this->_layout = $layout;
		$this->_data = $data;
	}

	public function set_data($data = NULL)
	{
		$this->_data = $data;
	}

	public function render($template)
	{	
		// Check the folder template for mobile or tablet
		$deviceFolder = 'desktop';
		if (isset($this->data['device'])){
			$deviceFolder = $this->data['device'];
		}
		if ($deviceFolder == 'tablet'){
			$deviceFolder = 'desktop';
		}

		// Check the folder if it's an old IE
		if(preg_match('/(?i)msie [1-8]/', $_SERVER['HTTP_USER_AGENT']) /*|| strpos($_SERVER['HTTP_USER_AGENT'], 'Trident/7.0; rv:11.0') !== false*/){
			$deviceFolder = 'old';
		}

		$template_path = $this->getTemplatesDirectory() . '/' . $deviceFolder . '/' . ltrim($template, '/');

		if (!file_exists($template_path))
		{
			throw new RuntimeException('View cannot render template `' . $template_path . '`. Template does not exist.');
		}

		// $this->data refers to Slim framework template (not base layout) variables
		extract($this->data);

		ob_start();
		require $template_path;
		$html = ob_get_clean();

        // we can disable templating to lighten pages
        if(isset($this->data["useLayout"]) && $this->data["useLayout"] == 0)
            return $html;
        else
            // using layout by default
		    return $this->_render_layout($html, $deviceFolder);
	}

	/**
	 * Create a similar render method but for the layout (called by the official render method)
	 * At the moment, you have to use $content in your layout to load up your view
	 */
	private function _render_layout($view, $deviceFolder)
	{
		if($this->_layout !== NULL)
		{
			$layout_path = $this->getTemplatesDirectory() . '/' . $deviceFolder . '/' . ltrim($this->_layout, '/');

			if (!file_exists($layout_path))
			{
				throw new RuntimeException('View cannot render layout `' . $layout_path . '`. Layout does not exist.');
			}

			// Base layout variables
			extract($this->_data);

			ob_start();
			require $layout_path;
			$view = ob_get_clean();
		}

		return $view;
	}

}
