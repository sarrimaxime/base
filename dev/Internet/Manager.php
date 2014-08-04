<?php

class Manager {

    public function loadContent($parts, $page){

        $uri = '';
        foreach($parts as $part){
            $uri .= '/' . $part;
        }

        if (count($parts) == 0){
            $path = '/works';
        } else {
            $path = $uri;
        }

		$content =  simplexml_load_file("xml" . $path . "/content.xml", 'SimpleXMLElement', LIBXML_NOCDATA);
        $global =  simplexml_load_file("xml/global.xml", 'SimpleXMLElement', LIBXML_NOCDATA);

        $content = (object) array(
            'uri' => $uri,
            'content' => json_decode(json_encode($content)),
            'global' => json_decode(json_encode($global))
        );

		$this->content  = $content;
		return $content;

    }

}
