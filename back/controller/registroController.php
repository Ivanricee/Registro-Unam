<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');


	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 86400');

	if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
	    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
	    header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
	exit(0);
	}

	require_once('/../model/ModeloRegistro.php');











































	$registro = new registro;


	 if(isset($_GET["registro"])) {

	 	if ($_POST) {
	 		$usuario_data=json_decode(file_get_contents("php://input"));
			if(isset($usuario_data)){


				$registro_data['cedula'] = TRIM($usuario_data->cedula);
				$registro_data['nombre'] = TRIM($usuario_data->nombre);
				$registro_data['paterno'] = TRIM($usuario_data->paterno);
				$registro_data['materno'] = TRIM($usuario_data->materno);
			  $registro_data['genero'] = TRIM($usuario_data->genero);
			  $registro_data['username'] = TRIM($usuario_data->username);
			  $registro_data['passwordI'] = TRIM($usuario_data->passwordI);
			  $registro_data['passwordError'] = TRIM($usuario_data->passwordError);
			  $registro_data['email'] = TRIM($usuario_data->email);
			  $registro_data['telefono'] = TRIM($usuario_data->telefono);
			  $registro_data['institucion'] = TRIM($usuario_data->institucion);
			  $registro_data['titulo'] = TRIM($usuario_data->titulo);
			  $registro_data['cp'] = TRIM($usuario_data->cp);
			  $registro_data['estado'] = TRIM($usuario_data->estado);
			  $registro_data['municipio'] = TRIM($usuario_data->municipio);
			  $registro_data['asentamiento'] = TRIM($usuario_data->asentamiento);
			  $registro_data['calle'] = TRIM($usuario_data->calle);
			  $registro_data['interior'] = TRIM($usuario_data->interior);
			  $registro_data['exterior'] = TRIM($usuario_data->exterior);




				$lastInsert = $registro->setPersona($registro_data);

				$last_insert['id'] =$lastInsert;
				print(json_encode($last_insert));
					//print($lastInsert);
			}
	 	}


	}else if(isset($_GET["log"])){
		$login_data=json_decode(file_get_contents("php://input"));
		if(isset($login_data)){
			$data_user = $registro->LogIn($login_data->usuarioLogin, $login_data->passwordLogin);
			print(json_encode($data_user[0]));
				//print_r($data_user);

		}

	 }else if(isset($_GET["cedula"])){
		 	$cedula=json_decode(file_get_contents("http://search.sep.gob.mx/solr/cedulasCore/select?fl=*%2Cscore&q=".$_GET["cedula"]."&start=0&rows=1&facet=true&indent=on&wt=json"));

		 	print(json_encode($cedula->response->docs[0]));

		//var_dump($cedula);

	 }else if(isset($_GET["foto"])){
	 		if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
			  echo json_encode(array('status' => false));
			  exit;
			}
			 if($_GET["foto"] == 1){ //cuando la foto es de usuario
			 	$pathRoot = 'uploads/';
			 	$path = 'uploads/'.$_POST['userId'].'/';

				if (isset($_FILES['file'])) {
				  $originalName = $_FILES['file']['name'];
				  $ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
				  $generatedName = md5($_FILES['file']['tmp_name']).$ext;
				  $filePath = $path.$generatedName;

					 if($ext == '.png' || $ext == '.jpg'){
					 	  if (!is_writable($pathRoot)) {
						    echo json_encode(array(
						      'status' => false,
						      'msg'    => 'Directorio p no se puede esribir.'
						    ));
						    exit;
						  }
						  if (!file_exists($path)) {
							 	mkdir($path, 0755, true);
						  }

						  if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
						  	if(isset($_POST['userId'])){
						  		$updated = $registro->updateUsuario($filePath,$_POST['userId']);
						  	}

						    echo json_encode(array(
						      'status'        => true,
						      'originalName'  => $originalName,
						      'generatedName' => $filePath
						    ));
						    /*##################################################################*/
						    list($width, $height) = getimagesize($filePath);
							if($ext == '.png'){
								$image = imagecreatefrompng($filePath);
							}else{
						    	$image = imagecreatefromjpeg($filePath);
							}
							$thumb_width = 300;
							$thumb_height = 300;


							$original_aspect = $width / $height;
							$thumb_aspect = $thumb_width / $thumb_height;

							if ( $original_aspect >= $thumb_aspect )
							{
							   // If image is wider than thumbnail (in aspect ratio sense)
							   $new_height = $thumb_height;
							   $new_width = $width / ($height / $thumb_height);
							}
							else
							{
							   // If the thumbnail is wider than the image
							   $new_width = $thumb_width;
							   $new_height = $height / ($width / $thumb_width);
							}

							$thumb = imagecreatetruecolor( $thumb_width, $thumb_height );

							// Resize and crop
							imagecopyresampled($thumb,
							                   $image,
							                   0 - ($new_width - $thumb_width) / 2, // Center the image horizontally
							                   0 - ($new_height - $thumb_height) / 2, // Center the image vertically
							                   0, 0,
							                   $new_width, $new_height,
							                   $width, $height);
							imagejpeg($thumb, $filePath, 72);
							/*######################################################################*/
						  }
					 }else{
					 	  echo json_encode(
					 	  	//El archivo no es una imagen
						    array('status' => false, 'msg' => '1')
						  );
						  exit;
					 }
				}else {
				  echo json_encode(
				    array('status' => false, 'msg' => 'No hay subida de archivo')
				  );
				  exit;
				}
			 }else if($_GET["foto"] == 2){ //cuando es un archivo pdf
			 	$arregloPago = array();
			 	$pathRootPago = 'uploads/';
			 	$pathPago = 'uploads/'.$_POST['post_id'].'/pago/';

				 if (isset($_FILES['file'])) {
				 		array_push($arregloPago, $_FILES['file']['tmp_name']);

					  $originalName = $_FILES['file']['name'];
					  $ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
					  $generatedName = md5($_FILES['file']['tmp_name']).$ext;
					  $filePath = $pathPago.$generatedName;

					 if($ext == '.png' || $ext == '.jpg' || $ext == ".pdf"){
					 	  if (!is_writable($pathRootPago)) {
						    echo json_encode(array(
						      'status' => false,
						      'msg'    => 'No se puede escribir.'
						    ));
						    exit;
						  }

						  if (!file_exists($pathPago)) {
							 	mkdir($pathPago, 0755, true);
						  }
						  if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
						  	//Insert data in database
						  	$pago_data['id_persona'] = trim($_POST['post_id']);
						  	$pago_data['archivo'] = trim($filePath);
						  	$pago_data['fecha'] = trim($_POST['fecha']);
						  	$pago_data['noReferencia']= trim($_POST['noReferencia']);
						    $registro->setPago($pago_data);
						    echo json_encode(array(
						      'status'        => true,
						      'originalName'  => $originalName,
						      'generatedName' => $generatedName
						    ));
						  }
					 }	else{

					   	  echo json_encode(
					 	  	//El archivo no es una imagen
						    array('status' => false, 'msg' => '1')
						  );
						  exit;
					 }


				}else {
					  echo json_encode(
					    array('status' => false, 'msg' => 'No hay subida de archivo')
					  );
					  exit;
				}
			 }


	 	}else if(isset($_GET["usuario"])){

			$usuario_id=json_decode(file_get_contents("php://input"));

			if(isset($usuario_id)){
				//$usuarioArreglo_id['id'] = TRIM($usuario_id);
				$usuario_data = $registro->get(TRIM($usuario_id));
				armarJson($usuario_data);
				//print(json_encode($usuario_data));
				//print(json_encode($cedula->response->docs[0]));
			}




	 	}else{
	 		print("No ingreso cedula");
	 	}










	function armarJson($data){
		if(!empty($data)){
			foreach($data as $arreglo){
				$jsonutf8[] = array_map("utf8_encode",$arreglo);
			}
			print_r( json_encode($jsonutf8));
		}else{
			echo 0;
		}
	}





?>
