-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.1.41 - Source distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             8.0.0.4396
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura para tabla recursos.rec_area
CREATE TABLE IF NOT EXISTS `rec_area` (
  `are_id` int(11) NOT NULL AUTO_INCREMENT,
  `are_titulo` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`are_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla recursos.rec_area: ~17 rows (aproximadamente)
DELETE FROM `rec_area`;
/*!40000 ALTER TABLE `rec_area` DISABLE KEYS */;
INSERT INTO `rec_area` (`are_id`, `are_titulo`) VALUES
	(1, 'Ingenieria'),
	(2, 'Oficina'),
	(3, 'Otros'),
	(4, 'Administracion'),
	(5, 'Agricultura y ganaderia'),
	(6, 'Diseño'),
	(7, 'Alimentacion y hospedaje'),
	(8, 'Ciencias Biologicas y Ecologia'),
	(9, 'Finanzas'),
	(10, 'Comercio y Ventas'),
	(11, 'Ciencias Economicas y Sociales'),
	(12, 'Edificación y Acabado'),
	(13, 'Educación y Capacitacion'),
	(14, 'Exploracion y Extraccion'),
	(15, 'Contabilidad'),
	(16, 'Informatica y Desarrollo de Sistemas'),
	(17, 'Interpretacion Artistica');
/*!40000 ALTER TABLE `rec_area` ENABLE KEYS */;


-- Volcando estructura para tabla recursos.rec_bolsatrabajo
CREATE TABLE IF NOT EXISTS `rec_bolsatrabajo` (
  `bol_id` int(11) NOT NULL AUTO_INCREMENT,
  `sar_id` int(11) NOT NULL,
  `bol_ofertalaboral` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `bol_descripcionoferta` tinytext COLLATE utf8_unicode_ci NOT NULL,
  `bol_perfil` tinytext COLLATE utf8_unicode_ci NOT NULL,
  `bol_experiencia` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `bol_fecha` date NOT NULL,
  `bol_localidad` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `bol_salario` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `bol_duracion` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `bol_tipodetrabajo` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `bol_solicitud` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `bol_contacto` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `bol_telefono` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `bol_e_mail` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`bol_id`),
  KEY `sar_id` (`sar_id`),
  CONSTRAINT `FK_rec_bolsatrabajo_rec_subarea` FOREIGN KEY (`sar_id`) REFERENCES `rec_subarea` (`sar_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla recursos.rec_bolsatrabajo: ~3 rows (aproximadamente)
DELETE FROM `rec_bolsatrabajo`;
/*!40000 ALTER TABLE `rec_bolsatrabajo` DISABLE KEYS */;
INSERT INTO `rec_bolsatrabajo` (`bol_id`, `sar_id`, `bol_ofertalaboral`, `bol_descripcionoferta`, `bol_perfil`, `bol_experiencia`, `bol_fecha`, `bol_localidad`, `bol_salario`, `bol_duracion`, `bol_tipodetrabajo`, `bol_solicitud`, `bol_contacto`, `bol_telefono`, `bol_e_mail`) VALUES
	(1, 1, 'base de datos Jr', 'se búsca manejador de base de datos mysql', 'triggers, secuencias, etc', '1 año', '2014-01-08', 'mexico', '18000', 'indefinido', 'tiempo completo', 'CV', 'juan perez', '5519687541', 'pancho@hotmail.com'),
	(2, 2, 'programador Sr', 'se busca progrmador 1 año experiencia', 'negreable', '3 años', '2014-01-09', 'mexico', '45000', 'indefinido', 'tiempo completo', 'CV', 'pancho johns', '558741245', 'srjohn@hotmail.com'),
	(3, 1, 'Analista BD', 'Se busca manejador de base de datos ORACLE', 'Stored Procedures, triggers, consultas avanzadas, reportes, analisis y diseño de bases de datos.', '2 años', '2013-08-12', 'México', '45000', 'indefinido', 'Medio tiempo', 'CV', 'rosa jimenez', '5519875425', 'rosa@gmail.com');
/*!40000 ALTER TABLE `rec_bolsatrabajo` ENABLE KEYS */;


-- Volcando estructura para tabla recursos.rec_curriculum
CREATE TABLE IF NOT EXISTS `rec_curriculum` (
  `cur_id` int(11) NOT NULL AUTO_INCREMENT,
  `cur_nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `cur_paterno` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `cur_materno` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `cur_correo_e` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `cur_telefono` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `cur_url` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`cur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla recursos.rec_curriculum: ~28 rows (aproximadamente)
DELETE FROM `rec_curriculum`;
/*!40000 ALTER TABLE `rec_curriculum` DISABLE KEYS */;
INSERT INTO `rec_curriculum` (`cur_id`, `cur_nombre`, `cur_paterno`, `cur_materno`, `cur_correo_e`, `cur_telefono`, `cur_url`) VALUES
	(1, 'eqweqewqe', 'qweqweq', 'qweqweq', 'asdasd@asdasd.com', '4654654', 'curriculum/536 - Love Story - love story.pdf'),
	(2, 'qwer', 'qwer', 'qwer', 'qwer@hotmail.com', '5548', 'curriculum/Historia del Tiempo- stephen hawking.pdf'),
	(3, 'Oscar', 'Bautista', 'Guerrero', 'dark_younglink@hotmail.com', '5575425', 'curriculum/curriculumVitae.docx'),
	(4, 'yt', 'rt', 'bggf', 'trw@gmail.com', '7897', 'curriculum/Historia del Tiempo- stephen hawking.pdf'),
	(5, 'qwe', 'qew', 'qweqwe', 'qweq@gmail.com', '7894', 'curriculum/'),
	(6, 'qweq', 'qweqw', 'qweq', 'weqwe@gmail.com', '42342', 'curriculum/'),
	(7, 'rwer', 'werw', 'werwe', 'werw@gmail.com', '43234', 'curriculum/curriculumVitae.docx'),
	(8, 'eqweq', 'qweqe', 'qweq', 'qweqw@gmail.com', '54353', 'curriculum/Historia del Tiempo- stephen hawking.pdf'),
	(9, 'gdf', 'sdfg', 'sdfg', 'sdfg@gmail.com', '5345', 'curriculum/'),
	(10, 'ewrw', 'wrw', 'rwerw', 'werw@sfsdf.cdsf', '543534', 'curriculum/Historia del Tiempo- stephen hawking.pdf'),
	(11, 'wter', 'ter', 'gfsd', 'dgsf@fsdf.sdf', '3452', 'curriculum/Historia del Tiempo- stephen hawking.pdf'),
	(12, 'qwer', 'qwer', 'qwer', '1234@qwer.qwer', '5432', 'curriculum/'),
	(13, 'saasd', 'asd', 'asd', 'asd@asdasd.as', '321', 'curriculum/ifefilA.docx'),
	(14, 'rew', 'wer', 'wer', 'wer@wer.wer', '789', 'curriculum/ifefilA.docx'),
	(15, 'qwer', 'qwer', 'ewqr', 'qwer@wer.qwer', '5432', 'curriculum/curriculumVitae.docx'),
	(16, 'ter', 'te', 'tert', 'ert@wert.ert', '534523', 'curriculum/Historia del Tiempo- stephen hawking.pdf'),
	(17, 'rfutyr', 'uytruytr', 'uytruytr', 'tyru@yti.sdf', '5345', 'curriculum/ifefilA.docx'),
	(18, 'ddgh', 'dfhg', 'dfgh', 'dfgh@gdfg.dfg', '234', 'curriculum/ifefilA.docx'),
	(19, 'qwe', 'qwer', 'qwer', 'qwer@qwer.qwe', '1234', 'curriculum/Historia del Tiempo- stephen hawking.pdf'),
	(20, 'sdf', 'sdf', 'sdf', 'sdfqsdf@asd.asd', '4756', 'curriculum/Saria%27s%20Song.pdf'),
	(21, 'qwe', 'qwe', 'qwe', 'qwe@asd.asd', '123', 'curriculum/Saria%27s%20Song.pdf'),
	(22, 'qwe', 'qwe', 'qwe', 'qwe@qwe.qwe', '432', 'curriculum/Yiruma - +-++.PDF'),
	(23, 'qwe', 'qwe', 'qwe', 'qwe@sdf.sdf', '432', 'curriculum/Yiruma - Chaconne.PDF'),
	(24, 'qwer', 'qwer', 'qwer', 'qwer@qwe.wer', '432', 'curriculum/Yiruma - Dream.pdf'),
	(25, 'wert', 'wert', 'wert', 'wert@wert.wert', '4321', 'curriculum/Yiruma.pdf'),
	(26, 'fsdf', 'sdfs', 'sdf', 'sdfsd@sad.sdf', '4234', 'curriculum/Yiruma - Destiny of love.PDF'),
	(27, 'juuan', 'perez', 'Gomes', 'asds@asd.com', '789', 'curriculum/Yiruma - Destiny of love.PDF'),
	(28, 'pepe', 'trol', 'asd', 'asd@asda.asd', '123', 'curriculum/Yiruma - AhpeugeHweemongHagi.pdf');
/*!40000 ALTER TABLE `rec_curriculum` ENABLE KEYS */;


-- Volcando estructura para tabla recursos.rec_postulado
CREATE TABLE IF NOT EXISTS `rec_postulado` (
  `bol_id` int(11) NOT NULL,
  `cur_id` int(11) NOT NULL,
  PRIMARY KEY (`bol_id`,`cur_id`),
  KEY `fk_postulado_rec_curriculum1_idx` (`cur_id`),
  CONSTRAINT `fk_postulado_rec_bolsatrabajo1` FOREIGN KEY (`bol_id`) REFERENCES `rec_bolsatrabajo` (`bol_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_postulado_rec_curriculum1` FOREIGN KEY (`cur_id`) REFERENCES `rec_curriculum` (`cur_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla recursos.rec_postulado: ~28 rows (aproximadamente)
DELETE FROM `rec_postulado`;
/*!40000 ALTER TABLE `rec_postulado` DISABLE KEYS */;
INSERT INTO `rec_postulado` (`bol_id`, `cur_id`) VALUES
	(1, 1),
	(2, 2),
	(3, 3),
	(3, 4),
	(3, 5),
	(3, 6),
	(1, 7),
	(3, 8),
	(3, 9),
	(2, 10),
	(2, 11),
	(2, 12),
	(2, 13),
	(2, 14),
	(2, 15),
	(2, 16),
	(2, 17),
	(2, 18),
	(2, 19),
	(2, 20),
	(2, 21),
	(2, 22),
	(2, 23),
	(2, 24),
	(3, 25),
	(3, 26),
	(3, 27),
	(2, 28);
/*!40000 ALTER TABLE `rec_postulado` ENABLE KEYS */;


-- Volcando estructura para tabla recursos.rec_subarea
CREATE TABLE IF NOT EXISTS `rec_subarea` (
  `sar_id` int(11) NOT NULL AUTO_INCREMENT,
  `are_id` int(11) NOT NULL,
  `sar_titulo` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`sar_id`,`are_id`),
  KEY `fk_rec_subarea_rec_area1_idx` (`are_id`),
  CONSTRAINT `fk_rec_subarea_rec_area1` FOREIGN KEY (`are_id`) REFERENCES `rec_area` (`are_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla recursos.rec_subarea: ~20 rows (aproximadamente)
DELETE FROM `rec_subarea`;
/*!40000 ALTER TABLE `rec_subarea` DISABLE KEYS */;
INSERT INTO `rec_subarea` (`sar_id`, `are_id`, `sar_titulo`) VALUES
	(1, 1, 'Base de datos'),
	(2, 1, 'Desarrollador Web'),
	(3, 2, 'Secretaria'),
	(4, 1, 'Analista'),
	(5, 1, 'programador jr'),
	(6, 1, 'progrmador jr advance'),
	(7, 1, 'progrmador sr'),
	(8, 1, 'analista jr'),
	(9, 1, 'analista base de datos'),
	(10, 3, 'Chofer'),
	(11, 3, 'barrendero'),
	(12, 3, 'papelero'),
	(13, 3, 'carnicero'),
	(14, 3, 'peluquero'),
	(16, 3, 'telefonista'),
	(17, 3, 'medico'),
	(18, 2, 'contador'),
	(20, 2, 'reclutador'),
	(21, 2, 'secretari jr'),
	(22, 2, 'telefonista SR');
/*!40000 ALTER TABLE `rec_subarea` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
