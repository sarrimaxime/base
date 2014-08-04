<?php
class JournalController extends Controller
{

    public function Index(){

    	//$this->loadModel('Index');
    	$data = array();
        $this->set_data($data);
        
        $this->render('parts/Journal');

	}
}