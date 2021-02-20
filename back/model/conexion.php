<?php
	abstract class DBAbstractModel{
		private static $db_host = 'localhost';
		private static $db_user = 'root';
		private static $db_password = '';
		protected $db_name = 'profesores';
		
		protected $query;
		protected $rows = array();
		protected $lastInsert;
		private $conn;
		public $mensaje = "Hecho";
		//metodos abtractos para abstraccion de clases que heredan
	//	abstract protected function get();
		# los siguientes métodos pueden definirse con exactitud
		# y no son abstractos
		# Conectar a la base de datos
		private function open_connection(){
			$this->conn = new mysqli(self::$db_host, self::$db_user,self::$db_password, $this->db_name) or die("Imposible de conectar");
			
		}
		#Desconectar de la base de datos
		private function close_conection(){
			$this->conn->close();
		}
		#ejecutar un query simple del tipo INSERT, DELETE, UPDATE
		protected function execute_single_query(){
			$this->open_connection();
			$this->conn->set_charset("utf8");
			$this->conn->query($this->query);
			$this->lastInsert = $this->conn->insert_id; 
			$this->close_conection();
		}
		#Traer resultados de una consulta en un Array
		protected function get_results_from_query(){
			$this->open_connection();
			$result = $this->conn->query($this->query);
			while($this->rows[] = $result->fetch_assoc());
			$result->close();
			$this->close_conection();
			array_pop($this->rows);
		}
	}
?>