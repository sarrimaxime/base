<?php
class NewsletterController extends Controller
{

    public function Index($email){

        $validation = array('exists' => false, 'valid' => false);

        $file = $_SERVER['DOCUMENT_ROOT'].'/json/emails.json';

        $emails = json_decode(file_get_contents($file));

        $verifMail='#^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$#';  
        if(preg_match($verifMail,$email)){
            $validation['valid'] = true;
        }

        if (in_array($email, $emails)){
            $validation['exists'] = true;
        }

        if ($validation['exists'] == false && $validation['valid'] == true){
            array_push($emails, $email);
            $results = json_encode($emails);
            file_put_contents($file, $results);
        }

        echo json_encode($validation);

	}

}