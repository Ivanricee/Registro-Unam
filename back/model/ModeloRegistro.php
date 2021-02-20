<?php
	require_once('conexion.php');

	class registro extends DBAbstractModel{
		// /////////////PROPIEDADES////////////////////
		// ************persona****************
		public	$nombre;
		public	$paterno;
		public	$materno;



		public function get($id_usuario){
		//	print("modelo ".$id_usuario." coño ");
			$this->query="SELECT cedula, nombre, paterno, materno, genero, usuario, password, email, telefono, institucion, titulo, cp, estado, municipio, colonia, calle, noInterior, noExterior, img
			FROM persona
			WHERE id_persona='$id_usuario'
			ORDER BY paterno";
			$this->get_results_from_query();
				$this->mensaje;
				return $this->rows;
		}
		public function LogIn($usuario, $pass){
		//	print("modelo ".$id_usuario." coño ");
			$this->query="SELECT id_persona, usuario, password
			FROM persona
			WHERE usuario='$usuario'
			AND password = '$pass'";
			$this->get_results_from_query();
				$this->mensaje;
				return $this->rows;
		}


		public function setPersona($persona_data){
			foreach($persona_data as $campo=>$valor){
				$$campo = $valor;//el doble signo es por que uno se le asigna al campo en este caso "url"
			}
			$this->query = "INSERT INTO persona
							(cedula, nombre, paterno, materno, genero, usuario, password, email, telefono, institucion, titulo, cp, estado, municipio, colonia, calle, noInterior, noExterior)
							VALUES
							('$cedula','$nombre', '$paterno','$materno', '$genero','$username','$passwordI','$email','$telefono', '$institucion','$titulo','$cp','$estado', '$municipio', '$asentamiento', '$calle', '$interior', '$exterior')";
			$this->execute_single_query();
			return $this->lastInsert;
		}

		public function updateUsuario($imgFile, $id){
			$this->query = "UPDATE persona SET img='$imgFile' WHERE id_persona=$id";
			$this->execute_single_query();
			return "successUpdated";
		}

		public function setPago($pago_data){
			foreach($pago_data as $campo=>$valor){
				$$campo = $valor;//el doble signo es por que uno se le asigna al campo en este caso "url"
			}
			$this->query = "INSERT INTO pago
							(id_persona, archivo, fecha, noReferencia)
							VALUES
							('$id_persona','$archivo', '$fecha','$noReferencia')";
			$this->execute_single_query();
			return $this->lastInsert;
		}
		/*public function setPostulado($postulado_data){
			foreach($postulado_data as $campo=>$valor){
				$$campo = $valor;
			}
			$this->query="INSERT INTO rec_postulado
							(bol_id,cur_id)
							VALUES
							 ('$bol_id','$cur_id')";
			$this->execute_single_query();
		}*/

		function __destruct(){
			unset($this);
		}

	}



?>
